# Handle a paid evidence request without accidental duplicate purchases

ProofFetch separates free discovery from paid HTTP fulfillment. An MCP tool call is not a card authorization. Do not let an agent spend merely because it discovered an offer.

## 1. Bind an approved request

Before requesting payment, the buyer decides the public URL, budget and permitted payment rail. Generate an unpredictable URL-safe idempotency key once, for example with Node's `randomBytes(24).toString('base64url')`. Keep that key private and reuse it for recovery of that exact request.

The paid JSON schema is:

```json
{"url":"https://example.com","maxChars":30000,"idempotencyKey":"REPLACE_WITH_YOUR_RANDOM_KEY"}
```

This is a schema illustration, not a credential or a reusable production key.

## 2. Inspect the challenge before paying

Send the request to `POST https://proof-fetch-agent-api.neoaethel.workers.dev/v1/evidence`. Without payment, a successfully fetched and extracted resource returns HTTP 402 with a Stripe MPP challenge. A failed extraction must not be treated as an invitation to pay.

Use an MPP-capable buyer implementation and a buyer-authorized Stripe shared payment token. Verify the amount, currency, merchant and challenge binding against the approved offer. The present price is US$0.50. Do not invent a token, put a card number in the JSON, or assume stablecoins are supported.

The [OpenAPI](https://proof-fetch-agent-api.neoaethel.workers.dev/openapi.json) and [offer](https://proof-fetch-agent-api.neoaethel.workers.dev/offer) are the machine-readable contracts. A client needs an actual supported buyer payment setup; this guide is not a universal one-command checkout SDK.

## 3. Keep the response and recovery material together

After an authorized successful payment, retain the exact request, idempotency key, original valid payment credential, returned evidence and `Payment-Receipt` header in the buyer's secure storage. Never send these credentials to support or place them in a public issue.

If the connection ends before the response arrives, retry the identical request with its original valid payment credential. Do not generate a new key or silently authorize a fresh purchase. Pending/conflict responses require inspection rather than uncontrolled concurrent retries. Completed fulfillment recovery is a separate outcome from charging again.

## 4. Separate your test evidence

An unpaid 402 proves the challenge path. A sandbox purchase proves only that sandbox path. A live customer purchase requires a real successful payment and delivered evidence. Do not label any of those interchangeable. For a support issue, open a case with non-sensitive request/content hashes and a receipt reference, then retain its private response token.
