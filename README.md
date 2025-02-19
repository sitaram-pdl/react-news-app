# React App with Docker

This project runs a Vite-based React app inside a Docker container with live reloading and development mode enabled.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 📦 Build and Run the Container

1. Clone this repository:

   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Build and run the container:

   ```sh
   docker-compose up --build
   ```

3. Open your browser and go to:

   ```
   http://localhost:5173
   ```

### 📜 Viewing Logs

To view logs in real-time:

```sh
 docker-compose logs -f
```

### 🔄 Stopping the Container

To stop the running container, press `CTRL + C` or run:

```sh
 docker-compose down
```

## 📁 Project Structure

```
.
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── src/                 # React source code
├── package.json         # Project dependencies
└── README.md            # This file
```

## 🛠️ Development Notes

- The container mounts the local project directory (`.`) to enable **hot reloading**.
- Dependencies are installed inside the container to avoid conflicts.

## 🛠️ Major Technologies Used

- **React 18** - UI Library
- **Vite** - Build tool for fast development
- **TypeScript** - Strongly typed JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **TanStack React Query** - Data fetching and caching
- **Axios** - HTTP client for API requests
- **ESLint & Prettier** - Code linting and formatting
- **Docker & Docker Compose** - Containerization and orchestration

## 🚀 Enjoy Coding! 🎉
