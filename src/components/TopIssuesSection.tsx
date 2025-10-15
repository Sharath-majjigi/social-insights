import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AlertTriangle, Settings, Users, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import dashboardData from '../data/dashboardData.json';

// Extract data from JSON
const { departmentData, trendData } = dashboardData.topIssuesSection;

export function TopIssuesSection() {
  const [expandedDepartment, setExpandedDepartment] = useState<string | null>(null);

  const toggleDepartment = (deptId: string) => {
    setExpandedDepartment(expandedDepartment === deptId ? null : deptId);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Issue Resolution Summary - MOVED TO TOP */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Issue Resolution Summary</h3>
            <span className="text-xs text-muted-foreground">Priority actions needed</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-red-600">89</p>
            <p className="text-xs text-muted-foreground">High Priority</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-yellow-600">67</p>
            <p className="text-xs text-muted-foreground">Medium Priority</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-green-600">12</p>
            <p className="text-xs text-muted-foreground">Low Priority</p>
          </div>
        </div>
      </Card>

      {/* Header - MOVED TO SECOND POSITION */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Top Issues by Department</h3>
            <span className="text-xs text-muted-foreground">Drill-down analysis</span>
          </div>
        </div>
      </Card>

      {/* Department Cards */}
      <div className="space-y-3">
        {departmentData.map((dept) => (
          <Card key={dept.id} className="overflow-hidden">
            <div 
              className="p-4 cursor-pointer"
              onClick={() => toggleDepartment(dept.id)}
            >
              {/* Department Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${dept.bgColor} ${dept.borderColor} border rounded-lg flex items-center justify-center`}>
                    <dept.icon className={`w-4 h-4 text-${dept.color}-600`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{dept.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-semibold text-${dept.color}-600`}>
                        {dept.percentage}%
                      </span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 text-${dept.color}-600`} />
                        <span className={`text-xs text-${dept.color}-600`}>{dept.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedDepartment === dept.id ? 'rotate-180' : ''}`} />
              </div>

              {/* Trend Line */}
              <div className="h-8 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={dept.color === 'red' ? '#dc2626' : dept.color === 'orange' ? '#ea580c' : '#eab308'} 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Issues List */}
              <div className="space-y-2">
                {dept.issues.slice(0, 4).map((issue, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 bg-${dept.color}-500 rounded-full`}></div>
                      <span className="text-sm text-foreground">{issue.name}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{issue.count}</span>
                  </div>
                ))}
              </div>

              {/* Tap for detailed breakdown */}
              <div className="mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Tap for detailed breakdown →</span>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedDepartment === dept.id && (
              <div className="border-t border-border bg-secondary/20">
                <div className="p-4">
                  <h5 className="font-semibold text-foreground mb-3">{dept.name} - Detailed Breakdown</h5>
                  <div className="space-y-3">
                    {dept.issues.map((issue, index) => (
                      <div key={index} className="p-3 bg-background rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 bg-${dept.color}-500 rounded-full`}></div>
                            <span className="font-medium text-foreground">{issue.name}</span>
                          </div>
                          <Badge className={`text-xs px-2 py-1 ${getUrgencyColor(issue.urgency)}`}>
                            {issue.count} cases
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Urgency</span>
                          <span className="text-xs font-medium text-foreground">{issue.urgency}</span>
                        </div>
                        
                        <div className="w-full bg-muted rounded-full h-1 mb-2">
                          <div 
                            className={`h-1 bg-${issue.urgency === 'High' ? 'red' : issue.urgency === 'Medium' ? 'yellow' : 'green'}-500 rounded-full`}
                            style={{ 
                              width: issue.urgency === 'High' ? '80%' : issue.urgency === 'Medium' ? '60%' : '30%' 
                            }}
                          />
                        </div>
                        
                        <p className="text-xs text-muted-foreground">{issue.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}