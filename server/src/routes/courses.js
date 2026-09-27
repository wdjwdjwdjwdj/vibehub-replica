import { prisma } from '../db.js';
import { requireSession, okBody } from '../http.js';

const courseParams = {
  schema: {
    params: {
      type: 'object',
      required: ['courseId'],
      properties: { courseId: { type: 'string', minLength: 1, maxLength: 96 } },
    },
  },
};

const chapterParams = {
  schema: {
    params: {
      type: 'object',
      required: ['courseId', 'chapterId'],
      properties: {
        courseId: { type: 'string', minLength: 1, maxLength: 96 },
        chapterId: { type: 'string', minLength: 1, maxLength: 96 },
      },
    },
    body: {
      type: 'object',
      required: ['completed'],
      properties: { completed: { type: 'boolean' } },
    },
  },
};

export const courseRoutes = async (app) => {
  app.get('/api/courses/progress', async (request, reply) => {
    const session = await requireSession(request, reply);
    if (!session) return reply;
    const [chapters, positions] = await Promise.all([
      prisma.courseChapterProgress.findMany({ where: { userId: session.user.id }, orderBy: { updatedAt: 'desc' }, select: { courseId: true, chapterId: true, completed: true, updatedAt: true } }),
      prisma.courseReadingPosition.findMany({ where: { userId: session.user.id }, select: { courseId: true, chapterId: true, anchor: true, updatedAt: true } }),
    ]);
    return okBody({ chapters, positions });
  });

  app.put('/api/courses/:courseId/chapters/:chapterId/progress', chapterParams, async (request, reply) => {
    const session = await requireSession(request, reply);
    if (!session) return reply;
    const { courseId, chapterId } = request.params;
    const progress = await prisma.courseChapterProgress.upsert({
      where: { userId_courseId_chapterId: { userId: session.user.id, courseId, chapterId } },
      update: { completed: request.body.completed },
      create: { userId: session.user.id, courseId, chapterId, completed: request.body.completed },
      select: { courseId: true, chapterId: true, completed: true, updatedAt: true },
    });
    return okBody(progress);
  });

  app.put('/api/courses/:courseId/position', {
    ...courseParams,
    schema: {
      ...courseParams.schema,
      body: {
        type: 'object', required: ['chapterId'],
        properties: { chapterId: { type: 'string', minLength: 1, maxLength: 96 }, anchor: { type: 'string', maxLength: 160 } },
      },
    },
  }, async (request, reply) => {
    const session = await requireSession(request, reply);
    if (!session) return reply;
    const position = await prisma.courseReadingPosition.upsert({
      where: { userId_courseId: { userId: session.user.id, courseId: request.params.courseId } },
      update: { chapterId: request.body.chapterId, anchor: request.body.anchor || null },
      create: { userId: session.user.id, courseId: request.params.courseId, chapterId: request.body.chapterId, anchor: request.body.anchor || null },
      select: { courseId: true, chapterId: true, anchor: true, updatedAt: true },
    });
    return okBody(position);
  });
};
