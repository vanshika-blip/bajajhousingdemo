// GET /api/agents?section=bhfl|bfs — list that section's Hunar agents (all except Archived)
import { HUNAR_BASE, keyFor, sectionOf } from "./_keys.js";

export default {
  async fetch(request) {
    const k = keyFor(sectionOf(request));
    if (k.error) return Response.json({ error: k.error }, { status: k.status });
    try {
      const agents = [];
      for (let page = 1; page <= 10; page++) {
        const resp = await fetch(`${HUNAR_BASE}/agents/?page_size=200&page=${page}`, {
          headers: { "X-API-Key": k.key },
        });
        if (!resp.ok) {
          return new Response(await resp.text(), { status: resp.status, headers: { "Content-Type": "application/json" } });
        }
        const data = await resp.json();
        for (const a of data.results || []) {
          if (a.status === "ARCHIVED") continue;
          agents.push({
            id: a.id,
            status: a.status || "",
            name: a.name,
            persona: a.persona_name || a.voice_name || "",
            language: a.language || "ENGLISH",
            summary: a.summary || "",
            code: a.agent_code || "",
            variables: a.custom_variables || [],
            sample_values: a.custom_variable_values || {},
          });
        }
        if (!data.next) break;
      }
      agents.sort((x, y) => x.name.localeCompare(y.name));
      return Response.json(
        { count: agents.length, agents },
        { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } }
      );
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  },
};
