import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "./useEvents";
import eventClient from "../../services/eventsService";

export const useEventTypeDelete = (event: Event) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteEvent"],
    mutationFn: async () => {
      return await eventClient.delete(event);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
