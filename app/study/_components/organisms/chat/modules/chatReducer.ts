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
