const PUBLIC_ID_LENGTH = 10;

export function createPublicId() {
  return crypto.randomUUID().replaceAll("-", "").slice(0, PUBLIC_ID_LENGTH);
}
