DOCKER_COMPOSE_DEV_FILE = docker-compose.yml
DOCKER_COMPOSE_PROD_FILE = docker-compose.prod.yml

start:
	docker compose -f $(DOCKER_COMPOSE_DEV_FILE) up

down:
	docker compose -f $(DOCKER_COMPOSE_DEV_FILE) down

prod-start:
	docker compose -f $(DOCKER_COMPOSE_PROD_FILE) up -d

prod-down:
	docker compose -f $(DOCKER_COMPOSE_PROD_FILE) down

down:
	docker compose -f $(DOCKER_COMPOSE_DEV_FILE) down
	docker compose -f $(DOCKER_COMPOSE_PROD_FILE) down

start-hotfix:
	twgit hotfix start

finish-hotfix:
	twgit hotfix finish

start-release:
	twgit release start

finish-release:
	twgit release finish