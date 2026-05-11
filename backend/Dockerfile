# =========================================
# Stage 1: build com Maven
# =========================================
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Cacheia dependências antes de copiar o código-fonte
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x mvnw && ./mvnw -B dependency:go-offline

# Copia o código e empacota
COPY src ./src
RUN ./mvnw -B clean package -DskipTests \
 && mv target/*.jar target/app.jar

# =========================================
# Stage 2: runtime enxuto (JRE only)
# =========================================
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Usuário não-root
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=build /app/target/app.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
