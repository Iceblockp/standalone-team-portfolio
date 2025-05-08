"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createTechnology, updateTechnology } from "@/lib/actions/tech-stack";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Invalid image URL"),
  order: z.coerce.number().int().positive(),
});

type FormData = z.infer<typeof formSchema>;

type TechnologyDialogProps = {
  open: boolean;
  onClose: () => void;
  technology?: {
    id: string;
    name: string;
    imageUrl: string;
    order: number;
  } | null;
};

export default function TechnologyDialog({
  open,
  onClose,
  technology,
}: TechnologyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient(); // Add this line to get the query client from the context

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: technology?.name || "",
      imageUrl: technology?.imageUrl || "",
      order: technology?.order || 1,
    },
  });

  useEffect(() => {
    if (technology) {
      form.setValue("name", technology.name);
      form.setValue("imageUrl", technology.imageUrl);
      form.setValue("order", technology.order);
    } else {
      form.reset();
    }
  }, [technology]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = technology
        ? await updateTechnology(technology.id, data)
        : await createTechnology(data);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        form.reset();
        queryClient.invalidateQueries({
          queryKey: ["technologies"],
          exact: false,
        });
        onClose();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {technology ? "Edit Technology" : "Add New Technology"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
