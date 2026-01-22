#!/bin/bash
# Start Dojo3 Local Server
# Starts: Frontend (Vite) + Backend (FastAPI) + Nginx

set -e

PROJECT_ROOT="/workspaces/dojo3"
cd "$PROJECT_ROOT"

echo "🚀 Starting Dojo3 Local Server..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0 # Port is in use
    else
        return 1 # Port is free
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    if check_port $port; then
        echo "⚠️  Port $port in use, killing process..."
        lsof -ti :$port | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
}

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down Dojo3..."
    kill_port 5173  # Frontend
    kill_port 8000  # Backend
    sudo kill_port 80    # Nginx
    echo "✅ All services stopped"
}

# Set trap for cleanup
trap cleanup EXIT INT TERM

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}   DOJO3 LOCAL SERVER${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

# Kill existing processes on ports
echo "🧹 Cleaning up old processes..."
kill_port 5173
kill_port 8000
kill_port 80

sleep 1

# ============================================
# 1. SETUP HOSTS FILE
# ============================================
echo -e "${YELLOW}[1/4] Setting up local domain...${NC}"
if ! grep -q "dojo3.local" /etc/hosts 2>/dev/null; then
    echo "127.0.0.1    dojo3.local" | sudo tee -a /etc/hosts > /dev/null
    echo "127.0.0.1    test.dojo3" | sudo tee -a /etc/hosts > /dev/null
fi
echo "✅ Local domain configured"
echo ""

# ============================================
# 2. START FRONTEND (Vite)
# ============================================
echo -e "${YELLOW}[2/4] Starting Frontend (Vite on port 5173)...${NC}"
cd "$PROJECT_ROOT/frontend"
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install > /dev/null 2>&1
fi
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
sleep 3
echo ""

# ============================================
# 3. START BACKEND (FastAPI)
# ============================================
echo -e "${YELLOW}[3/4] Starting Backend (FastAPI on port 8000)...${NC}"
cd "$PROJECT_ROOT/backend"

# Setup Python environment
if [ ! -d ".venv" ]; then
    echo "🐍 Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate venv and install requirements
source .venv/bin/activate
if [ -f "requirements.txt" ]; then
    echo "📦 Installing Python dependencies..."
    pip install -q -r requirements.txt
fi

# Start backend
export PROOF_SECRET="dev-secret-insecure"
export ADMIN_TOKEN="admin"
export ENV="development"
export SOLANA_RPC="https://api.mainnet-beta.solana.com"
export VITE_API_URL="http://localhost:8000"
export CORS_ORIGINS="http://localhost:3000,http://localhost:5173,http://dojo3.local,http://*.dojo3"

uvicorn app:APP --reload --host 0.0.0.0 --port 8000 > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
sleep 3
echo ""

# ============================================
# 4. START NGINX
# ============================================
echo -e "${YELLOW}[4/4] Starting Nginx (port 80)...${NC}"

# Check if nginx is installed
if ! command -v nginx &> /dev/null; then
    echo "⚠️  Nginx not installed. Installing..."
    sudo apt-get update > /dev/null 2>&1
    sudo apt-get install -y nginx > /dev/null 2>&1
fi

# Start Nginx with our config
sudo nginx -c "$PROJECT_ROOT/nginx.conf" 2>/dev/null || true
sleep 2
echo "✅ Nginx started"
echo ""

# ============================================
# VERIFY ALL SERVICES
# ============================================
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}   SERVICES RUNNING${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

# Check frontend
if check_port 5173; then
    echo -e "${GREEN}✓${NC} Frontend   http://localhost:5173"
    echo -e "${GREEN}✓${NC}            http://dojo3.local"
else
    echo -e "${RED}✗${NC} Frontend   FAILED (check /tmp/frontend.log)"
fi

# Check backend
if check_port 8000; then
    echo -e "${GREEN}✓${NC} Backend    http://localhost:8000"
    echo -e "${GREEN}✓${NC}            API Documentation: http://localhost:8000/docs"
else
    echo -e "${RED}✗${NC} Backend    FAILED (check /tmp/backend.log)"
fi

# Check nginx
if check_port 80; then
    echo -e "${GREEN}✓${NC} Nginx      http://dojo3.local:80"
else
    echo -e "${RED}✗${NC} Nginx      FAILED (check sudo logs)"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}   READY TO USE${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""
echo "🌐 Access the platform:"
echo "   📍 Main Site:   http://dojo3.local"
echo "   📍 API Docs:    http://localhost:8000/docs"
echo "   📍 Mainnet Sites:  (Live Mainnet — use caution)"
echo "   📍 User Sites:  http://<username>.dojo3"
echo ""
echo "📝 Logs:"
echo "   Frontend: tail -f /tmp/frontend.log"
echo "   Backend:  tail -f /tmp/backend.log"
echo ""
echo "⏹️  To stop: Ctrl+C"
echo ""

# Keep running
wait
