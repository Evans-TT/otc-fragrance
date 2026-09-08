import { cp, mkdir, rm, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const staticBuild = resolve(projectRoot, 'dist', 'client');
const docs = resolve(projectRoot, 'docs');

await access(staticBuild, constants.R_OK);
await rm(docs, { recursive: true, force: true });
await mkdir(docs, { recursive: true });
await cp(staticBuild, docs, { recursive: true });
const orderPage = resolve(docs, 'request-order.html');
const orderDirectory = resolve(docs, 'request-order');
await access(orderPage, constants.R_OK);
await mkdir(orderDirectory, { recursive: true });
await cp(orderPage, resolve(orderDirectory, 'index.html'));
console.log('GitHub Pages site prepared in docs/');
