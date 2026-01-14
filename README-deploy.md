# Deployment Guide

This repository contains a Vite React client (under `client/`) and an Express/TS server. The root `npm run build` script bundles the client into `dist/public` and bundles the server into `dist/index.cjs`.

Options to make the web live

1) Quick — GitHub Pages (static client only)

- The included GitHub Actions workflow builds the project and publishes the static client at `dist/public` to GitHub Pages on pushes to `main`.
- After pushing to `main`, enable GitHub Pages in the repository settings and point it to the `gh-pages` branch (the action will create and update that branch).

2) Full-stack — Docker (server + static)

- Build the Docker image locally:

```bash
docker build -t azzivone-app:latest .
```

- Run the container:

```bash
docker run -p 8080:8080 azzivone-app:latest
```

The server listens on `dist/index.cjs` entry and exposes port `8080`.

3) Hosted PaaS (recommended for production)

- Use Render, Fly, Railway, or a similar provider that supports Node.js.
- In CI/CD or provider settings, run `npm ci` and `npm run build`, then run `node dist/index.cjs` as the start command.

Notes & gotchas
- If you only want the client deployed (no server), GitHub Pages / Netlify / Vercel are suitable.
- The GitHub Pages workflow publishes the static files only. For the full app, use Docker or a Node host.
- If your project uses environment secrets, add them to your host provider or repository secrets and pass them to the runtime.
