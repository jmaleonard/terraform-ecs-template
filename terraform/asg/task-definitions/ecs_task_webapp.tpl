[
  {
    "name": "webapp",
    "image": "${webapp_docker_image}",
    "cpu": 512,
    "memory": 512,
    "essential": true,
    "portMappings": [
      {
        "containerPort": 8000,
        "hostPort": 8000
      }
    ],
    "command": [],
    "entryPoint": [],
    "links": [],
    "mountPoints": [],
    "volumesFrom": []
  }
]
