# Bajaj × Hunar.ai — Voice AI Demo

Two sections, both open (no OTP):
- **BHFL** (Bajaj Housing Finance)
- **Bajaj Finserv**

## Files
- `index.html`: the website
- `api/calls.js`: starts a call (POST /api/calls)
- `api/call-status.js`: checks a call (GET /api/call-status?id=...)

## Vercel setup
Import the repo, Framework Preset **Other**, add the environment variable `HUNAR_API_KEY`, deploy.

## Adding agents
Edit the `SECTIONS` block near the top of `index.html`. Every agent listed there is shown in its section.
Replace each `AGENT_ID_...` with the real Hunar agent ID. Until then, the tile shows but its call button stays off.
`fields` lists the details asked before a call; they're sent to the agent as `custom_data`.
