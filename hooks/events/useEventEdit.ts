import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "./useEvents";
import eventClient from "../../services/eventsService";

export type EditEvent = Partial<Event>;

export const useEventEdit = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editEvent"],
    mutationFn: async (editData: EditEvent) => {
      return await eventClient.patch(id, editData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
