# syntax=docker/dockerfile:1

###############################################
# Build stage: compile the Vite React project #
###############################################
FROM node:22.18.0-alpine AS builder

WORKDIR /app

# Build-time API base URL for Vite (falls back to /api)
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Copy only manifest and Yarn config first for better layer caching
COPY package.json yarn.lock .yarnrc.yml ./
# If present, copy Yarn metadata (plugins/cache/state)
COPY .yarn/ ./.yarn/

# Enable and pin Yarn v4 (as declared in package.json)
RUN corepack enable \
    && corepack prepare yarn@4.9.2 --activate

# Install dependencies (respects nodeLinker in .yarnrc.yml)
RUN yarn install --immutable

# Copy source code (includes .env for Vite at build time)
COPY . .

# Build the app (outputs to /app/dist)
RUN yarn build

###############################################
# Runtime stage: serve the build with Nginx   #
###############################################
FROM nginx:1.29-alpine AS runner

# Nginx config for SPA routing
COPY default.conf /etc/nginx/conf.d/default.conf

# Static site
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

