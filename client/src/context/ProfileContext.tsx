import React, { createContext, useContext, useEffect, useState } from 'react';
import { HouseholdProfile } from '../types';
import { api } from '../services/api';
import { clientLogger } from '../utils/logger';

interface ProfileContextType {
  profile: HouseholdProfile;
  updateProfile: (updated: Partial<HouseholdProfile>) => Promise<void>;
  isLoading: boolean;
}

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

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<HouseholdProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    api.getProfile()
      .then(p => {
        if (isMounted && p) setProfile(p);
      })
      .catch(err => {
        clientLogger.warn('Could not load profile from server, using local default', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const updateProfile = async (updates: Partial<HouseholdProfile>) => {
    try {
      const res = await api.updateProfile(updates);
      setProfile(res);
    } catch (err) {
      clientLogger.warn('Server profile update error, updating local state', err);
      setProfile(prev => ({ ...prev, ...updates }));
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within ProfileProvider');
  return context;
};
