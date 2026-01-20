"""
Site Generator - Generate HTML for user sites
Supports multiple templates: Classic, Modern, Minimal, Gaming
"""
from pathlib import Path
from typing import Dict, Optional
import json
from datetime import datetime


class SiteGenerator:
    """Generate static HTML sites from user data"""
    
    TEMPLATES = {
        'classic': 'template_classic',
        'modern': 'template_modern',
        'minimal': 'template_minimal',
        'gaming': 'template_gaming'
    }
    
    def __init__(self, sites_dir: Path = None):
        """Initialize site generator
        
        Args:
            sites_dir: Directory to store generated sites (default: /public/sites)
        """
        if sites_dir is None:
            sites_dir = Path(__file__).parent.parent / 'public' / 'sites'
        
        self.sites_dir = Path(sites_dir)
        self.sites_dir.mkdir(parents=True, exist_ok=True)
    
    def generate(self, username: str, site_data: Dict) -> str:
        """Generate a site from user data
        
        Args:
            username: Username (will be used as subdomain)
            site_data: Dict with keys: name, description, template, color
            
        Returns:
            Path to generated index.html
        """
        template_type = site_data.get('template', 'classic')
        template_method = getattr(self, self.TEMPLATES.get(template_type, 'template_classic'))
        
        html_content = template_method(username, site_data)
        
        # Create user directory
        user_dir = self.sites_dir / username
        user_dir.mkdir(parents=True, exist_ok=True)
        
        # Write index.html
        index_path = user_dir / 'index.html'
        index_path.write_text(html_content, encoding='utf-8')
        
        # Save metadata
        metadata = {
            'username': username,
            'name': site_data.get('name', username),
            'description': site_data.get('description', ''),
            'template': template_type,
            'color': site_data.get('color', '#4ECDC4'),
            'created_at': datetime.now().isoformat(),
            'status': 'active'
        }
        metadata_path = user_dir / 'metadata.json'
        metadata_path.write_text(json.dumps(metadata, indent=2), encoding='utf-8')
        
        return str(index_path)
    
    def delete_site(self, username: str) -> bool:
        """Delete a user's site
        
        Args:
            username: Username to delete
            
        Returns:
            True if deleted, False if not found
        """
        user_dir = self.sites_dir / username
        if not user_dir.exists():
            return False
        
        import shutil
        shutil.rmtree(user_dir)
        return True
    
    def template_classic(self, username: str, data: Dict) -> str:
        """Classic template - simple and clean"""
        color = data.get('color', '#4ECDC4')
        name = data.get('name', username)
        description = data.get('description', '')
        
        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} - Dojo3</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }}
        
        .container {{
            max-width: 800px;
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba({self.hex_to_rgb(color)}, 0.3);
            border-radius: 10px;
            padding: 60px 40px;
            text-align: center;
            backdrop-filter: blur(10px);
        }}
        
        .header {{
            margin-bottom: 30px;
        }}
        
        .avatar {{
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(135deg, {color}, {self.lighten_color(color)});
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            font-weight: bold;
            color: #fff;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }}
        
        h1 {{
            font-size: 42px;
            margin-bottom: 10px;
            color: {color};
        }}
        
        .subtitle {{
            font-size: 16px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 30px;
        }}
        
        .description {{
            font-size: 16px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 40px;
        }}
        
        .footer {{
            border-top: 1px solid rgba({self.hex_to_rgb(color)}, 0.2);
            padding-top: 20px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
        }}
        
        .footer a {{
            color: {color};
            text-decoration: none;
            transition: opacity 0.3s;
        }}
        
        .footer a:hover {{
            opacity: 0.8;
        }}
        
        @media (max-width: 600px) {{
            .container {{
                padding: 40px 20px;
            }}
            h1 {{
                font-size: 32px;
            }}
            .avatar {{
                width: 80px;
                height: 80px;
                font-size: 32px;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="avatar">{username[0].upper()}</div>
            <h1>{name}</h1>
            <p class="subtitle">@{username} on Dojo3</p>
        </div>
        
        <p class="description">{description if description else "Welcome to my personal site on Dojo3!"}</p>
        
        <div class="footer">
            <p>Powered by <a href="https://dojo3.local">Dojo3</a> • {datetime.now().strftime('%Y')}</p>
        </div>
    </div>
</body>
</html>"""
    
    def template_modern(self, username: str, data: Dict) -> str:
        """Modern template - contemporary design"""
        color = data.get('color', '#4ECDC4')
        name = data.get('name', username)
        description = data.get('description', '')
        
        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} - Dojo3</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Poppins', 'Segoe UI', sans-serif;
            background: linear-gradient(-45deg, #1e1e1e, #2d2d2d, #1a1a1a, #333);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            color: #fff;
            min-height: 100vh;
        }}
        
        @keyframes gradient {{
            0% {{ background-position: 0% 50%; }}
            50% {{ background-position: 100% 50%; }}
            100% {{ background-position: 0% 50%; }}
        }}
        
        .navbar {{
            background: rgba(0, 0, 0, 0.2);
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba({self.hex_to_rgb(color)}, 0.1);
        }}
        
        .logo {{
            font-size: 24px;
            font-weight: bold;
            color: {color};
        }}
        
        .container {{
            max-width: 1000px;
            margin: 0 auto;
            padding: 80px 40px;
        }}
        
        .hero {{
            text-align: center;
            margin-bottom: 60px;
        }}
        
        .hero-avatar {{
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: linear-gradient(135deg, {color}, {self.lighten_color(color)});
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 56px;
            font-weight: bold;
            color: #fff;
            box-shadow: 0 20px 60px rgba({self.hex_to_rgb(color)}, 0.3);
            animation: float 3s ease-in-out infinite;
        }}
        
        @keyframes float {{
            0%, 100% {{ transform: translateY(0px); }}
            50% {{ transform: translateY(-20px); }}
        }}
        
        h1 {{
            font-size: 48px;
            margin-bottom: 10px;
            color: #fff;
        }}
        
        .subtitle {{
            font-size: 18px;
            color: {color};
            margin-bottom: 20px;
            font-weight: 500;
        }}
        
        .description {{
            font-size: 16px;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 40px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }}
        
        .cta-button {{
            display: inline-block;
            padding: 14px 40px;
            background: linear-gradient(135deg, {color}, {self.lighten_color(color)});
            color: #000;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 10px 30px rgba({self.hex_to_rgb(color)}, 0.2);
        }}
        
        .cta-button:hover {{
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba({self.hex_to_rgb(color)}, 0.4);
        }}
        
        .footer {{
            text-align: center;
            padding-top: 40px;
            margin-top: 60px;
            border-top: 1px solid rgba({self.hex_to_rgb(color)}, 0.1);
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
        }}
        
        @media (max-width: 600px) {{
            .navbar {{
                padding: 15px 20px;
            }}
            .container {{
                padding: 40px 20px;
            }}
            h1 {{
                font-size: 36px;
            }}
        }}
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="logo">Dojo3</div>
        <div>@{username}</div>
    </nav>
    
    <div class="container">
        <div class="hero">
            <div class="hero-avatar">{username[0].upper()}</div>
            <h1>{name}</h1>
            <p class="subtitle">Welcome to my Dojo3 Site</p>
            <p class="description">{description if description else "Creating amazing experiences on Web3"}</p>
            <a href="https://dojo3.local" class="cta-button">← Back to Dojo3</a>
        </div>
    </div>
    
    <div class="footer">
        <p>© {datetime.now().strftime('%Y')} on Dojo3 • Powered by Blockchain</p>
    </div>
</body>
</html>"""
    
    def template_minimal(self, username: str, data: Dict) -> str:
        """Minimal template - clean and simple"""
        color = data.get('color', '#4ECDC4')
        name = data.get('name', username)
        description = data.get('description', '')
        
        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Courier New', monospace;
            background: #fff;
            color: #000;
            padding: 40px 20px;
            line-height: 1.6;
        }}
        
        .container {{
            max-width: 600px;
            margin: 0 auto;
        }}
        
        h1 {{
            font-size: 32px;
            margin-bottom: 10px;
            color: {color};
        }}
        
        .meta {{
            font-size: 14px;
            color: #999;
            margin-bottom: 40px;
        }}
        
        p {{
            font-size: 16px;
            margin-bottom: 20px;
            color: #333;
        }}
        
        .divider {{
            border: none;
            border-top: 1px solid #eee;
            margin: 40px 0;
        }}
        
        a {{
            color: {color};
            text-decoration: none;
            border-bottom: 1px dotted {color};
        }}
        
        a:hover {{
            opacity: 0.7;
        }}
        
        .footer {{
            font-size: 12px;
            color: #999;
            margin-top: 60px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>{name}</h1>
        <div class="meta">@{username} on <a href="https://dojo3.local">Dojo3</a></div>
        
        <p>{description if description else "A minimal site on Dojo3"}</p>
        
        <hr class="divider">
        
        <div class="footer">
            <p>Made with Dojo3 • {datetime.now().strftime('%Y')}</p>
        </div>
    </div>
</body>
</html>"""
    
    def template_gaming(self, username: str, data: Dict) -> str:
        """Gaming template - vibrant and playful"""
        color = data.get('color', '#00FF41')
        name = data.get('name', username)
        description = data.get('description', '')
        
        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Arial', sans-serif;
            background: #0a0a0a;
            color: {color};
            min-height: 100vh;
            overflow: hidden;
            position: relative;
        }}
        
        .scanlines {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.15),
                rgba(0, 0, 0, 0.15) 1px,
                transparent 1px,
                transparent 2px
            );
            pointer-events: none;
            z-index: 1;
        }}
        
        .container {{
            position: relative;
            z-index: 2;
            max-width: 800px;
            margin: 0 auto;
            padding: 60px 40px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-shadow: 0 0 10px {color};
        }}
        
        .title {{
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 20px;
            animation: flicker 0.15s infinite;
            text-transform: uppercase;
            letter-spacing: 3px;
        }}
        
        @keyframes flicker {{
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {{
                text-shadow: 0 0 10px {color};
            }}
            20%, 24%, 55% {{
                text-shadow: 0 0 5px {color};
            }}
        }}
        
        .player {{
            font-size: 14px;
            margin-bottom: 40px;
            opacity: 0.8;
        }}
        
        .description {{
            font-size: 16px;
            margin-bottom: 40px;
            line-height: 1.8;
        }}
        
        .button {{
            display: inline-block;
            padding: 10px 30px;
            border: 2px solid {color};
            background: rgba({self.hex_to_rgb(color)}, 0.1);
            color: {color};
            text-decoration: none;
            text-transform: uppercase;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 0 10px rgba({self.hex_to_rgb(color)}, 0.3);
        }}
        
        .button:hover {{
            background: rgba({self.hex_to_rgb(color)}, 0.2);
            box-shadow: 0 0 20px rgba({self.hex_to_rgb(color)}, 0.6);
        }}
        
        .score {{
            position: fixed;
            top: 20px;
            right: 20px;
            font-size: 12px;
            text-transform: uppercase;
            opacity: 0.7;
        }}
        
        @media (max-width: 600px) {{
            .container {{
                padding: 30px 20px;
            }}
            .title {{
                font-size: 32px;
                letter-spacing: 2px;
            }}
        }}
    </style>
</head>
<body>
    <div class="scanlines"></div>
    
    <div class="score">Player: {username}</div>
    
    <div class="container">
        <div class="title">► {name}</div>
        <div class="player">@{username}</div>
        <p class="description">{description if description else "🎮 Welcome to the Game"}</p>
        <a href="https://dojo3.local" class="button">← Back</a>
    </div>
</body>
</html>"""
    
    @staticmethod
    def hex_to_rgb(hex_color: str) -> str:
        """Convert hex color to rgb string
        
        Args:
            hex_color: Color in hex format (e.g., #FF00FF)
            
        Returns:
            RGB string (e.g., "255, 0, 255")
        """
        hex_color = hex_color.lstrip('#')
        return ', '.join(str(int(hex_color[i:i+2], 16)) for i in (0, 2, 4))
    
    @staticmethod
    def lighten_color(hex_color: str, factor: float = 1.3) -> str:
        """Lighten a hex color
        
        Args:
            hex_color: Color in hex format
            factor: Lightening factor (1.0 = no change, >1 = lighter)
            
        Returns:
            Lighter hex color
        """
        hex_color = hex_color.lstrip('#')
        r = min(int(hex_color[0:2], 16) * factor, 255)
        g = min(int(hex_color[2:4], 16) * factor, 255)
        b = min(int(hex_color[4:6], 16) * factor, 255)
        return f'#{int(r):02x}{int(g):02x}{int(b):02x}'
