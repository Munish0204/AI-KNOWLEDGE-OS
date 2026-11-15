
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        FRONTEND_IMAGE = 'ai-knowledge-frontend'
        BACKEND_IMAGE  = 'ai-knowledge-backend'

        FRONTEND_CONTAINER = 'ai-frontend'
        BACKEND_CONTAINER  = 'ai-backend'

        FRONTEND_PORT = '3000'
        BACKEND_PORT  = '8000'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out AI KNOWLEDGE OS source code'
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Frontend Build') {
            steps {
                echo 'Building Frontend Docker Image'

                sh '''
                    docker build \
                        -t ${FRONTEND_IMAGE}:latest \
                        -f Frontend/Dockerfile \
                        Frontend
                '''
            }
        }

        stage('Backend Build') {
            steps {
                echo 'Building Backend Docker Image'

                sh '''
                    docker build \
                        -t ${BACKEND_IMAGE}:latest \
                        -f Backend/Dockerfile \
                        Backend
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo 'Deploying Frontend Container'

                sh '''
                    docker rm -f ${FRONTEND_CONTAINER} || true

                    docker run -d \
                        --name ${FRONTEND_CONTAINER} \
                        --restart unless-stopped \
                        -p ${FRONTEND_PORT}:80 \
                        ${FRONTEND_IMAGE}:latest
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                echo 'Deploying Backend Container'

                sh '''
                    docker rm -f ${BACKEND_CONTAINER} || true

                    docker run -d \
                        --name ${BACKEND_CONTAINER} \
                        --restart unless-stopped \
                        -p ${BACKEND_PORT}:8000 \
                        ${BACKEND_IMAGE}:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'AI KNOWLEDGE OS CI/CD Pipeline Completed Successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }

        always {
            echo 'Jenkins Pipeline Execution Finished.'
        }
    }
}
