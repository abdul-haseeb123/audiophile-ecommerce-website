import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import HeadphoneThumbnail from "../../public/assets/shared/desktop/image-category-thumbnail-headphones.png";
import SpeakerThumbnail from "../../public/assets/shared/desktop/image-category-thumbnail-speakers.png";
import EarphoneThumbnail from "../../public/assets/shared/desktop/image-category-thumbnail-earphones.png";

type Props = {
  category: string;
  href: string;
};

export function ProductHighlight({ category, href }: Props) {
  return (
    <div className="group relative flex max-h-52 min-h-40 flex-col items-center justify-end overflow-visible rounded-2xl bg-white-cloud group-hover:bg-beige-light">
      <Image
        src={
          category === "headphones"
            ? HeadphoneThumbnail
            : category === "speakers"
              ? SpeakerThumbnail
              : EarphoneThumbnail
        }
        alt="earphones"
        className="absolute bottom-16 h-28 w-full object-scale-down lg:h-40"
      />
      <div className="flex flex-col items-center justify-center gap-4 pb-4">
        <h2 className="text-base font-bold uppercase text-charcoal">
          {category}
        </h2>
        <Button variant="ghost" className="text-charcoal/65">
          <Link href={href}>SHOP</Link>
        </Button>
      </div>
    </div>
  );
}
