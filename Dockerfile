# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Kopiramo fajlove za zavisnosti
COPY package*.json ./
RUN npm install

# Kopiramo ostatak koda
COPY . .

# Build aplikacije (Vite će automatski pokupiti .env fajl iz root-a)
RUN npm run build

# Stage 2: Runtime (Nginx)
FROM nginx:stable-alpine
# Kopiramo tvoj nginx.conf (osiguraj se da ovaj fajl postoji u folderu!)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Kopiramo build rezultate iz 'dist' foldera
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]