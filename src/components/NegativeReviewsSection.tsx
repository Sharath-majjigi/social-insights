import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingDown, AlertTriangle, ThumbsDown, Star, BarChart, MessageSquare } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import dashboardData from '../data/dashboardData.json';
import { Complaint } from '../types/dashboard';

// Extract data from JSON
const { negativeKeywords, recentComplaints, negativeReviewMetrics, negativeProblemAreas } = dashboardData.negativeReviewsSection;

export function NegativeReviewsSection() {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header Section */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <h3 className="font-semibold text-foreground">Negative Reviews</h3>
        </div>
        <span className="text-sm text-muted-foreground mb-4 block">{dashboardData.overallSection.metricCards[2].subValue} • {dashboardData.overallSection.metricCards[2].value} of total</span>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Avg Driver Rating</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">2.1</p>
            <p className="text-xs text-red-600">-0.3 vs target</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-muted-foreground">Avg Wait Time</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">8.5min</p>
            <p className="text-xs text-red-600">+2.3min vs target</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ThumbsDown className="w-4 h-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Payment Issues</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">35%</p>
            <p className="text-xs text-red-600">+5% vs last month</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-muted-foreground">App Crashes</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">22%</p>
            <p className="text-xs text-red-600">+3% vs last month</p>
          </div>
        </div>
      </Card>

      {/* Problem Areas in Negative - MOVED UP */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <TrendingDown className="w-3 h-3 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Problem Areas in Negative</h3>
          <span className="text-xs text-muted-foreground">Top issues from negative feedback</span>
        </div>
        
        <div className="space-y-3">
          {negativeProblemAreas && negativeProblemAreas.map((area, index) => (
            <div key={index} className="p-3 bg-red-50/50 border border-red-200/50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-foreground">{area.name}</span>
                <span className="text-sm font-medium text-red-600">{area.percentage}%</span>
              </div>
              <p className="text-xs text-muted-foreground">{area.count} complaints</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Negative Keywords - MOVED DOWN */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <MessageSquare className="w-3 h-3 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Top Negative Keywords</h3>
          <span className="text-xs text-muted-foreground">Most mentioned negative terms</span>
        </div>
        
        {/* Keywords Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {negativeKeywords.map((keyword, index) => (
            <div key={index} className={`px-3 py-2 rounded-lg ${keyword.color} text-center`}>
              <span className="font-medium">{keyword.word}</span>
              <span className="ml-1 opacity-75">({keyword.count})</span>
            </div>
          ))}
        </div>

        {/* Keyword Summary */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground">{negativeKeywords.length}</p>
            <p className="text-xs text-muted-foreground">Top Keywords</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground">{negativeKeywords.reduce((sum, keyword) => sum + keyword.count, 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Mentions</p>
          </div>
        </div>
      </Card>

      {/* Recent Complaints */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-3 h-3 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Recent Complaints</h3>
          <span className="text-xs text-muted-foreground">Latest negative feedback</span>
        </div>

        <div className="space-y-3">
          {(recentComplaints as Complaint[]).map((complaint, index) => (
            <div key={index} className="p-3 bg-red-50/50 border border-red-200/50 rounded-lg">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm text-foreground pr-2">{complaint.issue}</p>
                <Badge 
                  variant={complaint.severity === 'high' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {complaint.severity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reviews by Socials */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <Star className="w-3 h-3 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Reviews by Socials</h3>
          <span className="text-xs text-muted-foreground">Negative reviews from social platforms</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">Twitter</span>
              <span className="text-sm font-medium text-foreground">234 reviews</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-3/5 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">Facebook</span>
              <span className="text-sm font-medium text-foreground">189 reviews</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-1/2 h-2 bg-blue-700 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">Google Reviews</span>
              <span className="text-sm font-medium text-foreground">156 reviews</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-2/5 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">App Store</span>
              <span className="text-sm font-medium text-foreground">111 reviews</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-1/3 h-2 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}