import type { GrayMatterFile, Input } from 'gray-matter';

import type { ClubEventProperties } from '../../types/event';

export default {} as Record<string, GrayMatterFile<Input> & { data: ClubEventProperties }>;
