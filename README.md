# Weather API

This is a backend project built for the Software Engineer Case Study. The API fetches weather data using the OpenWeather API and implements a caching mechanism using Redis. It features role-based access control where:
- **Admin** can manage users and view all weather queries.
- **User** can only view their own weather queries.

## Technologies Used
- **TypeScript** - For type safety and better developer experience.
- **Express.js** - For building the RESTful API.
- **Node.js** - Server-side JavaScript runtime.
- **PostgreSQL** - For relational database storage.
- **Redis** - For caching weather data.
- **Prisma ORM** - For interacting with PostgreSQL and managing migrations.
- **Docker** - For running PostgreSQL and Redis as containers during development.

## Installation & Setup

Follow the steps below to set up the project locally.

### Prerequisites

- **Docker**: For running PostgreSQL and Redis containers.
- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/).
- **PostgreSQL**: Local instance running, or Docker will be used to run PostgreSQL.
- **Redis**: Local instance running, or Docker will be used to run Redis.

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/weather-api.git
cd weather-api
Step 2: Install dependencies
bash
Copy
Edit
npm install
Step 3: Setup environment variables
Create a .env file in the root of the project and add the following:

env
Copy
Edit
OPENWEATHER_API_KEY=your_openweather_api_key
DATABASE_URL=postgresql://username:password@localhost:5432/weatherdb
REDIS_URL=redis://localhost:6379
Step 4: Running PostgreSQL and Redis using Docker
Use Docker to run both PostgreSQL and Redis containers:

bash
Copy
Edit
# Run PostgreSQL
docker run --name weather-db -e POSTGRES_PASSWORD=yourpassword -d -p 5432:5432 postgres:latest

# Run Redis
docker run --name redis-cache -d -p 6379:6379 redis:latest
Step 5: Migrations
Run the Prisma migrations to set up the database schema:

bash
Copy
Edit
# Run Prisma migration to create database tables
npx prisma migrate dev --name init
Step 6: Start the application
Start the server using:

bash
Copy
Edit
npm run start
Your server will be running on http://localhost:3000.

Database Schema
The schema is designed for the following use cases:

User: Stores user information such as id, name, email, password, and role.

WeatherQuery: Stores weather data such as city, temperature, humidity, pressure, description, and icon along with the associated userId.

Indexes were added to the userId field in the WeatherQuery table and the city field in the WeatherQuery table to optimize query performance.

Prisma Schema Example
prisma
Copy
Edit
model User {
  id        String      @id @default(uuid())
  name      String
  email     String      @unique
  password  String
  role      Role
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  weatherQueries WeatherQuery[]
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

  @@index([userId, city])  // Index on userId and city for performance
}
System Architecture
This project uses Clean Architecture (Onion Architecture) to maintain a modular and scalable structure. It separates the application into layers, such as:

Controller Layer: Handles HTTP requests and responses.

Service Layer: Contains the business logic.

Repository Layer: Handles data access and interactions with the database.

External API Integration: OpenWeather API for fetching weather data.

Caching Layer: Redis for caching the weather data.

API Endpoints
Here are the available API endpoints:

Authentication
POST /auth/login - Login with credentials and get a JWT token.

User Routes
GET /users - Get all users (Admin only).

POST /users - Create a new user (Admin only).

PUT /users/:id - Update user details (Admin only).

DELETE /users/:id - Delete a user (Admin only).

GET /users/me - Get the current logged-in user's details.

Weather Routes
GET /weather - Get weather data by city for the logged-in user. (Cache check first)

GET /weather/queries - Get all weather queries for the logged-in user.

GET /weather/queries/all - Get all weather queries (Admin only).

Role-Based Access Control
Admin Role: Can create, read, update, and delete users, and view all weather queries.

User Role: Can view their own weather queries.

Caching with Redis
Redis is used to cache weather data for 1 hour to improve performance. The cache key is based on the city and user ID. If data for the city and user already exists in Redis, it will be served from there. If not, the weather data is fetched from the OpenWeather API and saved to both Redis and PostgreSQL.

Error Handling & Logging
Error Handling: All API errors are handled with custom error messages and proper HTTP status codes.

Logging: Detailed logs are written to the console for each request, including errors and the execution time of queries.

Database & Query Optimization
Indexes: Indexes are created on the userId and city fields of the WeatherQuery table to optimize lookup performance.

Normalization: The database schema is designed to be normalized to avoid redundant data and ensure scalability.

Testing & CI/CD
Unit Tests: Jest is used for unit testing of services and controllers.

CI/CD Pipeline: The project includes a basic CI/CD pipeline for automated deployment (optional but encouraged).

Documentation
API Documentation: The API is documented with Postman (or Swagger for more extensive documentation).

Note: The project is designed with scalability in mind, so future enhancements like adding new roles, additional features, or scaling the infrastructure can be done easily.

If you have any questions or need further assistance, feel free to reach out!
