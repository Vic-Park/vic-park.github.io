import type { GrayMatterFile, Input } from 'gray-matter';

import type { ClubAnnouncementProperties } from '../../types/announcement';

export default {} as Record<string, GrayMatterFile<Input> & { data: ClubAnnouncementProperties }>