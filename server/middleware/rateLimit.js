const activeRequests = new Map();
const MAX_CONCURRENT_PER_IP = 2;

export function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';

  const current = activeRequests.get(ip) || 0;

  if (current >= MAX_CONCURRENT_PER_IP) {
    return res.status(429).json({
      error: 'Too many concurrent requests. Please wait for your current task to complete.',
      retryAfter: 30
    });
  }

  activeRequests.set(ip, current + 1);

  res.on('finish', () => {
    const count = activeRequests.get(ip) || 1;
    if (count <= 1) {
      activeRequests.delete(ip);
    } else {
      activeRequests.set(ip, count - 1);
    }
  });

  next();
}
