import React, { useState, useEffect } from 'react'
import SiteTemplate from '../components/SiteTemplate'

export default function SitePage() {
  const [site, setSite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get site ID from URL
  const siteId = window.location.pathname.split('/').pop()

  useEffect(() => {
    loadSite()
  }, [siteId])

  const loadSite = async () => {
    try {
      setLoading(true)
      
      // Try to load from backend
      const response = await fetch(`http://localhost:8000/api/sites/${siteId}`)
      
      if (response.ok) {
        const data = await response.json()
        setSite(data.site)
      } else if (response.status === 404) {
        setError('الموقع غير موجود')
      } else {
        setError('حدث خطأ في تحميل الموقع')
      }
    } catch (e) {
      // If backend fails, load from localStorage as fallback
      try {
        const storedSites = JSON.parse(localStorage.getItem('dojo3_sites') || '{}')
        if (storedSites[siteId]) {
          setSite(storedSites[siteId])
        } else {
          setError('الموقع غير موجود')
        }
      } catch (e) {
        setError('فشل في تحميل الموقع')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div style={{textAlign: 'center', padding: '40px', color: '#fff'}}>⏳ جاري التحميل...</div>
  }

  if (error) {
    return (
      <div style={{textAlign: 'center', padding: '40px', color: '#fff'}}>
        <h2 style={{color: '#FF6B6B'}}>{error}</h2>
        <p>الرجاء التحقق من الرابط والمحاولة مرة أخرى</p>
      </div>
    )
  }

  return <SiteTemplate siteData={site} />
}
