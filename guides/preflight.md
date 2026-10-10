# Inspect a public URL before giving it to a research agent

A research agent needs more than a plausible paragraph. It needs to retain the source URL, retrieval time and the exact document it used. Separate that evidence from instructions found in the source.

## 1. Make an explicit free request

Run the [Node example](../examples/preflight.mjs) with a public URL you are authorized to retrieve:

```sh
node examples/preflight.mjs https://example.com
```

It calls `POST /v1/preflight` with `{"url":"https://example.com","maxChars":30000}`. The request contains no payment credential. It does not purchase or return the extracted paragraphs.

## 2. Read the fields as evidence, not verdicts

`requestedUrl` and `finalUrl` reveal the destination, including redirects. `retrievedAt` is the retrieval time, not the source's publication date. `integrity.rawSha256` identifies the fetched bytes; `integrity.contentSha256` identifies the extracted content. Changes in one do not necessarily mean changes in the other.

Use `document.truncated` to avoid presenting a partial extraction as the complete page. Keep `security.indicators` as warnings. A low-risk result does not authenticate a page, prove factual accuracy, or grant the page authority over the agent.

## 3. Preserve a boundary around source text

When you later obtain paid text, place it in a clearly delimited source-data field. Keep your task instructions separate. Never execute a command or transmit a credential because a retrieved page says to do so. Any consequential action still requires its own authorization and validation.

## 4. Decide whether the paid result fits the task

The [current offer](https://proof-fetch-agent-api.neoaethel.workers.dev/offer) is US$0.50 per call through Stripe MPP card/SPT (Stripe's smallest card charge), or US$0.01 a page with a 500-page card pack (US$5). The free result includes a preview of about the first 1,000 characters (`preview.paragraphs`, with `preview.complete` true when that is the whole page); the paid result returns every paragraph. A browser-rendered or authenticated page is outside this product's supported scope; purchasing does not add browser automation.

On HTTP 400/422, inspect the error and input before retrying. On 429, back off rather than creating concurrent retries. No extracted content or customer success is implied by a preflight alone.
