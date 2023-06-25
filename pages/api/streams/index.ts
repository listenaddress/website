import { NextApiRequest, NextApiResponse } from 'next';
import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
    password: process.env.REDIS_PASSWORD!
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pinnedStreamsRes = await redis.get('pinned-streams');
    const pinnedStreams = JSON.parse(pinnedStreamsRes || '[]');
    res.status(200).json(pinnedStreams);
}

// TODO: Make this actually work
process.on('SIGTERM', () => {
    redis.disconnect();
});
