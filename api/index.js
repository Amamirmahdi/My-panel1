import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname.replace("/api", "");

    if (path === "" || path === "/") {
      return res.status(200).send("Vercel OK");
    }

    if (path === "/get") {
      const key = url.searchParams.get("key");
      const value = await redis.get(key);

      return res.status(200).json({
        success: true,
        value,
      });
    }

    if (path === "/set") {
      const { key, value } = req.body || {};
      await redis.set(key, value);

      return res.status(200).json({
        success: true,
      });
    }

    return res.status(404).send("Not Found");
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}
