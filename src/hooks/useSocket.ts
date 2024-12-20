import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '../constants/events';

export const useSocket = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

    socket.current.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('Connected to WebSocket');
    });

    socket.current.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log('Disconnected from WebSocket');
    });

    socket.current.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const emitEvent = (eventName: string, data: any) => {
    if (socket.current) {
      socket.current.emit(eventName, data);
    }
  };

  const onEvent = (eventName: string, callback: (data: any) => void) => {
    if (socket.current) {
      socket.current.on(eventName, callback);
    }
  };

  return { emitEvent, onEvent };
};

