# Next.js 16 cacheComponents with next-intl

Demo of Next.js 16 `cacheComponents` with `next-intl`, using [`next/root-params`](https://github.com/vercel/next.js/pull/82244) to access the `[locale]` segment inside `"use cache"` functions.

## The problem

With `cacheComponents` enabled, cached components cannot access `headers()` — which is how `next-intl` normally resolves the locale. Previously, the workaround was to **prop-drill** the locale from the page (which extracts it from `params`) into each cached component:

```tsx
// Page extracts locale from params and passes it down
export default async function Page({params}: PageProps<'/[locale]'>) {
  const {locale} = await params;
  return <CachedComponent locale={locale} />;
}

async function CachedComponent({locale}: {locale: string}) {
  'use cache';
  const t = await getTranslations({locale, namespace: 'MyNamespace'});
  // ...
}
```

This works but requires plumbing locale through every cached component.

## The solution: `next/root-params`

The `[locale]` segment is a **root parameter** — a dynamic segment before the root layout. With `experimental.rootParams` enabled, `import { locale } from 'next/root-params'` can be called from any Server Component, including inside `"use cache"` boundaries. The root param value automatically becomes a cache key.

```tsx
import {locale as rootLocale} from 'next/root-params';

async function CachedComponent() {
  'use cache';
  const locale = await rootLocale();
  const t = await getTranslations({locale, namespace: 'MyNamespace'});
  // ...
}
```

No props needed — the component is self-contained.

## Demo components

- **Dynamic Component**: Uses `getTranslations('IndexPage')` with only namespace parameter, which internally reads from `headers()`. This component is not cacheable and runs on every request.
- **Cached Component**: Reads locale directly from `next/root-params` inside `"use cache"` and passes it to `getTranslations({locale, namespace})`. The root param value automatically becomes a cache key — no prop-drilling needed.

## Key files

- [`next.config.ts`](next.config.ts) — enables `cacheComponents` and `experimental.rootParams`
- [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx) — root layout using `await locale()` from `next/root-params`
- [`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx) — page with cached and dynamic components

## Learn More

- [next-intl Static Rendering Setup](https://next-intl.dev/docs/routing/setup#static-rendering)
- [next-intl with Actions, Metadata & Route Handlers](https://next-intl.dev/docs/environments/actions-metadata-route-handlers)
- [next/root-params docs PR](https://github.com/vercel/next.js/pull/82244)
- [Root params in "use cache" PR](https://github.com/vercel/next.js/pull/91191)
- [next-intl cacheComponents support](https://github.com/amannn/next-intl/issues/1493)
