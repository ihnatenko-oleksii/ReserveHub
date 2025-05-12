# Etap 1: Budowanie Spring Boota
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY reservehub ./reservehub
WORKDIR /app/reservehub
RUN mvn clean package -DskipTests

# Etap 2: Uruchomienie
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/reservehub/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
