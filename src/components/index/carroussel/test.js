import { useImage } from "react-image";

export default function MyImageComponent({ imageUrl }) {
  const { src } = useImage({
    srcList: imageUrl,
  });

  return <img crossorigin="anonymous" src={src} />;
}
