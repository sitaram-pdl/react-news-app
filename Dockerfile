# Use a lightweight Node.js 20 image based on Alpine Linux for better performance
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
# This helps in caching dependencies, speeding up builds
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Expose port 5173 (default Vite dev server port)
EXPOSE 5173

# Start the Vite development server with "--host" to allow external access
CMD [ "npm", "run", "dev", "--", "--host" ]
