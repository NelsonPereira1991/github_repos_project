pipeline {
  agent any

  tools {nodejs "node"}

  environment {
    GITHUB_USERNAME = 'NelsonPereira1991'
  }

  stages {

    stage('Cloning Git') {
      steps {
        git 'https://github.com/NelsonPereira1991/github_repos_project'
      }
    }

    stage('Checking env variables') {
      steps {
        echo "Github Api user is ${GITHUB_USERNAME}"
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm build'
      }
    }

    stage('Test') {
      steps {
         sh 'npm test'
      }
    }

    stage('Docker build image') {
       steps {
         script {
            docker.build('github-repos-proj-repository')
         }
       }
    }

    stage('Deploy image') {
       steps {
         script {
            docker.withRegistry('https://221863723091.dkr.ecr.eu-west-2.amazonaws.com', 'ecr:eu-west-2:aws-ecr-gitProject') {
              docker.image('github-repos-proj-repository').withRun('-e "GITHUB_USERNAME=${GITHUB_USERNAME}"').push('latest')
            }
         }
       }
    }
  }
}