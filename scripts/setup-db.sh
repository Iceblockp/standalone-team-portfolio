#!/bin/bash

# Database Setup Script for Team Portfolio
echo "🚀 Setting up database for Team Portfolio..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running on localhost:5432"
    echo "Please start PostgreSQL or use Docker:"
    echo "docker run --name portfolio-db -e POSTGRES_PASSWORD=asdffdsa -e POSTGRES_USER=root -e POSTGRES_DB=team -p 5432:5432 -d postgres:15"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if it doesn't exist
echo "📦 Creating database 'team' if it doesn't exist..."
PGPASSWORD=asdffdsa createdb -h localhost -p 5432 -U root team 2>/dev/null || echo "Database 'team' already exists or couldn't be created"

# Run Prisma migrations
echo "🔄 Running Prisma migrations..."
npx prisma migrate dev --name init

# Generate Prisma client
echo "⚙️ Generating Prisma client..."
npx prisma generate

echo "✅ Database setup complete!"
echo "🎉 You can now run 'npm run dev' to start the application"