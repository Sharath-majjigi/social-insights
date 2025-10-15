import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, TrendingUp, Clock, Target } from 'lucide-react';
import dashboardData from '../data/dashboardData.json';

// Extract data from JSON
const { focusAreas } = dashboardData.actionsSection;

export function ActionsSection() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'high': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-black rounded-lg">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Focus Areas</h3>
            <p className="text-xs text-muted-foreground">Insights based on reviews - Priority based actions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-3 bg-blue-50/50 border border-blue-200/50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-900">Analysis Complete</span>
          </div>
          <span className="text-xs text-blue-700">Last updated: 2 hours ago</span>
        </div>
      </Card>

      {/* Priority Focus Areas */}
      <div className="space-y-3">
        {focusAreas.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white font-semibold text-sm">
                  {item.id}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{item.area}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{item.department}</span>
                    <div className="flex items-center gap-1">
                      {getUrgencyIcon(item.severity)}
                      <span className="text-xs text-muted-foreground">{item.urgency}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {item.timeline}
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Analysis:</p>
                <div className="bg-secondary/20 p-3 rounded-lg">
                  <p className="text-sm text-foreground">{item.analysis}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Solves:</p>
                <div className="bg-green-50/50 border border-green-200/50 p-3 rounded-lg">
                  <p className="text-sm text-foreground mb-1">{item.solves}</p>
                  <p className="text-xs text-green-700">{item.solvesDetail}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}