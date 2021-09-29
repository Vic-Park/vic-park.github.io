import dayjs from 'dayjs';
import type { sheets_v4 as SheetsV4 } from 'googleapis';
import type { ClubEvent, ClubEventMetadata } from '~types/event';
import type {StringifiedValues} from '~types/utils';
import { getSheetRows } from '..';
import { cleanSheetRow } from '../clean-sheet-row';
import { isEventMetadataValid } from './event';