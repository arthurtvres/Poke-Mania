# =========================================
# Stage 1: build Vite com Node
# =========================================
FROM node:20-alpine AS build
WORKDIR /app

# URL da API embarcada no bundle (substituível em build-time)
ARG VITE_API_BASE_URL=http://localhost:8080/api/v1
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Instala deps com cache
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copia código e faz o build
COPY . .
RUN npm run build

# =========================================
# Stage 2: nginx servindo o bundle estático
# =========================================
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
