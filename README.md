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
