export type AnnouncementProperties = {
  title: string;
  date: Date;
  slug: string;
};

export type Announcement = AnnouncementProperties & {
  content: string;
};
