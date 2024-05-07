import { EditEventType } from "../hooks/eventType/useEventTypeEdit";
import { CreateEventType, EventType } from "../hooks/eventType/useEventTypes";
import HttpClient from "./httpClient";

const eventTypeClient = new HttpClient<
  EventType,
  CreateEventType,
  EditEventType
>("/event-types");

export default eventTypeClient;
