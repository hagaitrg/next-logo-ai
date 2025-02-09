"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { FormLogoContext } from "./context/form-logo-context";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ImgCartoon from "../../../public/images/cartoon.png";
import ImgMascoot from "../../../public/images/mascott.png";
import ImgSimpleMinimalist from "../../../public/images/simple_minimalist.png";
import ImgAppLogo from "../../../public/images/app_logo.png";
import Image, { StaticImageData } from "next/image";

const FormSchema = z.object({
  style: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

type StyleItem = {
  name: string;
  imgSrc: StaticImageData;
};

const data: StyleItem[] = [
  {
    name: "Cartoon",
    imgSrc: ImgCartoon,
  },
  {
    name: "Mascoot",
    imgSrc: ImgMascoot,
  },
  {
    name: "Simple Minimalist",
    imgSrc: ImgSimpleMinimalist,
  },
  {
    name: "App Logo",
    imgSrc: ImgAppLogo,
  },
];

const ItemComp = ({
  item,
  isSelected,
  onSelect,
}: {
  item: StyleItem;
  isSelected: boolean;
  onSelect: (item: StyleItem) => void;
}) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className={cn(
        "flex flex-col gap-4 border-2 hover:border-primary p-2",
        isSelected ? "border-primary" : "border-background"
      )}
    >
      <Image src={item.imgSrc} alt={item.name} objectFit="cover" className="w-42 h-42"/>
      <div className="text-xl font-semibold text-center pb-4">{item.name}</div>
    </div>
  );
};

const StyleSelection = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (selected: string) => void;
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {data.map((item) => (
        <ItemComp
          key={item.name}
          item={item}
          isSelected={selected === item.name}
          onSelect={(v) => onChange(v.name)}
        />
      ))}
    </div>
  );
};

export const FormLogoStyle = () => {
  const formLogoCtx = useContext(FormLogoContext);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      style: formLogoCtx.values.style,
    },
  });

  function onSubmit(values: FormSchemaType) {
    formLogoCtx.setState({
      name: "generating",
      values: { ...formLogoCtx.values, style: values.style },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-black text-4xl">
          <h2>Choose Your Logo Style</h2>
          <CardDescription className="font-semibold text-lg">
          Explore a variety of styles to design a logo that matches your brand&apos;s personality and vision.
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <StyleSelection
                      selected={field.value}
                      onChange={(selected) => field.onChange(selected)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                className="px-5"
                onClick={() => formLogoCtx.setState({ name: "colors" })}
              >
                <ArrowLeft />
                Previous
              </Button>
              <Button
                type="submit"
                className="px-5"
                disabled={!form.formState.isValid}
              >
                Next
                <ArrowRight />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
