import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="/assets/fonts/simple-line-icons/css/simple-line-icons.css"
          />
          <link
            rel="stylesheet"
            href="/assets/fonts/iconsmind-s/css/iconsminds.css"
          />
        </Head>
        <body className="ltr rounded">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
