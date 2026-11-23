import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'AirAware AI Backend Service',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
    features: {
      openMeteo: true,
      geminiAI: true,
      demoMode: true,
      whatIfSimulator: true,
      impactTracker: true
    }
  });
});
