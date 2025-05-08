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
import { getWorkProcess, deleteWorkProcess } from "@/lib/actions/work-process";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { WorkProcess } from "@prisma/client";

const WorkProcessDialog = dynamic(
  () => import("@/components/admin/work-process/work-process-dialog")
);

export default function WorkProcessPage() {
  const [processes, setProcesses] = useState<WorkProcess[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<WorkProcess | null>(
    null
  );

  const fetchProcesses = async () => {
    const response = await getWorkProcess();
    if (response.processes) {
      setProcesses(response.processes);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProcesses();
  }, []);

  const handleEdit = (process: WorkProcess) => {
    setSelectedProcess(process);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this process step?")) {
      const result = await deleteWorkProcess(id);
      if (result.success) {
        toast.success(result.success);
        fetchProcesses();
      } else {
        toast.error(result.error || "Failed to delete process step");
      }
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProcess(null);
    fetchProcesses();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Work Process</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Process Step
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">{process.title}</TableCell>
                  <TableCell>{process.description}</TableCell>
                  <TableCell>{process.icon}</TableCell>
                  <TableCell>{process.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(process)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(process.id)}
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

        <WorkProcessDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          process={selectedProcess}
        />
      </div>
    </AdminLayout>
  );
}
