# PlateNote

REST API for a shift log of vehicle plates. Each day has a morning list and an evening list. An operator records who came in, who left, and which plates are regulars, and the next shift can check the previous list instead of retyping it.

There is no frontend in this repository. Interactive docs are served by Swagger UI.

## Stack

Node.js 20, TypeScript, Express, PostgreSQL 15, Kysely, Zod, JWT, Pino. Swagger UI at `/api/v1/docs`.

## Quick start

Requires Node.js 20 and Docker.

```bash
git clone https://github.com/felipec583/platenote.git
cd platenote
npm install
```

Create a `.env` in the project root. The app reads these names (`src/common/constants.ts`). `.env.template` still lists `LOCAL_DB_*`, which the app does not read.

```bash
NODE_ENV=development
PORT=3000
DEV_DB_HOST=127.0.0.1
DEV_DB_PORT=5433
DEV_DB_NAME=platenote
DEV_DB_USER=platenote
DEV_DB_PASSWORD=platenote
ACCESS_TOKEN_KEY=replace-with-a-long-random-string
REFRESH_TOKEN_KEY=replace-with-another-long-random-string
```

Start Postgres, apply the schema, then run the API:

```bash
docker compose up -d platenote-db
npm run m -- migrate:latest
npm run m -- seed:run
npm run dev
```

`npm run dev` starts `tsx` on `src/app.ts` (the script spells the entry as `src/app.js`, which is how this TypeScript setup resolves it). The process listens on `PORT`.

- API base: `http://localhost:3000/api/v1`
- Swagger UI: `http://localhost:3000/api/v1/docs`
- Health: `GET http://localhost:3000/` returns `{ "message": "Welcome to this world" }`

Production mode is `npm run build` then `npm start` (`node build/app.js`), with `NODE_ENV=production` and the `PROD_DB_*` variables below.

## Configuration

| Variable | Used when | Purpose |
| --- | --- | --- |
| `NODE_ENV` | always | `development`, `production`, or `testing` |
| `PORT` | always | HTTP port |
| `DEV_DB_HOST` | not production | Postgres host |
| `DEV_DB_PORT` | not production | Postgres port |
| `DEV_DB_NAME` | not production | Database name |
| `DEV_DB_USER` | not production | Database user |
| `DEV_DB_PASSWORD` | not production | Database password |
| `PROD_DB_HOST` | production | Postgres host |
| `PROD_DB_PORT` | production | Postgres port |
| `PROD_DB` | production | Database name |
| `PROD_DB_USER` | production | Database user |
| `PROD_DB_PASSWORD` | production | Database password |
| `ACCESS_TOKEN_KEY` | login and protected routes | Secret for signing access tokens |
| `REFRESH_TOKEN_KEY` | loaded at startup | Secret reserved for refresh tokens |

`docker compose up -d platenote-db` publishes Postgres on host port **5433**. The database name, user, and password default to `platenote_test` / `test_user` / `test_password` when those variables are unset in the shell. Set `DEV_DB_*` to the same values you pass to Compose.

## Auth

`POST /api/v1/auth/signup` and `POST /api/v1/auth/login` take JSON:

```json
{ "email": "operator@example.com", "password": "Plate1!a" }
```

The password must be 8 to 10 characters and include an uppercase letter, a lowercase letter, a digit, and a special character.

Signup returns the new email. Login returns the user id, email, role, and an access token. Send it as `Authorization: Bearer <token>`.

A `refresh_token` table exists, and login does not issue or rotate a refresh token yet.

JWT is checked on `POST /api/v1/lists` and `POST /api/v1/entry`. The other routes do not check a token.

## What a shift log is

- A plate is stored once. Chilean formats accepted by the API: two letters and four digits (`AB1234`) or four letters and two digits (`ABCD12`).
- A list belongs to one calendar day and one shift. From 05:00 through 11:00 the current shift is morning (`1`). Any other hour is evening (`2`). Creating a second list for the same day and shift is rejected.
- An entry is one plate on one list. It can be marked registered or as having left. A plate can be flagged as a regular (`is_tenant`); regulars are not given a left/registered status change.
- Only the user who created a list can add plates to it.
- Suggestions for a prefix come from the previous shift's plates first, then from other plates that start with that prefix, up to five.

## Routes

Full request and response shapes are in Swagger UI (`/api/v1/docs`).

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/signup` | no | Create an operator |
| POST | `/api/v1/auth/login` | no | Return an access token |
| POST | `/api/v1/lists` | yes | Open today's list for the current shift |
| GET | `/api/v1/lists/current` | no | Current list with counts |
| GET | `/api/v1/lists/previous-list` | no | Plates from the previous shift |
| GET | `/api/v1/lists` | no | Lists by date range or shift |
| GET | `/api/v1/lists/shift` | no | Lists for one shift |
| GET | `/api/v1/lists/:id` | no | One list with counts |
| DELETE | `/api/v1/lists/:id` | no | Delete a list |
| POST | `/api/v1/entry` | yes | Add a plate to the current list |
| DELETE | `/api/v1/entry` | no | Remove a plate from the current list |
| PATCH | `/api/v1/entry/left` | no | Toggle "has left" |
| PATCH | `/api/v1/entry/registration` | no | Toggle "registered" |
| PUT | `/api/v1/entry/plate` | no | Replace the plate on an entry |
| GET | `/api/v1/number-plate/suggestion/search` | no | Prefix suggestions, previous shift first |
| GET | `/api/v1/number-plate/search` | no | Prefix search |
| GET | `/api/v1/number-plate` | no | All plates |
| GET | `/api/v1/number-plate/:id` | no | One plate |
| PUT | `/api/v1/number-plate` | no | Toggle the regular flag |

Example: log in, then add a plate to the current list.

```bash
curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"operator@example.com\",\"password\":\"Plate1!a\"}"

curl -s -X POST http://localhost:3000/api/v1/entry \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -d "{\"numberplate\":\"AB1234\"}"
```

The entry body field is `numberplate`, one word.

## Database

Migrations and seeds live in `src/db/migrations` and `src/db/seeds`. Kysely runs them:

```bash
npm run m -- migrate:latest
npm run m -- seed:run
```

`npm run m` is `npx kysely`. Config is `.config/kysely.config.ts`.

## Docker and CI

`docker compose up -d platenote-db` is the database used above and in CI. `docker compose up` also builds the API image (`DockerFile`) and publishes it on port 3000. The API service in Compose sets `DEV_DB_HOST=platenote-db` and does not pass the rest of the database settings, so local development against the database container is the path covered here.

GitHub Actions on `main` installs dependencies, runs `npm run build`, starts Postgres, and applies migrations and seeds. `npm test` is a placeholder and exits with an error. There is no test suite in this repository yet.

## License

ISC, as declared in `package.json`.
