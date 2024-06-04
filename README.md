# Happening
a social media application where you can post your events and share them with your friends. long live spontaneity
next steps:
- session management
- friend management
## Tech Stack

- **Frontend**: React, Vite as build tool
- **Backend**: Express, prisma with mysql
- **Authentication**: NextAuth.js
- **Styling**: TailwindCSS

### Prerequisites

- Node.js
- MySQL

### Installation

1. clone repo / install dependencies

```bash
git clone https://github.com/bjornarvikhagen/happening.git
cd happening
npm install
```

2. Set up the database:
- Create a `.env` file in the root directory and add your database URL:
DATABASE_URL="mysql://user:password@localhost:3306/database"
- Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

terminal 1:
```bash
cd frontend
npm run dev
```

terminal 2:
```bash
cd api
npm run server
```
4. Open your browser and navigate to `http://localhost:3000`.
