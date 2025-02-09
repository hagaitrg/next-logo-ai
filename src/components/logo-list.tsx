"use server";

import { UserImagesSelect } from "@/db/schema";
import { getMyLogo } from "@/services/get-my-logo";
import { Divide, DownloadIcon, ImagePlus } from "lucide-react";
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

const LogoItem = ({ logo }: { logo: UserImagesSelect }) => {
  return (
    <div className="flex flex-col place-items-center gap-2">
      <Card className="place-items-center border-2 ">
        <CardHeader>
          <CardTitle className="font-semibold text-lg">
            {logo.name}
          </CardTitle>
          <CardDescription>
            {logo.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={logo.image}
            width={0}
            height={0}
            alt={logo.name}
            className="size-56 rounded-lg"
          />
        </CardContent>
        <CardFooter>
          <Button className="mt-3" asChild>
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
          <h2 className="font-bold text-3xl">Your Recent Logo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
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
