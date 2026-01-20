export interface Algorithm {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  status: 'online' | 'offline';
  icon: string;
  color: string;
  type: string;
}

export interface EventLog {
  id: string;
  time: string;
  location: string;
  type: string;
  riskLevel: 'high' | 'medium' | 'low';
  status: 'handled' | 'pending' | 'observing';
}

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  latency: string;
  status: 'online' | 'offline';
  thumbnail: string;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'system';
    text: string;
    tags?: string[];
}
