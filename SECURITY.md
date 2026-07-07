# Security Policy

## Public Demo Security Model

World Forge currently runs as a static browser-only demo.

It does not require:

- accounts
- passwords
- backend servers
- API keys
- external AI calls
- payment secrets

## Do Not Submit

Do not submit:

- passwords
- private keys
- confidential business information
- sensitive personal data
- payment details

## Reporting Issues

Open a GitHub issue for public-safe security concerns.

Do not post secrets in public issues.

## Maintainer Rules

Before any public push:

```bash
python3 scripts/verify_public_demo.py
```

The repository must not include:

* `.env`
* `.pem`
* `.key`
* `.db`
* `.sqlite`
* `.jsonl`
* private local paths
* private vault references
