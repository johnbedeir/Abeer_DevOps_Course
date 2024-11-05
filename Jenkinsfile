pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // Docker Hub credentials ID from Jenkins
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t triple3a/abeer_python_app Python-App/"
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push triple3a/abeer_python_app"
                }
            }
        }
    }

    post {
        always {
            script {
                // Clean up local Docker images to save space
                sh "docker rmi triple3a/abeer_python_app"
            }
        }
        success {
            echo 'Docker image pushed successfully!'
        }
        failure {
            echo 'Failed to push Docker image.'
        }
    }
}
