import { useCallback, useContext, useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Typewriter } from "react-simple-typewriter";
import { Download, FileX2, LayoutDashboard, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { FormLogoContext } from "./context/form-logo-context";
import Link from "next/link";

type State = {
  isLoading: boolean;
  isError: boolean;
  imgSrc: string | null;
};

export const LoadingState = () => {
  return (
    <div className="flex flex-col place-items-center gap-6 py-16">
      <Skeleton className="size-60 sm:size-96 rounded-lg" />
      <p className="font-semibold text-xl">
        <Typewriter
          words={["Generating Your Logo...", "Your logo is almost ready!"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={40}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </p>
    </div>
  );
};

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="flex flex-col place-items-center gap-6 py-16">
      <FileX2 className="size-32 rounded-lg" />
      <p className="font-semibold text-xl">Failed Generating Your Logo</p>
      <Button className="font-semibold" onClick={onRetry}>
        <RotateCcw /> Retry
      </Button>
    </div>
  );
};

export const SuccessState = ({ imgSrc }: { imgSrc: string }) => {
  const { values } = useContext(FormLogoContext);
  return (
    <div className="flex flex-col place-items-center gap-6 py-16">
      <h2 className="font-semibold text-xl">
        Here is Logo For &quot;{values.name}&quot;
      </h2>
      <Image
        src={imgSrc}
        alt={values.name}
        width={0}
        height={0}
        className="size-60 sm:size-96 rounded-lg"
      />
      <div className="flex flex-col gap-4">
        <Button className="font-semibold" asChild>
          <a download={`${values.name}.png`} href={imgSrc}>
            <Download /> Download
          </a>
        </Button>
        <Button className="font-semibold" variant="outline" size="lg" asChild>
          <Link href="/dashboard">
          <LayoutDashboard /> Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export const FormLogoResult = () => {
  const { values } = useContext(FormLogoContext);
  const [state, setState] = useState<State>({
    isLoading: true,
    isError: false,
    imgSrc: null,
  });
  const generateLogo = useCallback(async () => {
    setState({
      isLoading: true,
      isError: false,
      imgSrc: null,
    });
    const response = await fetch("/api/generate-logo", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      setState({
        isLoading: false,
        isError: true,
        imgSrc: null,
      });
      return;
    }
    const { data }: { data: string } = await response.json();
    setState({
      isLoading: false,
      isError: false,
      imgSrc: data,
    });
  }, [values]);
  useEffect(() => {
    generateLogo();
  }, []);
  return (
    <Card>
      <CardContent>
        {state.isLoading && <LoadingState />}
        {state.isError && (
          <ErrorState
            onRetry={() => {
              generateLogo;
            }}
          />
        )}
        {state.imgSrc && <SuccessState imgSrc={state.imgSrc} />}
      </CardContent>
    </Card>
  );
};
