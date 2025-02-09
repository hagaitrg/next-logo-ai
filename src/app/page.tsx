"use client";

import { FormLandingPage } from "@/components/forms/form-landing-page";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const arr = new Array(11).fill("");
  return (
    <main className="mx-auto w-full px-4 max-w-7xl py-24 flex flex-col place-items-center gap-4">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
              AI Logo Generator
            </h1>
            <p className="mt-8 text-xl font-semibold text-foreground/60">
              AI-Powered&nbsp;
              <span>
                <Typewriter
                  words={["Logo Maker", "Design Tool", "Brand Creator"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </p>
            <p className="text-base mt-5">
              Design a professional logo instantly with AI. Perfect for
              websites, print, and branding—no design skills needed!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild>
                <a
                  href="#"
                  className="rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-xs"
                >
                  Get started
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <section className="place-items-center px-4 lg:h-screen" id="result">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black text-center mb-4 text-primary">
            Our Result Products
          </h1>
          <p className="text-base text-center max-w-3xl mx-auto mb-12">
            Discover the logos we’ve crafted—designed to make a lasting impact.
            Each logo reflects creativity, professionalism, and a deep
            understanding of brand identity. Whether you need a sleek, modern
            design or a timeless classic, our results speak for themselves.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
            {arr.map((v, i) => (
              <Image
                key={i}
                width={512}
                height={512}
                className="size-40 sm:size-60 lg:size-72 rounded-xl"
                src={`/images/${i}.png`}
                alt={`${i}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="generate" className="mt-36 flex justify-center">
        <div className="relative isolate overflow-hidden pt-16 sm:pt-24 lg:pt-32 w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-semibold tracking-tight">
                Ready to Generate Your Logo?
              </h2>
              <p className="mt-4 text-lg leading-relaxed max-w-3xl mx-auto">
                Create a unique and professional logo in just a few clicks! Our
                easy-to-use logo maker helps you design a brand identity that
                stands out. Start now and bring your vision to life
                effortlessly!
              </p>
              <div className="mt-6 flex justify-center">
                <FormLandingPage />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
