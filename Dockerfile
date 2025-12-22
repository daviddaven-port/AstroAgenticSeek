FROM mcr.microsoft.com/playwright:v1.49.0-jammy

# Set working directory
WORKDIR /app

# Install dependencies (including devDependencies for build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the Astro application
RUN npm run build

# Expose the port
EXPOSE 4321

# Start the Node.js server
CMD ["node", "./dist/server/entry.mjs"]
