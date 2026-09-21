import { prisma } from '../db.js';
import { requireSession, okBody } from '../http.js';

/** 与原站 vibehub.practice.recent.v1 保持一致：只保留最近 12 条 */
const RECENT_LIMIT = 12;

export const practiceRoutes = async (app) => {
  app.get('/api/practice/recent', async (request, reply) => {
    const session = await requireSession(request, reply);
    if (!session) return reply;

    const rows = await prisma.practiceRecord.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: RECENT_LIMIT,
      select: { termId: true, correct: true, createdAt: true },
    });
    return okBody(rows);
  });

  app.post(
    '/api/practice/record',
    {
      schema: {
        body: {
          type: 'object',
          required: ['termId', 'correct'],
          properties: {
            termId: { type: 'string', minLength: 1, maxLength: 64 },
            correct: { type: 'boolean' },
          },
        },
      },
    },
    async (request, reply) => {
      const session = await requireSession(request, reply);
      if (!session) return reply;

      const { termId, correct } = request.body;
      const record = await prisma.practiceRecord.create({
        data: { userId: session.user.id, termId, correct },
        select: { termId: true, correct: true, createdAt: true },
      });
      return okBody(record);
    },
  );
};
