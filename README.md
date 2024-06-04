
# Happening

a social media application where you can post your events and share them with your friends.

  
#### current features:
##### User Authentication

-   Register new users

-   Login existing users

##### Event Management

-   Create new events with title, image, location, time, and creator.

-   Fetch and display a list of events

##### Frontend

-   Modal for creating events

-   Login and Register forms

##### Backend:

-   Express server

-   Prisma ORM with MySQL for database management

-   API endpoints for events and user authentication

#### next steps:

- session management

- friend management

## Tech Stack

  

-  **Frontend**: React, Vite as build tool

-  **Backend**: Express, prisma with mysql

-  **Authentication**: NextAuth.js

-  **Styling**: TailwindCSS

  

### Prerequisites

  

- Node.js

- MySQL

  

### Installation

  

1. clone repo / install dependencies

  

```bash

git clone  https://github.com/bjornarvikhagen/happening.git

cd  happening

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

cd  frontend

npm run  dev

```

  

terminal 2:

```bash

cd  api

npm run  server

```

### Open your browser and navigate to `http://localhost:3000`.
