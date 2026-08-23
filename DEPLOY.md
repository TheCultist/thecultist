# Deploying thecultist.it

Vercel for hosting, **Aruba** for DNS. The original brief said Namecheap; the domain is actually registered at Aruba.it, so the host-records method below is Aruba's panel, not Namecheap's.

---

## 1. Push the repository

```bash
git push -u origin main
```

Remote is `https://github.com/TheCultist/thecultist.git`. The first push needs an interactive GitHub login — a non-interactive shell cannot complete it.

## 2. Create the Vercel project

1. Vercel dashboard → **Add New… → Project** → import `TheCultist/thecultist`.
2. Framework preset is detected as **Next.js**. Leave build command, output directory and install command at their defaults — this project needs no overrides.
3. **No environment variables are required.** Analytics and Speed Insights need none, and there is no `env.ts` because nothing reads from the environment.
4. Deploy. Confirm the `*.vercel.app` URL renders before touching DNS — it isolates build problems from DNS problems.

## 3. Add the domain in Vercel

Project → **Settings → Domains → Add Domain** → `thecultist.it`.

Vercel will prompt to also add `www.thecultist.it`. Accept: it recommends serving on `www` with the apex redirecting.

Vercel then shows the exact records to create. **Read the values off that screen** — do not copy them from here:

- The **A record value** for the apex is normally `76.76.21.21`, but Vercel may show a different address for your project.
- The **CNAME target** for `www` is **unique per project**, in the form `d1d4fc829fe7bc7c.vercel-dns-017.com`. There is no longer a single shared `cname.vercel-dns.com` value to copy. Taking this from anywhere but your own dashboard will fail verification.

## 4. Configure DNS at Aruba

Log in at [admin.aruba.it](https://admin.aruba.it) → your domain → **Gestione DNS e Server** → **Gestione DNS record**.

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| `A` | `@` (or blank — Aruba writes the apex as the bare domain) | the A value Vercel shows | default |
| `CNAME` | `www` | the per-project value Vercel shows | default |

**Aruba-specific things that catch people out:**

- **Remove Aruba's default records first.** Aruba pre-populates the apex with an A record pointing at its own parking or hosting page. If you leave it, the domain resolves to Aruba and Vercel verification never completes.
- The apex must be an **A record, not a CNAME.** DNS forbids a CNAME at the zone apex, and Aruba does not offer ALIAS/ANAME flattening.
- Aruba's panel can take **up to 24 hours** to publish, longer than most registrars. Verification pending after ten minutes is normal.
- If the domain is on an Aruba hosting plan rather than domain-only, DNS editing may sit under the hosting product instead of the domain. Both reach the same zone.

Do **not** switch to Vercel nameservers unless you want Vercel to own the whole zone — that would move any mail and other records with it.

## 5. Verify

- `https://thecultist.it` and `https://www.thecultist.it` both serve, one redirecting to the other.
- HTTPS certificate issued automatically by Vercel — no action needed, but it only issues after DNS resolves.
- Paste the URL into Discord, Slack or a Telegram chat and confirm the OG card renders: cream ground, the candle badge, 1200×630.
- Open in the **real TikTok and Instagram in-app browsers**, not desktop device emulation. They behave differently, and they are where most traffic lands.

## 6. Confirm analytics

Vercel Analytics and Speed Insights only report once deployed — their scripts 404 locally, which is expected.

1. Project → **Analytics** tab → confirm pageviews appear.
2. Click a social CTA on the live site, then check **Analytics → Events** for an `outbound` event carrying `destination` and `section`.

Without that event firing, the success metric — **30% social click-through** — cannot be measured. Verify it on day one rather than discovering the gap a month in.

## 7. Post-launch checklist

- [ ] Click through **all ten outbound links** on the live site. Only `findthatcard.net`, `stormcount.gg` and the Instagram profile were ever machine-verified; TikTok, both YouTube channels and Screenhype sit behind login walls, GDPR interstitials or bot protection.
- [ ] Confirm the four social handles are current: `@cardboard.cultist` (Instagram, TikTok), `@card_cultist` (YouTube) and `@TheCultist` (Moxfield).
- [ ] Supply author URLs for **TechRaptor** and **mmo.it** if those should be links rather than plain text.
- [ ] Run Lighthouse against the production URL. Local scores were desktop 100/100/96/100 and mobile 96/100/96/100; both best-practices deductions were the local-only `_vercel/insights` 404s and should clear in production.
