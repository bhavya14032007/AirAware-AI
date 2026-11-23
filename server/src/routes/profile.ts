import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { ProfileService } from '../services/profileService.js';

export const profileRouter = Router();

const ProfileUpdateSchema = z.object({
  householdSize: z.number().min(1).max(20).optional(),
  hasChildren: z.boolean().optional(),
  hasElderly: z.boolean().optional(),
  hasAsthmaRespiratory: z.boolean().optional(),
  hasHeartConditions: z.boolean().optional(),
  commuteMode: z.enum(['transit', 'car', 'bike', 'walk', 'remote']).optional(),
  dailyOutdoorHours: z.number().min(0).max(24).optional(),
  hasAirPurifier: z.boolean().optional(),
  hasN95Masks: z.boolean().optional(),
  hasHepaAcFilters: z.boolean().optional(),
  budgetTier: z.enum(['free', 'low_cost', 'moderate', 'premium']).optional(),
});

/**
 * GET /api/profile
 */
profileRouter.get('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || 'demo-household-user-001';
    const profile = await ProfileService.getProfile(userId);
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/profile
 */
profileRouter.put('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id || 'demo-household-user-001';
    const validated = ProfileUpdateSchema.parse(req.body);
    const updated = await ProfileService.updateProfile(userId, validated);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});
