import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { GeminiService } from '../services/geminiService.js';
import { OpenMeteoService } from '../services/openMeteoService.js';
import { ProfileService } from '../services/profileService.js';

export const aiRouter = Router();

const ChatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1)
  })),
  lat: z.number().default(28.6139),
  lon: z.number().default(77.2090),
  locationName: z.string().optional()
});

const RecommendationRequestSchema = z.object({
  lat: z.number().default(28.6139),
  lon: z.number().default(77.2090),
  locationName: z.string().optional()
});

const WhatIfRequestSchema = z.object({
  lat: z.number().default(28.6139),
  lon: z.number().default(77.2090),
  scenario: z.object({
    usualRoutine: z.object({
      commuteMode: z.string().default('car'),
      commuteDistanceKm: z.number().default(12),
      errandsTrips: z.number().default(3),
      outdoorExerciseMinutes: z.number().default(45),
      outdoorExerciseTime: z.string().default('07:30'),
      cookingVentilation: z.string().default('unvented'),
      heatingSource: z.string().default('electric')
    }),
    optimizedAlternative: z.object({
      commuteMode: z.string().default('transit'),
      commuteDistanceKm: z.number().default(12),
      errandsTrips: z.number().default(1),
      outdoorExerciseMinutes: z.number().default(15),
      outdoorExerciseTime: z.string().default('14:00'),
      cookingVentilation: z.string().default('exhaust_fan'),
      heatingSource: z.string().default('electric')
    })
  })
});

/**
 * POST /api/ai/chat
 */
aiRouter.post('/chat', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { messages, lat, lon, locationName } = ChatRequestSchema.parse(req.body);
    const userId = req.user?.id || 'demo-household-user-001';

    const [aqData, weather, profile] = await Promise.all([
      OpenMeteoService.getAirQuality(lat, lon, locationName),
      OpenMeteoService.getWeather(lat, lon),
      ProfileService.getProfile(userId)
    ]);

    const result = await GeminiService.chat(messages, aqData, weather, profile);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/ai/recommendations
 */
aiRouter.post('/recommendations', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { lat, lon, locationName } = RecommendationRequestSchema.parse(req.body);
    const userId = req.user?.id || 'demo-household-user-001';

    const [aqData, weather, profile] = await Promise.all([
      OpenMeteoService.getAirQuality(lat, lon, locationName),
      OpenMeteoService.getWeather(lat, lon),
      ProfileService.getProfile(userId)
    ]);

    const result = await GeminiService.getRecommendations(aqData, weather, profile);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/ai/daily-plan
 */
aiRouter.post('/daily-plan', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { lat, lon, locationName } = RecommendationRequestSchema.parse(req.body);
    const userId = req.user?.id || 'demo-household-user-001';

    const [aqData, weather, profile] = await Promise.all([
      OpenMeteoService.getAirQuality(lat, lon, locationName),
      OpenMeteoService.getWeather(lat, lon),
      ProfileService.getProfile(userId)
    ]);

    const plan = await GeminiService.generateDailyPlan(aqData, weather, profile);
    res.json({
      location: aqData.location,
      aqi: aqData.aqi,
      category: aqData.category,
      actions: plan
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/ai/what-if
 */
aiRouter.post('/what-if', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { lat, lon, scenario } = WhatIfRequestSchema.parse(req.body);
    const aqData = await OpenMeteoService.getAirQuality(lat, lon);
    const result = GeminiService.simulateWhatIfScenario(scenario, aqData.aqi);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
