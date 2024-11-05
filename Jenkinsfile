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

        stage('Install Docker') {
            steps {
                script {
                    sh '''
                        apt-get update
                        apt-get install ca-certificates curl
                        install -m 0755 -d /etc/apt/keyrings
                        curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
                        chmod a+r /etc/apt/keyrings/docker.asc

                        echo \
                          "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
                          $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
                          sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
                        sudo apt-get update

                        apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                      cd Python-App
                      docker build -t triple3a/abeer_python_app -f Dockerfile .
                    '''
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
