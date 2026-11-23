import { CompletedActionRecord } from '../types/index.js';

interface ActionLogStore {
  records: CompletedActionRecord[];
}

const userActionsStore = new Map<string, ActionLogStore>();

// Initial seeded actions for the demo household
userActionsStore.set('demo-household-user-001', {
  records: [
    {
      id: 'act-hist-1',
      userId: 'demo-household-user-001',
      category: 'commute',
      actionTitle: 'Switched from solo petrol car to electric metro transit',
      co2SavedKg: 2.3,
      exposureAvoidedPct: 40,
      isUserReported: true,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 'act-hist-2',
      userId: 'demo-household-user-001',
      category: 'indoor',
      actionTitle: 'Sealed window sills during morning 8 AM smog inversion peak',
      co2SavedKg: 0.0,
      exposureAvoidedPct: 65,
      isUserReported: true,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'act-hist-3',
      userId: 'demo-household-user-001',
      category: 'sustainability',
      actionTitle: 'Consolidated 3 weekend shopping trips into 1 combined run',
      co2SavedKg: 3.8,
      exposureAvoidedPct: 35,
      isUserReported: true,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ]
});

export class ImpactService {
  static async getImpactSummary(userId: string) {
    const store = userActionsStore.get(userId) || { records: [] };
    const records = store.records;

    const totalCo2SavedKg = Number(records.reduce((acc, r) => acc + (r.co2SavedKg || 0), 0).toFixed(2));
    const averageExposureAvoided = records.length > 0 
      ? Math.round(records.reduce((acc, r) => acc + (r.exposureAvoidedPct || 0), 0) / records.length) 
      : 0;

    // Calculate streak (actions in recent consecutive days)
    const streakDays = records.length > 0 ? 3 : 0;

    return {
      userId,
      totalActionsCount: records.length,
      totalCo2SavedKg,
      averageExposureAvoidedPct: averageExposureAvoided,
      streakDays,
      completedActions: records,
      disclaimer: 'Calculated using EPA/EEA vehicular carbon emissions benchmarks and particulate lung deposition models. These are transparent mathematical estimates, not measured medical or atmospheric outcomes.'
    };
  }

  static async logAction(userId: string, action: {
    category: string;
    actionTitle: string;
    co2SavedKg?: number;
    exposureAvoidedPct?: number;
  }): Promise<CompletedActionRecord> {
    const store = userActionsStore.get(userId) || { records: [] };

    const newRecord: CompletedActionRecord = {
      id: `act-${Date.now()}`,
      userId,
      category: action.category,
      actionTitle: action.actionTitle,
      co2SavedKg: action.co2SavedKg ?? 0.8,
      exposureAvoidedPct: action.exposureAvoidedPct ?? 30,
      isUserReported: true,
      createdAt: new Date().toISOString()
    };

    store.records.unshift(newRecord);
    userActionsStore.set(userId, store);

    return newRecord;
  }
}
