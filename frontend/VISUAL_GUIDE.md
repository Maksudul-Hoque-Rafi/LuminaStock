# Component Hierarchy Visual Guide

## Before Refactoring: Monolithic Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Home.jsx (260 lines)                                        │
│ ├─ Inline: MarketCard component                            │
│ ├─ Inline: Hero section JSX                                │
│ ├─ Inline: Top Gainers table                               │
│ ├─ Inline: Top Losers table                                │
│ ├─ Inline: Quick links                                     │
│ └─ Complex state and logic mixed everywhere               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Portfolio.jsx (473 lines) ← LARGEST FILE                  │
│ ├─ Inline: Summary cards                                   │
│ ├─ Inline: Growth chart with Recharts                      │
│ ├─ Inline: Allocation chart with Recharts                 │
│ ├─ Inline: Holdings table                                  │
│ ├─ Multiple state variables                               │
│ ├─ Complex calculations                                    │
│ └─ Difficult to modify any part without affecting others  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Screener.jsx (181 lines)                                   │
│ ├─ Inline: Filters JSX                                     │
│ ├─ Inline: Results table                                   │
│ ├─ Filter logic                                            │
│ └─ Hard to reuse filter component elsewhere               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ StockDetails.jsx (522 lines)                               │
│ ├─ Inline: Header section                                  │
│ ├─ Inline: Price chart                                     │
│ ├─ Inline: Description                                     │
│ ├─ Inline: Peer comparison                                 │
│ ├─ Inline: Sidebar with stats                              │
│ ├─ Inline: AI analysis                                     │
│ ├─ Inline: News section                                    │
│ └─ Mixing too many concerns in one file                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Learn.jsx (~90 lines)                                       │
│ ├─ Inline: Topics list                                     │
│ ├─ Inline: Content viewer                                  │
│ └─ Inline: Pro tip banner                                  │
└─────────────────────────────────────────────────────────────┘
```

## After Refactoring: Modular Structure

```
┌───────────────────────────────────────────────────────────────────┐
│ pages/Home.jsx (80 lines) - Clean orchestration                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────┐                                       │
│  │ HeroSection          │ (20 lines)                           │
│  │ - Banner + CTA       │                                       │
│  └──────────────────────┘                                       │
│                                                                  │
│  ┌──────────────────────┐                                       │
│  │ MarketOverview       │ (30 lines)                           │
│  │ - Index cards        │                                       │
│  └──────────────────────┘                                       │
│                                                                  │
│  ┌──────────────────────┐        ┌──────────────────────┐      │
│  │ StockTable           │        │ StockTable           │      │
│  │ (Gainers)            │        │ (Losers)             │      │
│  │ - 40 lines (reused)  │        │ - 40 lines (reused)  │      │
│  └──────────────────────┘        └──────────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐           │
│  │ QuickLinks                    │ (25 lines)       │           │
│  │ - 3 navigation cards          │                  │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
└───────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│ pages/Portfolio.jsx (120 lines) - Clean orchestration            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ SummaryCards (40 lines)                               │    │
│  │ ├─ Net Worth card                                     │    │
│  │ ├─ Cash Balance card                                  │    │
│  │ └─ Profit/Loss card                                   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────┐  ┌────────────────────────────┐   │
│  │ GrowthChart (40 lines) │  │ AllocationChart (55 lines) │   │
│  │ - 30-day line chart    │  │ - Pie chart with legend    │   │
│  └────────────────────────┘  └────────────────────────────┘   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ HoldingsTable (75 lines)                              │    │
│  │ ├─ Symbol column                                      │    │
│  │ ├─ Qty & Price columns                                │    │
│  │ └─ Action buttons                                     │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└───────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│ pages/Screener.jsx (60 lines) - Clean orchestration             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────┐                                      │
│  │ ScreenerHeader       │ (15 lines)                          │
│  │ - Title & Subtitle   │                                      │
│  └──────────────────────┘                                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ FilterBar (60 lines)                                  │    │
│  │ ├─ Search input                                       │    │
│  │ ├─ Sector dropdown                                    │    │
│  │ └─ Price range dropdown                               │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ StocksTable (70 lines)                                │    │
│  │ ├─ Header row                                         │    │
│  │ ├─ Data rows                                          │    │
│  │ └─ Empty state                                        │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└───────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│ pages/StockDetails.jsx (130 lines) - Main orchestrator          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ StockHeader (40 lines) - Top section                  │   │
│  │ ├─ Symbol & name                                      │   │
│  │ ├─ Current price                                      │   │
│  │ ├─ Watchlist button                                   │   │
│  │ └─ Buy/Sell button                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────┐  ┌──────────────────────┐   │
│  │ LEFT COLUMN (Main Content)   │  │ RIGHT COLUMN (Stats) │   │
│  │                              │  │                      │   │
│  │ ┌────────────────────────┐  │  │ ┌────────────────┐  │   │
│  │ │ PriceChart (50 lines)  │  │  │ │ StockStats    │  │   │
│  │ │ - Area chart           │  │  │ │ (45 lines)    │  │   │
│  │ └────────────────────────┘  │  │ ├─ Key metrics │  │   │
│  │                              │  │ ├─ Your position   │  │   │
│  │ ┌────────────────────────┐  │  │ └─ Holdings    │  │   │
│  │ │ AboutSection (15 lines)│  │  │ └────────────────┘  │   │
│  │ │ - Description text     │  │  │                      │   │
│  │ └────────────────────────┘  │  │ ┌────────────────┐  │   │
│  │                              │  │ │ AIAnalysis    │  │   │
│  │ ┌────────────────────────┐  │  │ │ (40 lines)    │  │   │
│  │ │ PeerComparison         │  │  │ ├─ Generate btn│  │   │
│  │ │ (45 lines)             │  │  │ ├─ Results     │  │   │
│  │ │ - Competitor table     │  │  │ └─ Loading     │  │   │
│  │ └────────────────────────┘  │  │ └────────────────┘  │   │
│  │                              │  │                      │   │
│  │                              │  │ ┌────────────────┐  │   │
│  │                              │  │ │ NewsSection   │  │   │
│  │                              │  │ │ (40 lines)    │  │   │
│  │                              │  │ ├─ News list   │  │   │
│  │                              │  │ ├─ Source/time │  │   │
│  │                              │  │ └─ Links       │  │   │
│  │                              │  │ └────────────────┘  │   │
│  └──────────────────────────────┘  └──────────────────────┘   │
│                                                                  │
└───────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│ pages/Learn.jsx (50 lines) - Clean orchestration               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────┐  ┌────────────────────┐   │
│  │ LEFT: Topics                    │  │ RIGHT: Content     │   │
│  │                                │  │                    │   │
│  │ ┌──────────────────────────┐  │  │ ┌────────────────┐ │   │
│  │ │ TopicsList (40 lines)   │  │  │ │ContentViewer  │ │   │
│  │ ├─ Topic cards            │  │  │ │(50 lines)     │ │   │
│  │ ├─ Click handlers         │  │  │ ├─ Title       │ │   │
│  │ └─ List layout            │  │  │ ├─ Content     │ │   │
│  │                            │  │  │ ├─ Loading    │ │   │
│  │ ┌──────────────────────────┐  │  │ └─ Empty state│ │   │
│  │ │ ProTip (20 lines)        │  │  │ └────────────────┘ │   │
│  │ ├─ Icon                    │  │  │                    │   │
│  │ ├─ Tip title              │  │  │                    │   │
│  │ └─ Tip content             │  │  │                    │   │
│  └──────────────────────────────┘  └────────────────────┘   │
│                                                                  │
└───────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Home Page Data Flow

```
pages/Home.jsx
│
├─→ topGainers (sorted state)  ─→ StockTable (props: stocks)
├─→ topLosers (sorted state)   ─→ StockTable (props: stocks)
├─→ (no state)                 ─→ HeroSection (static)
├─→ (no state)                 ─→ MarketOverview (mock data)
└─→ (no state)                 ─→ QuickLinks (static)
```

### Portfolio Page Data Flow

```
pages/Portfolio.jsx (Main Logic)
│
├─ State: holdings, prices, cash, growth, pieData
│
├─→ totalAccountValue ──→ SummaryCards
├─→ cashBalance ────────→ SummaryCards
├─→ totalReturn ───────→ SummaryCards
│
├─→ growthData ────────→ GrowthChart
├─→ pieData ───────────→ AllocationChart
│
├─→ holdings ──────────→ HoldingsTable
├─→ prices ────────────→ HoldingsTable
│
└─→ Callbacks (openTradeModal, removeHolding) ──→ HoldingsTable
```

### Stock Details Data Flow

```
pages/StockDetails.jsx (Orchestrator)
│
├─ Fetch: stock data, news, analysis
├─ State: inWatchlist, chartData, aiAnalysis, stockNews
│
├─→ stock ──────────────→ StockHeader
├─→ inWatchlist ────────→ StockHeader
│
├─→ chartData ──────────→ PriceChart
├─→ isPositive ────────→ PriceChart
│
├─→ stock ──────────────→ AboutSection
├─→ peerStocks ────────→ PeerComparison
│
├─→ stock ──────────────→ StockStats
├─→ currentHolding ────→ StockStats
│
├─→ aiAnalysis ────────→ AIAnalysis
├─→ loadingAnalysis ───→ AIAnalysis
│
└─→ stockNews ─────────→ NewsSection
    loadingNews ─────→ NewsSection
```

## Benefit Visualization

### Code Complexity Reduction

```
BEFORE (Monolithic):
┌─────────────────────────────────────────┐
│ High cognitive load                     │
│ Complex state management               │
│ Multiple concerns in one file          │
│ Difficult to understand               │
│ Hard to test                           │
│ Easy to introduce bugs                 │
│ Longer development cycles              │
└─────────────────────────────────────────┘

AFTER (Modular):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Low load     │  │ Clear purpose │  │ Easy to test │
│ per file     │  │ per component │  │ and debug    │
├──────────────┤  ├──────────────┤  ├──────────────┤
│ 50-80 lines  │  │ Single resp.  │  │ Fast updates │
│ per component│  │ per component │  │ Fewer bugs   │
└──────────────┘  └──────────────┘  └──────────────┘
```

## Component Size Comparison

```
BEFORE:
────────────────────────────────────────── 522 lines (StockDetails)
─────────────────────────────────────── 473 lines (Portfolio)
───────────────────────── 260 lines (Home)
──────────────────── 181 lines (Screener)
────── 90 lines (Learn)

AFTER (Components are much smaller):
─────────────── 75 lines (largest component)
─────────────── 75 lines
──────────── 70 lines
──────────── 60 lines
──────────── 55 lines
────────── 50 lines
────────── 50 lines
── 40 lines (smallest)
```

**Result: Better balance, easier to manage, focused responsibility! ✨**
