import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NafasMetricsRow } from '../src/components/nafas/NafasMetricsRow';
import { NafasAnalyticsSection } from '../src/components/nafas/NafasAnalyticsSection';
import { NafasEventLog } from '../src/components/nafas/NafasEventLog';

describe('Nafas High-Fidelity UI Components', () => {
  it('renders NafasMetricsRow with synchronized sensor data and trend badges', () => {
    render(
      <NafasMetricsRow
        currentIndoorPM25={12}
        averageIndoorPM25={12}
        averageOutdoorPM25={244}
        powerConsumptionKWh={151.27}
      />
    );

    expect(screen.getByText('Current PM2.5 Level')).toBeTruthy();
    expect(screen.getByText("Today's Average PM2.5 Levels")).toBeTruthy();
    expect(screen.getByText('Power Consumption')).toBeTruthy();

    // Check tabular numerals & values
    expect(screen.getByText('151.27')).toBeTruthy();
    expect(screen.getByText('-4.2% vs yesterday')).toBeTruthy();
  });

  it('renders NafasAnalyticsSection with GenAI Smog Briefing and structured chips', () => {
    render(<NafasAnalyticsSection />);

    expect(screen.getByText(/AirAware GenAI Atmospheric Inversion Briefing/i)).toBeTruthy();
    expect(screen.getByText(/Ground Inversion Active/i)).toBeTruthy();
    expect(screen.getByText(/Recommended Window Flush:/i)).toBeTruthy();
    expect(screen.getByText(/Morning Peak Smog:/i)).toBeTruthy();

    // Check 3 environmental metrics
    expect(screen.getByText('Infiltration Reduction')).toBeTruthy();
    expect(screen.getByText('Avoided Emissions')).toBeTruthy();
    expect(screen.getByText('Filtration Power Split')).toBeTruthy();
    expect(screen.getByText('95.1%')).toBeTruthy();
    expect(screen.getByText('42.8')).toBeTruthy();
    expect(screen.getByText('1.82')).toBeTruthy();
  });

  it('renders NafasEventLog table and operational incident entries', () => {
    render(<NafasEventLog />);

    expect(screen.getByText(/Building Air Quality & Operational Incident Log/i)).toBeTruthy();
    expect(screen.getByText('10:45 AM')).toBeTruthy();
    expect(screen.getByText(/Automated HEPA Surge Activated/i)).toBeTruthy();
    expect(screen.getByText(/Room 5 \(Dining & Kitchen\)/i)).toBeTruthy();

    // Verify severity filter buttons
    expect(screen.getByRole('button', { name: 'All' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Alert' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Advisory' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Normal' })).toBeTruthy();
  });
});
