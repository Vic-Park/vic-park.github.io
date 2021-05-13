import type { GrayMatterFile, Input } from 'gray-matter';

import type { EventProperties } from '../../types/event';

export default {} as Record<string, GrayMatterFile<Input> & { data: EventProperties }>;
