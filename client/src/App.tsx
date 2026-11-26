import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider } from './context/ProfileContext';
import { EnvironmentalProvider } from './context/EnvironmentalContext';
import { NafasDashboard } from './components/nafas/NafasDashboard';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <EnvironmentalProvider>
          <NafasDashboard />
          <Analytics />
        </EnvironmentalProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
};

export default App;
