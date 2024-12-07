// Update _app.tsx to include correct types
import type { AppProps } from 'next/app';
import { Html, Head, Main, NextScript } from 'next/document';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
