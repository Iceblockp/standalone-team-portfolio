"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid image URL"),
  projectUrl: z.string().url("Invalid project URL").optional().nullable(),
  category: z.string().min(1, "Category is required"),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  featured: z.boolean(),
  order: z.coerce.number().int().positive(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return { projects };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return { error: "Failed to fetch projects" };
  }
}

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return { project };
  } catch (error) {
    console.error(`Failed to fetch project with ID ${id}:`, error);
    return { error: "Failed to fetch project" };
  }
}

export async function createProject(data: ProjectFormData) {
  try {
    const validatedData = projectSchema.parse(data);

    await prisma.project.create({
      data: validatedData,
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: "Project created successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error("Failed to create project:", error);
    return { error: "Failed to create project" };
  }
}

export async function updateProject(id: string, data: ProjectFormData) {
  try {
    const validatedData = projectSchema.parse(data);

    await prisma.project.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: "Project updated successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error(`Failed to update project with ID ${id}:`, error);
    return { error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: "Project deleted successfully" };
  } catch (error) {
    console.error(`Failed to delete project with ID ${id}:`, error);
    return { error: "Failed to delete project" };
  }
}
