import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { OpenMeteoService, BENCHMARK_LOCATIONS } from '../services/openMeteoService.js';

export const environmentalRouter = Router();

const CoordQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90).default(28.6139),
  lon: z.coerce.number().min(-180).max(180).default(77.2090),
  name: z.string().optional()
});

/**
 * GET /api/air-quality
 */
environmentalRouter.get('/air-quality', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lat, lon, name } = CoordQuerySchema.parse(req.query);
    const data = await OpenMeteoService.getAirQuality(lat, lon, name);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/weather
 */
environmentalRouter.get('/weather', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lat, lon } = CoordQuerySchema.parse(req.query);
    const data = await OpenMeteoService.getWeather(lat, lon);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/forecast
 */
environmentalRouter.get('/forecast', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lat, lon, name } = CoordQuerySchema.parse(req.query);
    const data = await OpenMeteoService.getAirQuality(lat, lon, name);
    res.json({
      location: data.location,
      forecast: data.forecast,
      hourlyTrends: data.hourlyTrends
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/locations/search
 */
environmentalRouter.get('/locations/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = String(req.query.q || '');
    const results = await OpenMeteoService.searchLocations(query);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/locations/benchmarks
 */
environmentalRouter.get('/locations/benchmarks', (req: Request, res: Response) => {
  res.json(Object.values(BENCHMARK_LOCATIONS));
});
