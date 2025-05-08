"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "@prisma/client";

type ContactDialogProps = {
  open: boolean;
  onClose: () => void;
  contact?: Contact | null;
};

export default function ContactDialog({
  open,
  onClose,
  contact,
}: ContactDialogProps) {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Message Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">From</h3>
            <p>
              {contact.name} ({contact.email})
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Subject</h3>
            <p>{contact.subject}</p>
          </div>

          <div>
            <h3 className="font-semibold">Message</h3>
            <p className="whitespace-pre-wrap">{contact.message}</p>
          </div>

          <div>
            <h3 className="font-semibold">Received</h3>
            <p>{new Date(contact.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
