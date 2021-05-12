import type { GrayMatterFile, Input } from 'gray-matter';

import type { Announcement } from '../../types/announcement';

export default {} as Record<string, GrayMatterFile<Input> & { data: Announcement }>