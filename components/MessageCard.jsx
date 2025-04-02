'use client';

import deleteMessage from '@/app/actions/deleteMessage';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const { setUnreadCount } = useGlobalContext();

  useEffect(() => {
    setFormattedDate(new Date(message.createdAt).toLocaleString());
  }, [message.createdAt]);

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked As ${read ? 'Read' : 'New'}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success('Message Deleted!');
  };

  if (isDeleted) {
    return <p>Message deleted!</p>;
  }
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-2 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold"> Property Inquiry: </span>{' '}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          <span className="text-blue-500">{formattedDate}</span>
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md cursor-pointer"
      >
        {isRead ? 'Mark as New' : 'Mark as Read'}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4  bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
