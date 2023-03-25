import Index from "../src/components/index/index.landing";
import Head from "next/head";
export default function Home() {
  return (
    <>
    <Head>
            <title>
              Tess Coquilhat - Graphiste Marseille | Création de logos,
              identités visuelles et supports de communication
            </title>
            <meta
              property="og:title"
              content="Tess Coquilhat - Graphiste indépendante à Marseille"
            />
            <meta
              name="keywords"
              content="graphiste, création graphique, logo, identité visuelle, communication visuelle, Marseille, Tess Coquilhat, Designer graphique marseille, graphiste marseille"
            />
            <meta
              name="description"
              content="Tess Coquilhat, graphiste indépendante basée à Marseille spécialisée dans la création de logos, de cartes de visite, de flyers, de packagings, de dépliants, de brochures et de catalogues, ainsi que dans la conception d'identités visuelles pour les entreprises. Contactez-moi pour vos projets de communication visuelle."
            />
            <meta
              property="og:description"
              content="Tess Coquilhat graphiste indépendante basée à Marseille spécialisée dans la création de logos, de cartes de visite, de flyers, de packagings, de dépliants, de brochures et de catalogues, ainsi que dans la conception d'identités visuelles pour les entreprises. Contactez-moi pour vos projets de communication visuelle."
            />
            <meta name="author" content="Lorenzo GIRALT" />
            <meta name="canonical" content="https://tess-coquilhat.fr/" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="robots" content="index, follow" />

            <meta
              name="google-site-verification"
              content="Upk0qT1hWONBm7mJ9ahLqGufa4WiaYwa67cBCVyRWNE"
            />
            </Head>
      <Index />
    </>
  );
}
