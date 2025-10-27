// Central place to choose the data source URL.
// If you deploy with VITE_FIREBASE_DB_URL set to your Firebase Realtime Database
// JSON endpoint (for example: https://<your-db>.firebaseio.com/.json), the app
// will read data from Firebase. Otherwise it falls back to the original PHP JSON
// endpoint used for testing.

export function getDataUrl(): string {
  // Vite exposes env vars starting with VITE_ via import.meta.env
  const fb = (import.meta as any).env?.VITE_FIREBASE_DB_URL
  if (fb && typeof fb === 'string' && fb.length > 0) return fb

  return 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
}

export default getDataUrl
