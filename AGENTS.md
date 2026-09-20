# NER-SARTHI Agent Guidelines

## Project architecture

- Keep NER-SARTHI frontend-only with realistic static data and local React state because this first build is a design-focused demonstration without live services.
- Use separate TanStack routes for the command center, corridors, fleet, roles, citizen, and co-pilot views with shared chrome in the root layout so navigation persists across operational workspaces.
- Keep shared illustrative operational records in a single data module so every page presents consistent example readings.
