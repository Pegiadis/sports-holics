/**
 * Debug Page - Check Environment Variables
 * Visit this page to see what STRAPI_URL your frontend is using
 * 
 * URL: https://your-vercel-site.vercel.app/debug
 */

import { STRAPI_URL } from '@/lib/sports-api';

export default function DebugPage() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'monospace',
      backgroundColor: '#1a1a1a',
      color: '#00ff00',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#00ff00' }}>🔍 Frontend Debug Info</h1>
      
      <div style={{ marginTop: '30px', fontSize: '16px' }}>
        <h2 style={{ color: '#ffff00' }}>Environment Configuration:</h2>
        
        <div style={{ 
          backgroundColor: '#000', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px',
          border: '2px solid #00ff00'
        }}>
          <p><strong>STRAPI_URL being used:</strong></p>
          <p style={{ 
            fontSize: '20px', 
            color: '#00ffff',
            wordBreak: 'break-all'
          }}>
            {STRAPI_URL}
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#000', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px',
          border: '2px solid #ffff00'
        }}>
          <p><strong>Expected for Production:</strong></p>
          <p style={{ color: '#ffff00' }}>
            https://your-strapi-url.strapiapp.com
          </p>
          <p style={{ color: '#ff6666', marginTop: '10px' }}>
            ❌ If you see "http://localhost:1337" above, your environment variable is NOT set!
          </p>
          <p style={{ color: '#66ff66', marginTop: '10px' }}>
            ✅ If you see your Strapi Cloud URL above, environment variable is set correctly!
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#000', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px',
          border: '2px solid #ff00ff'
        }}>
          <h3 style={{ color: '#ff00ff' }}>Test API Endpoints:</h3>
          <p>Click these links to test if Strapi API is accessible:</p>
          <ul style={{ marginTop: '15px' }}>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href={`${STRAPI_URL}/api/football-articles?populate=image`}
                target="_blank"
                style={{ color: '#00ffff', textDecoration: 'underline' }}
              >
                Test Football Articles API
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href={`${STRAPI_URL}/api/basketball-articles?populate=image`}
                target="_blank"
                style={{ color: '#00ffff', textDecoration: 'underline' }}
              >
                Test Basketball Articles API
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href={`${STRAPI_URL}/api/formula1-articles?populate=image`}
                target="_blank"
                style={{ color: '#00ffff', textDecoration: 'underline' }}
              >
                Test Formula1 Articles API
              </a>
            </li>
          </ul>
        </div>

        <div style={{ 
          backgroundColor: '#2a0a0a', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '30px',
          border: '2px solid #ff0000'
        }}>
          <h3 style={{ color: '#ff6666' }}>⚠️ How to Fix Issues:</h3>
          
          <h4 style={{ color: '#ffff66', marginTop: '15px' }}>If STRAPI_URL is "localhost:1337":</h4>
          <ol style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Go to Vercel Dashboard → Your Project → Settings → Environment Variables</li>
            <li>Add: <code>NEXT_PUBLIC_STRAPI_API_URL</code> = <code>https://your-strapi.strapiapp.com</code></li>
            <li>Check all environments: Production, Preview, Development</li>
            <li>Go to Deployments → Redeploy (MUST REDEPLOY after adding env vars!)</li>
          </ol>

          <h4 style={{ color: '#ffff66', marginTop: '15px' }}>If STRAPI_URL is correct but API fails:</h4>
          <ol style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Check browser console (F12) for CORS errors</li>
            <li>Verify Strapi permissions: Settings → Roles → Public → Enable "find" and "findOne"</li>
            <li>Make sure article is Published (not Draft) in Strapi</li>
          </ol>
        </div>

        <div style={{ 
          backgroundColor: '#000', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '30px',
          border: '2px solid #00ff00'
        }}>
          <h3 style={{ color: '#00ff00' }}>📝 What to Do:</h3>
          <ol style={{ marginLeft: '20px', lineHeight: '2' }}>
            <li>Check what STRAPI_URL is shown above</li>
            <li>Click the test API links above</li>
            <li>Open browser console (F12) and check for errors</li>
            <li>Report back what you see!</li>
          </ol>
        </div>

        <div style={{ marginTop: '30px', color: '#888' }}>
          <p><strong>Note:</strong> Delete this debug page after troubleshooting!</p>
          <p>File location: <code>frontend/app/debug/page.tsx</code></p>
        </div>
      </div>
    </div>
  );
}

