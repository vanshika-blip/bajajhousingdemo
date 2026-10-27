// GET /api/call-status?id=<callId> — check a call with the section's key (header x-section)
import { HUNAR_BASE, keyFor, sectionOf } from "./_keys.js";

export default {
  async fetch(request) {
    const k = keyFor(sectionOf(request));
    if (k.error) return Response.json({ error: k.error }, { status: k.status });
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
    try {
      const resp = await fetch(`${HUNAR_BASE}/calls/${encodeURIComponent(id)}/`, {
        headers: { "X-API-Key": k.key },
      });
      return new Response(await resp.text(), {
        status: resp.status,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  },
};
