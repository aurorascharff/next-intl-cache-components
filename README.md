# cacheComponents Demo with next-intl

A demo showing how to use Next.js 16's `cacheComponents` feature with `next-intl`. This example demonstrates how the static rendering setup with `generateStaticParams()` and `setRequestLocale()` enables component caching by passing locale explicitly as props instead of reading from headers.

## Key Features

- **Static Rendering Setup**: Uses `generateStaticParams()` to pre-generate locale routes and `setRequestLocale()` for static rendering
- **Dynamic vs Cached Components**: Compare components that use `getTranslations()` with and without the `'use cache'` directive
- **Explicit Locale Passing**: Shows how passing locale as props (from params) enables caching, while relying on headers breaks caching
- **Next.js 16 cacheComponents**: Demonstrates the new caching capabilities with internationalized content

## Implementation

The demo includes two components:

- **Dynamic Component**: Uses `getTranslations()` without explicit locale, relies on `setRequestLocale()` context
- **Cached Component**: Receives locale from params as prop and uses `getTranslations({locale})` with `'use cache'` directive

## Learn More

- [next-intl Static Rendering Setup](https://next-intl.dev/docs/routing/setup#static-rendering)
- [next-intl with Actions, Metadata & Route Handlers](https://next-intl.dev/docs/environments/actions-metadata-route-handlers)
