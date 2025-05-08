
# IntelliClick CRM - Redesigned Dashboard

A modern, responsive CRM dashboard focusing on lead management and user experience. This project is a redesign of the IntelliClick CRM interface based on heuristic evaluation and user flow optimization.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Improved lead management with visual status indicators
- Enhanced search and filtering capabilities
- Intuitive navigation and information hierarchy
- Database integration for persistent data storage

## Tech Stack

- React.js with TypeScript
- Wouter for routing
- TailwindCSS for styling
- Drizzle ORM with PostgreSQL
- Express.js backend

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/intelliclick-crm.git
cd intelliclick-crm
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory and add:
```
DATABASE_URL=postgres://username:password@localhost:5432/your_database
```

4. Push the database schema
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

## Deployment to Render

This project can be easily deployed on Render:

1. Push the project to GitHub
2. In Render, create a new Web Service
3. Connect to your GitHub repository
4. Use the following build settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add the `DATABASE_URL` environment variable pointing to your PostgreSQL database


## Issue 

- The Postgres database in render is having few issues right now so the leads may not be visible. If so this is how the leads section appears for clarification:

![image](https://github.com/user-attachments/assets/687ca3b6-7dea-43d7-8dab-c4d710894bad)



## Documentation

The project includes several documentation files:

- `CRM_Heuristic_Evaluation_Report.md` - Evaluation of the original UI based on Nielsen's heuristics
- `CRM_Design_Justification_and_User_Flow.md` - Explanation of design decisions and user flows
- `CRM_Redesign_Wireframes_Documentation.md` - Details about the wireframes and design elements

## Author

Developed by Shashank M Y

## License

This project is licensed under the MIT License - see the LICENSE file for details
