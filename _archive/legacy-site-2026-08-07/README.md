# Legacy portfolio interior — 2026-08-07

This folder preserves the public interior pages that were replaced by the Quant Lab design.
The homepage dashboard was not replaced and is therefore not duplicated here.

The complete pre-redesign repository is also protected by the Git tag:

`backup/pre-quant-redesign-2026-08-07`

## Quick restoration

1. Remove the current production interior pages and the `quant-site` presentation layer.
2. Copy the `_pages`, `_includes`, and `assets` contents from this folder back to the repository root.
3. Rebuild the Jekyll site and verify that each public route is generated only once.

Shared images, files, theme layouts, and the dashboard homepage remain in the main repository and are intentionally not duplicated here.
