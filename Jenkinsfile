pipeline {
  agent any

  tools {nodejs "node"}

  stages {

    stage('Cloning Git') {
      steps {
        git 'https://github.com/NelsonPereira1991/github_repos_project'
      }
    }

    stage('Checking env variables') {
      steps {
        def env = System.getenv()
        def username = env['GITHUB_USERNAME']
        def token = env['GITHUB_USER_ACCESS_TOKEN']
        echo "Github Api user is ${username}"
      }
    }

    stage('Clean dist folder') {
      steps {
        sh 'rm -rf dist/*'
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
              docker.image('github-repos-proj-repository').push('latest')
            }
         }
       }
    }
  }
}