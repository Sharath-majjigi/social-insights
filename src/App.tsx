import React, { useState } from 'react';
import { OverviewSection } from './components/OverviewSection';
import { OverallSection } from './components/OverallSection';
import { PositiveReviewsSection } from './components/PositiveReviewsSection';
import { NegativeReviewsSection } from './components/NegativeReviewsSection';
import { QueriesSection } from './components/QueriesSection';
import { TopIssuesSection } from './components/TopIssuesSection';
import { ActionsSection } from './components/ActionsSection';
import { Tabs } from './components/Tabs';
import { TimePeriodSelector } from './components/TimePeriodSelector';
import { ScrollArea } from './components/ui/scroll-area';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overall');

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto lg:max-w-4xl xl:max-w-6xl">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-4 py-3 lg:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-foreground lg:text-xl">Shoffr's Analytics</h1>
                <p className="text-sm text-muted-foreground">Last Updated: 2hrs ago</p>
              </div>
              <div className="flex items-center gap-3">
                <TimePeriodSelector />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <div className="pb-safe">
          <div className="px-4 py-6 lg:px-6 space-y-6 lg:space-y-8">
            {/* Breadcrumb for mobile */}
            <div className="lg:hidden">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>Dashboard</span>
                <span>•</span>
                <span className="text-foreground font-medium">
                  {activeTab === 'overall' && 'Overall Performance'}
                  {activeTab === 'positive' && 'Positive Reviews'}
                  {activeTab === 'negative' && 'Issues & Complaints'}
                  {activeTab === 'queries' && 'Customer Queries'}
                  {activeTab === 'departments' && 'Team Performance'}
                  {activeTab === 'actions' && 'Action Items'}
                </span>
              </div>
            </div>
            
            {activeTab === 'overall' && (
              <>
                <OverallSection />
              </>
            )}
            {activeTab === 'positive' && <PositiveReviewsSection />}
            {activeTab === 'negative' && <NegativeReviewsSection />}
            {activeTab === 'queries' && <QueriesSection />}
            {activeTab === 'departments' && <TopIssuesSection />}
            {activeTab === 'actions' && <ActionsSection />}
          </div>
        </div>
      </div>
    </div>
  );
}