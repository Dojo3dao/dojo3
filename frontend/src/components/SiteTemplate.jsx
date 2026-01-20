import React, { useState, useEffect } from 'react'

// قالب الموقع الديناميكي
export default function SiteTemplate({ siteData }) {
  const [isLoading, setIsLoading] = useState(true)
  const { name, description, color, template } = siteData || {}

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const style = `
    :root {
      --primary-color: ${color || '#4ECDC4'};
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #0a0e27 0%, #16213e 100%);
      color: #fff;
    }

    .site-header {
      background: linear-gradient(135deg, var(--primary-color) 0%, rgba(78, 205, 196, 0.6) 100%);
      padding: 40px 20px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
    }

    .site-header h1 {
      margin: 0;
      font-size: 2.5em;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .site-header p {
      margin: 10px 0 0 0;
      font-size: 1.1em;
      opacity: 0.9;
    }

    .site-container {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 20px;
    }

    .site-content {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid var(--primary-color);
      border-radius: 10px;
      padding: 40px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(78, 205, 196, 0.2);
    }

    .site-content h2 {
      color: var(--primary-color);
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 10px;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }

    .feature-card {
      background: rgba(78, 205, 196, 0.1);
      border-left: 4px solid var(--primary-color);
      padding: 20px;
      border-radius: 5px;
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 20px rgba(78, 205, 196, 0.3);
    }

    .feature-card h3 {
      margin: 0 0 10px 0;
      color: var(--primary-color);
    }

    .site-footer {
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      padding: 20px;
      margin-top: 40px;
      border-top: 1px solid var(--primary-color);
    }

    .cta-button {
      background: var(--primary-color);
      color: #000;
      border: none;
      padding: 12px 30px;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
      transition: all 0.3s ease;
    }

    .cta-button:hover {
      background: rgba(78, 205, 196, 0.8);
      box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
    }
  `

  if (isLoading) {
    return <div style={{textAlign: 'center', padding: '40px'}}>⏳ جاري تحميل الموقع...</div>
  }

  return (
    <div style={{minHeight: '100vh'}}>
      <style>{style}</style>
      
      <header className="site-header">
        <h1>🚀 {name || 'مشروعي'}</h1>
        <p>{description || 'موقع احترافي على Solana'}</p>
      </header>

      <main className="site-container">
        <section className="site-content">
          <h2>مرحباً بك في موقعي</h2>
          <p>
            هذا موقع احترافي تم إنشاؤه باستخدام منصة Dojo3. 
            يمكنك تخصيص محتوى الموقع وإضافة مزيد من الميزات.
          </p>

          <h2 style={{marginTop: '40px'}}>الميزات الرئيسية</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>⚡ سريع جداً</h3>
              <p>موقع بسيط وسريع التحميل على Solana Devnet</p>
            </div>
            <div className="feature-card">
              <h3>🎨 قابل للتخصيص</h3>
              <p>اختر ألوانك المفضلة وخصص الموقع حسب احتياجاتك</p>
            </div>
            <div className="feature-card">
              <h3>🔐 آمن تماماً</h3>
              <p>محمي بواسطة تقنية البلوكتشين وحقائق التشفير</p>
            </div>
            <div className="feature-card">
              <h3>💰 بدون رسوم إضافية</h3>
              <p>رسم واحد فقط عند الإنشاء، ثم دفع شهري للصيانة</p>
            </div>
          </div>

          <button className="cta-button">
            🚀 ابدأ الآن
          </button>
        </section>

        <section className="site-content" style={{marginTop: '30px'}}>
          <h2>إحصائيات الموقع</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
            <div>
              <div style={{fontSize: '0.8em', color: '#aaa'}}>تاريخ الإنشاء</div>
              <div style={{fontSize: '1.5em', fontWeight: 'bold', color: color}}>
                {new Date(siteData?.created_at).toLocaleDateString('ar-SA')}
              </div>
            </div>
            <div>
              <div style={{fontSize: '0.8em', color: '#aaa'}}>حالة الموقع</div>
              <div style={{fontSize: '1.5em', fontWeight: 'bold', color: siteData?.active ? '#4ECDC4' : '#FF6B6B'}}>
                {siteData?.active ? '✓ نشط' : '✗ معطل'}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          تم إنشاء هذا الموقع باستخدام منصة Dojo3 🎪<br/>
          <small style={{opacity: 0.7}}>Solana Devnet • Testnet Only</small>
        </p>
      </footer>
    </div>
  )
}
