node {

    stage('Build Docker Image') {
        bat 'docker build -t student-feedback-portal .'
    }

    stage('Run Docker Container') {
        bat 'docker stop student-feedback-container || exit /b 0'
        bat 'docker rm student-feedback-container || exit /b 0'
        bat 'docker run -d --name student-feedback-container -p 8080:80 student-feedback-portal'
    }

    stage('Test Application') {
        bat 'curl -f http://localhost:8080'
    }

}
