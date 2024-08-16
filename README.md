# Development

Pasos para levantar la app en desarrollo

### 1. Levantar la base de datos

```sh
docker compose up -d
```

### 2. Crear una copia de `.env.template` y renombrarlo a `.env`

### 3. Reemplazar las variables de entorno

### 4. Instalar las librerias del proyecto

```sh
npm install
```

### 5. Ejecutar comandos de prisma

```sh
npx prisma migrate dev
npx prisma generate
```

### 6. Arrancar el proyecto

```sh
npm run dev
```

### 7. Ejecutar el SEED para poblar la base de datos: http://localhost:3000/api/seed

## Comandos Utilitarios de Prisma

```sh
npx prisma init
npx prisma migrate dev
npm install @prisma/client
npx prisma generate
```
