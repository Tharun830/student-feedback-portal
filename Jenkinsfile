pipeline {
    agent any

    stages {
        stage('Check Files') {
            steps {
                bat 'dir'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t student-feedback-portal .'
            }
        }
    }
}