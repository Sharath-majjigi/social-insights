import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { MessageSquare, TrendingUp, TrendingDown, Star, Calendar, Filter, HelpCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import dashboardData from '../data/dashboardData.json';

// Extract data from JSON
const { queryTypes, topQuestions } = dashboardData.queriesSection;

export function QueriesSection() {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Query Types Chart */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-black rounded-lg">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Query Types</h3>
            <p className="text-xs text-muted-foreground">Distribution of customer inquiries</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
          {/* Pie Chart */}
          <div className="h-48 lg:h-40 lg:w-40 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={queryTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {queryTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2">
            {queryTypes.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Query Breakdown Cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {queryTypes.map((item, index) => (
            <div key={index} className="p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">{item.name} Queries</span>
              </div>
              <p className="text-xl font-semibold text-foreground">{item.count}</p>
              <div className="w-full bg-muted rounded-full h-1 mt-2">
                <div 
                  className="h-1 rounded-full"
                  style={{ 
                    width: `${item.value}%`, 
                    backgroundColor: item.color 
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{item.value}%</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Top 5 Questions */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-black rounded-lg">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Top 5 Questions</h3>
            <p className="text-xs text-muted-foreground">Most frequently asked questions</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {topQuestions.map((question, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
              <Badge variant="secondary" className="text-xs font-normal min-w-6 h-6 flex items-center justify-center">
                {index + 1}
              </Badge>
              <p className="text-sm text-foreground">{question}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Queries by Socials */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-black rounded-lg">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Queries by Socials</h3>
            <p className="text-xs text-muted-foreground">Social media platform breakdown</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">Twitter</span>
              <span className="text-sm font-medium text-foreground">156 queries</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-3/5 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">Reddit</span>
              <span className="text-sm font-medium text-foreground">89 queries</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-2/5 h-2 bg-orange-500 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">LinkedIn</span>
              <span className="text-sm font-medium text-foreground">43 queries</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-1/5 h-2 bg-blue-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}