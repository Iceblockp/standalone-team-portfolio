"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import {
  getContacts,
  markContactAsRead,
  deleteContact,
} from "@/lib/actions/contact";
import { toast } from "sonner";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { Contact } from "@prisma/client";

const ContactDialog = dynamic(
  () => import("@/components/admin/contacts/contact-dialog")
);

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    const response = await getContacts();
    if (response.contacts) {
      setContacts(response.contacts);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleView = async (contact: Contact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
    if (!contact.read) {
      await markContactAsRead(contact.id);
      fetchContacts();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      const result = await deleteContact(id);
      if (result.success) {
        toast.success(result.success);
        fetchContacts();
      } else {
        toast.error(result.error || "Failed to delete message");
      }
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedContact(null);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Contact Messages</h1>
        </div>

        <div className="bg-card rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <Badge variant={contact.read ? "secondary" : "default"}>
                      {contact.read ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell>
                    {format(new Date(contact.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(contact)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <ContactDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          contact={selectedContact}
        />
      </div>
    </AdminLayout>
  );
}
