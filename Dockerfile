# Stage 1: Install dependencies
FROM node:20-alpine AS deps

WORKDIR /app

# Install pnpm globally in the deps stage
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Install dependencies using pnpm
RUN pnpm install

# Stage 2: Build application
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm globally in the builder stage
RUN npm install -g pnpm

COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG SECRET
ARG DATABASE_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SMTP_HOST
ARG NEXT_PUBLIC_SMTP_USER
ARG NEXT_PUBLIC_SMTP_PASS

ENV SECRET=$SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SMTP_HOST=$NEXT_PUBLIC_SMTP_HOST
ENV NEXT_PUBLIC_SMTP_USER=$NEXT_PUBLIC_SMTP_USER
ENV NEXT_PUBLIC_SMTP_PASS=$NEXT_PUBLIC_SMTP_PASS

# Use pnpm to build the app
RUN pnpm run build

# Stage 3: Prepare production image
FROM node:20-alpine AS prod

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Ensure pnpm is installed in the production image
RUN npm install -g pnpm

# Use pnpm to run the app
CMD ["pnpm", "run", "start"]