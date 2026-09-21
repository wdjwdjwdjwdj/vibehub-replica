import { pingDatabase } from '../db.js';
import { errorBody } from '../http.js';

export const healthRoutes = async (app) => {
  app.get('/api/health', async (request, reply) => {
    try {
      await pingDatabase();
      return {
        ok: true,
        data: {
          status: 'ok',
          database: 'up',
          uptime: Math.round(process.uptime()),
          time: new Date().toISOString(),
        },
      };
    } catch (error) {
      request.log.error({ err: error }, 'health check failed');
      return reply.code(503).send(errorBody('DB_DOWN', '数据库不可用'));
    }
  });
};
