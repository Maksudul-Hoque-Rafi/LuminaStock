# LuminaStock

A modern, full-stack stock trading and portfolio management application built with the PERN stack. LuminaStock provides users with real-time stock data, portfolio tracking, AI-powered analysis, and educational resources to make informed investment decisions.

## 🚀 Features

- **Real-time Stock Data**: Live market data powered by Finnhub API
- **Portfolio Management**: Track your investments, view performance charts, and manage holdings
- **Stock Screener**: Filter and discover stocks based on various criteria
- **AI-Powered Analysis**: Get insights and analysis using Google Gemini AI
- **Watchlist**: Save and monitor your favorite stocks
- **Learning Resources**: Educational content to improve your trading knowledge
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Secure Authentication**: JWT-based user authentication with bcrypt password hashing

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Chart library for data visualization
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma** - Next-generation ORM for database management
- **PostgreSQL** - Robust relational database (Neon)
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Finnhub API** - Real-time stock market data
- **Google Gemini AI** - AI-powered stock analysis

### DevOps & Deployment

- **Docker** - Container platform for application deployment
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
LuminaStock/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── generated/       # Generated Prisma files
│   ├── lib/             # Utility functions
│   ├── prisma/          # Database schema and migrations
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   ├── app.js           # Main application file
│   ├── package.json     # Backend dependencies
│   ├── Dockerfile       # Docker configuration for backend
│   └── .dockerignore    # Docker ignore rules
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── services/    # API service functions
│   ├── package.json     # Frontend dependencies
│   ├── Dockerfile       # Docker configuration for frontend
│   ├── .dockerignore    # Docker ignore rules
│   └── vite.config.js   # Vite configuration
├── docker-compose.yml   # Docker Compose orchestration
└── README.md            # Project documentation
```

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: User accounts with authentication and portfolio data
- **PortfolioItem**: User's stock holdings with quantity and average buy price
- **WatchlistItem**: User's saved stocks for monitoring

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher) - for local development
- Docker & Docker Compose - for containerized deployment
- Neon PostgreSQL database account
- Finnhub API key
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with:

   ```env
   PORT=8000
   CLIENT_URL=http://localhost:3000
   DATABASE_URL="postgresql://username:password@localhost:5432/luminastock"
   JWT_SECRET="your-jwt-secret-key"
   FINNHUB_API_KEY="your-finnhub-api-key"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the frontend directory with:

   ```env
   VITE_API_BASE_URL="http://localhost:8000"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🐳 Docker Setup

To run the application using Docker and Docker Compose:

### Prerequisites

- Docker and Docker Compose installed
- Neon PostgreSQL database connection string
- API keys for Finnhub and Google Gemini

### Steps

1. Create a `.env` file in the `backend` directory with your backend environment variables:

   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   PORT=8000
   CLIENT_URL=http://localhost:3000
   JWT_SECRET="your-jwt-secret-key"
   FINNHUB_API_KEY="your-finnhub-api-key"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

2. Create a `.env` file in the `frontend` directory with your frontend environment variables:

   ```env
   VITE_API_BASE_URL="http://localhost:8000"
   ```

3. Build and start the services:

   ```bash
   docker-compose up --build
   ```

4. Access the application:

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

5. Stop the services:

   ```bash
   docker-compose down
   ```

## 🚀 Usage

1. Register a new account or login with existing credentials
2. View market overview and top gainers/losers on the home page
3. Use the stock screener to filter and discover new stocks
4. Add stocks to your watchlist for easy monitoring
5. Buy and sell stocks through the portfolio section
6. View detailed stock information with AI-powered analysis
7. Track your portfolio performance with interactive charts
8. Learn about investing through the educational content

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Stocks

- `GET /api/stocks` - Get list of all available stocks
- `GET /api/stocks/history/:symbol` - Get price history for a specific stock

### Stock Actions

- `POST /api/stock-action/watchlist` - Add/remove stock from user watchlist
- `POST /api/stock-action/trade` - Execute buy/sell trade for stocks

### AI Analysis

- `POST /api/gemini-ai/stock-analysis` - Get AI analysis for a stock
- `POST /api/gemini-ai/learning-content` - Get educational content
- `GET /api/gemini-ai/market-news` - Get market news
- `POST /api/gemini-ai/stock-news` - Get news for a specific stock

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Finnhub](https://finnhub.io/) for stock market data
- [Google Gemini](https://ai.google.dev/) for AI analysis
- [Prisma](https://www.prisma.io/) for database ORM
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for data visualization
