export {};

/* polyfill Symbol.metadata if it isn't defined */
declare global {
  interface SymbolConstructor {
    readonly metadata: unique symbol
  }
}

(Symbol as any).metadata ??= Symbol.for('Symbol.metadata');

const _metadata = Object.create(null);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (typeof Symbol === 'function' && Symbol.metadata != null) {
  Object.defineProperty(globalThis, Symbol.metadata, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: _metadata
  });
}
