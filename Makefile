.PHONY: up down restart dev-up dev-down dev-restart prod-up prod-down prod-restart

dc=docker-compose -f docker-compose.base.yml
dc-dev=$(dc) -f docker-compose.dev.yml -p oopsiee-dev
dc-prod=$(dc) -f docker-compose.prod.yml -p oopsiee-prod

up: dev-up
dev-up:
	$(dc-dev) up -d

down: dev-down
dev-down:
	$(dc-dev) down

restart: dev-restart
dev-restart:
	$(dc-dev) down
	$(dc-dev) up -d --build

prod-up:
	$(dc-prod) up -d

prod-down:
	$(dc-prod) down

prod-restart:
	$(dc-prod) down
	$(dc-prod) up -d --build
