#!/bin/bash
# 🚀 Dojo3 Quick Start Script
# Automates the initial setup process

set -e

echo "================================"
echo "  🎪 Dojo3 Quick Start Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Python
echo -e "${BLUE}Checking Python...${NC}"
python3 --version || { echo "❌ Python 3 not found"; exit 1; }

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
node --version || { echo "❌ Node.js not found"; exit 1; }

echo ""
echo -e "${BLUE}Setting up Backend...${NC}"
echo "1. Creating virtual environment..."
python3 -m venv backend/.venv
source backend/.venv/bin/activate

echo "2. Installing Python dependencies..."
pip install -q -r backend/requirements.txt

echo "3. Creating .env file..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "   ✓ Created backend/.env (please edit with your values)"
else
    echo "   ⚠️  backend/.env already exists (skipped)"
fi

echo ""
echo -e "${BLUE}Setting up Frontend...${NC}"
echo "1. Installing Node.js dependencies..."
cd frontend && npm install -q
cd ..

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo ""
echo "1. Edit backend configuration:"
echo "   nano backend/.env"
echo ""
echo "2. Start the backend (Terminal 1):"
echo "   source backend/.venv/bin/activate"
echo "   PROOF_SECRET=dev-secret ADMIN_TOKEN=admin \\"
echo "   uvicorn backend.app:APP --reload --host 0.0.0.0 --port 8000"
echo ""
echo "3. Start the frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open in browser:"
echo "   http://localhost:5173"
echo ""
echo "📖 For detailed setup instructions, see: DEVELOPMENT_SETUP.md"
echo ""
