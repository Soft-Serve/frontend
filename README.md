# Soft serve Frontend

## How to get the project running

1. create a new folder, this will be your root working directory, you can name it whatever you want example: `soft-serve-app`
2. clone the content of this repository into the frontend folder by running `git clone git@github.com:Soft-Serve/frontend.git frontend`
3. clonse the content of the soft-serve api into the backend folder by running `git clone git@github.com:Soft-Serve/backend.git backend`
4. within your `soft-serve-app` folder you should now have a `backend` folder and a `frontend` folder. Both these folders will have their own git repository and production triggers. Changes should be pushed to their own repo
5. cd in the `backend` folder and run `touch Dockerfile`
6. copy the content below and paste it in the `Dockerfile`
```Docker
FROM ruby:2.7.4-alpine
RUN apk update && apk add bash build-base nodejs postgresql-dev tzdata

RUN mkdir /backend
WORKDIR /backend

COPY Gemfile Gemfile.lock ./
RUN gem install bundler --no-document
RUN bundle install --no-binstubs --jobs $(nproc) --retry 3

COPY . .

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
```

7. create docker-compose file by running `touch docker-compose.yml` in the `backend` folder
8.  copy the content below and paste it in the `docker-compose.yml` file
```yml
version: "3"

services:
  db:
    image: "postgres:10-alpine"
    volumes:
      - "postgres:/var/lib/postgresql/data"
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_HOST_AUTH_METHOD=trust
  backend:
    depends_on:
      - "db"
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    ports:
      - "3091:3000"
    environment:
      - DATABASE_HOST=db
volumes:
  postgres:
```
9. cd back in the root of `soft-serve app` and run `touch package.json`
10. copy and paste the following content in the `package.json` file
```json
{
  "name": "soft-serve",
  "version": "1.0.0",
  "license": "MIT",
  "private": false,
  "scripts": {
    "install": "cd frontend && yarn",
    "start": "cd frontend && yarn start",
    "frontend": "cd frontend && yarn start",
    "backend": "cd backend && docker-compose run backend bundle install && docker-compose run backend rails db:reset && docker-compose up",
    "cleanup": "cd backend && docker-compose down -v",
    "db:seed": "docker-compose run backend rails db:seed",
    "project": "yarn db:reset && docker-compose up"
  }
}

```

## Run the frontend
1. in the root folder run `yarn install`
2. then run `yarn frontend` a server should start up on `http://localhost:3000/`

## Run the backend
1. in the root folder run `yarn backend`
2. a server should appear on `http://localhost:3091/`

## Run cleanup
1. once you have finished developing, it is good practice to clean up your docker containers by running `yarn cleanup` in the root folder 




