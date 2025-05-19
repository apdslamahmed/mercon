'use client';

import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>متجر ميركون</title>
        <meta name="description" content="متجر ميركون - منتجات عالية الجودة" />
      </head>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
