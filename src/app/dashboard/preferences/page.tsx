"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useGetCurrentUser } from "@/hooks/api";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { postUpdateCurrentUser } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FormSchema = z.object({
  reminder_emails: z.boolean(),
});

export default function Preferences() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetCurrentUser();

  const updateCurrentUserMutation = useMutation({
    mutationFn: postUpdateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast("Successfully updated current user.");
    },
    onError: () => {
      toast("Something went wrong!", {
        description: "Please try again!",
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reminder_emails: data?.emailNotifications ?? false,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        reminder_emails: data?.emailNotifications ?? false,
      });
    }
  }, [data, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!updateCurrentUserMutation.isPending) {
      updateCurrentUserMutation.mutate({
        emailNotifications: data.reminder_emails,
      });
    }
  }

  return (
    <div className="flex flex-1 flex-wrap justify-center w-full p-4 gap-4">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-32">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        </div>
      )}
      {!isLoading && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div>
              <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="reminder_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Reminder emails</FormLabel>
                        <FormDescription>
                          Receive emails about reminders.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={updateCurrentUserMutation?.isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={updateCurrentUserMutation?.isPending}
            >
              {updateCurrentUserMutation?.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
