.DEFAULT_GOAL: help
.PHONY: help init build up restart down run

-include .env

help:
	@sed -rn 's/^([a-zA-Z_-]+):.*## (.*)$$/"\1" "\2"/p' < $(MAKEFILE_LIST) | xargs printf "make %-20s# %s\n"

init: ## init project
	cp .env.example .env
	cp .domains.example.json .domains.json
build: ## build image
	docker-compose build --no-cache --force-rm
up: ## start service
	docker-compose up -d --build --force-recreate
restart: ## restart service
	docker-compose restart
down: ## stop service
	docker-compose down --remove-orphans
run: ## run service
	docker-compose up --force-recreate
