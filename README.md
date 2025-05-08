# Weather Forecast Web Application

A modern, responsive weather forecast application built with Next.js and TypeScript. This application allows users to search for cities worldwide and view detailed weather information.

## Features

- **City Search**: Find cities from around the world
- **Current Weather**: View real-time weather conditions
- **5-Day Forecast**: See upcoming weather predictions
- **Weather Details**: Explore detailed weather metrics (temperature, humidity, wind, etc.)
- **Unit Toggling**: Switch between Celsius/Fahrenheit and metric/imperial units
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark/Light Mode**: Choose your preferred theme
- **Caching Layer**: PostgreSQL database for improved performance

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **APIs**: OpenDataSoft for city data, OpenWeatherMap for weather data
- **State Management**: React Query
- **Routing**: Wouter
- **Styling**: TailwindCSS with a custom theme

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL database
- OpenWeatherMap API key

### Environment Variables

Create a `.env` file in the root directory and add:

```
DATABASE_URL=your_postgresql_connection_string
OPENWEATHERMAP_API_KEY=your_api_key
```

### Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/weather-forecast-app.git
cd weather-forecast-app
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
npm run db:push
```

4. Start the development server
```bash
npm run dev
```

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fweather-forecast-app)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/weather-forecast-app)

## Issue 

- The Postgres database in render is having few issues right now so the leads may not be visible. If so this is how the leads section appears for clarification:

![image](https://github.com/user-attachments/assets/687ca3b6-7dea-43d7-8dab-c4d710894bad)


## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- City data provided by [OpenDataSoft](https://public.opendatasoft.com/)
- Icons from [Lucide React](https://lucide.dev/)

## License

MIT
