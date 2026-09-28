stages {

    stage('Checkout') {
        steps {
            echo 'Checking out source code...'
            checkout scm
        }
    }

    stage('Build Docker Image') {
        steps {
            echo 'Building Docker image...'
            sh 'docker build -t student-feedback-portal .'
        }
    }

    stage('Run Docker Container') {
        steps {
            echo 'Starting application container...'

            sh '''
                docker stop student-feedback-container || true
                docker rm student-feedback-container || true

                docker run -d \
                    --name student-feedback-container \
                    -p 8080:80 \
                    student-feedback-portal
            '''
        }
    }

    stage('Test Application') {
        steps {
            echo 'Testing application...'
            sh 'curl -f http://localhost:8080'
        }
    }
}

post {
    success {
        echo 'Student Feedback Portal deployed successfully!'
    }

    failure {
        echo 'Deployment failed.'
    }
}
