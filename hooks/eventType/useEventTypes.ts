import { useQuery } from "@tanstack/react-query";
import eventTypeClient from "@/services/eventTypesService";

export interface CreateEventType {
  name: string;
}
export type EventType = CreateEventType & { id: string };

const useEventTypes = () =>
  useQuery({
    queryKey: ["eventTypes"],
    queryFn: async () => {
      return await eventTypeClient.get();
    },
  });
export default useEventTypes;
