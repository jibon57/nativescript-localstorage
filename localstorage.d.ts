/**
 * Gets a value from local storage.
 * @param {string} name - The key of the item to get.
 */
export function getItem(name: string)

/**
 * 
 * @param {string} name - The key of the item.
 * @param {any} value - The value to save in storage.
 */
export function setItem(name: string, value: any)

/**
 * Remove an item from storage.
 * @param {string} name - The key of the item to remove.
 */
export function removeItem(name: string)

/**
 * Clears all of storage items.
 */
export function clear(): void

/**
 * Returns the number of key/value items in storage.
 */
export function length(): number

/**
 * Returns the key name at this position in storage. Zero based.
 * @param {number} id 
 */
export function key(id: number): string
