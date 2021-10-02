import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

export enum ReplyCode {
	SUCCESS = 'SUCCESS',
	NO_CHANGE = 'NO_CHANGE',
	INCORRECT_SECRET = 'INCORRECT_SECRET',
}

export const Success = Type.Object({
	code: Type.Literal(ReplyCode.SUCCESS),
	data: Type.Object({
		commitSha: Type.String(),
	}),
});
export type Success = Static<typeof Success>;

export const NoChange = Type.Object({
	code: Type.Literal(ReplyCode.NO_CHANGE),
});
export type NoChange = Static<typeof NoChange>;

export const IncorrectSecret = Type.Object({
	code: Type.Literal(ReplyCode.INCORRECT_SECRET),
});
export type IncorrectSecret = Static<typeof IncorrectSecret>;

export type Reply = Success | NoChange | IncorrectSecret;

