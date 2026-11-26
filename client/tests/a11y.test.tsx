import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NafasTopBar } from '../src/components/nafas/NafasTopBar';
import { NafasEventLog } from '../src/components/nafas/NafasEventLog';
import { ThemeProvider } from '../src/context/ThemeContext';

describe('Accessibility & WCAG Compliance Standards', () => {
  it('provides accessible floor selector with aria-haspopup and aria-expanded attributes', () => {
    render(
      <ThemeProvider>
        <NafasTopBar onProfileClick={() => {}} />
      </ThemeProvider>
    );

    const floorButton = screen.getByRole('button', { name: /select floor level/i });
    expect(floorButton).toBeTruthy();
    expect(floorButton.getAttribute('aria-haspopup')).toBe('listbox');
    expect(floorButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders table headers with explicit scope="col" for screen readers', () => {
    render(<NafasEventLog />);

    const table = screen.getByRole('table', { name: /building air quality and operational incident log/i });
    expect(table).toBeTruthy();

    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders.length).toBeGreaterThanOrEqual(5);
    columnHeaders.forEach((th) => {
      expect(th.getAttribute('scope')).toBe('col');
    });
  });

  it('ensures all buttons in NafasEventLog have accessible names', () => {
    render(<NafasEventLog />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn.textContent || btn.getAttribute('aria-label')).toBeTruthy();
    });
  });
});
