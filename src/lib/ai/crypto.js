import crypto from 'crypto';

// User-supplied provider keys are stored encrypted at rest, never in plain text
// and never sent back to the browser. AES-256-GCM: the auth tag makes a
// tampered ciphertext fail loudly instead of decrypting to garbage.
//
// AI_ENCRYPTION_KEY must be 32 bytes, given as 64 hex chars or base64. Generate:
//   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

function keyBuffer() {
  const raw = process.env.AI_ENCRYPTION_KEY;
  if (!raw) {
    throw new Error(
      'AI_ENCRYPTION_KEY is not set. Add a 32-byte hex key to .env.local — see .env.example'
    );
  }
  const buf = /^[0-9a-fA-F]{64}$/.test(raw)
    ? Buffer.from(raw, 'hex')
    : Buffer.from(raw, 'base64');
  if (buf.length !== 32) {
    throw new Error('AI_ENCRYPTION_KEY must decode to exactly 32 bytes');
  }
  return buf;
}

/** Returns "iv:tag:ciphertext", all base64. */
export function encryptSecret(plain) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer(), iv);
  const enc = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  return [iv.toString('base64'), cipher.getAuthTag().toString('base64'), enc.toString('base64')].join(':');
}

export function decryptSecret(payload) {
  const [iv, tag, data] = String(payload).split(':');
  if (!iv || !tag || !data) throw new Error('Malformed encrypted secret');
  const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer(), Buffer.from(iv, 'base64'));
  decipher.setAuthTag(Buffer.from(tag, 'base64'));
  return Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]).toString('utf8');
}

/** Safe-to-display hint: "sk-…4f2a". Never reveals the key. */
export function maskKey(plain) {
  const s = String(plain);
  if (s.length <= 8) return '••••';
  return `${s.slice(0, 3)}…${s.slice(-4)}`;
}

export function encryptionAvailable() {
  try {
    keyBuffer();
    return true;
  } catch {
    return false;
  }
}
