import ImageBestGearDesktop from "../../public/assets/shared/desktop/image-best-gear.jpg";
import ImageBestGearTablet from "../../public/assets/shared/tablet/image-best-gear.jpg";
import ImageBestGearMobile from "../../public/assets/shared/mobile/image-best-gear.jpg";
import Image from "next/image";

export function BestGearCard() {
  return (
    <div className="mx-3 mt-24 flex min-h-96 max-w-screen-lg snap-center flex-col md:flex-row-reverse lg:mx-auto">
      <Image
        src={ImageBestGearMobile}
        alt="best gear mobile"
        className="w-full rounded-xl md:hidden"
      />
      <Image
        src={ImageBestGearTablet}
        alt="best gear tablet"
        className="hidden w-full rounded-xl md:block lg:hidden"
      />
      <Image
        src={ImageBestGearDesktop}
        alt="best gear desktop"
        className="hidden w-1/2 rounded-xl lg:block"
      />
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="flex flex-col gap-3 sm:w-3/4 md:px-0">
          <h2 className="text-center text-[40px] font-bold uppercase text-black md:text-left">
            Bringing you the <span className="text-beige-dark">best</span> audio
            gear
          </h2>
          <p className="text-center text-base text-black/70 md:text-left">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </div>
  );
}
