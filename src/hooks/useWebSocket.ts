import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';

interface WebSocketMessage {
  type: 'event' | 'notification' | 'status';
  data: any;
}

export const useWebSocket = (channelName: string) => {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<WebSocketMessage | null>(null);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!channelName) return;

    const channel = supabase
      .channel(channelName)
      .on('broadcast', { event: '*' }, (payload: any) => {
        setMessage({
          type: payload.type,
          data: payload.payload,
        });
      })
      .subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          setConnected(true);
        } else if (status === 'CLOSED') {
          setConnected(false);
        }
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
    };
  }, [channelName]);

  const sendMessage = (type: string, data: any) => {
    if (channelRef.current && connected) {
      channelRef.current.send({
        type: 'broadcast',
        event: type,
        payload: data,
      });
    }
  };

  return { connected, message, sendMessage };
};
