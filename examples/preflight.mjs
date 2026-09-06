// Client only. No payment credential and no paid request.
const target = process.argv[2] || 'https://example.com';
const response = await fetch('https://proof-fetch-agent-api.neoaethel.workers.dev/v1/preflight', {
  method: 'POST', headers: {'content-type':'application/json'},
  body: JSON.stringify({url:target,maxChars:30000}),
  signal: AbortSignal.timeout(25000)
});
const result = await response.json();
if (!response.ok) throw Error(`Preflight HTTP ${response.status}: ${result.error || 'request failed'}`);
if (result.document?.paragraphs || result.document?.contentText) throw Error('Unexpected free-response content; stop and report');
console.log(JSON.stringify(result,null,2));
