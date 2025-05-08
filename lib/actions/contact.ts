"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import nodemailer from "nodemailer";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { contacts };
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return { error: "Failed to fetch contacts" };
  }
}

export async function getContact(id: string) {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return { contact };
  } catch (error) {
    console.error(`Failed to fetch contact with ID ${id}:`, error);
    return { error: "Failed to fetch contact" };
  }
}

export async function createContact(data: ContactFormData) {
  try {
    const validatedData = contactSchema.parse(data);

    // Save to database
    await prisma.contact.create({
      data: validatedData,
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Send mail to team
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SERVER_USER,
      subject: `New Contact Form: ${validatedData.subject}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}
Message:
${validatedData.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<p><strong>Subject:</strong> ${validatedData.subject}</p>
<p><strong>Message:</strong></p>
<p>${validatedData.message}</p>
      `,
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: validatedData.email,
      subject: "Thank you for contacting us",
      text: `
Hello ${validatedData.name},

Thank you for reaching out to us. We have received your message and will get back to you shortly.

Regards,
The Team
      `,
      html: `
<h2>Thank You For Contacting Us</h2>
<p>Hello ${validatedData.name},</p>
<p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
<p>Regards,<br>The Team</p>
      `,
    });

    revalidatePath("/admin/contacts");
    revalidatePath("/");
    return { success: "Message sent successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error("Failed to send message:", error);
    return { error: "Failed to send message" };
  }
}

export async function markContactAsRead(id: string) {
  try {
    await prisma.contact.update({
      where: { id },
      data: { read: true },
    });

    revalidatePath("/admin/contacts");
    return { success: "Contact marked as read" };
  } catch (error) {
    console.error(`Failed to mark contact with ID ${id} as read:`, error);
    return { error: "Failed to update contact" };
  }
}

export async function deleteContact(id: string) {
  try {
    await prisma.contact.delete({
      where: { id },
    });

    revalidatePath("/admin/contacts");
    return { success: "Contact deleted successfully" };
  } catch (error) {
    console.error(`Failed to delete contact with ID ${id}:`, error);
    return { error: "Failed to delete contact" };
  }
}
