import type { GrayMatterFile, Input } from 'gray-matter';
import { Announcement } from '../../src/types/announcement';

export default {} as GrayMatterFile<Input> & { data: Announcement };