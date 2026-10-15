# ProofFetch: cited web evidence for agents

Free check with a text preview (about the first 1,000 characters; short pages come back whole). Full text costs 1¢ a page either way: 500 pages for $5 by card, or $0.50 for 50 if your agent pays automatically through Stripe (the page it asked for, plus a key for 49 more).

[Try the preflight](https://prooffetch.tryneverclosed.com/) · [Current offer](https://prooffetch.tryneverclosed.com/offer) · [OpenAPI](https://prooffetch.tryneverclosed.com/openapi.json) · [Support](https://prooffetch.tryneverclosed.com/policies/support)

For agents: [llms.txt](https://prooffetch.tryneverclosed.com/llms.txt) · [A2A agent card](https://prooffetch.tryneverclosed.com/.well-known/agent-card.json) · [connection guide](https://prooffetch.tryneverclosed.com/connect) · MCP registry name `io.github.equinoxaifinance-rgb/proof-fetch`

Before paying: [terms](https://prooffetch.tryneverclosed.com/policies/terms) · [privacy](https://prooffetch.tryneverclosed.com/policies/privacy) · [refunds](https://prooffetch.tryneverclosed.com/policies/refunds)

This repository contains documentation and small client examples only. It does not contain the extraction engine, a payment credential, or a way to obtain the paid paragraphs free.

## Start here

1. [Inspect a URL before giving it to an agent](guides/preflight.md).
2. [Handle a payment challenge without accidental retries](guides/payment-recovery.md).
3. With Node 22 or later, run `node examples/preflight.mjs https://example.com` from this repository. The example makes no payment.
4. In n8n, [inspect free metadata and stop before payment](guides/n8n/README.md) using the bounded client workflow.

This repository's documentation, discovery metadata and examples, including the n8n wrapper and guide in [`guides/n8n`](guides/n8n/README.md), are MIT licensed under the root [LICENSE](LICENSE). The MIT licence does not cover the ProofFetch extraction engine or the hosted service at `prooffetch.tryneverclosed.com`: their source is not in this repository and is not licensed or distributed here. Paid paragraphs, upstream material, credentials and account or payment rights keep their own terms.

## Agent skill

[`skills/cited-web-evidence/SKILL.md`](skills/cited-web-evidence/SKILL.md) teaches an agent when and how to use ProofFetch: preflight first, pay only with the user's approval, and cite paragraph IDs. Install it into Claude Code, Cursor, Codex or another skills-aware agent with `npx skills add equinoxaifinance-rgb/proof-fetch-docs --skill cited-web-evidence`.

## Connect an MCP client

Use Streamable HTTP at `https://prooffetch.tryneverclosed.com/mcp` (the original `https://proof-fetch-agent-api.neoaethel.workers.dev/mcp` keeps working). In Claude Code: `claude mcp add --transport http proof-fetch https://prooffetch.tryneverclosed.com/mcp`. Its free tools are `proof_fetch_preflight` and `proof_fetch_offer`. It also lists `proof_fetch_evidence`, which returns the paid text and needs a ProofFetch card-pack key sent as `Authorization: Bearer <key>`. MCP Registry manifest: [server.json](server.json) (`io.github.equinoxaifinance-rgb/proof-fetch`). The free tools never return the paid page text. Clients paying through Stripe MPP use `POST /v1/evidence`; each $0.50 payment returns the page plus `callBundle.apiKey` for 49 more.

## What you receive

Free preflight: fetch metadata, document statistics, content/raw hashes and deterministic prompt-injection indicators. Paid fulfillment adds paragraph IDs, text and a payment receipt. A hash identifies bytes; it does not certify that a source is true. An unflagged page is not a safety guarantee.

Supported: public HTML, XHTML, text and JSON, at most 1 MiB and five redirects. No login, cookies, caller headers, browser rendering or private-network destinations. Inspect the live offer for current limits before integration.

## Design-partner invitation

Building a research agent and struggling to preserve citations or recover paid requests? Open a [support case](https://prooffetch.tryneverclosed.com/policies/support).

Documentation prepared with AI assistance and checked against the public API. ProofFetch is operated by Neverclosed (https://tryneverclosed.com). Support: bryan@tryneverclosed.com or https://prooffetch.tryneverclosed.com/policies/support
