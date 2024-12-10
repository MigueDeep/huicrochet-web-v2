# Etapa de build
FROM node:18 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx tailwindcss -i ./src/index.css -o ./src/output.css


# Generar el build con Vite
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
