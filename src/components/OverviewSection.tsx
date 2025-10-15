import React, { useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, HelpCircle, User } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ScrollIndicator } from './ScrollIndicator';
import dashboardData from '../data/dashboardData.json';

// Extract data from JSON
const { positiveData, negativeData, queriesData } = dashboardData.overviewSection;

interface OverviewSectionProps {
  onSectionSelect: (section: 'positive' | 'negative' | 'queries') => void;
}

export function OverviewSection({ onSectionSelect }: OverviewSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Total Reviews */}
      <div className="text-center">
        <p className="text-2xl font-semibold text-foreground lg:text-3xl">{dashboardData.overallSection.headerData.totalReviews}</p>
        <p className="text-sm text-muted-foreground lg:text-base">{dashboardData.overallSection.headerData.description}</p>
      </div>

      {/* Horizontal Scrollable Cards */}
      <div>
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0"
        >
          {/* Positive Reviews Card */}
          <Card 
            className="min-w-[280px] lg:min-w-0 p-4 lg:p-6 cursor-pointer hover:shadow-md transition-shadow bg-green-50/50 border-green-200/50"
            onClick={() => onSectionSelect('positive')}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Positive</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xl font-semibold text-green-600">{dashboardData.overallSection.metricCards[1].value}</p>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                +3.2%
              </Badge>
            </div>
            
            <div className="h-8 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={positiveData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#16a34a" 
                    strokeWidth={2} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-xs text-muted-foreground">{dashboardData.overallSection.metricCards[1].subValue} • Tap for details →</p>
          </Card>

          {/* Negative Reviews Card */}
          <Card 
            className="min-w-[280px] lg:min-w-0 p-4 lg:p-6 cursor-pointer hover:shadow-md transition-shadow bg-red-50/50 border-red-200/50"
            onClick={() => onSectionSelect('negative')}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Negative</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xl font-semibold text-red-600">{dashboardData.overallSection.metricCards[2].value}</p>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                -1.8%
              </Badge>
            </div>
            
            <div className="h-8 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={negativeData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#dc2626" 
                    strokeWidth={2} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-xs text-muted-foreground">{dashboardData.overallSection.metricCards[2].subValue} • Tap for details →</p>
          </Card>

          {/* Queries Card */}
          <Card 
            className="min-w-[280px] lg:min-w-0 p-4 lg:p-6 cursor-pointer hover:shadow-md transition-shadow bg-blue-50/50 border-blue-200/50"
            onClick={() => onSectionSelect('queries')}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Queries</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xl font-semibold text-blue-600">{dashboardData.overallSection.metricCards[3].value}</p>
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                +0.5%
              </Badge>
            </div>
            
            <div className="h-8 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={queriesData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb" 
                    strokeWidth={2} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-xs text-muted-foreground">{dashboardData.overallSection.metricCards[3].subValue} • Tap for details →</p>
          </Card>
        </div>
        <ScrollIndicator containerRef={scrollRef} />
      </div>
    </div>
  );
}