import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventType } from "./useEventTypes";
import eventTypeClient from "../../services/eventTypesService";

export const useEventTypeDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteEventType"],
    mutationFn: async (eventType: EventType) => {
      return await eventTypeClient.delete(eventType);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["eventTypes"] });
    },
  });
};
