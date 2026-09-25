pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        IMAGE_NAME = "preethisamy/devops-capstone-app"
        APP_EC2_IP = "13.232.90.30"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/arokiyasamypreethi-netizen/DevOps-Capstone-Project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
                sh 'docker push $IMAGE_NAME:latest'
            }
        }

        stage('Deploy to App EC2') {
            steps {
                sshagent(['app-ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@$APP_EC2_IP '
                          docker pull $IMAGE_NAME:latest &&
                          docker stop capstone-app || true &&
                          docker rm capstone-app || true &&
                          docker run -d --name capstone-app -p 3000:3000 $IMAGE_NAME:latest
                        '
                    """
                }
            }
        }
    }

    post {
        success { echo 'Pipeline completed successfully!' }
        failure { echo 'Pipeline failed. Check logs above.' }
    }
}
