# Start Sports-Holics Development Environment

Start all services: Docker Desktop, database container, Strapi CMS, and Next.js frontend.

## Instructions

Execute these commands in order:

### 1. Start Docker Desktop and Container

```bash
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

Wait 20 seconds for Docker Desktop to initialize, then start the container:

```bash
Start-Sleep -Seconds 20 && docker start 72c8b6f01278165d9825cd994b1f5084e632bacaf733cad48e31e938bd1669cf
```

### 2. Start Strapi Backend

Run in background:

```bash
cd backend/sportsholics-cms && npm run dev
```

### 3. Start Next.js Frontend

```bash
cd frontend && npm run dev
```

## Services

- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api
