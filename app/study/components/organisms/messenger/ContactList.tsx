import type { ContactListProps } from './type/type';

export default function ContactList({
  contacts,
  selectedId,
  dispatch,
}: ContactListProps): React.ReactElement {
  return (
    <ul className="h-fit rounded-lg border bg-gray-100 shadow-lg">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          className="min-w-[120px] items-center border-b border-gray-200 last-of-type:border-none"
        >
          <button
            className="w-full px-3 py-2"
            onClick={() => {
              dispatch({
                type: 'MESSENGER_CHANGE',
                contactId: contact.id,
              });
              // console.log('change発火');
            }}
          >
            {contact.id === selectedId ? <b>{contact.name}</b> : contact.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
