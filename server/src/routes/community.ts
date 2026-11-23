import { Router, Request, Response } from 'express';

export const communityRouter = Router();

communityRouter.get('/', (req: Request, res: Response) => {
  res.json({
    activeCommunityMembers: 1420,
    communityAvoidedCo2Tons: 18.4,
    initiatives: [
      {
        id: 'init-1',
        title: 'Neighborhood School Run Carpooling',
        location: 'Sector 14 & Model Town',
        participants: 186,
        impact: 'Avoids ~320 kg CO2 / week and clears morning roadside pickup idling.',
        status: 'Active'
      },
      {
        id: 'init-2',
        title: 'Community Air Sensor Transparency Mesh',
        location: 'Downtown Ward 4',
        participants: 45,
        impact: '12 open low-cost PM2.5 sensors providing hyper-local microclimate alerts.',
        status: 'Active'
      },
      {
        id: 'init-3',
        title: 'Green Heating & Fireplace Moratorium',
        location: 'Suburban Hillside Valley',
        participants: 310,
        impact: 'Voluntary wood-burning pause during thermal inversion warnings.',
        status: 'Seasonal'
      }
    ],
    isSimulatedData: true,
    dataNotice: 'Community metrics are aggregated from participating pilot households and anonymized demo datasets.'
  });
});
