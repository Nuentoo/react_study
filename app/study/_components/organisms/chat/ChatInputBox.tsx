import { useRef } from 'react';
import StyledSendButton from '../../atoms/StyledSendButton';
import TextareaToolBar from '../../molecules/TextareaToolBar';
import type { ChatInputBoxProps } from './type/type';

export default function ChatInputBox({
  currentChannel,
  selectedMessage,
  addPost,
  chatDispatch,
}: ChatInputBoxProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nativeEvent = e.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter as HTMLButtonElement;
    const formData = new FormData(e.currentTarget, submitter);
    const action = formData.get('action');
    switch (action) {
      case 'post':
        addPost();
        chatDispatch({ type: 'POST_MESSAGE' });
        break;
      default:
        break;
    }
  };

  const handleCommandEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Command + Enter または Ctrl + Enter のチェック
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      // e.preventDefault(); // デフォルトの Enter アクション防がなくても大丈夫そう？
      buttonRef.current?.click();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-1 shadow">
        <TextareaToolBar />
        <textarea
          value={selectedMessage}
          placeholder={`channel : ${currentChannel?.slug}`}
          rows={4}
          className="w-full px-2 py-1 text-sm text-gray-800"
          onInput={(e) => {
            chatDispatch({
              type: 'INPUT_MESSAGE',
              editMessage: e.currentTarget.value,
            });
          }}
          onKeyDown={handleCommandEnter}
        ></textarea>
        <div className="flex items-center justify-between">
          <StyledSendButton
            name="action"
            value="post"
            disabled={!selectedMessage}
            ref={buttonRef}
          />
        </div>
      </div>
    </form>
  );
}
