export type ClubAnnouncementProperties = {
  title: string;
  date: Date;
  slug: string;
};

export type ClubAnnouncement = ClubAnnouncementProperties & {
  content: string;
};
