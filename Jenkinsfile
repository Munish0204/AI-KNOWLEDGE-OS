
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        REGISTRY = 'docker.io/muneeswaran02'

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

                bat 'dir'
            }
        }

        stage('Frontend Build') {
            steps {
                echo 'Building Frontend Docker Image'

                bat '''
                    docker build ^
                    -t %REGISTRY%/%FRONTEND_IMAGE%:%BUILD_NUMBER% ^
                    -f Frontend/Dockerfile ^
                    Frontend

                    docker tag %REGISTRY%/%FRONTEND_IMAGE%:%BUILD_NUMBER% %REGISTRY%/%FRONTEND_IMAGE%:latest
                '''
            }
        }

        stage('Backend Build') {
            steps {
                echo 'Building Backend Docker Image'

                bat '''
                    docker build ^
                    -t %REGISTRY%/%BACKEND_IMAGE%:%BUILD_NUMBER% ^
                    -f Backend/Dockerfile ^
                    Backend

                    docker tag %REGISTRY%/%BACKEND_IMAGE%:%BUILD_NUMBER% %REGISTRY%/%BACKEND_IMAGE%:latest
                '''
            }
        }

        stage('Docker Hub Login and Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-registry-creds',
                        usernameVariable: 'REG_USER',
                        passwordVariable: 'REG_PASS'
                    )
                ]) {
                    bat '''
                        @echo off

                        if not defined REG_USER (
                            echo ERROR: Docker Hub username is empty in Jenkins credential docker-registry-creds.
                            exit /b 1
                        )

                        if not defined REG_PASS (
                            echo ERROR: Docker Hub access token is empty in Jenkins credential docker-registry-creds.
                            exit /b 1
                        )

                        echo Logging into Docker Hub using PowerShell...

                        powershell.exe -NoProfile -NonInteractive -Command "$env:REG_PASS | docker login --username $env:REG_USER --password-stdin; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }"

                        if errorlevel 1 (
                            echo ERROR: Docker Hub login failed. Check credential docker-registry-creds; use the Docker Hub username and a valid access token.
                            exit /b 1
                        )

                        echo Docker Hub login successful!

                        echo Pushing Frontend Image...

                        docker push %REGISTRY%/%FRONTEND_IMAGE%:%BUILD_NUMBER%
                        if errorlevel 1 exit /b 1

                        docker push %REGISTRY%/%FRONTEND_IMAGE%:latest
                        if errorlevel 1 exit /b 1

                        echo Pushing Backend Image...

                        docker push %REGISTRY%/%BACKEND_IMAGE%:%BUILD_NUMBER%
                        if errorlevel 1 exit /b 1

                        docker push %REGISTRY%/%BACKEND_IMAGE%:latest
                        if errorlevel 1 exit /b 1

                        echo Docker Images Successfully Pushed!
                    '''
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo 'Deploying Frontend Container'

                bat '''
                    docker network create ai-network 2>NUL
                    docker rm -f %FRONTEND_CONTAINER% 2>NUL

                    docker run -d ^
                    --name %FRONTEND_CONTAINER% ^
                    --restart unless-stopped ^
                    --network ai-network ^
                    -p %FRONTEND_PORT%:80 ^
                    %REGISTRY%/%FRONTEND_IMAGE%:latest

                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                echo 'Deploying Backend Container'

                withCredentials([
                    string(
                        credentialsId: 'mongo-uri',
                        variable: 'MONGO_URI'
                    )
                ]) {
                    bat '''
                        docker network create ai-network 2>NUL
                        docker rm -f %BACKEND_CONTAINER% 2>NUL

                        docker run -d ^
                        --name %BACKEND_CONTAINER% ^
                        --restart unless-stopped ^
                        --network ai-network ^
                        -p %BACKEND_PORT%:8000 ^
                        -e MONGO_URI ^
                        %REGISTRY%/%BACKEND_IMAGE%:latest

                        if errorlevel 1 exit /b 1
                    '''
                }
            }
        }

    }

    post {

        success {
            echo '======================================'
            echo 'AI KNOWLEDGE OS CI/CD SUCCESS!'
            echo 'Frontend and Backend deployed!'
            echo '======================================'
        }

        failure {
            echo 'Pipeline Failed! Check Console Output.'
        }

        always {
            bat 'docker logout docker.io'
            echo 'Jenkins Pipeline Execution Finished.'
        }
    }
}
