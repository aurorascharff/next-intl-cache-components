import {locale as rootLocale} from 'next/root-params';
import {Locale} from 'next-intl';
import {Suspense} from 'react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import NavigationLink from '@/components/NavigationLink';

export default async function IndexPage() {
  setRequestLocale((await rootLocale()) as Locale);

  const t = await getTranslations('IndexPage');

  return (
    <PageLayout title={t('title')}>
      <Suspense fallback={<ComponentSkeleton />}>
        <DynamicComponent />
      </Suspense>
      <CachedComponent />
      <p className="max-w-[590px]">{t('description')}</p>
    </PageLayout>
  );
}

async function DynamicComponent() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const t = await getTranslations('IndexPage');

  return (
    <div className="mb-8 rounded-lg bg-gray-800 p-6">
      <h2 className="mb-4 text-2xl font-bold text-white">
        {t('dynamicComponent.title')}
      </h2>
      <p>{t('dynamicComponent.content')}</p>
    </div>
  );
}

async function CachedComponent() {
  'use cache';

  const locale = (await rootLocale()) as Locale;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const t = await getTranslations({
    locale,
    namespace: 'IndexPage'
  });

  return (
    <div className="mb-8 rounded-lg bg-gray-800 p-6">
      <NavigationLink href="/pathnames">{t('link')}</NavigationLink>
      <h2 className="mb-4 text-2xl font-bold text-white">
        {t('cachedComponent.title')}
      </h2>
      <p>{t('cachedComponent.content')}</p>
    </div>
  );
}

function ComponentSkeleton() {
  return (
    <div className="mb-8 rounded-lg bg-gray-800 p-6 animate-pulse">
      <div className="mb-4 h-6 w-1/3 rounded bg-gray-700"></div>
      <div className="mb-2 h-4 w-full rounded bg-gray-700"></div>
      <div className="h-4 w-2/3 rounded bg-gray-700"></div>
    </div>
  );
}
