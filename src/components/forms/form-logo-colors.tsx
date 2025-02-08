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
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  colors: z.array(z.string()).max(3),
});

type FormSchemaType = z.infer<typeof formSchema>;

type ColorItem = {
  color: string;
  psychology: string;
  itemStyle: string;
};

const colors: ColorItem[] = [
  {
    color: "Red",
    psychology: "Energy, Passion, Strength",
    itemStyle: "text-black bg-red-500",
  },
  {
    color: "Orange",
    psychology: "Creativity, Enthusiasm, Warmth",
    itemStyle: "text-black bg-orange-500",
  },
  {
    color: "Yellow",
    psychology: "Happiness, Optimism, Clarity",
    itemStyle: "text-black bg-yellow-500",
  },
  {
    color: "Green",
    psychology: "Growth, Harmony, Renewal",
    itemStyle: "text-black bg-green-500",
  },
  {
    color: "Blue",
    psychology: "Calm, Trust, Serenity",
    itemStyle: "text-black bg-blue-500",
  },
  {
    color: "Purple",
    psychology: "Luxury, Spirituality, Imagination",
    itemStyle: "text-black bg-purple-500",
  },
  {
    color: "Pink",
    psychology: "Love, Compassion, Playfulness",
    itemStyle: "text-black bg-pink-500",
  },
  {
    color: "Brown",
    psychology: "Stability, Reliability, Comfort",
    itemStyle: "text-white bg-stone-500",
  },
  {
    color: "Teal",
    psychology: "Calmness, Clarity, Emotional Balance",
    itemStyle: "text-black bg-teal-500",
  },
  {
    color: "White",
    psychology: "Purity, Simplicity, Innocence",
    itemStyle: "text-black bg-white",
  },
  {
    color: "Black",
    psychology: "Elegance, Power, Mystery",
    itemStyle: "text-white bg-black",
  },
  {
    color: "Gray",
    psychology: "Balance, Neutrality, Sophistication",
    itemStyle: "text-white bg-gray-500",
  },
];

const ColorItemComp = ({
  color,
  isSelected,
  disabled,
  addToSelected,
  removeFromSelected,
}: {
  isSelected: boolean;
  disabled: boolean;
  addToSelected: (color: ColorItem) => void;
  removeFromSelected: (color: ColorItem) => void;
  color: ColorItem;
}) => {
  return (
    <button
      className={cn(
        color.itemStyle,
        isSelected ? "border-primary" : "border-background",
        "border-4 hover:border-primary text-start p-4 h-36 transition-colors duration-300 rounded-lg",
        disabled ? "brightness-50 cursor-default hover:border-background" : ""
      )}
      onClick={() => {
        if (disabled) return;
        if (isSelected) {
          return removeFromSelected(color);
        }

        return addToSelected(color);
      }}
    >
      <div className="text-xl font-semibold">{color.color}</div>
      <div>{color.psychology}</div>
    </button>
  );
};

const ColorSelections = ({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (selected: string[]) => void;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {colors.map((item) => (
        <ColorItemComp
          key={item.color}
          color={item}
          isSelected={selected.includes(item.color)}
          disabled={selected.length >= 3 && !selected.includes(item.color)}
          addToSelected={(item) => onChange([...selected, item.color])}
          removeFromSelected={(item) =>
            onChange(selected.filter((v) => v !== item.color))
          }
        />
      ))}
    </div>
  );
};

export const FormLogoColors = () => {
  const formLogoCtx = useContext(FormLogoContext);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      colors: [],
    },
  });

  function onSubmit(values: FormSchemaType) {
    formLogoCtx.setState({
      name: "colors",
      values: { ...formLogoCtx.values, colors: values.colors },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-black text-4xl">
          <h2>Choose the Perfect Colors</h2>
          <CardDescription className="font-semibold text-lg">
            Select the ideal color palette to craft a logo that truly represents
            your brand.
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ColorSelections
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
                {form.getValues().colors.length === 0? "Skip":"Next"}
                <ArrowRight />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
