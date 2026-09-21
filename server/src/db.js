import { PrismaClient } from '@prisma/client';

/**
 * 全局唯一的 Prisma 实例。
 * 开发模式下 node --watch 会反复重载模块，挂到 globalThis 上避免连接池泄漏。
 */
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__vibehubPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__vibehubPrisma = prisma;
}

/** 健康检查用：确认数据库真的可连 */
export const pingDatabase = async () => {
  await prisma.$queryRaw`SELECT 1`;
  return true;
};
