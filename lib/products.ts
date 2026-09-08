export type ProductCategory = '75 ml' | '100 ml' | 'Sets & Collections';

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  detail: string;
  image: string;
  feature?: boolean;
};

export const products: Product[] = [
  { slug: 'amalfi-75ml', name: 'Amalfi', category: '75 ml', detail: 'Osma Eau de Parfum · 75 ml', image: '/assets/osma-amalfi-75ml.png', feature: true },
  { slug: 'amber-s-75ml', name: 'Amber S', category: '75 ml', detail: 'Osma Eau de Parfum · 75 ml', image: '/assets/osma-amber-s-75ml.png', feature: true },
  { slug: 'citrus-f-75ml', name: 'Citrus F', category: '75 ml', detail: 'Osma Eau de Parfum · 75 ml', image: '/assets/osma-citrus-f-75ml.png' },
  { slug: 'paudree-f-75ml', name: 'Paudree F', category: '75 ml', detail: 'Osma Eau de Parfum · 75 ml', image: '/assets/osma-paudree-f-75ml.png', feature: true },
  { slug: 'rouge-100ml', name: 'Rouge', category: '100 ml', detail: 'Osma Perfume · 100 ml', image: '/assets/osma-rouge-100ml.png' },
  { slug: 'noir-100ml', name: 'Noir', category: '100 ml', detail: 'Osma Perfume · 100 ml', image: '/assets/osma-noir-100ml.png' },
  { slug: 'rouge-noir-duo', name: 'Rouge & Noir Duo', category: 'Sets & Collections', detail: 'Two-piece Osma pairing', image: '/assets/rouge-noir-duo.png' },
  { slug: 'rouge-noir-collection', name: 'Rouge & Noir Collection', category: 'Sets & Collections', detail: 'Osma presentation collection', image: '/assets/rouge-noir-collection.png' },
  { slug: 'lila-collection', name: 'Lila Collection', category: 'Sets & Collections', detail: 'Osma presentation collection', image: '/assets/osma-lila-collection.png' },
  { slug: 'verda-collection', name: 'Verda Collection', category: 'Sets & Collections', detail: 'Osma presentation collection', image: '/assets/osma-verda-collection.png' },
  { slug: '96-icon', name: '96 Icon', category: 'Sets & Collections', detail: 'Osma discovery collection', image: '/assets/osma-96-icon.png' },
  { slug: 'bloom-mini-set', name: 'Bloom Mini Set', category: 'Sets & Collections', detail: 'Osma miniature discovery set', image: '/assets/osma-bloom-mini-set.png' },
  { slug: '96-extra', name: '96 Extra', category: 'Sets & Collections', detail: 'Osma fragrance edit', image: '/assets/osma-96-extra.png' },
  { slug: '96-plus', name: '96 Plus', category: 'Sets & Collections', detail: 'Osma fragrance edit', image: '/assets/osma-96-plus.png' },
  { slug: 'rouge-package', name: 'Rouge Package', category: 'Sets & Collections', detail: 'Osma Rouge presentation set', image: '/assets/osma-rouge-package.png' },
  { slug: 'noir-package', name: 'Noir Package', category: 'Sets & Collections', detail: 'Osma Noir presentation set', image: '/assets/osma-noir-package.png' },
  { slug: 'five-days-mood', name: '5 Days Mood', category: 'Sets & Collections', detail: 'Five-piece Osma fragrance edit', image: '/assets/osma-5-days-mood.png' },
  { slug: 'amalfi-gift-edit', name: 'Amalfi Gift Edit', category: 'Sets & Collections', detail: 'Osma Amalfi presentation set', image: '/assets/osma-amalfi-gift-edit.png' },
];

export const categories = ['All', '75 ml', '100 ml', 'Sets & Collections'] as const;
