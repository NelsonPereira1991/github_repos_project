pipeline {
  agent any

  tools {nodejs "node"}

  stages {

    stage('Cloning Git') {
      steps {
        git 'https://github.com/NelsonPereira1991/github_repos_project'
      }
    }

    stage('Getting env variables') {
      steps {
        environment {
          GITHUB_USERNAME = '$(aws ssm get-parameters --region eu-west-2 --names /jenkins/github/username --query Parameters[0].Value)'
          GITHUB_USER_ACCESS_TOKEN = '$(aws ssm get-parameters --region eu-west-2 --names /jenkins/github/user-access-token --query Parameters[0].Value)'
        }
      }
    }

    stage('Install dependencies') {
      steps {
        echo "Github Api user is ${GITHUB_USERNAME}"
        echo "Github Api access token is ${GITHUB_USER_ACCESS_TOKEN}"
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
              docker.image('github-repos-proj-repository').push('latest')
            }
         }
       }
    }
  }
}