

# Fix: Remove X-Frame-Options DENY Header

## Problem
The `vite.config.ts` file contains `"X-Frame-Options": "DENY"` in the server headers. This security header tells browsers to **block the page from being rendered inside any iframe**. Since the Lovable preview panel uses an iframe to display your site, this header directly causes the "refused to connect" error.

## Solution
Remove the `X-Frame-Options` header from the Vite dev server config. The other security headers are fine and can stay.

### File: `vite.config.ts`
- Remove line: `"X-Frame-Options": "DENY",`
- Keep all other headers (`X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`)

## Technical Details

The updated `headers` block will be:
```typescript
headers: {
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
},
```

## Why This Is Safe
- `X-Frame-Options` is a dev-server-only header -- it does not affect your published/production site
- The published site on `bryanlauwkfun.lovable.app` is served by Lovable's hosting infrastructure, which manages its own headers
- Removing it only affects local/preview development

## Files Changed
1. `vite.config.ts` -- remove the `X-Frame-Options: DENY` header

