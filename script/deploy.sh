aws ecr get-login --no-include-email --region eu-west-2 --profile github_repos_user | /bin/bash
docker build -t github_repos_app_repository .
docker tag github_repos_app_repository:latest 221863723091.dkr.ecr.eu-west-2.amazonaws.com/github-repos-proj-repository:latest
docker push 221863723091.dkr.ecr.eu-west-2.amazonaws.com/github-repos-proj-repository:latest