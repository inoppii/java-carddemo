#!/bin/bash
set -e

PROJECT_ID="inoppii-202601-java-carddemo"
REGION="asia-northeast1"
INSTANCE_NAME="carddemo-db"
DB_NAME="carddemo"
BACKEND_SERVICE="carddemo-backend"
FRONTEND_SERVICE="carddemo-frontend"
REPO_NAME="carddemo-repo"

echo "Waiting for Cloud SQL instance to be ready..."
while [ "$(gcloud sql instances describe $INSTANCE_NAME --format='value(state)')" != "RUNNABLE" ]; do
  sleep 10
done
echo "Cloud SQL is ready."

# Create Database
echo "Creating database $DB_NAME..."
gcloud sql databases create $DB_NAME --instance=$INSTANCE_NAME || echo "Database already exists."

# Deploy Backend
echo "Deploying backend service..."
gcloud run deploy $BACKEND_SERVICE \
    --image $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$BACKEND_SERVICE:latest \
    --region $REGION \
    --add-cloudsql-instances $PROJECT_ID:$REGION:$INSTANCE_NAME \
    --set-env-vars "SPRING_DATASOURCE_URL=jdbc:postgresql:///carddemo?cloudSqlInstance=$PROJECT_ID:$REGION:$INSTANCE_NAME&socketFactory=com.google.cloud.sql.postgres.SocketFactory,SPRING_DATASOURCE_USERNAME=postgres,SPRING_DATASOURCE_PASSWORD=postgres" \
    --allow-unauthenticated

BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE --region $REGION --format='value(status.url)')
echo "Backend deployed at: $BACKEND_URL"

# Deploy Frontend
echo "Deploying frontend service..."
gcloud run deploy $FRONTEND_SERVICE \
    --image $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$FRONTEND_SERVICE:latest \
    --region $REGION \
    --set-env-vars "BACKEND_URL=$BACKEND_URL" \
    --allow-unauthenticated

FRONTEND_URL=$(gcloud run services describe $FRONTEND_SERVICE --region $REGION --format='value(status.url)')
echo "Frontend deployed at: $FRONTEND_URL"
echo "Deployment Complete!"
