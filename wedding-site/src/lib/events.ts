export type AccessRole = "full" | "wedding" | "admin";

export type EventKey = "sangeet" | "wedding";

export const EVENT_DETAILS: Record<
  EventKey,
  {
    key: EventKey;
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
  }
> = {
  sangeet: {
    key: "sangeet",
    name: "Mehndi & Welcome Dinner",
    date: "Saturday, June 12, 2027",
    time: "4:00 PM – 8:00 PM EDT",
    location: "Saffron Cuisine, Cambridge, ON",
    description:
      "An evening of henna, food, music, and time with family and friends before the wedding celebrations begin.",
    image: "/images/rsvp/mehndi.jpg",
  },
  wedding: {
    key: "wedding",
    name: "Indian Wedding",
    date: "Sunday, June 13, 2027",
    time: "2:00 PM – 12:00 AM EDT",
    location: "Mississauga Convention Centre, Mississauga, ON",
    description:
      "A ceremony filled with colour, music, family, and tradition, followed by cocktails and the reception.",
    image: "/images/rsvp/wedding.jpg",
  },
};

export function eventsForRole(role: AccessRole): EventKey[] {
  if (role === "full") return ["sangeet", "wedding"];
  if (role === "wedding") return ["wedding"];
  return [];
}

export function roleAllowsEvent(role: AccessRole, eventKey: EventKey): boolean {
  return eventsForRole(role).includes(eventKey);
}
