'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Menu, MoveUpRight, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { categories, products, type ProductCategory } from '@/lib/products';

export function HomeExperience() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const atmosphereRef = useRef<HTMLElement>(null);

  const visibleProducts = useMemo(
    () => activeCategory === 'All' ? products : products.filter((product) => product.category === activeCategory as ProductCategory),
    [activeCategory],
  );

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
      setScrolled(window.scrollY > 40);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const handleAtmosphereMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = atmosphereRef.current?.getBoundingClientRect();
    if (!rect) return;
    atmosphereRef.current?.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    atmosphereRef.current?.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <main>
      <div className="progress-track" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <Link href="/" className="brand" aria-label="OTC Fragrances home"><img src="/assets/otc-logo.png" alt="OTC Fragrances" /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#about">Our story</a>
          <a href="#process">How it works</a>
          <Link className="nav-cta" href="/request-order">Request order <MoveUpRight aria-hidden="true" /></Link>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? 'Close' : 'Menu'}</span>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <div id="mobile-navigation" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}><span>01</span>Collection <ArrowRight aria-hidden="true" /></a>
          <a href="#about" onClick={() => setMenuOpen(false)}><span>02</span>Our story <ArrowRight aria-hidden="true" /></a>
          <a href="#process" onClick={() => setMenuOpen(false)}><span>03</span>How it works <ArrowRight aria-hidden="true" /></a>
          <Link href="/request-order" onClick={() => setMenuOpen(false)}><span>04</span>Request order <MoveUpRight aria-hidden="true" /></Link>
        </nav>
        <div className="mobile-menu-footer">
          <p>Premium Dubai fragrances,<br />brought to South Africa.</p>
          <a href="mailto:info@otcfragrances.co.za">info@otcfragrances.co.za</a>
        </div>
      </div>

      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src="/assets/dubai-atelier-hero.png" alt="A cinematic black-and-gold Dubai fragrance atelier at night" />
        <div className="hero-shade" />
        <div className="hero-rail" aria-hidden="true"><span>DUBAI</span><i /><span>SOUTH AFRICA</span></div>
        <div className="hero-content reveal-in">
          <p className="eyebrow">Premium Dubai fragrance · now in South Africa</p>
          <h1 id="hero-title">Scent, without <em>borders.</em></h1>
          <p className="hero-copy">Discover statement fragrances led by Osma—sourced from Dubai and brought closer to home by OTC Fragrances.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#collection">Explore the collection <ArrowDown aria-hidden="true" /></a>
            <Link className="text-link" href="/request-order">Start a request <MoveUpRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>Scroll to discover</span><i /></div>
      </section>

      <div className="marquee" aria-label="Dubai sourced, South Africa delivered, Osma led">
        <div>{Array.from({ length: 2 }).map((_, group) => <span key={group}>DUBAI SOURCED <b>✦</b> SOUTH AFRICA DELIVERED <b>✦</b> OSMA LED <b>✦</b> </span>)}</div>
      </div>

      <section className="collection-preview" id="collection" aria-labelledby="collection-title">
        <div className="section-heading">
          <div><p className="eyebrow dark">The Osma edit · 01</p><h2 id="collection-title">Choose your presence.</h2></div>
          <p>Explore every fragrance and collection currently available through OTC. No anonymous checkout: every request is handled directly.</p>
        </div>
        <div className="catalog-toolbar">
          <div className="filter-row" aria-label="Filter the fragrance collection">
            {categories.map((category) => (
              <button key={category} type="button" className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>
                {category}<span>{category === 'All' ? products.length : products.filter((item) => item.category === category).length}</span>
              </button>
            ))}
          </div>
          <p aria-live="polite">Showing {visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}</p>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <article className="product-card" key={product.slug}>
              <div className="product-image-wrap">
                <span className="product-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="product-category">{product.category}</span>
                <img src={product.image} alt={`Osma ${product.name}`} />
              </div>
              <div className="product-meta">
                <div><h3>{product.name}</h3><p>{product.detail}</p></div>
                <span>Available on request</span>
              </div>
              <Link href={`/request-order?product=${encodeURIComponent(product.name)}`}>Request this fragrance <MoveUpRight aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rouge-noir" aria-labelledby="rouge-title">
        <div className="rouge-image"><img src="/assets/osma-rouge-noir-campaign.png" alt="Osma Rouge and Noir fragrances" /><span aria-hidden="true">THE DUO</span></div>
        <div className="rouge-copy">
          <p className="eyebrow">A study in contrast · 02</p>
          <h2 id="rouge-title">Rouge.<br /><i>&amp;</i> Noir.</h2>
          <p>Two bold expressions. One unmistakable silhouette. Discover each individually, as a duo, or in a complete presentation collection.</p>
          <Link className="button button-gold" href="/request-order?product=Rouge%20%26%20Noir%20Duo">Request the duo <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="atmosphere" ref={atmosphereRef} onMouseMove={handleAtmosphereMove} aria-labelledby="atmosphere-title">
        <div className="atmosphere-glow" aria-hidden="true" />
        <div className="atmosphere-intro">
          <p className="eyebrow">More than a bottle · 03</p>
          <h2 id="atmosphere-title">Wear the <i>atmosphere.</i></h2>
          <p>Fragrance becomes part of the room before you speak. Our edit moves from bright, clean clarity to rich, evening depth.</p>
        </div>
        <div className="editorial-stack">
          <figure className="editorial-card one"><img src="/assets/osma-scent-notes-banner.png" alt="Osma fragrances surrounded by evocative ingredients" /><figcaption>Layered notes. Lasting memory.</figcaption></figure>
          <figure className="editorial-card two"><img src="/assets/osma-lifestyle-blue.png" alt="A model enjoying an Osma blue fragrance" /><figcaption>A signature for every mood.</figcaption></figure>
          <figure className="editorial-card three"><img src="/assets/osma-amalfi-gift-edit.png" alt="An Osma Amalfi fragrance gift collection" /><figcaption>Made to give. Designed to keep.</figcaption></figure>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-title-wrap"><p className="eyebrow dark">Our story · 04</p><h2 id="about-title">Dubai,<br />brought <i>closer.</i></h2></div>
        <div className="about-copy">
          <p className="lead">OTC Fragrances is a South African importer and reseller of premium fragrances sourced from Dubai.</p>
          <p>Osma leads our collection, joined over time by a considered selection of fragrance houses and gift edits. We make the discovery personal: browse online, tell us what has caught your attention, and we take the conversation from there.</p>
          <dl>
            <div><dt>01</dt><dd>Curated in Dubai</dd></div>
            <div><dt>02</dt><dd>Available in South Africa</dd></div>
            <div><dt>03</dt><dd>Requested, not auto-checked-out</dd></div>
          </dl>
        </div>
      </section>

      <section className="process-section" id="process" aria-labelledby="process-title">
        <div className="process-heading"><p className="eyebrow">How it works · 05</p><h2 id="process-title">From intrigue<br />to introduction.</h2></div>
        <ol>
          <li><span>01</span><div><h3>Explore</h3><p>Browse the full Osma edit and note the pieces that draw you in.</p></div></li>
          <li><span>02</span><div><h3>Select</h3><p>Choose one fragrance or build a shortlist of several options.</p></div></li>
          <li><span>03</span><div><h3>Request</h3><p>Send your pre-filled email request. We will take it from there.</p></div></li>
        </ol>
        <Link className="button button-light process-cta" href="/request-order">Build your request <ArrowRight aria-hidden="true" /></Link>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div><p className="eyebrow dark">Good to know · 06</p><h2 id="faq-title">Before you ask.</h2></div>
        <Accordion className="faq-list">
          <AccordionItem value="ordering"><AccordionTrigger>Can I buy directly on the website?</AccordionTrigger><AccordionContent><p>No. The site helps you create an order request. We then confirm availability and next steps with you directly by email.</p></AccordionContent></AccordionItem>
          <AccordionItem value="multiple"><AccordionTrigger>Can I request more than one fragrance?</AccordionTrigger><AccordionContent><p>Yes. Select as many fragrances or collections as interest you. They will all be included in one request email.</p></AccordionContent></AccordionItem>
          <AccordionItem value="availability"><AccordionTrigger>Does a request guarantee availability?</AccordionTrigger><AccordionContent><p>Availability is confirmed after we receive your request. No payment is taken on this website.</p></AccordionContent></AccordionItem>
          <AccordionItem value="location"><AccordionTrigger>Where is OTC Fragrances based?</AccordionTrigger><AccordionContent><p>OTC Fragrances serves the South African market with premium fragrances sourced from Dubai.</p></AccordionContent></AccordionItem>
        </Accordion>
      </section>

      <section className="final-cta" aria-labelledby="final-cta-title">
        <p>THE NEXT SIGNATURE IS YOURS</p>
        <h2 id="final-cta-title">Found something<br />unforgettable?</h2>
        <Link href="/request-order">Request your order <MoveUpRight aria-hidden="true" /></Link>
      </section>

      <footer>
        <Link href="/" className="footer-brand"><img src="/assets/otc-logo.png" alt="OTC Fragrances" /></Link>
        <div><p>Premium Dubai fragrances,<br />brought to South Africa.</p></div>
        <div><span>Contact</span><a href="mailto:info@otcfragrances.co.za">info@otcfragrances.co.za</a></div>
        <div><span>Navigate</span><a href="#collection">Collection</a><a href="#about">Our story</a><Link href="/request-order">Request order</Link></div>
        <small>© {new Date().getFullYear()} OTC Fragrances. All rights reserved.</small>
      </footer>
    </main>
  );
}
