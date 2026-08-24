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
    name: "Mehendi / Sangeet",
    date: "October 25, 2026",
    time: "6:00 PM",
    location: "Chicago Cultural Center",
    description: "An evening of music, dance, and henna before the big day.",
    image: "/images/sangeet.jpeg",
  },
  wedding: {
    key: "wedding",
    name: "Wedding Ceremony",
    date: "October 26, 2026",
    time: "4:00 PM",
    location: "The Geraghty, Chicago",
    description: "Join us as we exchange vows surrounded by family and friends.",
    image: "/images/story-3.jpg",
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
