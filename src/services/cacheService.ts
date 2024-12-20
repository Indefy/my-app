import Redis from 'ioredis';

const redis = new Redis();

export async function getCachedNotes(key: string) {
  const cachedNotes = await redis.get(key);
  return cachedNotes ? JSON.parse(cachedNotes) : null;
}

export async function setCachedNotes(key: string, notes: any[], expirationInSeconds: number = 3600) {
  await redis.setex(key, expirationInSeconds, JSON.stringify(notes));
}

