# OTC Fragrances

Premium catalogue and order-request website for OTC Fragrances, built for `otcfragrance.co.za` and static GitHub Pages hosting.

## Run locally

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

The production website is generated in `docs/`. It includes the custom `CNAME`, `.nojekyll`, sitemap, robots rules, metadata, and static order-request page. GitHub Pages publishes from the `/docs` folder on the `main` branch.

The order form opens a pre-filled email to `info@otcfragrances.co.za`; it does not process payments or automatically place an order.
