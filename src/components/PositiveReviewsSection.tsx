import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ThumbsUp, TrendingUp, Star, BarChart, MessageSquare } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import dashboardData from '../data/dashboardData.json';
import { Praise } from '../types/dashboard';

// Extract data from JSON
const { positiveKeywords, recentPraises, positiveFeedbackCategories, positiveReviewMetrics } = dashboardData.positiveReviewsSection;

export function PositiveReviewsSection() {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header Section */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="font-semibold text-foreground">Positive Reviews</h3>
        </div>
        <span className="text-sm text-muted-foreground mb-4 block">{dashboardData.overallSection.metricCards[1].subValue} • {dashboardData.overallSection.metricCards[1].value} of total</span>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Avg Driver Rating</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{positiveReviewMetrics?.avgDriverRating || '4.7'}</p>
            <p className="text-xs text-green-600">+{Math.round((positiveReviewMetrics?.avgDriverRating || 4.7) - 4.5) * 10} / 10 vs baseline</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Avg Wait Time</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{positiveReviewMetrics?.avgWaitTime || '3.2'}min</p>
            <p className="text-xs text-green-600">-{Math.round((5 - (positiveReviewMetrics?.avgWaitTime || 3.2)) * 10) / 10}min vs target</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ThumbsUp className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-muted-foreground">Vehicle Praise</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{positiveReviewMetrics?.vehiclePraise || '78'}%</p>
            <p className="text-xs text-green-600">+{Math.round((positiveReviewMetrics?.vehiclePraise || 78) - 60)}% vs baseline</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-indigo-500" />
              <span className="text-xs text-muted-foreground">App UX Wins</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{positiveReviewMetrics?.appUXWins || '68'}%</p>
            <p className="text-xs text-green-600">+{Math.round((positiveReviewMetrics?.appUXWins || 68) - 50)}% vs baseline</p>
          </div>
        </div>
      </Card>

      {/* Positive Feedback by Categories */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <TrendingUp className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Positive Feedback by Categories</h3>
            <span className="text-xs text-muted-foreground">Top strengths from positive feedback</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {positiveFeedbackCategories && positiveFeedbackCategories.map((category, index) => (
            <div key={index} className="p-3 bg-green-50/50 border border-green-200/50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-foreground">{category.name}</span>
                <span className="text-sm font-medium text-green-600">{category.percentage}%</span>
              </div>
              <p className="text-xs text-muted-foreground">{category.count} mentions</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Positive Keywords */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <MessageSquare className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Top Positive Keywords</h3>
            <span className="text-xs text-muted-foreground">Most mentioned positive terms</span>
          </div>
        </div>
        
        {/* Keywords Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {positiveKeywords.map((keyword, index) => (
            <div key={index} className={`px-3 py-2 rounded-lg ${keyword.color} text-center`}>
              <span className="font-medium">{keyword.word}</span>
              <span className="ml-1 opacity-75">({keyword.count})</span>
            </div>
          ))}
        </div>

        {/* Keyword Summary */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground">{positiveKeywords.length}</p>
            <p className="text-xs text-muted-foreground">Top Keywords</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground">{positiveKeywords.reduce((sum, keyword) => sum + keyword.count, 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Mentions</p>
          </div>
        </div>
      </Card>

      {/* Recent Praises */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <ThumbsUp className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Recent Praises</h3>
            <span className="text-xs text-muted-foreground">Latest positive feedback</span>
          </div>
        </div>

        <div className="space-y-3">
          {(recentPraises as Praise[]).map((praise, index) => (
            <div key={index} className="p-3 bg-green-50/50 border border-green-200/50 rounded-lg">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm text-foreground pr-2">{praise.praise}</p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {[...Array(praise.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{praise.time}</p>
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
          <div>
            <h3 className="font-semibold text-foreground">Reviews by Socials</h3>
            <span className="text-xs text-muted-foreground">Positive reviews from social platforms</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">Twitter</span>
              <span className="text-sm font-medium text-foreground">1,234 reviews</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-3/5 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">Facebook</span>
              <span className="text-sm font-medium text-foreground">987 reviews</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-1/2 h-2 bg-blue-700 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">Google Reviews</span>
              <span className="text-sm font-medium text-foreground">756 reviews</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="w-2/5 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">App Store</span>
              <span className="text-sm font-medium text-foreground">543 reviews</span>
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