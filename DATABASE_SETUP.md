# Database Setup Guide

## 🚀 Quick Start

The application includes fallback data and will work perfectly without a database. However, for full CMS functionality, follow these setup options:

## Option 1: Docker Compose (Recommended)

```bash
# Start PostgreSQL with Docker Compose
docker-compose up -d

# Run the setup script
./scripts/setup-db.sh
```

## Option 2: Manual Docker Setup

```bash
# Start PostgreSQL with Docker
docker run --name portfolio-db \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=asdffdsa \
  -e POSTGRES_DB=team \
  -p 5432:5432 \
  -d postgres:15

# Run the setup script
./scripts/setup-db.sh
```

## Option 3: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database named `team` with user `root`
3. Run the setup script:
   ```bash
   ./scripts/setup-db.sh
   ```

## Option 4: No Database (Fallback Mode)

The application automatically uses beautiful fallback data when the database is unavailable. Perfect for:

- ✅ Quick development and testing
- ✅ Demo purposes
- ✅ Getting started without database setup

## Environment Configuration

Your `.env` file is already configured:

```env
DATABASE_URL="postgresql://root:asdffdsa@localhost:5432/team?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="jndwTGY9TZmrflpEk1kD5B8u29RjiW6EIW6Zuj/VbjI="
```

## Useful Commands

```bash
# Start database with Docker Compose
docker-compose up -d

# Stop database
docker-compose down

# View database in Prisma Studio
npx prisma studio

# Reset database (if needed)
npx prisma migrate reset

# Generate Prisma client (if needed)
npx prisma generate
```

## Troubleshooting

- **Database connection errors**: The app will automatically use fallback data
- **Port 5432 in use**: Stop other PostgreSQL instances or change the port
- **Permission errors**: Make sure the setup script is executable: `chmod +x scripts/setup-db.sh`

## 🎉 Ready to Go!

Your modern portfolio works beautifully with or without the database!
