import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/index.js';

describe('Server API Endpoints Integration', () => {
  it('GET /api/health returns 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('AirAware AI Backend Service');
  });

  it('GET /api/air-quality returns valid structured atmospheric payload', async () => {
    const res = await request(app).get('/api/air-quality?lat=28.6139&lon=77.2090&name=New%20Delhi');
    expect(res.status).toBe(200);
    expect(res.body.aqi).toBeDefined();
    expect(res.body.category).toBeDefined();
    expect(res.body.pollutants).toBeDefined();
    expect(res.body.pollutants.pm2_5).toBeDefined();
  });

  it('GET /api/weather returns atmospheric temperature & wind dispersion metrics', async () => {
    const res = await request(app).get('/api/weather?lat=28.6139&lon=77.2090');
    expect(res.status).toBe(200);
    expect(res.body.temperature).toBeDefined();
    expect(res.body.windSpeed).toBeDefined();
    expect(res.body.relativeHumidity).toBeDefined();
  });

  it('GET /api/community returns community collective initiatives', async () => {
    const res = await request(app).get('/api/community');
    expect(res.status).toBe(200);
    expect(res.body.activeCommunityMembers).toBeGreaterThan(0);
    expect(res.body.initiatives.length).toBeGreaterThanOrEqual(2);
  });

  it('POST /api/ai/what-if returns calculated scenario comparisons', async () => {
    const res = await request(app)
      .post('/api/ai/what-if')
      .send({
        lat: 28.6139,
        lon: 77.2090,
        scenario: {
          usualRoutine: {
            commuteMode: 'car',
            commuteDistanceKm: 14,
            errandsTrips: 3,
            outdoorExerciseMinutes: 45,
            outdoorExerciseTime: '07:30',
            cookingVentilation: 'none',
            heatingSource: 'gas'
          },
          optimizedAlternative: {
            commuteMode: 'transit',
            commuteDistanceKm: 14,
            errandsTrips: 1,
            outdoorExerciseMinutes: 15,
            outdoorExerciseTime: '13:30',
            cookingVentilation: 'hood',
            heatingSource: 'electric'
          }
        }
      });

    expect(res.status).toBe(200);
    expect(res.body.exposureReductionPct).toBeGreaterThan(0);
    expect(res.body.emissionsAvoidedKgCO2).toBeGreaterThan(0);
    expect(res.body.keyDifferences.length).toBe(3);
  });

  it('GET /api/profile returns default profile for demo user', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.status).toBe(200);
    expect(res.body.householdSize).toBeDefined();
    expect(res.body.hasAsthmaRespiratory).toBeDefined();
  });

  it('GET /api/impact returns cumulative saved emissions and actions list', async () => {
    const res = await request(app).get('/api/impact');
    expect(res.status).toBe(200);
    expect(res.body.totalCo2SavedKg).toBeDefined();
    expect(res.body.completedActions.length).toBeGreaterThan(0);
  });
});
