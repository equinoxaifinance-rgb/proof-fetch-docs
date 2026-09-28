# Inspect web metadata in n8n, then decide whether to buy

[Download the workflow](prooffetch-free-preflight.workflow.json). This client makes one free ProofFetch preflight request, checks the response against the intended URL, and returns metadata plus instructions for a separate, explicitly authorized paid client. It never retrieves paid paragraphs or submits a payment.

## Import and run

1. In an existing authorized n8n editor, create an empty workflow and select **Import from File**. Import the JSON into an isolated workspace so its stable workflow ID cannot overwrite unrelated work.
2. Read the note. In **Choose public URL**, enter a public HTTP(S) URL and optionally set `maxChars` to an integer from 1,000 to 50,000 (default 30,000).
3. Leave the workflow unpublished and execute it manually. Read **Review metadata and paid handoff**; a green n8n execution indicator alone is not successful inspection.
4. `awaiting_explicit_paid_authorization` means the response passed this metadata contract. `paymentAttempted` and `contentIncluded` remain false.
5. If paid evidence is needed, follow the returned [connection instructions](https://proof-fetch-agent-api.neoaethel.workers.dev/connect) in a separate Stripe MPP card/SPT-capable client. Approve current price and scope there. This is not a hosted checkout link, and this recipe never handles payment tokens.

Use only nonsensitive public links. Do not enter credentials, private/customer URLs or secrets in paths/query strings. The bounded input guard rejects unsupported syntax; the service still owns DNS, redirect and network-destination enforcement. Instance retention can override workflow preferences: check it before handling sensitive data.

## What is checked

The final node verifies HTTP status, schema, requested-URL binding, metadata types, observation time, hashes and the paid-offer shape. It returns selected document counts, URLs, hashes and risk indicators. Titles, descriptions, raw headers and unexpected content are not passed onward. Risk labels are warnings, not a safety guarantee. Hashes identify bytes, not truth. Sources can change after preflight.

Errors produce `state=failed`, a typed code and `handoff=null`. A wrong input binding, stale/future timestamp, malformed response, altered paid route or unexpected content field is a failure even if HTTP returned 200. Correct bad input first. HTTP 429/5xx and transport failures may be marked retryable; wait and make an explicit manual retry decision. There is no automatic retry loop.

The successful handoff requires a separate buyer-authorized payment client, current offer review, high-entropy idempotency key retained across uncertain retries, and verification of the paid receipt. Those payment capabilities are not implemented by this free wrapper. See the live [offer](https://proof-fetch-agent-api.neoaethel.workers.dev/offer) and [API contract](https://proof-fetch-agent-api.neoaethel.workers.dev/openapi.json); no permanently fixed price is promised here.

## Verification and boundaries

The exact JSON imported/exported with matching executable graph in n8n 2.40.7 on Node 24.19.0. An executable-identical owner-QA copy passed native CLI success, manual repeat and reserved-domain failure with no payment or failure handoff. The QA variant differs only by workflow identity and the attribution query. The released client sends no campaign tag and honestly labels attribution unknown. Packaged-code tests also cover malformed/hostile responses, URL mismatch, stale receipts and malicious offer substitution.

Editor-canvas inspection remains uncompleted: the clean local editor opened owner setup, and no account credentials were created. It is not certified by n8n or submitted to its template directory. After authorized setup, visually verify the written import steps. Use the official [n8n setup instructions](https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm), a private new user folder and loopback-only editor/broker listeners. Do not expose a public tunnel. Node 25 and n8n 3 are not the tested baseline.

## License

The original client wrapper and this guide are [MIT licensed](LICENSE), a narrow exception to any repository-wide all-rights-reserved notice. You may copy, modify and redistribute these wrapper files. No extraction engine, hosted service, paid content, upstream documentation/data, n8n license, credentials or account/payment rights are included.

Workflow SHA-256: `740b7ae7dc0999b23a84b75fa09dc601da235f2df8f9f749cc1916126158c1cb`.
