import { EditEvent } from "../hooks/events/useEventEdit";
import { CreateEvent, Event } from "../hooks/events/useEvents";
import HttpClient from "./httpClient";

const eventClient = new HttpClient<Event, CreateEvent, EditEvent>("/events");

export default eventClient;
