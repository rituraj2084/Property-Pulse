'use client';

import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { getSession } from 'next-auth/react';

const { createContext, useState, useContext, useEffect } = require('react');

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: session } = getSession();
  useEffect(() => {
    getUnreadMessageCount().then((res) => {
      if (res.count) setUnreadCount(res.count);
    });
  }, [session, getUnreadMessageCount]);
  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
