// Each section has its own Hunar API key, set in Vercel Environment Variables.
// Files starting with "_" are not turned into routes by Vercel.
export const HUNAR_BASE = "https://api.voice.hunar.ai/external/v1";

const KEY_ENV = { bhfl: "HUNAR_API_KEY_BHFL", bfs: "HUNAR_API_KEY_BFS" };

// Returns { key } or { error, status }.
export function keyFor(section) {
  const envName = KEY_ENV[section];
  if (!envName) return { error: "Unknown section. Use bhfl or bfs.", status: 400 };
  const key = process.env[envName];
  if (!key) return { error: `${envName} is not set in Vercel Environment Variables`, status: 500 };
  return { key };
}

export function sectionOf(request) {
  return request.headers.get("x-section") || new URL(request.url).searchParams.get("section");
}
