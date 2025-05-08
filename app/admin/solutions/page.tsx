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
import { getSolutions, deleteSolution } from "@/lib/actions/solutions";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Solution } from "@prisma/client";

const SolutionDialog = dynamic(
  () => import("@/components/admin/solutions/solution-dialog")
);

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(
    null
  );

  const fetchSolutions = async () => {
    const response = await getSolutions();
    if (response.solutions) {
      setSolutions(response.solutions);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const handleEdit = (solution: Solution) => {
    setSelectedSolution(solution);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this solution?")) {
      const result = await deleteSolution(id);
      if (result.success) {
        toast.success(result.success);
        fetchSolutions();
      } else {
        toast.error(result.error || "Failed to delete solution");
      }
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedSolution(null);
    fetchSolutions();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Solutions</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Solution
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
              {solutions.map((solution) => (
                <TableRow key={solution.id}>
                  <TableCell className="font-medium">
                    {solution.title}
                  </TableCell>
                  <TableCell>{solution.description}</TableCell>
                  <TableCell>{solution.icon}</TableCell>
                  <TableCell>{solution.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(solution)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(solution.id)}
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

        <SolutionDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          solution={selectedSolution}
        />
      </div>
    </AdminLayout>
  );
}
