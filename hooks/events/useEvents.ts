import { useQuery } from "@tanstack/react-query";
import eventClient from "../../services/eventsService";

export interface CreateEvent {
  name: string;
  startDate: Date;
  endDate: Date;
  eventTypeId: string;
}

export type Event = CreateEvent & { id: string };

const useEvents = (from?: Date, to?: Date) => {
  const params: Record<string, string> = {};
  if (from) params.from = from.toISOString();
  if (to) params.to = to.toISOString();

  return useQuery({
    queryKey: ["events", params],
    queryFn: async () => {
      return await eventClient.get(params);
    },
  });
};
export default useEvents;
