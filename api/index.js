import { redis } from "../lib/redis";

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  
  const C = {
    get: (key) => redis.get(key),
    put: (key, value) => redis.set(key, value),
    delete: (key) => redis.del(key),
  };

  if (path === "/") {
    return res.status(200).send("Vercel OK");
  }

  return res.status(404).send("Not Found");
}
