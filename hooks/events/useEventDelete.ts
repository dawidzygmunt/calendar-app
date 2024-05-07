import { useMutation, useQueryClient } from "@tanstack/react-query";
import eventClient from "../../services/eventsService";

export const useEventDelete = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteEvent"],
    mutationFn: async () => {
      return await eventClient.delete(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
