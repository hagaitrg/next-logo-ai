"use client";

import { FormLandingPage } from "@/components/forms/form-landing-page";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <main className="mx-auto w-full px-4 max-w-7xl py-24 flex flex-col place-items-center gap-4">
      <h1 className="text-4xl font-black text-primary">AI Logo Maker</h1>
      <h2 className="text-xl font-semibold text-foreground/60">
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
      </h2>
      <p className="text-base">
        Design a professional logo instantly with AI. Perfect for websites,
        print, and branding—no design skills needed!
      </p>
      <FormLandingPage />
    </main>
  );
}
