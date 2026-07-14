# Import / Export module
#
# Backend engine lives in `backend/modules/import-export`.
# Frontend UI lives in `frontend/src/modules/import-export`.
#
# To add a new resource:
# 1. Create `config/<resource>.resource.js` with columns + permissions
# 2. Create `adapters/<resource>.adapter.js` with importRows/exportRows
# 3. Register both in `engines/jobEngine.js`
# 4. Seed permission keys (`module:import:resource`, `module:export:resource`)
# 5. Add a frontend config in `frontend/src/modules/import-export/config/resources.js`
# 6. Mount `<ImportButton />` / `<ExportButton />` with that config
#
# Vendor dashboard currently consumes: products, inventory.
