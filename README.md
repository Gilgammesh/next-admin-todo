# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```sh
docker compose up -d
```

2. Renombrar el `.env.template` por `.env`
3. Reemplazar las variables de entorno
4. Ejecutar el SEED para poblar la base de datos: http://localhost:3000/api/seed

## Comandos de Prisma

```sh
npx prisma init
npx prisma migrate dev
npm install @prisma/client
npx prisma generate
```