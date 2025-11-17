// src/utils/asset-cache.ts
class AssetCache {
  private static cache: Set<string> = new Set();

  static has(url: string): boolean {
    return this.cache.has(url);
  }

  static add(url: string) {
    this.cache.add(url);
  }

  static clear() {
    this.cache.clear();
  }
}

export { AssetCache };
