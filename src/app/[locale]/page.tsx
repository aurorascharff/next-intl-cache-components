import {Locale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {Suspense} from 'react';
import {getTranslations} from 'next-intl/server';
import PageLayout from '@/components/PageLayout';

export default async function IndexPage({params}: PageProps<'/[locale]'>) {
  const {locale} = await params;

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'IndexPage'
  });

  return (
    <PageLayout title={t('title')}>
      <Suspense fallback={<p>Loading dynamic component...</p>}>
        <DynamicComponent />
      </Suspense>
      <CachedComponent locale={locale} />
      <p className="max-w-[590px]">
        {t.rich('description', {
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </p>
    </PageLayout>
  );
}

async function DynamicComponent() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate some async operation
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

async function CachedComponent({locale}: {locale: string}) {
  'use cache';

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate some async operation
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'IndexPage'
  });

  return (
    <div className="mb-8 rounded-lg bg-gray-800 p-6">
      <h2 className="mb-4 text-2xl font-bold text-white">
        {t('cachedComponent.title')}
      </h2>
      <p>{t('cachedComponent.content')}</p>
    </div>
  );
}
