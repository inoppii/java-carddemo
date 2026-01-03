# Stage 1: Build
FROM gradle:8.5-jdk17-alpine as build
WORKDIR /home/gradle/src
COPY --chown=gradle:gradle . .
RUN gradle build --no-daemon -x test

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
