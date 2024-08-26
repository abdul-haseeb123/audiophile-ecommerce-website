import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import SpeakerImageDesktopZx9 from "../../public/assets/home/desktop/image-speaker-zx9.png";
import SpeakerImageTabletZx9 from "../../public/assets/home/tablet/image-speaker-zx9.png";
import SpeakerImageMobileZx9 from "../../public/assets/home/mobile/image-speaker-zx9.png";
import EarphoneImageDesktop from "../../public/assets/home/desktop/image-earphones-yx1.jpg";
import EarphoneImageTablet from "../../public/assets/home/tablet/image-earphones-yx1.jpg";
import EarphoneImageMobile from "../../public/assets/home/mobile/image-earphones-yx1.jpg";
import { BestGearCard } from "@/components/best-gear-card";
import { ProductsHighlight } from "@/components/products-highlight";
import Link from "next/link";

import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-clip bg-white-almost">
      <div className="min-h-screen bg-hero-pattern-mobile bg-cover bg-center bg-no-repeat md:bg-hero-pattern-tablet md:bg-cover lg:bg-hero-pattern-desktop">
        <Navbar variant="secondary" />
        <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-screen-lg snap-start items-center justify-center lg:justify-start">
          <div className="grid h-fit max-w-80 gap-5">
            <p className="text-center text-overline text-white-cloud lg:text-left">
              NEW PRODUCT
            </p>
            <h1 className="text-center text-4xl text-white md:text-6xl lg:text-left">
              X99 MARK II HEADPHONES
            </h1>
            <p className="text-center text-base text-white/65 lg:text-left">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link href={"/headphones/xx99-mark-ii-headphones-q441d1vl9m"}>
              <Button variant="primary" className="mx-auto w-fit lg:mx-0">
                SEE PRODUCT
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <ProductsHighlight />
      <div className="mx-3 mt-12 flex min-h-[560px] max-w-screen-lg flex-col items-center justify-evenly rounded-xl bg-beige-dark bg-circle-pattern bg-auto bg-top bg-no-repeat lg:mx-auto lg:flex-row lg:bg-[left_-195%_bottom_97%]">
        <Image
          src={SpeakerImageMobileZx9}
          alt="speaker zx9 mobile"
          className="w-36 md:hidden"
        />
        <Image
          src={SpeakerImageTabletZx9}
          alt="speaker zx9 tablet"
          className="hidden w-44 md:block lg:hidden"
        />
        <Image
          src={SpeakerImageDesktopZx9}
          alt="speaker zx9 desktop"
          className="hidden w-[22rem] self-end object-scale-down lg:block"
        />
        <div className="flex max-w-72 flex-col gap-3">
          <h1 className="text-center text-6xl text-white lg:text-left">
            ZX9 SPEAKER
          </h1>
          <p className="text-center text-white lg:text-left">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <Link href={"/speakers/zx9-speaker-7ieroaapk8"}>
            <Button
              variant="secondary"
              className="mx-auto w-fit border-0 bg-black text-white hover:bg-white hover:text-black lg:mx-0"
            >
              SEE PRODUCT
            </Button>
          </Link>
        </div>
      </div>
      <div className="sm:bg-url('/assets/home/tablet/image-speaker-zx7.jpg') mx-3 mt-8 flex h-80 max-w-screen-lg flex-col justify-around rounded-xl bg-[url('/assets/home/mobile/image-speaker-zx7.jpg')] bg-right bg-no-repeat md:bg-[url('/assets/home/desktop/image-speaker-zx7.jpg')] lg:mx-auto">
        <div className="w-96 px-16">
          <h3 className="text-3xl font-extrabold">ZX7 SPEAKER</h3>
          <Link href={"/speakers/zx7-speaker-si67wv4v06"}>
            <Button variant="secondary" className="mt-10 w-fit bg-transparent">
              SEE PRODUCT
            </Button>
          </Link>
        </div>
      </div>
      <div className="mx-3 mt-6 flex max-w-screen-lg flex-col gap-3 sm:flex-row lg:mx-auto">
        <Image
          src={EarphoneImageMobile}
          alt="earphones mobile"
          className="w-full rounded-xl md:hidden"
        />
        <Image
          src={EarphoneImageTablet}
          alt="earphones tablet"
          className="hidden w-1/2 rounded-xl md:block lg:hidden"
        />
        <Image
          src={EarphoneImageDesktop}
          alt="earphones desktop"
          className="hidden w-1/2 rounded-xl lg:block"
        />
        <div className="flex min-h-56 w-full items-center rounded-xl bg-white-cloud sm:w-1/2">
          <div className="w-96 px-16 pt-8">
            <h3 className="text-3xl font-extrabold">YX1 EARPHONES</h3>
            <Link href={"/earphones/yx1-wireless-earphones-fn1i5i79w7"}>
              <Button
                variant="secondary"
                className="mt-10 w-fit bg-transparent"
              >
                SEE PRODUCT
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <BestGearCard />
      <Footer />
    </div>
  );
}
