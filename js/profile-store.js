const KEY = "theCodeProfile";

export function loadProfile() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { name: "", avatarDataUrl: "" };
  try {
    return JSON.parse(raw);
  } catch {
    return { name: "", avatarDataUrl: "" };
  }
}

export function saveProfile(profile) {
  localStorage.setItem(KEY, JSON.stringify(profile));
}
