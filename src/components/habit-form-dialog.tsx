import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import HabitFormWeekDaySelector from "./habit-form-week-day-selector";
import { HabitFormTimePicker } from "./habit-form-time-picker";
import { postCreateHabit } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const habitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  frequency: z.enum(["DAILY", "WEEKLY"]),
  dateTime: z.date(),
});

interface HabitFormDialogProps {
  button: React.ReactNode;
  title: string;
  description?: string;
  initialValue?: {
    id: string;
    name: string;
    description: string;
    icon: string;
    frequency: string;
    dateTime: Date;
  };
}

type HabitFormData = z.infer<typeof habitSchema>;

export default function HabitFormDialog({
  button,
  title,
  description = "",
  initialValue = undefined,
}: HabitFormDialogProps) {
  const queryClient = useQueryClient();
  const [frequencySelectOpen, setFrequencySelectOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: initialValue?.name || "",
      description: initialValue?.description || "",
      icon: initialValue?.icon || "",
      frequency: (initialValue?.frequency as "DAILY" | "WEEKLY") || "DAILY",
      dateTime: initialValue?.dateTime || new Date(),
    },
  });

  const frequency = watch("frequency");
  const icon = watch("icon");
  const dateTime = watch("dateTime");

  const createHabitMutation = useMutation({
    mutationFn: postCreateHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast("Successfully created habit.");
      setIsOpen(false);
    },
    onError: () => {
      toast("Something went wrong!", {
        description: "Please try again!",
      });
    },
  });

  const onSubmit = (data: HabitFormData) => {
    if (initialValue) {
      // Update Habit TODO
    } else {
      //Create New Habit
      createHabitMutation.mutate({
        ...data,
        description: data?.description || "",
        icon: data?.icon || "bookmark-check",
        daysOfWeek:
          data?.frequency === "DAILY" ? [0, 1, 2, 3, 4, 5, 6] : selectedDays,
        dateTime: data?.dateTime?.toISOString(),
      });
    }
  };

  const onDayButtonClick = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
      setFrequencySelectOpen(false);
      setSelectedDays([]);
    }
  }, [isOpen, reset]);

  const isPending = createHabitMutation.isPending;

  const isSubmitDisabled =
    isPending || (frequency === "WEEKLY" && selectedDays.length === 0);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] min-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("name")} />
              {errors.name && (
                <p className="col-span-4 text-sm text-red-500 ml-28">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                {...register("description")}
              />
            </div>
            <div className="grid gap-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">
                  <DynamicIcon
                    name={(icon as IconName) || "book-check"}
                    size={24}
                  />
                  Icon
                </Label>
                <Input
                  id="icon"
                  placeholder="Icons @ https://lucide.dev/icons"
                  className="col-span-3"
                  {...register("icon")}
                  onChange={(e) => setValue("icon", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <a
                  className="col-span-3 col-start-2 text-sm text-gray-500 hover:text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lucide.dev/icons"
                >
                  Find icons here.
                </a>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="text-right"
                onClick={() => {
                  setFrequencySelectOpen(true);
                }}
              >
                Frequency
              </Label>
              <Select
                value={frequency}
                onValueChange={(value) =>
                  setValue("frequency", value as "DAILY" | "WEEKLY")
                }
                open={frequencySelectOpen}
                onOpenChange={setFrequencySelectOpen}
              >
                <SelectTrigger className="col-span-3 w-auto">
                  <SelectValue placeholder="Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DAILY">Daily</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {frequency === "WEEKLY" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Days of Week</Label>
                <HabitFormWeekDaySelector
                  selectedDays={selectedDays}
                  onDayButtonClick={onDayButtonClick}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hours" className="text-right">
              Time
            </Label>
            <HabitFormTimePicker
              date={dateTime}
              setDate={(newDate) => setValue("dateTime", newDate!)}
            />
          </div>
          <DialogFooter className="pt-2">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isSubmitDisabled}
            >
              {isPending && (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  submitting...
                </>
              )}
              {!isPending && <>{initialValue ? "Save" : "Create"}</>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
