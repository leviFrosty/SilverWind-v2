import Image from "next/image";
import Link from "next/link";
import React from "react";
import heroHeartRingVideo from "../public/videos/heroHeartRingVideo.gif";

export default function Hero() {
  return (
    <>
      <div>
        <h1>
          personalized handmade <span>jewelry</span>
        </h1>
        <Link href="/products">
          <a>Shop Now</a>
        </Link>
      </div>
      <div>
        <Image
          src={heroHeartRingVideo}
          width={600}
          height={400}
          alt="Heart shaped ring"
        />
        <p>Designed and Crafted by Julia</p>
      </div>
    </>
  );
}
