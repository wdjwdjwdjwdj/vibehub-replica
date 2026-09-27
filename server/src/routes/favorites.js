import { prisma } from '../db.js';
import { requireSession, okBody } from '../http.js';

/**
 * 云端收藏接口。
 *
 * /api/favorites 的集合写入保留为兼容接口。新的前端同步应使用下面的
 * /api/favorites/:termId 增量 PUT/DELETE，避免一台设备用旧快照覆盖另一台设备
 * 刚刚产生的收藏。
 */
export const favoritesRoutes = async (app) => {
  app.get('/api/favorites', async (request, reply) => {
    const session = await requireSession(request, reply);
    if (!session) return reply;

    const rows = await prisma.userFavorite.findMany({
      where: { userId: session.user.id },
      select: { termId: true },
      orderBy: { createdAt: 'desc' },
    });
    return okBody(rows.map((row) => row.termId));
  });

  app.put(
    '/api/favorites',
    {
      schema: {
        body: {
          type: 'object',
          required: ['termIds'],
          properties: {
            termIds: {
              type: 'array',
              maxItems: 2000,
              items: { type: 'string', minLength: 1, maxLength: 64 },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const session = await requireSession(request, reply);
      if (!session) return reply;

      const userId = session.user.id;
      const termIds = [...new Set(request.body.termIds)]; // 去重，防御前端重复提交

      // 只做增量：保留已有收藏的 createdAt，避免每次全量重写
      const existing = await prisma.userFavorite.findMany({
        where: { userId },
        select: { termId: true },
      });
      const existingSet = new Set(existing.map((row) => row.termId));
      const nextSet = new Set(termIds);
      const toAdd = termIds.filter((id) => !existingSet.has(id));
      const toRemove = [...existingSet].filter((id) => !nextSet.has(id));

      if (toAdd.length || toRemove.length) {
        await prisma.$transaction([
          prisma.userFavorite.deleteMany({ where: { userId, termId: { in: toRemove } } }),
          prisma.userFavorite.createMany({ data: toAdd.map((termId) => ({ userId, termId })) }),
        ]);
      }

      return okBody(termIds);
    },
  );

  const termParams = {
    schema: {
      params: {
        type: 'object',
        required: ['termId'],
        properties: { termId: { type: 'string', minLength: 1, maxLength: 64 } },
      },
    },
  };

  app.put('/api/favorites/:termId', termParams, async (request, reply) => {
    const session = await requireSession(request, reply);
    if (!session) return reply;
    await prisma.userFavorite.upsert({
      where: { userId_termId: { userId: session.user.id, termId: request.params.termId } },
      update: {},
      create: { userId: session.user.id, termId: request.params.termId },
    });
    return okBody({ termId: request.params.termId, saved: true });
  });

  app.delete('/api/favorites/:termId', termParams, async (request, reply) => {
    const session = await requireSession(request, reply);
    if (!session) return reply;
    await prisma.userFavorite.deleteMany({ where: { userId: session.user.id, termId: request.params.termId } });
    return okBody({ termId: request.params.termId, saved: false });
  });
};
