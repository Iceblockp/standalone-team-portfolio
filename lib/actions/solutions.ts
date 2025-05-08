"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validation schema
const solutionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  order: z.coerce.number().int().positive(),
});

export type SolutionFormData = z.infer<typeof solutionSchema>;

export async function getSolutions() {
  try {
    const solutions = await prisma.solution.findMany({
      orderBy: { order: "asc" },
    });
    return { solutions };
  } catch (error) {
    console.error("Failed to fetch solutions:", error);
    return { error: "Failed to fetch solutions" };
  }
}

export async function getSolution(id: string) {
  try {
    const solution = await prisma.solution.findUnique({
      where: { id },
    });
    return { solution };
  } catch (error) {
    console.error(`Failed to fetch solution with ID ${id}:`, error);
    return { error: "Failed to fetch solution" };
  }
}

export async function createSolution(data: SolutionFormData) {
  try {
    const validatedData = solutionSchema.parse(data);
    
    await prisma.solution.create({
      data: validatedData,
    });

    revalidatePath("/admin/solutions");
    revalidatePath("/");
    return { success: "Solution created successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error("Failed to create solution:", error);
    return { error: "Failed to create solution" };
  }
}

export async function updateSolution(id: string, data: SolutionFormData) {
  try {
    const validatedData = solutionSchema.parse(data);
    
    await prisma.solution.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/admin/solutions");
    revalidatePath("/");
    return { success: "Solution updated successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error(`Failed to update solution with ID ${id}:`, error);
    return { error: "Failed to update solution" };
  }
}

export async function deleteSolution(id: string) {
  try {
    await prisma.solution.delete({
      where: { id },
    });

    revalidatePath("/admin/solutions");
    revalidatePath("/");
    return { success: "Solution deleted successfully" };
  } catch (error) {
    console.error(`Failed to delete solution with ID ${id}:`, error);
    return { error: "Failed to delete solution" };
  }
}