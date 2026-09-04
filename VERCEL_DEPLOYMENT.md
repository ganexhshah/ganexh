# Vercel Deployment Guide for ganeshshah.com

This repository is pre-configured for automated, zero-config deployment to **Vercel**.

---

## 1. Quick Deploy via Vercel Dashboard

1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Import your GitHub repository: **`ganexhshah/ganesh2064`**.
4. **Project Settings**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Leave as `./` (or select `frontend`). The repository root includes a `vercel.json` and `package.json` that automatically builds `frontend`.
5. Under **Environment Variables**, add the following keys from your `.env.local`:

| Variable Name | Description | Example / Current Value |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Project ID | `97jei0ea` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity Dataset | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API Version | `2024-03-01` |
| `SANITY_API_TOKEN` | Sanity Backend Access Token | *(from your .env.local)* |
| `R2_ACCOUNT_ID` | Cloudflare R2 Account ID | `516d4d7c8a274b7f897979999bcb096b` |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 Access Key | `80077dcf329a6b01c33e2c44b2b31e9b` |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 Secret Key | `506cbfc47728c0c24cb2756620e9936fcddd35f0ed9c633102454c6ddb86f2b4` |
| `R2_BUCKET_NAME` | Cloudflare R2 Bucket | `protofilo` |
| `NEXT_PUBLIC_R2_PUBLIC_URL` | Custom Domain for R2 Assets | `https://assets.ganeshshah.com` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console Token *(Optional)* | *(your verification token)* |

6. Click **Deploy**. Vercel will build all 39 static and dynamic routes.

---

## 2. Connect Your Custom Domain (`ganeshshah.com`)

1. Once the deployment succeeds, navigate to your Vercel Project **Settings** → **Domains**.
2. Add **`ganeshshah.com`** and **`www.ganeshshah.com`**.
3. In your DNS provider (e.g., Cloudflare, Namecheap, GoDaddy):
   - Add an **A Record**:
     - **Name**: `@`
     - **Value**: `76.76.21.21`
   - Add a **CNAME Record**:
     - **Name**: `www`
     - **Value**: `cname.vercel-dns.com`
4. Vercel will automatically provision a free SSL/TLS certificate.
