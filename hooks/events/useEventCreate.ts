import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEvent } from "./useEvents";
import eventClient from "../../services/eventsService";

export const useEventCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addEvent"],
    mutationFn: async (event: CreateEvent) => {
      return await eventClient.post(event);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
