# ProofFetch: cited web evidence for agents

Inspect a public URL free. Purchase its extracted, paragraph-addressable text for **US$0.50 per fulfillment** through the separate Stripe MPP card/SPT API.

[Try the preflight](https://proof-fetch-agent-api.neoaethel.workers.dev/) · [Current offer](https://proof-fetch-agent-api.neoaethel.workers.dev/offer) · [OpenAPI](https://proof-fetch-agent-api.neoaethel.workers.dev/openapi.json) · [Support](https://proof-fetch-agent-api.neoaethel.workers.dev/policies/support)

For agents: [llms.txt](https://proof-fetch-agent-api.neoaethel.workers.dev/llms.txt) · [A2A agent card](https://proof-fetch-agent-api.neoaethel.workers.dev/.well-known/agent-card.json) · [connection guide](https://proof-fetch-agent-api.neoaethel.workers.dev/connect) · MCP registry name `io.github.equinoxaifinance-rgb/proof-fetch`

Before paying: [terms](https://proof-fetch-agent-api.neoaethel.workers.dev/policies/terms) · [privacy](https://proof-fetch-agent-api.neoaethel.workers.dev/policies/privacy) · [refunds](https://proof-fetch-agent-api.neoaethel.workers.dev/policies/refunds)

This repository contains documentation and small client examples only. It does not contain the extraction engine, a payment credential, or a way to obtain the paid paragraphs free.

## Start here

1. [Inspect a URL before giving it to an agent](guides/preflight.md).
2. [Handle a payment challenge without accidental retries](guides/payment-recovery.md).
3. With Node 22 or later, run `node examples/preflight.mjs https://example.com` from this repository. The example makes no payment.
4. In n8n, [inspect free metadata and stop before payment](guides/n8n/README.md) using the bounded client workflow.

This repository's documentation, discovery metadata and examples, including the n8n wrapper and guide in [`guides/n8n`](guides/n8n/README.md), are MIT licensed under the root [LICENSE](LICENSE). The MIT licence does not cover the ProofFetch extraction engine or the hosted service at `proof-fetch-agent-api.neoaethel.workers.dev`: their source is not in this repository and is not licensed or distributed here. Paid paragraphs, upstream material, credentials and account or payment rights keep their own terms.

## Agent skill

[`skills/cited-web-evidence/SKILL.md`](skills/cited-web-evidence/SKILL.md) teaches an agent when and how to use ProofFetch: preflight first, pay only with the user's approval, and cite paragraph IDs. Install it into Claude Code, Cursor, Codex or another skills-aware agent with `npx skills add equinoxaifinance-rgb/proof-fetch-docs --skill cited-web-evidence`.

## Connect an MCP client

Use Streamable HTTP at `https://proof-fetch-agent-api.neoaethel.workers.dev/mcp`. In Claude Code: `claude mcp add --transport http proof-fetch https://proof-fetch-agent-api.neoaethel.workers.dev/mcp`. Its two tools are `proof_fetch_preflight` and `proof_fetch_offer`. MCP Registry manifest: [server.json](server.json) (`io.github.equinoxaifinance-rgb/proof-fetch`). Neither tool returns the paid page text. Paying clients use `POST /v1/evidence` separately.

## What you receive

Free preflight: fetch metadata, document statistics, content/raw hashes and deterministic prompt-injection indicators. Paid fulfillment adds paragraph IDs, text and a payment receipt. A hash identifies bytes; it does not certify that a source is true. An unflagged page is not a safety guarantee.

Supported: public HTML, XHTML, text and JSON, at most 1 MiB and five redirects. No login, cookies, caller headers, browser rendering or private-network destinations. Inspect the live offer for current limits before integration.

## Design-partner invitation

Building a research agent and struggling to preserve citations or recover paid requests? Open a non-sensitive [support case](https://proof-fetch-agent-api.neoaethel.workers.dev/policies/support) describing the integration step and client. Save the returned case ID and access token to read the reply. Never send keys, private source URLs, personal contact details or customer content. Onboarding uses the existing offer; no unlimited free access or performance guarantee is promised.

Documentation prepared with AI assistance and checked against the public API. Product owner: ProofFetch. No adoption, customer or revenue claim is implied by these examples.
