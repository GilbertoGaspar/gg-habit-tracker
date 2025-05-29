"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteHabit } from "@/lib/api";

interface HabitDeleteDialogProps {
  button: React.ReactNode;
  title: string;
  description?: string;
  habitId: string;
}

export default function HabitDeleteDialog({
  button,
  title,
  description = "",
  habitId,
}: HabitDeleteDialogProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const deleteHabitMutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["habits-stats"] });
      toast("Successfully deleted habit.");
      setIsOpen(false);
    },
    onError: () => {
      toast("Something went wrong!", {
        description: "Please try again!",
      });
    },
  });

  const onDelete = () => {
    if (deleteHabitMutation.isPending) return;
    deleteHabitMutation.mutate({ id: habitId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] min-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button
            variant="destructive"
            className="cursor-pointer"
            disabled={deleteHabitMutation.isPending}
            onClick={onDelete}
          >
            {deleteHabitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Deleting...
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
