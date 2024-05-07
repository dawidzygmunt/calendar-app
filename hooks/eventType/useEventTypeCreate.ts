import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEventType } from "./useEventTypes";
import eventTypeClient from "../../services/eventTypesService";

export const useEventTypeCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addEventType"],
    mutationFn: async (eventType: CreateEventType) => {
      return await eventTypeClient.post(eventType);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["eventTypes"] });
    },
  });
};
