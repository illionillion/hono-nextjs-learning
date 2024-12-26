環境変数

```sh
DATABASE_URL="postgresql://johndoe:postgres@localhost:54320/mydb?schema=public"
```

起動

```sh
pnpm install
docker compose up -d
pnpm generate
pnpm migrate
pnpm seed
pnpm dev
```
