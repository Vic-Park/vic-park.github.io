import type { GrayMatterFile, Input } from 'gray-matter';

import type { Club } from '../../types/club';

export default {} as Record<string, GrayMatterFile<Input> & { data: Club }>;
