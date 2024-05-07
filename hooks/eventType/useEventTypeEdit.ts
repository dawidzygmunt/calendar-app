import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventType } from "./useEventTypes";
import eventTypeClient from "../../services/eventTypesService";

export type EditEventType = Partial<EventType>;

export const useEventTypeEdit = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editEventType"],
    mutationFn: async (editData: EditEventType) => {
      return await eventTypeClient.patch(id, editData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["eventTypes"] });
    },
  });
};
