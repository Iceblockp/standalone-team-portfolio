"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const teamMemberSchema = z.object({
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

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

export async function getTeamMembers() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    return { teamMembers };
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return { error: "Failed to fetch team members" };
  }
}

export async function getTeamMember(id: string) {
  try {
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    });
    return { teamMember };
  } catch (error) {
    console.error(`Failed to fetch team member with ID ${id}:`, error);
    return { error: "Failed to fetch team member" };
  }
}

export async function createTeamMember(data: TeamMemberFormData) {
  try {
    const validatedData = teamMemberSchema.parse(data);

    await prisma.teamMember.create({
      data: validatedData,
    });

    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: "Team member created successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error("Failed to create team member:", error);
    return { error: "Failed to create team member" };
  }
}

export async function updateTeamMember(id: string, data: TeamMemberFormData) {
  try {
    const validatedData = teamMemberSchema.parse(data);

    await prisma.teamMember.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: "Team member updated successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error(`Failed to update team member with ID ${id}:`, error);
    return { error: "Failed to update team member" };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({
      where: { id },
    });

    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: "Team member deleted successfully" };
  } catch (error) {
    console.error(`Failed to delete team member with ID ${id}:`, error);
    return { error: "Failed to delete team member" };
  }
}
