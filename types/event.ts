export type EventProperties = {
  name: string;
  description: string;
  start: Date;
  end: Date;
  slug: string;
};

export type Event = EventProperties & { content: string };
