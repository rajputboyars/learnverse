import Notification from '@/models/Notification';

// Fire-and-forget notification creation. Never throws into the caller.
export async function notify(recipientId, { actorId, actorName, type, message, link }) {
  try {
    if (!recipientId) return;
    if (actorId && recipientId.toString() === actorId.toString()) return; // no self-notify
    await Notification.create({ userId: recipientId, actorName, type, message, link });
  } catch {
    /* ignore */
  }
}
