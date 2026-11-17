# P03-09: Countdown Engine, GLH Guidelines & Skill Allocation Matrix

## 1. Guided Learning Hours (GLH) Reference Table

According to standard CEFR guidelines established by the Council of Europe and institutions such as the Goethe-Institut:

| Progression Step | Standard Guided Hours | Self-Study Ratio | Total Recommended Hours |
| :--- | :---: | :---: | :---: |
| **A1 -> A1 (Revision)** | 40 hours | 1.0x | 40 hours |
| **A1 -> A2** | 150 hours | 1.2x | 180 hours |
| **A1 -> B1** | 350 hours | 1.5x | 525 hours |
| **A1 -> B2** | 550 hours | 1.5x | 825 hours |
| **A1 -> C1** | 800 hours | 2.0x | 1,600 hours |
| **A2 -> B1** | 200 hours | 1.5x | 300 hours |
| **A2 -> B2** | 400 hours | 1.5x | 600 hours |
| **A2 -> C1** | 650 hours | 2.0x | 1,300 hours |
| **B1 -> B2** | 200 hours | 1.5x | 300 hours |
| **B1 -> C1** | 450 hours | 2.0x | 900 hours |
| **B2 -> C1** | 250 hours | 2.0x | 500 hours |

> [!NOTE]
> **Pedagogical Disclaimer:** These figures are empirical orientation benchmarks published as guidelines by European language education bodies (e.g., Council of Europe, Goethe-Institut). They are pedagogical estimates to help learners structure realistic schedules, not universal statutory or mandatory regulatory requirements for examination admission. Individual acquisition speed varies depending on native language, prior language learning experience, and study intensity.

---

## 2. Skill Allocation Algorithm

The engine computes an individualized skill weight distribution across 6 categories:

$$\text{Weight}_{\text{raw}}(s) = \text{Baseline}(s) \times \text{Multiplier}(s)$$

### Multipliers:
1. **Weakest Skill:** $\times 1.4$ (+40% extra allocation)
2. **Additional Attention Skills:** $\times 1.2$ (+20% extra allocation)
3. **Strongest Skill:** $\times 0.8$ (-20% reduction, subject to minimum floor)
4. **Grammar & Vocabulary:** Included if toggled on (baseline 10% each), or 0% if excluded.

### Normalization Constraints:
- Every active core language skill (Hören, Lesen, Schreiben, Sprechen) is guaranteed a **hard minimum floor of 12%** to prevent neglecting foundational competencies.
- Grammar and Vocabulary maintain a 5% minimum floor when active.
- Final weights are normalized to sum to **exactly 100%**:
$$\sum_{s \in \text{Skills}} \text{Weight}_{\text{normalized}}(s) = 100$$

---

## 3. Preparation Phases Duration Calculation

For a preparation window of $N$ days:

1. **Short Windows ($N \le 14$ days):**
   - Foundation: $\max(2, \lfloor 0.30 \times N \rfloor)$ days
   - Practice: $\max(2, \lfloor 0.40 \times N \rfloor)$ days
   - Final Preparation: remaining days
2. **Standard Windows ($N > 14$ days):**
   - **Phase 1: Foundation Building (Fundament):** $25\%$
   - **Phase 2: Skill Development (Kompetenzaufbau):** $35\%$
   - **Phase 3: Focused Practice (Gezielte Prüfungspraxis):** $20\%$
   - **Phase 4: Revision & Mock Exams (Vertiefung):** $12\%$
   - **Phase 5: Final Review & Rest (Endspurt):** remaining days ($\ge 2$ days)
