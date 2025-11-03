# cacheComponents Demo with next-intl

Demo of Next.js 16 `cacheComponents` with `next-intl`. Shows how to enable component caching for internationalized apps by passing locale as props instead of reading from headers.

## Implementation

The demo includes two components:

- **Dynamic Component**: Uses `getTranslations('IndexPage')` with only namespace parameter, which internally reads from `headers()`. This component is not cachable and runs on every request.
- **Cached Component**: Receives locale from params as prop and uses `getTranslations({locale})` with `'use cache'` directive. This component is cachable because the locale is passed explicitly, not read from `headers()`.

## Learn More

- [next-intl Static Rendering Setup](https://next-intl.dev/docs/routing/setup#static-rendering)
- [next-intl with Actions, Metadata & Route Handlers](https://next-intl.dev/docs/environments/actions-metadata-route-handlers)
