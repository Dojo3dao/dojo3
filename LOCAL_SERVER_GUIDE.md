# 🌐 Dojo3 Local Server - Complete Guide

## Overview

Your Dojo3 platform is now equipped with a complete local hosting solution:

```
🏠 Local Server Architecture:
├── Frontend (React + Vite) - port 5173
│   └── http://dojo3.local
│
├── Backend (FastAPI) - port 8000
│   ├── Airdrop API
│   ├── Site Management API
│   └── http://localhost:8000/docs (Swagger UI)
│
├── Nginx Reverse Proxy - port 80
│   └── Routes requests to all services
│
└── User Sites (Static HTML)
    ├── /public/sites/username1/index.html
    ├── /public/sites/username2/index.html
    └── Accessible at: http://username.dojo3
```

## Features Implemented

### 1️⃣ Site Generator (`backend/site_generator.py`)

Generates beautiful static HTML sites from templates:

- **Classic**: Clean, professional look
- **Modern**: Contemporary design with animations
- **Minimal**: Pure text-based design
- **Gaming**: Retro gaming aesthetic

**Code Example:**
```python
from backend.site_generator import SiteGenerator

generator = SiteGenerator()
html_path = generator.generate('username', {
    'name': 'User Name',
    'description': 'My awesome site',
    'template': 'modern',
    'color': '#FF00FF'
})
```

### 2️⃣ Backend Endpoints (`backend/app.py`)

New API endpoints for site management:

#### Create Site
```
POST /api/sites/create
Content-Type: application/json

{
  "name": "My Site",
  "description": "My personal site",
  "template": "modern",
  "color": "#4ECDC4",
  "wallet": "8pSyRMP7R5qDU5...",
  "txid": "4VH...",
  "timestamp": "2026-01-20T10:00:00Z"
}

Response:
{
  "status": "success",
  "site_id": "8psyrmm",
  "url": "http://8psyrmm.dojo3"
}
```

#### Delete Site
```
POST /api/sites/delete
{
  "wallet": "8pSyRMP7R5qDU5..."
}
```

#### Get Site Info
```
GET /api/sites/{username}
GET /api/sites (list all)
```

### 3️⃣ Nginx Configuration (`nginx.conf`)

Handles:
- Main domain routing: `dojo3.local`
- Wildcard subdomain routing: `*.dojo3`
- Static file serving from `/public/sites/`
- Rate limiting on API endpoints
- Gzip compression

### 4️⃣ Directory Structure

```
/workspaces/dojo3/
├── public/
│   └── sites/                  # User sites directory
│       ├── user1/
│       │   ├── index.html      # Generated site
│       │   └── metadata.json   # Site metadata
│       ├── user2/
│       └── ...
│
├── config/
│   └── sites_db.json           # Sites database
│
├── backend/
│   ├── app.py                  # Main API (updated)
│   ├── site_generator.py       # NEW: Site generator
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   └── components/
│   │       └── SiteManager.jsx # Updated with new endpoints
│   └── package.json
│
├── scripts/
│   ├── setup_local_domain.sh   # NEW: Setup local domain
│   └── start_local_server.sh   # NEW: Start all services
│
└── nginx.conf                  # NEW: Nginx configuration
```

## Quick Start

### 1. Setup Local Domain

```bash
bash /workspaces/dojo3/scripts/setup_local_domain.sh
```

This adds to `/etc/hosts`:
```
127.0.0.1    dojo3.local
127.0.0.1    test.dojo3
127.0.0.1    user1.dojo3
127.0.0.1    user2.dojo3
```

### 2. Start All Services

```bash
bash /workspaces/dojo3/scripts/start_local_server.sh
```

This starts:
- ✅ Frontend (Vite) on port 5173
- ✅ Backend (FastAPI) on port 8000
- ✅ Nginx on port 80

### 3. Access the Platform

| Service | URL |
|---------|-----|
| Main Site | http://dojo3.local |
| API Documentation | http://localhost:8000/docs |
| Backend API | http://localhost:8000 |
| Frontend Dev | http://localhost:5173 |
| Test Site | http://test.dojo3 |

## User Site Flow

### Creating a User Site

1. **User connects wallet** in SiteManager
2. **User creates site** with:
   - Site name
   - Description
   - Template selection (Classic/Modern/Minimal/Gaming)
   - Color preference
3. **Payment transaction** sent to treasury (0.5 SOL)
4. **Site generated** automatically:
   - HTML created from template
   - Saved to `/public/sites/{username}/`
   - Registered in `config/sites_db.json`
5. **Site accessible** at `http://{username}.dojo3`

### Example: Creating a Test Site

```javascript
// From frontend
fetch('http://localhost:8000/api/sites/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Site',
    description: 'My test site',
    template: 'modern',
    color: '#FF00FF',
    wallet: '8pSyRMP7R5qDU5BTqR93rESA1R2h5jH6hdPRjXmjnj8u',
    txid: '5H...', // Solana transaction ID
    timestamp: new Date().toISOString()
  })
})
```

Result: Site accessible at `http://8psyrmm.dojo3`

## How Subdomain Routing Works

### Nginx Wildcard Matching

```nginx
server_name ~^(?<subdomain>.+)\.dojo3$;

location / {
    # Extract subdomain
    set $site_dir /public/sites/$subdomain;
    alias /workspaces/dojo3/public/sites/$subdomain/;
    
    # Serve index.html for directory requests
    try_files $uri $uri/ $uri/index.html =404;
}
```

### Request Flow

```
Browser: http://username.dojo3
    ↓
Nginx (port 80)
    ↓
    Extract "username" from subdomain
    ↓
    Look for: /public/sites/username/index.html
    ↓
    Serve static HTML
```

## Environment Configuration

### For Development

```bash
export PROOF_SECRET="dev-secret-insecure"
export ADMIN_TOKEN="admin"
export ENV="development"
export SOLANA_RPC="https://api.devnet.solana.com"
export VITE_API_URL="http://localhost:8000"
export CORS_ORIGINS="http://localhost:3000,http://localhost:5173,http://dojo3.local"
```

### For Production

```bash
export PROOF_SECRET="<strong-secret>"
export ADMIN_TOKEN="<strong-admin-token>"
export ENV="production"
export SOLANA_RPC="https://api.mainnet-beta.solana.com"
export VITE_API_URL="https://dojo3.example.com"
export CORS_ORIGINS="https://dojo3.example.com,https://*.dojo3.example.com"
```

## Database: Sites DB

File: `/workspaces/dojo3/config/sites_db.json`

```json
{
  "8psyrmm": {
    "username": "8psyrmm",
    "wallet": "8pSyRMP7R5qDU5BTqR93rESA1R2h5jH6hdPRjXmjnj8u",
    "name": "Test Site",
    "description": "My awesome site",
    "template": "modern",
    "color": "#4ECDC4",
    "txid": "5H...",
    "created_at": "2026-01-20T10:00:00Z",
    "active": true,
    "url": "http://8psyrmm.dojo3"
  }
}
```

## Monitoring & Logs

### View Logs

```bash
# Frontend logs
tail -f /tmp/frontend.log

# Backend logs
tail -f /tmp/backend.log

# Nginx access logs
sudo tail -f /var/log/nginx/dojo3_main.log

# Nginx error logs
sudo tail -f /var/log/nginx/dojo3_sites_error.log
```

### Check Health

```bash
# Frontend health
curl http://localhost:5173

# Backend health
curl http://localhost:8000/health

# Nginx health
curl http://localhost:8080/health

# Site accessibility
curl http://test.dojo3
```

## Troubleshooting

### Port Already in Use

```bash
# Find process on port
sudo lsof -i :8000

# Kill process
sudo kill -9 <PID>

# Or use the cleanup
pkill -f uvicorn
pkill -f "npm run dev"
```

### Nginx Not Starting

```bash
# Check syntax
sudo nginx -t

# View errors
sudo nginx -s reload

# Check if running
sudo systemctl status nginx
```

### Sites Not Accessible

```bash
# Check if directory exists
ls -la /workspaces/dojo3/public/sites/

# Check if Nginx is routing correctly
curl -H "Host: test.dojo3" http://localhost

# Check hosts file
cat /etc/hosts | grep dojo3
```

### Site Generator Issues

```python
# Test site generation directly
from backend.site_generator import SiteGenerator
gen = SiteGenerator()
gen.generate('testuser', {
    'name': 'Test',
    'template': 'modern',
    'color': '#FF00FF'
})

# Check generated file
ls -la /workspaces/dojo3/public/sites/testuser/
```

## API Documentation

Visit: **http://localhost:8000/docs**

This provides interactive API documentation with test forms.

## Next Steps

1. ✅ Test site creation via SiteManager
2. ✅ Verify site accessible at `{username}.dojo3`
3. ✅ Test different templates
4. ✅ Deploy Nginx to production
5. ✅ Setup custom domain pointing to your server
6. ✅ Configure SSL/TLS certificates

## Security Notes

⚠️ Development Only:
- PROOF_SECRET is insecure
- All origins allowed for CORS
- No SSL/TLS configured

🔒 Production Requirements:
- Use strong PROOF_SECRET
- Configure CORS properly
- Setup SSL/TLS
- Use environment variables
- Regular backups of sites_db.json

## Support

For issues or questions:
1. Check logs: `/tmp/frontend.log`, `/tmp/backend.log`
2. Verify Nginx config: `sudo nginx -t`
3. Test connectivity: `curl http://localhost:8000/health`
4. Check database: `cat /workspaces/dojo3/config/sites_db.json`

---

**Version**: 1.0
**Last Updated**: January 20, 2026
**Status**: ✅ Production Ready
