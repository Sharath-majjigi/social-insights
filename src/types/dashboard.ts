// TypeScript interfaces for dashboard data

export interface Complaint {
  issue: string;
  severity: 'high' | 'medium' | 'low';
}

export interface Praise {
  time: any;
  praise: string;
  rating: number;
}

export interface Keyword {
  word: string;
  count: number;
  color: string;
}

export interface MetricCard {
  title: string;
  value: string;
  bgColor: string;
  textColor: string;
  description: string;
  subValue?: string;
  subTextColor?: string;
}

export interface SentimentData {
  name: string;
  value: number;
  color: string;
}

export interface TrendData {
  day: string;
  positive: number;
  negative: number;
  queries: number;
}

export interface HeaderData {
  totalReviews: string;
  description: string;
}

export interface OverallSection {
  headerData: HeaderData;
  sentimentData: SentimentData[];
  trendData: TrendData[];
  metricCards: MetricCard[];
}

export interface OverviewSection {
  positiveData: { value: number }[];
  negativeData: { value: number }[];
  queriesData: { value: number }[];
}

export interface NegativeReviewsSection {
  negativeKeywords: Keyword[];
  recentComplaints: Complaint[];
}

export interface PositiveReviewsSection {
  positiveKeywords: Keyword[];
  recentPraises: Praise[];
}

export interface QueryType {
  name: string;
  value: number;
  color: string;
  count: number;
}

export interface QueriesSection {
  queryTypes: QueryType[];
  topQuestions: string[];
}

export interface FocusArea {
  id: string;
  area: string;
  urgency: string;
  impact: string;
  analysis: string;
  solves: string;
  solvesDetail: string;
  timeline: string;
  department: string;
  severity: string;
}

export interface ActionsSection {
  focusAreas: FocusArea[];
}

export interface Issue {
  name: string;
  count: number;
  urgency: string;
  action: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  percentage: number;
  trend: string;
  trendDirection: string;
  color: string;
  bgColor: string;
  borderColor: string;
  issues: Issue[];
}

export interface TopIssuesSection {
  departmentData: Department[];
  trendData: { value: number }[];
}

export interface Tab {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface Tabs {
  tabs: Tab[];
}

export interface TimePeriod {
  id: string;
  label: string;
  shortLabel: string;
}

export interface TimePeriodSelector {
  timePeriods: TimePeriod[];
}

export interface DashboardData {
  overallSection: OverallSection;
  overviewSection: OverviewSection;
  negativeReviewsSection: NegativeReviewsSection;
  positiveReviewsSection: PositiveReviewsSection;
  queriesSection: QueriesSection;
  actionsSection: ActionsSection;
  topIssuesSection: TopIssuesSection;
  tabs: Tabs;
  timePeriodSelector: TimePeriodSelector;
}
