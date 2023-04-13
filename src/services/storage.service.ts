function saveToStorage(key: string, val: Object | Object[]) {
  const str = JSON.stringify(val);
  localStorage.setItem(key, str);
}

function loadFromStorage(key: string) {
  const str = localStorage.getItem(key);
  if (str) return JSON.parse(str);
}

export const storageService = {
  saveToStorage,
  loadFromStorage,
};
