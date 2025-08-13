# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS final
WORKDIR /app

# Install only serve in production
RUN --mount=type=cache,id=npm,target=/root/.npm \
    npm install -g serve

# Copy build output
COPY --from=build /app/build ./build

# Expose CRA default port
EXPOSE 3001

# Start server
CMD ["serve", "-s", "build"]
