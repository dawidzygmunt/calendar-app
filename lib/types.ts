import { z } from "zod";

export const AddEventSchema = z.object({
  name: z.string().min(2).max(15),
  startDate: z.string().min(8, { message: "Date is required" }),
  endDate: z.string().min(8, { message: "Date is required" }),
  startHour: z.string().optional(),
  endOfHour: z.string().optional(),
  eventTypeId: z
    .string()
    .min(4, { message: "Event Type is required" })
    .refine((value) => value !== "Select type event", {
      message: "Event Type cannot be 'select type event'",
      path: ["eventTypeId"], // Określenie ścieżki do pola, której dotyczy błąd
    }),
});

export const EditEventType = z.object({
  name: z.string().min(2).max(15),
});

export type AddEvent = z.infer<typeof AddEventSchema>;
