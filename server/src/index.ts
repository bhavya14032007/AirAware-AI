import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config.js';
import { healthRouter } from './routes/health.js';
import { environmentalRouter } from './routes/environmental.js';
import { aiRouter } from './routes/ai.js';
import { profileRouter } from './routes/profile.js';
import { impactRouter } from './routes/impact.js';
import { communityRouter } from './routes/community.js';
import { authMiddleware } from './middleware/auth.js';
import { generalRateLimiter, aiRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Universal CORS configuration: dynamically reflects the incoming origin
// Allows any Vercel domain (*.vercel.app), custom domains, and localhost
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));

// General rate limiter
app.use('/api', generalRateLimiter);

// Public Health route
app.use('/api/health', healthRouter);

// Environmental data routes (open / cached)
app.use('/api', environmentalRouter);

// Community insights
app.use('/api/community', communityRouter);

// Protected routes (with auth middleware)
app.use('/api/ai', aiRateLimiter, authMiddleware, aiRouter);
app.use('/api/profile', authMiddleware, profileRouter);
app.use('/api/impact', authMiddleware, impactRouter);

// Centralized error handling
app.use(errorHandler);

export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`[AirAware AI Server] Running on http://localhost:${config.port}`);
    console.log(`[AirAware AI Server] Gemini API Key configured: ${Boolean(config.geminiApiKey)}`);
    console.log(`[AirAware AI Server] Supabase configured: ${Boolean(config.supabaseUrl)}`);
  });
}
