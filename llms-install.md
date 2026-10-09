# Installing ProofFetch in Cline (and other MCP clients)

ProofFetch is a hosted (remote) MCP server. There is nothing to download, build or run locally.

## Steps

1. Open Cline's MCP settings file (`cline_mcp_settings.json`) from the MCP Servers panel.
2. Add this entry inside `mcpServers`:

```json
{
  "mcpServers": {
    "proof-fetch": {
      "type": "streamableHttp",
      "url": "https://proof-fetch-agent-api.neoaethel.workers.dev/mcp",
      "disabled": false
    }
  }
}
```

3. Save the file. Cline connects and lists the server's tools.

No API key is needed for the free tools. Paid paragraph text is bought separately; see the [README](README.md).

## Other clients

- Claude Code: `claude mcp add --transport http proof-fetch https://proof-fetch-agent-api.neoaethel.workers.dev/mcp`
- Any client that supports Streamable HTTP: point it at `https://proof-fetch-agent-api.neoaethel.workers.dev/mcp`.

## Check it works

Ask Cline to run a ProofFetch preflight on a public URL (for example https://example.com). It should return the URL's hashes and injection indicators without charging anything.
