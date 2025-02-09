"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Suspense, useContext } from "react";
import { FormLogoContext } from "./context/form-logo-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

const FormSchema = z.object({
  name: z
    .string({ message: "Name is Required" })
    .min(3, { message: "min. 3 character" }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const FormLogoNameContent = () => {
  const searchParams = useSearchParams();
  const formLogoCtx = useContext(FormLogoContext);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: formLogoCtx.values.name
        ? formLogoCtx.values.name
        : searchParams.get("name") ?? "",
    },
  });

  function onSubmit(values: FormSchemaType) {
    formLogoCtx.setState({
      name: "description",
      values: { ...formLogoCtx.values, name: values.name },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-black text-4xl">
          <h2>Logo Name</h2>
          <CardDescription className="font-semibold text-lg">
            Enter Your Logo Name
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Ex. DesaKu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
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

export const FormLogoName = ()=>{
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormLogoNameContent/>
    </Suspense>
  )
}
