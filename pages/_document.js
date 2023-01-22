import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#303030" />
          <meta
            name="description"
            content="Sovellus sähköskuuttimatkan hinnan laskemiseen"
          />
          <meta
            name="keywords"
            content="Scootlator Suomi, Scootlator, paljonko scootti maksaa, Scootti laskin, Skuutti laskin, Sähköscootti laskin, Tier, Voi"
          />
          <meta name="Author" content="Joona Luukkonen" />
          <link href="https://scootlator.vercel.app/" rel="canonical" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
