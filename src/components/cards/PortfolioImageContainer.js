import Link from "next/link";
export default function PortfolioImageContainer() {
  return (
    <div className="flex flex-col m-auto w-[100%] ">
      <div className="mt-[5%]"></div>
      <div className="flex flex-row w-[96%] gap-[2%] m-auto items-center">
        <img
          src="/assets/portfolio/image1.png"
          alt="Logo de Jus'te pour toi, un food truck de jus de fruits naturels en Afrique, dans les tons de vert, jaune et orange, avec une typographie calligraphique."
          className="w-[32.17%]"
          style={{ objectFit: "cover" }}
        />
        <img
          src="/assets/portfolio/image2.png"
          className="w-[32.17%]"
          alt="Carte de visite de Tess Coquilhat, graphiste freelance à Marseille."
        />
        <img
          src="/assets/portfolio/image3.png"
          className="w-[32.17%]"
          alt="Logo de HONU, une association dédiée au sport loisir et au sport santé, avec pour mission de donner à tous l'accès au bien-être et à l'harmonie avec soi-même. Leur nom, 'HONU', signifie 'tortue' en hawaïen et symbolise leur engagement à aider, accepter, connaître et écouter les autres. Le logo utilise des nuances de bleu comme colorimétrie principale, avec une typographie originale et unique, et une variante avec des tons bleu et rose."
        />
      </div>

      <div className="flex flex-row w-[96%] gap-[2%] m-auto items-center py-[2%]">
        <img
          src="/assets/portfolio/image4.png"
          className="w-[32.17%]"
          alt="Pochette à rabat pour une agence immobilière à Marseille, dans les tons bleu de la mer et jaune pour le soleil, avec une composition graphique comprenant une vague qui reprend l'élément graphique du logo de l'agence."
        />
        <Link href="/portfolio">
          <img
            src="/assets/portfolio/rectangle.png"
            className="zoom cursor-pointer w-[32.17%] relative z-10"
          />
        </Link>
        <img
          src="/assets/portfolio/image5.png"
          className="w-[32.17%]"
          alt="Création de plaquette commerciale pour Helin Elec, une entreprise familiale d'électricité à Villejuif dans le 94. La plaquette comprend une mise en page professionnelle et soignée avec une couverture avant et arrière ainsi que des doubles pages pour présenter les services de l'entreprise."
        />
      </div>

      <div className="flex flex-row w-[96%] gap-[2%] m-auto items-center">
        <img
          src="/assets/portfolio/image6.png"
          className="w-[32.17%]"
          alt="Identité visuelle et cartes de visite de VAP'SAUTEUSE, une marque de vapoteuse audacieuse et décalée, avec un univers coloré de nuances de violet pour une touche de modernité et d'élégance. La typographie audacieuse et distinctive évoque les courbes du vent, symbolisant le mouvement et l'éphémère, avec une mascotte sous forme de vapoteuse bondissante en soufflant de la vapeur."
        />
        <img src="/assets/portfolio/image7.png" className="w-[32.17%]" />
        <img
          src="/assets/portfolio/image8.png"
          className="w-[32.17%]"
          alt="Identité visuelle de KINFRIED, une enseigne proposant des buckets de nems à emporter ou en livraison dans la métropole lilloise, mélangeant la nourriture asiatique et la nourriture fast-food. Les couleurs sobres et chaudes (noir, rouge, jaune & orange) ainsi que la typographie lisible et la direction artistique mettent en avant les codes culinaires tels que la chaleur, la friture, la rapidité et les origines culinaires (l'Asie) ainsi que le fait maison. Le logo est également adaptable sur différents supports, des imprimés aux réseaux sociaux, pour une présence forte et cohérente de la marque."
        />
      </div>
    </div>
  );
}
