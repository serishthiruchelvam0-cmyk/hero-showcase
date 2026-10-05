<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Frontend architecture
- Use TanStack file routes for the five content pages and a shared SiteShell for navigation, footer and quote dialog so direct page URLs and shared interactions remain consistent.
- Keep reference content in the shared site data module; photos, logo and video live as real files in public/media so the site works on any host (Vercel etc.), each file under 10MB.
- Quote and contact forms are frontend-only demonstrations and must never claim delivery to a business until real submission handling is added.
- A homepage background video must use an uploaded original MP4 with muted, autoplay, loop and playsInline; do not substitute a Facebook iframe because clean looping cannot be guaranteed.
