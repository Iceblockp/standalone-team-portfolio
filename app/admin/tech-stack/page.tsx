"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TechnologyDialog from "@/components/admin/tech-stack/technology-dialog";
import { getTechnologies, deleteTechnology } from "@/lib/actions/tech-stack";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/admin-layout";

export default function TechStackPage() {
  const [selectedTechnology, setSelectedTechnology] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["technologies"],
    queryFn: async () => {
      const result = await getTechnologies();
      if (result.error) throw new Error(result.error);
      return result.technologies;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this technology?")) return;

    const result = await deleteTechnology(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
      refetch();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tech Stack</h1>
          <Button
            onClick={() => {
              setSelectedTechnology(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Technology
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((technology: any) => (
            <div
              key={technology.id}
              className="bg-card p-4 rounded-lg shadow flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={technology.imageUrl}
                  alt={technology.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="font-semibold">{technology.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Order: {technology.order}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTechnology(technology);
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(technology.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        <TechnologyDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          technology={selectedTechnology}
        />
      </div>
    </AdminLayout>
  );
}
