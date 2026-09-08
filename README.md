# OTC Fragrances

Premium catalogue and order-request website for OTC Fragrances, built for `otcfragrances.co.za` and static GitHub Pages hosting.

## Run locally

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

The production website is generated in `docs/`. It includes the custom `CNAME`, `.nojekyll`, sitemap, robots rules, metadata, and static order-request page. A GitHub Pages deployment workflow is included in `.github/workflows/deploy-pages.yml`.

The order form opens a pre-filled email to `info@otcfragrances.co.za`; it does not process payments or automatically place an order.
