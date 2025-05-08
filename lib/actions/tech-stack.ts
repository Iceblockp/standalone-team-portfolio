"use server";

import { prisma } from "@/lib/prisma";
import { useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const technologySchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Invalid image URL"),
  order: z.coerce.number().int().positive(),
});

export type TechnologyFormData = z.infer<typeof technologySchema>;

export async function getTechnologies() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { order: "asc" },
    });
    return { technologies };
  } catch (error) {
    console.error("Failed to fetch technologies:", error);
    return { error: "Failed to fetch technologies" };
  }
}

export async function getTechnology(id: string) {
  try {
    const technology = await prisma.technology.findUnique({
      where: { id },
    });
    return { technology };
  } catch (error) {
    console.error(`Failed to fetch technology with ID ${id}:`, error);
    return { error: "Failed to fetch technology" };
  }
}

export async function createTechnology(data: TechnologyFormData) {
  try {
    const validatedData = technologySchema.parse(data);

    await prisma.technology.create({
      data: validatedData,
    });
    revalidatePath("/admin/tech-stack");
    revalidatePath("/");
    return { success: "Technology created successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error("Failed to create technology:", error);
    return { error: "Failed to create technology" };
  }
}

export async function updateTechnology(id: string, data: TechnologyFormData) {
  try {
    const validatedData = technologySchema.parse(data);

    await prisma.technology.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/admin/tech-stack");
    revalidatePath("/");
    return { success: "Technology updated successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error(`Failed to update technology with ID ${id}:`, error);
    return { error: "Failed to update technology" };
  }
}

export async function deleteTechnology(id: string) {
  try {
    await prisma.technology.delete({
      where: { id },
    });

    revalidatePath("/admin/tech-stack");
    revalidatePath("/");
    return { success: "Technology deleted successfully" };
  } catch (error) {
    console.error(`Failed to delete technology with ID ${id}:`, error);
    return { error: "Failed to delete technology" };
  }
}
