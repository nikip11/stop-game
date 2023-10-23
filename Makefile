CURRENT_DIR=$(patsubst %/,%,$(dir $(realpath $(firstword $(MAKEFILE_LIST)))))
ROOT_DIR=$(CURRENT_DIR)
CURRENT_USER=
DOCKER_NAME=stop_game
DOCKER_COMPOSE?=docker-compose
DOCKER=docker
DOCKER_EXEC_TOOLS_APP=$(CURRENT_USER) docker exec -it $(DOCKER_NAME) sh
NODE_INSTALL="yarn add"
SERVER_RUN="yarn dev"


# .PHONY: build install dev up start first stop restart clear

create:
	$(DOCKER_COMPOSE) run ${DOCKER_NAME} yarn create vite . --template vue-ts
	$(DOCKER_COMPOSE) run ${DOCKER_NAME} npx eslint --init
	$(DOCKER_COMPOSE) run ${DOCKER_NAME} yarn add -D vitest
	$(DOCKER_COMPOSE) run ${DOCKER_NAME} yarn add -D husky
  # ${DOCKER} container prune

build:
	$(DOCKER_COMPOSE) up --build --no-recreate -d

install:
	$(DOCKER_EXEC_TOOLS_APP) -c $(NODE_INSTALL)

dev:
	$(DOCKER_EXEC_TOOLS_APP) -c $(SERVER_RUN)

up:
	$(DOCKER_COMPOSE) up

start: up dev
# // this will up the docker env and run the npm run dev it to

first: build install dev
#// this will build the env, up it and run the npm install and then run npm run dev it to

stop: $(ROOT_DIR)/docker-compose.yml
	$(DOCKER_COMPOSE) kill || true
	$(DOCKER_COMPOSE) rm --force || true

restart: stop start dev

clear: stop $(ROOT_DIR)/docker-compose.yml
	$(DOCKER_COMPOSE) down -v --remove-orphans || true
