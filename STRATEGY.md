# Strategic Roadmap: WesternOS & Choppd.beauty

## **Objective**
Build a premium, agent-centric web operating system (`WesternOS`) that serves as the command center for `choppd.beauty` services.

---

## **Phase 1: Visual Identity & "Frontier" Aesthetic**
*   **Goal**: Move from generic dark mode to a premium "Wild West" texture-rich UI.
*   **Tasks**:
    1.  Update `src/styles/WestOS/theme.ts` with "Leather", "Weathered Wood", and "Vintage Gold" color tokens.
    2.  Add grainy overlays and subtle noise to the `StyledDesktop` in `src/components/system/Desktop/index.tsx`.
    3.  Implement "Saloon-style" typography (e.g., *Rye* or *Ewert* from Google Fonts) for headers.

## **Phase 2: The Core OS Orchestration**
*   **Goal**: Ensure windows and apps are fully functional with state persistence.
*   **Tasks**:
    1.  **Telegraph (Terminal)**: Connect the `Telegraph` app to the actual `FileSystem` context. Typing `ls` in the OS terminal should list files in the virtual FS.
    2.  **Docs (File Explorer)**: Implement folder navigation and file viewing (images, text).
    3.  **Ledger (Settings/Logs)**: Create a dashboard to view system status and API usage.

## **Phase 3: Agent Station Integration**
*   **Goal**: Make the dual-pane layout meaningful.
*   **Tasks**:
    1.  Implement the `AgentStation` component in the left pane of the landing page.
    2.  Enable API key management that persists in `localStorage`.
    3.  Create a "Direct Link" between the Agent Station and the OS terminal (Telegraph).

## **Phase 4: Optimization & Deployment**
*   **Goal**: Fast, zippity performance on `choppd.beauty`.
*   **Tasks**:
    1.  Optimize images and assets.
    2.  Ensure Astro SSR/SSG balance is correct for SEO.
    3.  Final Git sync and "Ready for Launch" validation.

---

## **AGENT PROTOCOL: HOW TO EXECUTE**
1.  **Pull First**: `git pull origin DynamicAstro`.
2.  **Pick a Phase**: Select the next incomplete task from this roadmap.
3.  **Execute & Verify**: Run `npm run dev` and check `localhost:4321`.
4.  **Commit & Push**: `git commit -m "Compete Phase X: Task Y" && git push origin HEAD`.

**Keep it Zippity. Stay Frontier.**
