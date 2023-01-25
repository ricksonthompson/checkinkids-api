# Commands by Docker
build:
	yarn build
	docker compose up -d --build 

.PHONY: build

deploy:
	git pull
	yarn build
	docker compose up -d --build 

.PHONY: deploy

up:
	docker compose up -d 

.PHONY: up

down: 
	docker compose down

.PHONY: down

logs:
	docker logs checkinkids-api -f

.PHONY: logs

# Commands by PM2
build-pm2:
	yarn
	yarn build
	pm2 start dist/main.js -f --name checkinkids-api

.PHONY: build-pm2

logs-pm2:
	pm2 logs checkinkids-api

.PHONY: logs-pm2