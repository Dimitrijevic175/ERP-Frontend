# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Kopiramo fajlove za zavisnosti
COPY package*.json ./
# Instaliramo sve zavisnosti (uključujući devDependencies jer nam treba TSC i Vite)
RUN npm install

# Kopiramo ostatak izvornog koda
COPY . .

# Pokrećemo build (ovo će izvršiti tsc -b i vite build)
RUN npm run build

# Stage 2: Runtime (Nginx)
FROM nginx:stable-alpine
# Kopiramo nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Kopiramo build rezultate iz 'dist' foldera u nginx web koren
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]