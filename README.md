## nest-server

### Installation

```shell script
git clone https://github.com/ingakuznetsova/nest-server.git
cd ./nest-server
npm install
createdb simplenest
npm run typeorm:migration:run
```

### Environment

Create the `.env` file with the following environment variables:
```shell script
DB_HOST="localhost"
DB_PORT=5432
DB_USER=""
DB_PASSWORD=""
DB_DATABASE="simplenest"
DB_MIGRATIONS=true
PORT=2111
MODE="DEV"
```

### Running the app

```shell script
# development
npm run start:dev
```
