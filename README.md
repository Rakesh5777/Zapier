# Turborepo starter

This is an official starter turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-prisma
```

## What's inside?

This turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/database`: [Prisma](https://prisma.io/) ORM wrapper to manage & access your database
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Prisma](https://prisma.io/) for database ORM
- [Docker Compose](https://docs.docker.com/compose/) for local database

### Database

We use [Prisma](https://prisma.io/) to manage & access our database. As such you will need a database for this project, either locally or hosted in the cloud.

To make this process easier, we offer a [`docker-compose.yml`](https://docs.docker.com/compose/) file to deploy a MySQL server locally with a new database named `turborepo` (To change this update the `MYSQL_DATABASE` environment variable in the `docker-compose.yml` file):

```bash
cd my-turborepo
docker-compose up -d
```

Once deployed you will need to copy the `.env.example` file to `.env` in order for Prisma to have a `DATABASE_URL` environment variable to access.

```bash
cp .env.example .env
```

If you added a custom database name, or use a cloud based database, you will need to update the `DATABASE_URL` in your `.env` accordingly.

Once deployed & up & running, you will need to create & deploy migrations to your database to add the necessary tables. This can be done using [Prisma Migrate](https://www.prisma.io/migrate):

```bash
npx prisma migrate dev
```

If you need to push any existing migrations to the database, you can use either the Prisma db push or the Prisma migrate deploy command(s):

```bash
yarn run db:push

# OR

yarn run db:migrate:deploy
```

There is slight difference between the two commands & [Prisma offers a breakdown on which command is best to use](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate).

An optional additional step is to seed some initial or fake data to your database using [Prisma's seeding functionality](https://www.prisma.io/docs/guides/database/seed-database).

To do this update check the seed script located in `packages/database/src/seed.ts` & add or update any users you wish to seed to the database.

Once edited run the following command to run tell Prisma to run the seed script defined in the Prisma configuration:

```bash
yarn run db:seed
```

For further more information on migrations, seeding & more, we recommend reading through the [Prisma Documentation](https://www.prisma.io/docs/).

### Build

To build all apps and packages, run the following command:

```bash
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
yarn run dev
```

## symbolic link

Using a symbolic link for the `.env` file centralizes configuration, ensuring all applications share the same environment variables. This simplifies management and reduces the risk of inconsistencies across your monorepo.

```bash
 ln -s /path/to/root/.env /path/to/apps/.env
```

## Docker postgres commands 

To start postgres docker container

```bash
docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d  -v /Users/rakesh/Desktop/rakesh/docker-storage/zapier:/var/lib/postgresql/data postgres
```

## Kafka commands

To start kafka docker container

```bash
docker run -p 9092:9092 -d apache/kafka:3.7.1
```

To connect to kafka docker container

```bash
docker exec -it kafka /bin/bash
```

To create a topic in kafka docker container

```bash
opt/kafka/bin/kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092
```

To list all topics

```bash
opt/kafka/bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```

To listen to a topic

```bash
opt/kafka/bin/kafka-console-consumer.sh --topic zap-events --from-beginning --bootstrap-server localhost:9092
```

## Useful Links

- [Kafka](https://kafka.apache.org/)
- [KafkaJS](https://kafka.js.org/)
- [KafkaJS Docker](https://github.com/obsidiandynamics/kafdrop)

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
