import { prisma } from '../db.js';
import { requireSession, okBody } from '../http.js';

/**
 * 云端收藏接口。
 *
 * 设计：PUT 用「全量覆盖」语义而不是增删——收藏的自然操作单位是"我现在的收藏集合"，
 * 全量覆盖幂等、便于重试，前端也不需要算差量。上限 322 个术语，请求体 < 2KB。
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
};
