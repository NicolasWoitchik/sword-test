# README

To run this project, follow these steps:

- Rename `ormconfig.example.json` to `ormconfig.json`.
- Rename `.env.example` to `.env`.
- Start the container with MySQL and Kafka with the command `docker-compose up -d`.
- Install dependencies by running `yarn`.
- Create the database structure by running `yarn typeorm migration:run`.
- Start the application by running `yarn start`.

Note: By default, the application runs on port 3000.
