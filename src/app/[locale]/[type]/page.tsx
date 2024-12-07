import { getContentNavigation } from '@/lib/content'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{
    locale: string;
    type: string;
  }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const locales = ['en', 'es', 'fr'];
  const types = ['docs', 'api', 'articles'];
  
  return locales.flatMap(locale => 
    types.map(type => ({
      locale,
      type
    }))
  );
}

export default async function TypePage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const { locale, type } = resolvedParams;
  
  // Get the navigation items for this type and locale
  const navigationItems = getContentNavigation({}, locale, type);
  
  // Find the first available page
  let firstPage = 'introduction';  // default fallback
  if (Array.isArray(navigationItems) && navigationItems.length > 0) {
    const firstItem = navigationItems.find(item => item.slug);
    if (firstItem?.slug) {
      firstPage = firstItem.slug;
    }
  }

  // Redirect to the first available page
  redirect(`/${locale}/${type}/${firstPage}`);
}
