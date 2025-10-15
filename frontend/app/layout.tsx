import { locales } from '@/i18n/request';

type Props = {
  children: React.ReactNode;
};

// This is a root layout
export default async function RootLayout({ children }: Props) {
  return children;
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
