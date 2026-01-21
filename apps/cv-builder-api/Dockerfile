FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx nx build cv-builder-api --configuration=production

FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/dist/apps/cv-builder-api ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
# Puppeteer requires chromium dependencies
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

CMD ["node", "dist/main.js"]
