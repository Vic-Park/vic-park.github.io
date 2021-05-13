import type { GrayMatterFile, Input } from 'gray-matter';

import type { AnnouncementProperties } from '../../types/announcement';

export default {} as Record<string, GrayMatterFile<Input> & { data: AnnouncementProperties }>