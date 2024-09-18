import type { MessengerType, MessengerAction } from '../type/type';

class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }
}

const messengerReducer = (state: MessengerType, action: MessengerAction) => {
  switch (action.type) {
    case 'MESSENGER_CHANGE':
      return {
        ...state,
        selectedId: action.contactId,
      };
    case 'MESSAGE_INPUT':
      return {
        ...state,
        message: {
          ...state.message,
          [state.selectedId]: action.editMessage,
        },
      };
    case 'MESSAGE_SEND':
      return {
        ...state,
        message: {
          ...state.message,
          [state.selectedId]: '',
        },
      };
    default:
      throw new ExhaustiveError(action); // 本来コンパイルエラーを起こさせるため
  }
};

export default messengerReducer;
