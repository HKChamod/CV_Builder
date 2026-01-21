FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx nx build cv-builder-web --configuration=production

FROM nginx:alpine
COPY --from=builder /app/dist/apps/cv-builder-web/browser /usr/share/nginx/html
COPY apps/cv-builder-web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
