export type ClubEventProperties = {
  name: string;
  description: string;
  start: Date;
  end: Date;
  slug: string;
};

export type ClubEvent = ClubEventProperties & { content: string };
