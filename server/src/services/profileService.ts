import { HouseholdProfile } from '../types/index.js';

// In-memory store for guest/demo sessions or when Supabase is not connected
const profileStore = new Map<string, HouseholdProfile>();

// Default demo household profile
const defaultProfile: HouseholdProfile = {
  householdSize: 4,
  hasChildren: true,
  hasElderly: true,
  hasAsthmaRespiratory: true,
  hasHeartConditions: false,
  commuteMode: 'transit',
  dailyOutdoorHours: 1.5,
  hasAirPurifier: true,
  hasN95Masks: true,
  hasHepaAcFilters: false,
  budgetTier: 'low_cost'
};

profileStore.set('demo-household-user-001', defaultProfile);

export class ProfileService {
  static async getProfile(userId: string): Promise<HouseholdProfile> {
    const existing = profileStore.get(userId);
    if (existing) return existing;

    // Return cloned default
    const created: HouseholdProfile = { ...defaultProfile, userId };
    profileStore.set(userId, created);
    return created;
  }

  static async updateProfile(userId: string, updates: Partial<HouseholdProfile>): Promise<HouseholdProfile> {
    const current = await this.getProfile(userId);
    const updated: HouseholdProfile = {
      ...current,
      ...updates,
      userId
    };
    profileStore.set(userId, updated);
    return updated;
  }
}
