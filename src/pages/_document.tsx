import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          href='https://api.fontshare.com/v2/css?f[]=panchang@700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className='bg-[#080A0C]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
