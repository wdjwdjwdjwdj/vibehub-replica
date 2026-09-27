import { prisma } from '../db.js';
import { requireSession, okBody } from '../http.js';
import { randomUUID } from 'node:crypto';

/** 与原站 vibehub.practice.recent.v1 保持一致：只保留最近 12 条 */
const RECENT_LIMIT = 12;

const recordSelect = {
  id: true,
  termId: true,
  correct: true,
  clientEventId: true,
  createdAt: true,
};

const findRecordByEvent = (userId, clientEventId) => prisma.practiceRecord.findUnique({
  where: { userId_clientEventId: { userId, clientEventId } },
  select: recordSelect,
});

export const practiceRoutes = async (app) => {
  app.get('/api/practice/recent', async (request, reply) => {
    const session = await requireSession(request, reply);
    if (!session) return reply;

    const rows = await prisma.practiceRecord.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: RECENT_LIMIT,
      select: recordSelect,
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
            clientEventId: { type: 'string', minLength: 1, maxLength: 96 },
          },
        },
      },
    },
    async (request, reply) => {
      const session = await requireSession(request, reply);
      if (!session) return reply;

      const { termId, correct } = request.body;
      const clientEventId = request.body.clientEventId || randomUUID();
      let record;
      try {
        record = await prisma.practiceRecord.upsert({
          where: { userId_clientEventId: { userId: session.user.id, clientEventId } },
          update: {},
          create: { userId: session.user.id, termId, correct, clientEventId },
          select: recordSelect,
        });
      } catch (error) {
        // Two browser tabs can submit the same queued event at the same time.
        // If both miss the row before the upsert, Prisma may surface the unique
        // constraint race; returning the already-created row preserves retry
        // idempotency instead of exposing a transient 500 to the client.
        if (error?.code !== 'P2002') throw error;
        record = await findRecordByEvent(session.user.id, clientEventId);
        if (!record) throw error;
      }
      return okBody(record);
    },
  );
};
