provider "google" {
  project = var.project_id
  region  = var.region
}

variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "asia-northeast1"
}

data "google_project" "project" {
}

# Cloud Build IAM Permissions
resource "google_project_iam_member" "cloudbuild_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}

resource "google_project_iam_member" "cloudbuild_sa_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}

# Artifact Registry
resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = "carddemo-repo"
  format        = "DOCKER"
}

# Cloud SQL
resource "google_sql_database_instance" "instance" {
  name             = "carddemo-db"
  region           = var.region
  database_version = "POSTGRES_15"
  settings {
    tier = "db-f1-micro"
  }
  deletion_protection = false
}

resource "google_sql_database" "database" {
  name     = "carddemo"
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "user" {
  name     = "carddemo_user"
  instance = google_sql_database_instance.instance.name
  password = var.db_password
}

variable "db_password" {
  type      = string
  sensitive = true
}

# Cloud Run (Backend)
resource "google_cloud_run_service" "backend" {
  name     = "carddemo-backend"
  location = var.region

  template {
    spec {
      containers {
        image = "asia-northeast1-docker.pkg.dev/${var.project_id}/carddemo-repo/carddemo-backend:latest"
        env {
          name  = "SPRING_PROFILES_ACTIVE"
          value = "prod"
        }
        env {
          name  = "CLOUD_SQL_CONNECTION_NAME"
          value = google_sql_database_instance.instance.connection_name
        }
        env {
          name  = "DB_PASSWORD"
          value = var.db_password
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Cloud Run (Frontend)
resource "google_cloud_run_service" "frontend" {
  name     = "carddemo-frontend"
  location = var.region

  template {
    spec {
      containers {
        image = "asia-northeast1-docker.pkg.dev/${var.project_id}/carddemo-repo/carddemo-frontend:latest"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Allow unauthenticated access
resource "google_cloud_run_service_iam_member" "backend_unauth" {
  location = google_cloud_run_service.backend.location
  project  = google_cloud_run_service.backend.project
  service  = google_cloud_run_service.backend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_service_iam_member" "frontend_unauth" {
  location = google_cloud_run_service.frontend.location
  project  = google_cloud_run_service.frontend.project
  service  = google_cloud_run_service.frontend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
