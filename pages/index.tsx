import Head from "next/head";
import Map from "./components/Map";

export default function Home() {
  return (
    <main id="top">
      <Head>
        <title>Scootlator</title>
      </Head>
      <Map />
    </main>
  );
}
