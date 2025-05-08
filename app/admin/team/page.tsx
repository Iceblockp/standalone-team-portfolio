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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getTeamMembers, deleteTeamMember } from "@/lib/actions/team";
import { toast } from "sonner";
import Image from "next/image";
import dynamic from "next/dynamic";
import { TeamMember } from "@prisma/client";

const TeamMemberDialog = dynamic(
  () => import("@/components/admin/team/team-member-dialog")
);

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const fetchTeamMembers = async () => {
    const response = await getTeamMembers();
    if (response.teamMembers) {
      setTeamMembers(response.teamMembers);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      const result = await deleteTeamMember(id);
      if (result.success) {
        toast.success(result.success);
        fetchTeamMembers();
      } else {
        toast.error(result.error || "Failed to delete team member");
      }
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedMember(null);
    fetchTeamMembers();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Team Members</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(member)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(member.id)}
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

        <TeamMemberDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          member={selectedMember}
        />
      </div>
    </AdminLayout>
  );
}
