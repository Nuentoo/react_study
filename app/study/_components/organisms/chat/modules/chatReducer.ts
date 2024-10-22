import type { messageStoreType, messageStoreAction } from '../type/type';

class ExhaustiveError extends Error {
	constructor(value: never, message = `Unsupported type: ${value}`) {
		super(message);
	}
}

const chatReducer = (
	state: messageStoreType,
	action: messageStoreAction,
): messageStoreType => {
	switch (action.type) {
		case 'CHANNEL_CHANGE':
			return {
				...state,
				channelId: action.contactId,
			};
		case 'CHANNEL_INSERT':
			return {
				...state,
				message: {
					...state.message,
					[action.insertId]: '',
				},
			};
		case 'CHANNEL_DELETE':
			const {
				message: { [action.deleteId]: _, ...rest },
			} = state;
			if (state.channelId === action.deleteId) {
				return {
					channelId: Number(Object.keys(rest)[0]), // TODO : 削除されたチャンネルに入っていたら一旦先頭のチャンネルに current を変更
					message: rest,
				};
			} else {
				return {
					...state,
					message: rest,
				};
			}
		case 'INPUT_MESSAGE':
			return {
				...state,
				message: {
					...state.message,
					[state.channelId]: action.editMessage,
				},
			};
		case 'POST_MESSAGE':
			return {
				...state,
				message: {
					...state.message,
					[state.channelId]: '',
				},
			};
		default:
			throw new ExhaustiveError(action); // 本来コンパイルエラーを起こさせるため
	}
};

export default chatReducer;
