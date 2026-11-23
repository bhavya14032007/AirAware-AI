import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { ImpactService } from '../services/impactService.js';

export const impactRouter = Router();

const LogActionSchema = z.object({
  category: z.string().min(1),
  actionTitle: z.string().min(1),
  co2SavedKg: z.number().min(0).optional(),
  exposureAvoidedPct: z.number().min(0).max(100).optional(),
});

/**
 * GET /api/impact
 */
impactRouter.get('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || 'demo-household-user-001';
    const summary = await ImpactService.getImpactSummary(userId);
    res.json(summary);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/impact/actions
 */
impactRouter.post('/actions', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || 'demo-household-user-001';
    const validated = LogActionSchema.parse(req.body);
    const logged = await ImpactService.logAction(userId, validated);
    res.status(201).json(logged);
  } catch (err) {
    next(err);
  }
});
