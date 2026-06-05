---
project: sohamshinde.github.io
branch: revamp/field-notes
goal: replace the Jon Barron static template with a field-notes Astro portfolio + field-radio chat
status: build complete on branch; manual steps remain (domain, deploy, key)
tasks:
  - id: R1
    title: Rebuild site in Astro with the field-notes design system
    passes: true
    blocked: false
    notes: Done. tokens.css + base.css, Newsreader + Space Mono, warm paper / ink-blue / terracotta.
  - id: R2
    title: Field-radio chat (Groq serverless + grounded persona)
    passes: true
    blocked: false
    notes: Done. src/pages/api/chat.ts + src/scripts/field-radio.ts. Key server-only, validated, rate-limited.
  - id: R3
    title: Review pass (a11y / anti-slop / perf / security) and fixes
    passes: true
    blocked: false
    notes: Done. inert focus containment, AA contrast, compositor-only pings, CSP headers, typed endpoint.
  - id: R4
    title: Buy sohamshinde.com
    passes: false
    blocked: true
    notes: 'Manual, needs payment. Confirmed AVAILABLE via RDAP. Register at a registrar (Cloudflare ~$10/yr, Namecheap, or Porkbun). .dev/.me/.in also free.'
  - id: R5
    title: Deploy to Vercel and set GROQ_API_KEY
    passes: false
    blocked: true
    notes: 'Import repo at vercel.com/new (Astro preset). Add GROQ_API_KEY env var from console.groq.com. Adapter + vercel.json already in place.'
  - id: R6
    title: Point sohamshinde.com at Vercel
    passes: false
    blocked: true
    notes: 'Vercel Settings -> Domains -> add sohamshinde.com, follow the DNS records. Optionally redirect sohams25.github.io to it.'
  - id: R7
    title: Optional — dedicated 1200x630 OG image
    passes: false
    blocked: false
    notes: 'Currently OG uses the square profile photo. A purpose-built og.png would render better on social cards.'
  - id: R8
    title: Optional — e2e test for the chat once a key exists
    passes: false
    blocked: false
    notes: 'Verify a real Groq round-trip stays in voice and refuses off-topic/jailbreak prompts.'
---

# Revamp backlog

The site is rebuilt and verified on `revamp/field-notes`. What remains is manual
and outside the code: register the domain, deploy, wire the key and DNS.

See README.md for develop/deploy/chat details.
