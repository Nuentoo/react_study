import { useRef } from 'react';
import { VariantsButton, buttonStyles } from '../../atoms/StyledButton';
import StyledSendButton from '../../atoms/StyledSendButton';
import TextareaToolBar from '../../molecules/TextareaToolBar';
import type { ChatProps } from './type/type';

export default function Chat({
  contact,
  selectedMessage,
  posts,
  addPosts,
  dispatch,
}: ChatProps): React.ReactElement {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nativeEvent = e.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter as HTMLButtonElement;
    const formData = new FormData(e.currentTarget, submitter);
    const action = formData.get('action');
    switch (action) {
      case 'send':
        if (
          !confirm(`Sending email "${selectedMessage}" to ${contact.email} ?`)
        )
          return;
        dispatch({ type: 'MESSAGE_SEND' });
        // console.log('send発火');
        break;
      case 'post':
        addPosts(posts);
        dispatch({ type: 'MESSAGE_SEND' });
        // console.log('post発火');
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
          placeholder={`messenger : ${contact.slug}`}
          rows={4}
          className="w-full px-2 py-1 text-sm text-gray-800"
          onInput={(e) => {
            dispatch({
              type: 'MESSAGE_INPUT',
              editMessage: e.currentTarget.value,
            });
            // console.log('input発火', e.currentTarget.value)
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
          <VariantsButton
            name="action"
            value="send"
            disabled={!selectedMessage}
            className={buttonStyles({ color: 'green' })}
          >
            {`Send to ${contact.slug}`}
          </VariantsButton>
        </div>
      </div>
    </form>
  );
}
