'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Mail, MoveUpRight, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';

type WebMCPContext = {
  registerTool: (tool: {
    name: string;
    title: string;
    description: string;
    inputSchema: object;
    annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
    execute: (input: unknown) => unknown;
  }, options?: { signal?: AbortSignal }) => void | Promise<void>;
};

declare global { interface Document { modelContext?: WebMCPContext; } }

export function RequestForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [note, setNote] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('product');
    if (requested && products.some((product) => product.name === requested)) setSelected([requested]);
  }, []);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const validNames = new Set(products.map((product) => product.name));
    const register = context.registerTool({
      name: 'stage_order_request',
      title: 'Stage fragrance request',
      description: 'Select one or more available OTC fragrances in the visible order-request form. This prepares the request but does not send email or place an order.',
      inputSchema: {
        type: 'object',
        properties: {
          products: { type: 'array', minItems: 1, uniqueItems: true, items: { type: 'string', enum: [...validNames] } },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
        },
        required: ['products'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || typeof input !== 'object') throw new Error('A request object is required.');
        const data = input as { products?: unknown; firstName?: unknown; lastName?: unknown };
        if (!Array.isArray(data.products) || data.products.length === 0 || data.products.some((name) => typeof name !== 'string' || !validNames.has(name))) {
          throw new Error('Choose at least one fragrance from the available collection.');
        }
        const next = [...new Set(data.products as string[])];
        setSelected(next);
        if (typeof data.firstName === 'string') setFirstName(data.firstName);
        if (typeof data.lastName === 'string') setLastName(data.lastName);
        return { status: 'staged', selectedProducts: next, count: next.length };
      },
    }, { signal: lifecycle.signal });
    void Promise.resolve(register).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  const selectedProducts = useMemo(() => products.filter((product) => selected.includes(product.name)), [selected]);
  const valid = firstName.trim() && lastName.trim() && selected.length > 0;

  const toggle = (name: string) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (!valid) return;
    const subject = `Order request from ${firstName.trim()} ${lastName.trim()}`;
    const body = [
      'Hello OTC Fragrances,', '',
      `My name is ${firstName.trim()} ${lastName.trim()}.`,
      'I am interested in the following fragrances:',
      ...selectedProducts.map((product) => `• ${product.name} — ${product.detail}`),
      '', note.trim() ? `Additional note: ${note.trim()}` : '', '',
      'Please contact me regarding availability and the next steps.', '',
      'Kind regards,', `${firstName.trim()} ${lastName.trim()}`,
    ].filter((line, index, array) => line !== '' || array[index - 1] !== '');
    window.location.href = `mailto:info@otcfragrances.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join('\n'))}`;
  };

  return (
    <main className="request-page">
      <header className="request-header">
        <Link href="/" className="brand" aria-label="OTC Fragrances home"><img src="/assets/otc-logo.png" alt="OTC Fragrances" /></Link>
        <Link href="/#collection" className="back-link"><ArrowLeft aria-hidden="true" /> Back to collection</Link>
      </header>

      <div className="request-intro">
        <p className="eyebrow">Personal order request</p>
        <h1>Build your<br /><i>shortlist.</i></h1>
        <p>Select everything that interests you. Submitting opens a ready-to-send email—no payment is taken and no order is placed automatically.</p>
      </div>

      <form onSubmit={submit} noValidate>
        <section className="request-step details-step" aria-labelledby="details-title">
          <div className="step-label"><span>01</span><h2 id="details-title">Introduce yourself</h2></div>
          <div className="name-grid">
            <label>First name<Input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Your first name" aria-invalid={attempted && !firstName.trim()} required /></label>
            <label>Surname<Input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Your surname" aria-invalid={attempted && !lastName.trim()} required /></label>
          </div>
          {attempted && (!firstName.trim() || !lastName.trim()) && <p className="form-error">Please enter your name and surname.</p>}
        </section>

        <section className="request-step selection-step" aria-labelledby="selection-title">
          <div className="step-label"><span>02</span><div><h2 id="selection-title">Choose your fragrances</h2><p>{selected.length} selected</p></div></div>
          <div className="request-product-grid">
            {products.map((product) => {
              const checked = selected.includes(product.name);
              return (
                <label className={`request-product ${checked ? 'selected' : ''}`} key={product.slug}>
                  <Checkbox checked={checked} onCheckedChange={() => toggle(product.name)} aria-label={`Select ${product.name}`} />
                  <span className="request-product-image"><img src={product.image} alt="" /></span>
                  <span className="request-product-copy"><b>{product.name}</b><small>{product.detail}</small></span>
                  <span className="selection-mark" aria-hidden="true">{checked ? <Check /> : '+'}</span>
                </label>
              );
            })}
          </div>
          {attempted && selected.length === 0 && <p className="form-error">Please choose at least one fragrance.</p>}
        </section>

        <section className="request-step note-step" aria-labelledby="note-title">
          <div className="step-label"><span>03</span><h2 id="note-title">Add a note <small>Optional</small></h2></div>
          <label>Anything else we should know?<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="A question, preferred quantity, or anything else…" rows={5} /></label>
        </section>

        <aside className="request-summary" aria-label="Your request summary">
          <div className="summary-title"><div><span>Your shortlist</span><b>{selected.length}</b></div>{selected.length > 0 && <button type="button" onClick={() => setSelected([])}>Clear all</button>}</div>
          <div className="summary-items">
            {selectedProducts.length === 0 ? <p>Select fragrances to build your request.</p> : selectedProducts.map((product) => (
              <div key={product.slug}><img src={product.image} alt="" /><span>{product.name}<small>{product.category}</small></span><button type="button" onClick={() => toggle(product.name)} aria-label={`Remove ${product.name}`}><X /></button></div>
            ))}
          </div>
          <Button type="submit" className="send-request" size="lg"><Mail aria-hidden="true" /> Open email request <ArrowRight aria-hidden="true" /></Button>
          <p>This opens your email app with everything filled in. Sending the email does not create an automatic purchase.</p>
        </aside>
      </form>

      <footer className="request-footer"><span>OTC Fragrances</span><a href="mailto:info@otcfragrances.co.za">info@otcfragrances.co.za <MoveUpRight aria-hidden="true" /></a></footer>
    </main>
  );
}
