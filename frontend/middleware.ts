import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const HTML = `<!doctype html>
<html lang="el">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Επιστρέφουμε σύντομα · Sports-Holics</title>
<style>
  html,body{margin:0;padding:0;height:100%;background:#0b0b0f;color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
  .wrap{min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center}
  .card{max-width:560px}
  .badge{display:inline-block;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#ff3b3b;border:1px solid #ff3b3b;padding:6px 12px;border-radius:999px;margin-bottom:24px}
  h1{font-size:40px;line-height:1.15;margin:0 0 16px;font-weight:800}
  p{font-size:17px;line-height:1.6;color:#b8b8c2;margin:0 0 28px}
  .brand{font-size:14px;color:#6b6b78;margin-top:40px;letter-spacing:.08em;text-transform:uppercase}
</style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="badge">Συντήρηση</div>
      <h1>Επιστρέφουμε σύντομα</h1>
      <p>Η σελίδα μας είναι προσωρινά εκτός λειτουργίας για εργασίες συντήρησης. Ευχαριστούμε για την υπομονή σας.</p>
      <div class="brand">Sports-Holics</div>
    </div>
  </div>
</body>
</html>`

export function middleware(_req: NextRequest) {
  return new NextResponse(HTML, {
    status: 503,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'retry-after': '3600',
      'cache-control': 'no-store',
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
