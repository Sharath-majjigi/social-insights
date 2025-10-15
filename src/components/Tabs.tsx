import React from 'react';
import { Card } from './ui/card';
import dashboardData from '../data/dashboardData.json';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Extract data from JSON
const { tabs } = dashboardData.tabs;

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  const activeTabData = tabs.find(tab => tab.id === activeTab);
  
  return (
    <div className="sticky top-[72px] lg:top-[76px] z-10 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="px-4 py-2 lg:px-6">
        {/* Active Tab Indicator - Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{activeTabData?.icon}</span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{activeTabData?.label}</h2>
              <p className="text-sm text-muted-foreground">{activeTabData?.description}</p>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation - Mobile: Two rows */}
        <div className="lg:hidden">
          {/* First row - Mobile */}
          <div className="grid grid-cols-3 gap-1">
            {tabs.slice(0, 3).map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Second row - Mobile */}
          <div className="grid grid-cols-3 gap-1 mt-2">
            {tabs.slice(3).map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation - Desktop: Single row */}
        <div className="hidden lg:flex lg:justify-center lg:gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}