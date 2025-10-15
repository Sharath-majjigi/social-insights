import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ChevronDown, Calendar } from 'lucide-react';
import dashboardData from '../data/dashboardData.json';

// Extract data from JSON
const { timePeriods } = dashboardData.timePeriodSelector;

export function TimePeriodSelector() {
  const [selectedPeriod, setSelectedPeriod] = useState('thismonth');
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = timePeriods.find(p => p.id === selectedPeriod);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 hover:bg-secondary text-sm rounded-lg transition-colors border border-border"
      >
        <Calendar className="w-3 h-3 text-muted-foreground" />
        <span className="hidden sm:inline text-foreground">{selectedOption?.label}</span>
        <span className="sm:hidden text-foreground">{selectedOption?.shortLabel}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <Card className="absolute right-0 top-full mt-1 w-48 py-2 z-20 shadow-lg border">
            <div className="max-h-64 overflow-y-auto">
              {timePeriods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => {
                    setSelectedPeriod(period.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center justify-between ${
                    selectedPeriod === period.id ? 'bg-accent' : ''
                  }`}
                >
                  <span className="text-foreground">{period.label}</span>
                  {selectedPeriod === period.id && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}