# DevOps Capstone: Node.js CI/CD Pipeline

## Description
End-to-end CI/CD pipeline: GitHub → Jenkins → Docker → AWS EC2 → Prometheus/Grafana monitoring.

## Tech Stack
Node.js, Express, Docker, Jenkins, AWS EC2, Prometheus, Grafana, Bash/Cron

## Setup (local)
\`\`\`bash
git clone https://github.com/<you>/devops-capstone-app.git
cd devops-capstone-app
npm install
npm start
\`\`\`

## Run with Docker
\`\`\`bash
docker build -t devops-capstone-app .
docker run -p 3000:3000 devops-capstone-app
\`\`\`

## CI/CD Flow
1. Push to `main` triggers Jenkins via webhook
2. Jenkins installs deps, builds Docker image, pushes to Docker Hub
3. Jenkins SSHes into the App EC2 and redeploys the container
4. Prometheus + Grafana monitor the running app and host
5. A cron job backs up container logs nightly and prunes old backups
