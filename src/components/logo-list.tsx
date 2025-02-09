"use server";

import { UserImagesSelect } from "@/db/schema";
import { getMyLogo } from "@/services/get-my-logo";
import { DownloadIcon, ImagePlus } from "lucide-react";
import Image from "next/image";
import { FormLandingPage } from "./forms/form-landing-page";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

const LogoItem = ({ logo }: { logo: UserImagesSelect }) => {
  const createdAt = new Date(logo.createdAt);
  const formatDate = createdAt.toUTCString();
  return (
    <div className="flex flex-col place-items-center gap-2">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="font-semibold text-lg">{logo.name}</CardTitle>
          <CardDescription>{formatDate}</CardDescription>
        </CardHeader>
        <CardContent className="place-items-center">
          <p className="mb-3">{logo.description}</p>
          <Image
            src={logo.image}
            width={0}
            height={0}
            alt={logo.name}
            className="size-60 rounded-lg"
          />
        </CardContent>
        <CardFooter className="grid justify-items-center">
          <Button asChild>
            <a href={logo.image} download={`${logo.name}.png`}>
              <DownloadIcon />
              Download
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col place-items-center mx-auto gap-6 py-24">
      <h2 className="font-bold text-3xl">
        You don&apos;t have any Generated Logo
      </h2>
      <ImagePlus className="size-40" />
      <div className="space-y-2">
        <label>Generate a New Logo</label>
        <FormLandingPage />
      </div>
    </div>
  );
};

export const LogoList = async () => {
  const logos = await getMyLogo();
  return (
    <>
      {logos.length !== 0 && (
        <>
          <div className="flex flex-row justify-between w-full self-start">
            <h2 className="font-bold text-3xl">Generated Logo</h2>
            <Button>
              <Link href="/generate">Generate Logo</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">
            {logos.map((logo) => (
              <LogoItem logo={logo} key={logo.id} />
            ))}
          </div>
        </>
      )}
      {logos.length === 0 && <EmptyState />}
    </>
  );
};
