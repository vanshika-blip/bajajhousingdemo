// POST /api/calls — start a Hunar voice call with the section's key (header x-section)
import { HUNAR_BASE, keyFor, sectionOf } from "./_keys.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }
    const k = keyFor(sectionOf(request));
    if (k.error) return Response.json({ error: k.error }, { status: k.status });
    try {
      const body = await request.json();
      const resp = await fetch(`${HUNAR_BASE}/calls/`, {
        method: "POST",
        headers: { "X-API-Key": k.key, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return new Response(await resp.text(), {
        status: resp.status,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  },
};
