"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { FormLogoContext } from "./context/form-logo-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  description: z
    .string({ message: "Description is Required" })
    .min(3, { message: "min. 3 character" }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const FormLogoDescription = () => {
  const formLogoCtx = useContext(FormLogoContext);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: formLogoCtx.values.description,
    },
  });

  function onSubmit(values: FormSchemaType) {
    formLogoCtx.setState({
      name: "colors",
      values: { ...formLogoCtx.values, description: values.description },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-black text-4xl">
          <h2>Define Your Vision</h2>
          <CardDescription className="font-semibold text-lg">
            Share your ideas and inspirations—our AI will craft the perfect logo
            that aligns with your brand&apos;s identity.
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Ex. Desaku - A platform dedicated to empowering villages by connecting communities, promoting local culture, and enhancing rural development through technology."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                className="px-5"
                onClick={() => formLogoCtx.setState({ name: "name" })}
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
