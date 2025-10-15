import React, { useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, Star, AlertTriangle, Clock, User } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ScrollIndicator } from './ScrollIndicator';
import dashboardData from '../data/dashboardData.json';

// Extract data from JSON
const { headerData, sentimentData, trendData, metricCards, keyInsights } = dashboardData.overallSection;

export function OverallSection() {
  const scrollRef = useRef(null);
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Total Reviews Header */}
      <div className="text-center py-2">
        <p className="text-2xl font-semibold text-foreground">{headerData.totalReviews}</p>
        <p className="text-xs text-muted-foreground">{headerData.description}</p>
      </div>

      {/* Overall Performance Card with Chart */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <Star className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Overall Performance</h3>
            <span className="text-xs text-muted-foreground">Combined insights from all reviews</span>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="h-32 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#16a34a" 
                strokeWidth={2} 
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#dc2626" 
                strokeWidth={2} 
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="queries" 
                stroke="#2563eb" 
                strokeWidth={2} 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-2">
          {metricCards.map((card, index) => (
            <div key={index} className={`p-3 ${card.bgColor} rounded-lg text-center`}>
              <p className={`text-lg font-semibold ${card.textColor}`}>{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
              {card.subValue && (
                <p className={`text-xs ${card.subTextColor} font-medium mt-1`}>{card.subValue}</p>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Sentiment Breakdown */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <TrendingUp className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Sentiment Breakdown</h3>
            <span className="text-xs text-muted-foreground">Emotions behind the feedback</span>
          </div>
        </div>
        
        {/* Visual Progress Bars */}
        <div className="space-y-3">
          {sentimentData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-foreground">{item.value}%</span>
                  <p className="text-xs text-muted-foreground">{Math.round((item.value / 100) * parseInt(headerData.totalReviews))} posts</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${item.value}%`, 
                    backgroundColor: item.color 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Key Insights</h3>
            <span className="text-xs text-muted-foreground">Actionable takeaways from reviews</span>
          </div>
        </div>
        
        <div>
          <div 
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:pb-0"
          >
            {keyInsights && keyInsights.map((insight, index) => (
              <div key={index} className={`min-w-[280px] lg:min-w-0 p-3 rounded-lg border ${
                insight.type === 'positive' ? 'bg-green-50/50 border-green-200/50' :
                insight.type === 'growth' ? 'bg-blue-50/50 border-blue-200/50' :
                insight.type === 'competitive' ? 'bg-purple-50/50 border-purple-200/50' :
                'bg-red-50/50 border-red-200/50'
              }`}>
                <p className="text-sm text-foreground leading-relaxed">
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1 mt-2 lg:hidden">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full" />
          </div>
        </div>
      </Card>

      {/* Department Health */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Department Health</h3>
            <span className="text-xs text-muted-foreground">Team performance overview</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground">Operations</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Good</span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div className="w-3/4 h-1 bg-black rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground">Technology</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Need Attention</span>
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div className="w-1/2 h-1 bg-black rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground">Customer Service</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Excellent</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div className="w-5/6 h-1 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}