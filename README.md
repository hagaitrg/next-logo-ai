# 🖼️ Logo AI Generator

An AI-powered logo generator built with **Next.js 15**. This app allows users to create unique logos using AI, with seamless API integration for generating high-quality SVG and PNG logos.

## 🚀 Features

* Sign In
* Sign Up
* Landing Page
* Dark | Ligt | System mode support
* AI-powered Logo Generation
* Color Plette Selection
* Design Style Selection
* Download Generated Logos
* User Dashboard (Recent Generated Logos)
* Authentication and Authorization

## 📦 Tech Stack

* **Frontend ** : Next.js 15, TypeScript, TailwindCSS, ShadcnUI
* **State Management** : React Context API
* **Authentication and Authorization** : [Cleark](https://www.clerk.com)
* ORM Models : [Drizzle](https://orm.drizzle.team)
* API Models : [Together AI](https://www.together.ai) & [Hugging Face](https://huggingface.co)
* Styling : Tailwind CSS & ShadcnUI
* Deployment : Vercel

## 🛠️ Installation & Setup

1. Clone the Respository
   ```bash
   git clone https://github.com/hagaitrg/next-logo-ai.git
   npm install
   # or
   yarn install
   ```
2. Set Up Environment Variables
   ```ini
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=
   TOGETHER_API_KEY=
   HF_TOKEN=
   TURSO_CONNECTION_URL=
   TURSO_AUTH_TOKEN=

   ```
3. Run the Development Server
   ```bash
   npm run dev 
   # or
   yarn dev
   ```
