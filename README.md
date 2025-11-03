# cacheComponents Demo with next-intl

A demo showing how to use Next.js 16's `cacheComponents` feature with `next-intl`. This example demonstrates how the static rendering setup with `generateStaticParams()` and `setRequestLocale()` enables component caching by passing locale explicitly as props instead of reading from headers.

## Implementation

The demo includes two components:

- **Dynamic Component**: Uses `getTranslations()` without explicit locale, relies on `setRequestLocale()` context which uses `headers()`. This component is not cachable and runs on every request.
- **Cached Component**: Receives locale from params as prop and uses `getTranslations({locale})` with `'use cache'` directive. This component is cachable because the locale is passed explicitly, not read from `headers()`.

## Learn More

- [next-intl Static Rendering Setup](https://next-intl.dev/docs/routing/setup#static-rendering)
- [next-intl with Actions, Metadata & Route Handlers](https://next-intl.dev/docs/environments/actions-metadata-route-handlers)
