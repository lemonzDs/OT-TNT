# Validation

Formula regression: `node --test tests/formula.test.mjs`.

Browser integration: start PHP on 127.0.0.1:8096 with `OT_STORAGE_DIR` pointing to a disposable folder inside test-results, then run `node tests/browser.cjs`. The script is deliberately fixed to the isolated test port. Do not point it at the live app.

The app route is now `/ot.php`; `/` is the two-choice landing page. Run `node tests/landing.cjs` to check both choices, the image and navigation home.

If local loopback connections are blocked by the execution environment, run `node tests/intercepted-runner.cjs landing.cjs` and `node tests/intercepted-runner.cjs browser.cjs`. These intercept browser requests and execute the same production PHP API using a CLI-only harness and a fresh disposable SQLite folder. This checks application behavior without proving that the operating system's loopback connection is working.

The test exercises date/description/deduction validation, manual hours and timed overnight work, all six source multipliers via formula tests, salary-derived rate, edit/delete, save/reload, monthly isolation, backup/restore, concurrent revision conflict, save-failure recovery, print/PDF and responsive layouts at 375/768/1024/1440px. Browser errors must be absent.

Before rerunning, execute tests/cleanup.php with that SAME test OT_STORAGE_DIR. Cleanup only removes month 2099-06 when every entry has the exact test description. Never use the live database for browser regression tests.

Visual checks: desktop, profile, mobile and the two printed pages. Source workbook and live user claims are not modified by this test setup.
