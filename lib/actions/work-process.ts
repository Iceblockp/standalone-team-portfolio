"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const workProcessSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  order: z.coerce.number().int().positive(),
});

export type WorkProcessFormData = z.infer<typeof workProcessSchema>;

export async function getWorkProcess() {
  try {
    const processes = await prisma.workProcess.findMany({
      orderBy: { order: "asc" },
    });
    return { processes };
  } catch (error) {
    console.error("Failed to fetch work processes:", error);
    return { error: "Failed to fetch work processes" };
  }
}

export async function getWorkProcessStep(id: string) {
  try {
    const process = await prisma.workProcess.findUnique({
      where: { id },
    });
    return { process };
  } catch (error) {
    console.error(`Failed to fetch work process step with ID ${id}:`, error);
    return { error: "Failed to fetch work process step" };
  }
}

export async function createWorkProcess(data: WorkProcessFormData) {
  try {
    const validatedData = workProcessSchema.parse(data);

    await prisma.workProcess.create({
      data: validatedData,
    });

    revalidatePath("/admin/work-process");
    revalidatePath("/");
    return { success: "Work process step created successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error("Failed to create work process step:", error);
    return { error: "Failed to create work process step" };
  }
}

export async function updateWorkProcess(id: string, data: WorkProcessFormData) {
  try {
    const validatedData = workProcessSchema.parse(data);

    await prisma.workProcess.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/admin/work-process");
    revalidatePath("/");
    return { success: "Work process step updated successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error(`Failed to update work process step with ID ${id}: `, error);
    return { error: "Failed to update work process step" };
  }
}

export async function deleteWorkProcess(id: string) {
  try {
    await prisma.workProcess.delete({
      where: { id },
    });

    revalidatePath("/admin/work-process");
    revalidatePath("/");
    return { success: "Work process step deleted successfully" };
  } catch (error) {
    console.error(`Failed to delete work process step with ID ${id}:`, error);
    return { error: "Failed to delete work process step" };
  }
}
