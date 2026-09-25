# DevOps Capstone Project

End-to-end CI/CD pipeline for a Node.js web application — from a `git push` to a monitored, running container on AWS.

**Pipeline flow:** GitHub → Jenkins → Docker Hub → AWS EC2 → Prometheus & Grafana

## Description

This project is a minimal Node.js/Express web application wrapped in a complete DevOps delivery pipeline. A push to the `main` branch triggers Jenkins to install dependencies, build a Docker image, push it to Docker Hub, and deploy it to a live EC2 instance over SSH. The deployed instance is continuously monitored with Prometheus and Grafana, and a cron job automates log backups.

The focus of this project isn't the application itself — it's the automation and infrastructure built around it.

## Tech Stack

| Layer | Tools / Technology |
|---|---|
| Source Control | Git + GitHub |
| CI/CD | Jenkins (on an Ubuntu EC2 instance) |
| Application | Node.js + Express |
| Containerization | Docker + Docker Hub |
| Infrastructure | AWS EC2 (Ubuntu 22.04, t2.micro) |
| Monitoring | Prometheus, Grafana, Node Exporter |
| Automation | Bash + Cron |

## Project Structure

```
.
├── index.js            # Express application
├── package.json
├── package-lock.json
├── Dockerfile          # Container build instructions
├── .dockerignore
├── Jenkinsfile         # CI/CD pipeline definition
└── README.md
```

## Setup (Local)

Clone the repository and install dependencies:

```bash
git clone https://github.com/arokiyasamypreethi-netizen/DevOps-Capstone-Project.git
cd DevOps-Capstone-Project
npm install
npm start
```

The app will be available at `http://localhost:3000`.

Health check endpoint: `http://localhost:3000/health`

## Run with Docker

```bash
docker build -t devops-capstone-app .
docker run -p 3000:3000 devops-capstone-app
```

## CI/CD Pipeline

The pipeline is defined in the [`Jenkinsfile`](./Jenkinsfile) and runs the following stages on every push to `main`:

1. **Checkout** — Jenkins pulls the latest commit from this repository.
2. **Install Dependencies** — runs `npm install` on the Jenkins agent.
3. **Build Docker Image** — builds a container image using the `Dockerfile` and tags it.
4. **Push to Docker Hub** — logs in and pushes the image to Docker Hub.
5. **Deploy to App EC2** — connects over SSH to the application server, pulls the new image, stops/removes the old container, and starts the new one.

Monitoring runs independently on the App EC2 as systemd services:
- **Node Exporter** exposes host-level metrics (CPU, memory, disk, network) on port `9100`.
- **Prometheus** scrapes those metrics and stores them as time series on port `9090`.
- **Grafana** (port `3001`) visualizes the metrics on a live dashboard, using the community "Node Exporter Full" dashboard (ID `1860`).

A cron job on the App EC2 runs a bash script nightly to back up the application container's logs and delete backups older than 7 days.

## Deployment

The application is deployed on an AWS EC2 instance and reachable at:

```
http://13.232.90.30:3000
```

Monitoring dashboards:
```
Prometheus: http://13.232.90.30:9090
Grafana:    http://13.232.90.30:3001
```

> Note: this runs on a free-tier EC2 instance and may be stopped when not in active use. See the project report for screenshots of a successful run.

## Notes on Running This Yourself

- Both EC2 instances used here are `t2.micro` (1 GB RAM, AWS free-tier eligible). Under memory pressure, add a swap file:
  ```bash
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
  sudo mkswap /swapfile && sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  ```
- Run Prometheus and Node Exporter from a real disk path (e.g. `~/prometheus`), not `/tmp` — on Ubuntu, `/tmp` is a small RAM-backed `tmpfs` and can cause Prometheus to crash with a `SIGBUS` error.
- Run both Prometheus and Node Exporter as **systemd services** (not background shell jobs with `&`) so they keep running after you close your SSH session.

## License

This project was built as a DevOps bootcamp capstone project for educational purposes.
