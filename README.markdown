# Weather API

A robust backend project built for the Software Engineer Case Study. This API fetches weather data using the [OpenWeather API](https://openweathermap.org/) and implements a caching mechanism with Redis. It features role-based access control (RBAC) with two roles:

- **Admin**: Can manage users and view all weather queries.
- **User**: Can only view their own weather queries.

---

## ✨ Features

- **Role-Based Access Control**: Secure access to endpoints based on user roles (Admin/User).
- **Weather Data Fetching**: Real-time weather data from OpenWeather API.
- **Caching**: Redis caching for weather data to reduce API calls and improve performance.
- **Database**: PostgreSQL with Prisma ORM for efficient data management.
- **Scalable Architecture**: Built with Clean Architecture for modularity and scalability.
- **Error Handling & Logging**: Comprehensive error handling and request logging.
- **Optimized Queries**: Indexes on key fields for faster database lookups.

---

## 🛠️ Technologies Used

- **TypeScript**: For type safety and enhanced developer experience.
- **Express.js**: For building a RESTful API.
- **Node.js**: Server-side JavaScript runtime.
- **PostgreSQL**: Relational database for persistent storage.
- **Redis**: In-memory caching for weather data.
- **Prisma ORM**: For database interactions and migrations.
- **Docker**: For running PostgreSQL and Redis containers in development.
- **JWT**: For secure authentication.
- **Jest**: For unit testing.
- **Postman/Swagger**: For API documentation.

---

## 📋 Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (for running PostgreSQL and Redis containers)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (or use Docker)
- [Redis](https://redis.io/download/) (or use Docker)

---

## 🚀 Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-api.git
cd weather-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root and add the following:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
DATABASE_URL=postgresql://username:password@localhost:5432/weatherdb
REDIS_URL=redis://localhost:6379
```

Replace `your_openweather_api_key`, `username`, and `password` with your actual credentials.

### 4. Run PostgreSQL and Redis with Docker

Run the following commands to start PostgreSQL and Redis containers:

```bash
# Run PostgreSQL
docker run --name weather-db -e POSTGRES_PASSWORD=yourpassword -d -p 5432:5432 postgres:latest

# Run Redis
docker run --name redis-cache -d -p 6379:6379 redis:latest
```

### 5. Run Database Migrations

Set up the database schema using Prisma migrations:

```bash
npx prisma migrate dev --name init
```

### 6. Start the Application

Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

---

## 🗄️ Database Schema

The database schema is designed for efficiency and scalability:

### `User` Model
Stores user information:
- `id`: UUID (primary key)
- `name`: String
- `email`: String (unique)
- `password`: String (hashed)
- `role`: Enum (`Admin` or `User`)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `weatherQueries`: Relation to `WeatherQuery`

### `WeatherQuery` Model
Stores weather data:
- `id`: UUID (primary key)
- `userId`: String (foreign key to `User`)
- `city`: String
- `temperature`: Float
- `humidity`: Integer
- `pressure`: Integer
- `description`: String
- `icon`: String
- `createdAt`: DateTime
- `user`: Relation to `User`

**Indexes**:
- Composite index on `userId` and `city` for optimized query performance.

### Prisma Schema Example

```prisma
model User {
  id        String      @id @default(uuid())
  name      String
  email     String      @unique
  password  String
  role      Role
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  weatherQueries WeatherQuery[]
  @@index([id])
}

model WeatherQuery {
  id          String   @id @default(uuid())
  userId      String
  city        String
  temperature Float
  humidity    Int
  pressure    Int
  description String
  icon        String
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
  @@index([userId, city])
}
```

---

## 🏗️ System Architecture

The project follows **Clean Architecture (Onion Architecture)** for modularity and scalability:

- **Controller Layer**: Handles HTTP requests and responses.
- **Service Layer**: Contains business logic.
- **Repository Layer**: Manages database interactions.
- **External API Integration**: Fetches weather data from OpenWeather API.
- **Caching Layer**: Uses Redis to cache weather data for 1 hour.

---

## 🌐 API Endpoints

### Authentication
- **`POST /auth/login`**: Log in with credentials to receive a JWT token.
- **`POST /auth/register`**:  A user can register themselves, but they cannot choose a role; they will be registered with the default role of "User".
  
**If you want to be an Admin, you must manually update your role to "Admin" in the database. This feature is not implemented as there was no request for it, but it can be developed in the future.**

### User Routes
- **`GET /user`**: List all users (Admin only).
- **`POST /user`**: Create a new user (Admin only).
- **`PUT /user/:id`**: Update user details (Admin only).
- **`DELETE /user/:id`**: Delete a user (Admin only).
- **`GET /user/me`**: Get details of the logged-in user.

### Weather Routes
- **`GET /weather`**: Fetch weather data by city (checks Redis cache first).
- **`GET /weather/queries`**: List weather queries for the logged-in user.
- **`GET /weather/queries/all`**: List all weather queries (Admin only).

---

## 🔒 Role-Based Access Control

- **Admin**: Full access to user management and all weather queries.
- **User**: Access to their own weather queries only.

---

## ⚡ Caching with Redis

- Weather data is cached in Redis for **1 hour**.
- Cache key: Combination of `city` and `userId`.
- If cached data exists, it’s served from Redis. Otherwise, data is fetched from OpenWeather API and stored in both Redis and PostgreSQL.

---

## 🚨 Error Handling

- **Error Handling**: Custom error messages with appropriate HTTP status codes.

---

## ⚙️ Database & Query Optimization

- **Indexes**: On `userId` and `city` in the `WeatherQuery` table for faster lookups.
- **Normalization**: Schema designed to avoid data redundancy and ensure scalability.

## 📚 Documentation

- [Postman Link](https://.postman.co/workspace/My-Workspace~afc0f15a-e68b-4e6c-806a-72cd7239e261/collection/44592984-b5aa9fba-740b-4110-9faf-b8c5edfa0803?action=share&creator=44592984)

![image](https://github.com/user-attachments/assets/f984b8a5-aaff-4722-86cb-fb74ce263204)

## ❓ Questions?

If you have any questions or need assistance, feel free to reach out!

---

*Built with 💻 and ☕ by [Your Name]*
