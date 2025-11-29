type Entry<V> = { value: V; expiresAt: number };

export class TTLCache<K, V> {
  private store = new Map<string, Entry<V>>();
  constructor(private ttlMs: number) {}
  private keyToString(key: K) {
    return JSON.stringify(key);
  }
  get(key: K): V | undefined {
    const k = this.keyToString(key);
    const entry = this.store.get(k);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(k);
      return undefined;
    }
    return entry.value;
  }
  set(key: K, value: V) {
    const k = this.keyToString(key);
    this.store.set(k, { value, expiresAt: Date.now() + this.ttlMs });
  }
}
