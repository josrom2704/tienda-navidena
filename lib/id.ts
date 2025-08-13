// /lib/id.ts
export function objectIdToNumber(oid: string): number {
  const hex = (oid || "").slice(-8);
  const n = parseInt(hex, 16);
  return Number.isNaN(n) ? Date.now() : n;
}
