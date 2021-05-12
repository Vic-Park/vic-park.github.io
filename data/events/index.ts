import type { GrayMatterFile, Input } from 'gray-matter';

import type { Event } from '../../types/event';

export default {} as Record<string, GrayMatterFile<Input> & { data: Event }>;
