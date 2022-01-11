import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Underline from "../public/images/hero-underline.svg";
import { useRouter } from "next/router";

export default function Hero({ coverPhotoUrl }) {
  const [ismobile, setismobile] = useState(true);
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
    } else {
      setismobile(false);
    }
  }, []);

  const router = useRouter();
  return (
    <React.Fragment>
      <Container>
        <div className="flex flex-col md:flex-row md:my-20">
          <div className="my-20 px-4 md:my-0 md:p-0">
            <h1 className="text-5xl md:text-7xl text-violet-500 opacity-80">
              personalized handmade{" "}
            </h1>
            <span className="text-5xl md:text-7xl text-violet-900">
              jewelry <Underline />
            </span>
            <Link href="/products">
              <a className="bg-violet-900 rounded-md px-10 md:px-5 py-3 text-white text-xl hover:bg-violet-600 active:bg-violet-600 transition-all">
                Shop Now
              </a>
            </Link>
          </div>
          <div className="px-4">
            {ismobile ? (
              <Image
                src={coverPhotoUrl}
                onClick={() => router.push("/products")}
                alt="Heart shaped ring"
                className="rounded-md hover:cursor-pointer"
                width={600}
                height={400}
              />
            ) : (
              <video
                width={600}
                height={400}
                autoPlay
                muted
                loop
                onClick={() => router.push("/products")}
                alt="Heart shaped ring"
                className="rounded-md hover:cursor-pointer"
              >
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/silverwind-ca60d.appspot.com/o/assets%2FheroHeartRingVideo.mp4?alt=media&token=7bdf3b90-c35e-4713-b5d5-80dc1cc0497c"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
            <p className="text-right text-violet-900 opacity-30">
              designed and crafted by Julia
            </p>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}
