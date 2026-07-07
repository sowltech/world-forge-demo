# World Forge Setup

## What This Is

World Forge is a static browser demo that turns a raw world idea into a structured World Bible.

## Requirements

- A modern browser
- Python 3, only for local static serving and verification

## Run Locally

```bash
python3 -m http.server 4174
```

Open:

```text
http://localhost:4174
```

## Verify

```bash
python3 scripts/verify_public_demo.py
```

## Public Pages

* Home: https://sowltech.github.io/world-forge-demo/
* Offer: https://sowltech.github.io/world-forge-demo/offer/

## What Not To Add

* API keys
* `.env` files
* private repo paths
* customer private data
* backend calls
* analytics without approval
