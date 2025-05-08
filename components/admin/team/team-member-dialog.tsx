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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createTeamMember, updateTeamMember } from "@/lib/actions/team";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(1, "Bio is required"),
  imageUrl: z.string().url("Invalid image URL"),
  order: z.coerce.number().int().positive(),
  twitter: z.string().url("Invalid Twitter URL").optional().nullable(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().nullable(),
  github: z.string().url("Invalid GitHub URL").optional().nullable(),
  behance: z.string().url("Invalid Behance URL").optional().nullable(),
});

type FormData = z.infer<typeof formSchema>;

type TeamMemberDialogProps = {
  open: boolean;
  onClose: () => void;
  member?: {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    order: number;
    twitter?: string | null;
    linkedin?: string | null;
    github?: string | null;
    behance?: string | null;
  } | null;
};

export default function TeamMemberDialog({
  open,
  onClose,
  member,
}: TeamMemberDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member?.name || "",
      role: member?.role || "",
      bio: member?.bio || "",
      imageUrl: member?.imageUrl || "",
      order: member?.order || 1,
    },
  });

  useEffect(() => {
    if (member) {
      form.setValue("name", member.name);
      form.setValue("role", member.role);
      form.setValue("bio", member.bio);
      form.setValue("imageUrl", member.imageUrl);
      form.setValue("order", member.order);
      form.setValue("twitter", member.twitter || undefined);
      form.setValue("linkedin", member.linkedin || undefined);
      form.setValue("github", member.github || undefined);
      form.setValue("behance", member.behance || undefined);
    } else {
      form.reset();
    }
  }, [member]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = member
        ? await updateTeamMember(member.id, data)
        : await createTeamMember(data);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        form.reset();
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
            {member ? "Edit Team Member" : "Add New Team Member"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={isSubmitting} />
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || undefined}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || undefined}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || undefined}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="behance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Behance URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || undefined}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
