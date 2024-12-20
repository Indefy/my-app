import { SOCKET_EVENTS } from '../constants/events';

class NotificationService {
  private socket: any;

  constructor(socket: any) {
    this.socket = socket;
  }

  sendNotification(userId: string, message: string) {
    this.socket.emit(SOCKET_EVENTS.NEW_NOTIFICATION, { userId, message });
  }

  onNewNotification(callback: (notification: any) => void) {
    this.socket.on(SOCKET_EVENTS.NEW_NOTIFICATION, callback);
  }
}

export default NotificationService;

