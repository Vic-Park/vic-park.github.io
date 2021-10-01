// eslint-disable-next-line import/no-self-import
// eslint-disable-next-line import/no-unresolved
import type { AttributifyNames } from 'windicss/types/jsx';

type Prefix = 'w:'; // change it to your prefix

type HTMLAttributes = Partial<Record<AttributifyNames<Prefix>, string>>;
