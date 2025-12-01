export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  peRatio: number;
  sector: string;
  description?: string;
  high52: number;
  low52: number;
}

export interface PortfolioItem {
  symbol: string;
  quantity: number;
  avgBuyPrice: number;
}

export interface WatchlistItem {
  symbol: string;
}

export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  time: string;
  url?: string;
}

export enum TimeRange {
  '1D' = '1D',
  '1W' = '1W',
  '1M' = '1M',
  '1Y' = '1Y',
  'ALL' = 'ALL'
}
