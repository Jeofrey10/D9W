# P03-08: Complete German Grammar & Case Reference Matrix

This document provides a comprehensive, verified reference for all declensions, pronoun tables, preposition rections, and verb valencies implemented in the D9W Grammar Engine.

---

## 1. Article Declension Master Matrix

### 1.1 Definite Articles (Bestimmte Artikel)

| Case | Masculine | Feminine | Neuter | Plural |
|---|---|---|---|---|
| **Nominativ** | der | die | das | die |
| **Akkusativ** | den | die | das | die |
| **Dativ** | dem | der | dem | den (+n on noun) |
| **Genitiv** | des (+s / +es on noun) | der | des (+s / +es on noun) | der |

### 1.2 Indefinite Articles (Unbestimmte Artikel)

| Case | Masculine | Feminine | Neuter | Plural |
|---|---|---|---|---|
| **Nominativ** | ein | eine | ein | — *(zero article / Nullartikel)* |
| **Akkusativ** | einen | eine | ein | — |
| **Dativ** | einem | einer | einem | — *(use dative plural nouns / keinen)* |
| **Genitiv** | eines (+s / +es) | einer | eines (+s / +es) | — |

### 1.3 Negative Articles (Negationsartikel: kein)

| Case | Masculine | Feminine | Neuter | Plural |
|---|---|---|---|---|
| **Nominativ** | kein | keine | kein | keine |
| **Akkusativ** | keinen | keine | kein | keine |
| **Dativ** | keinem | keiner | keinem | keinen (+n on noun) |
| **Genitiv** | keines (+s / +es) | keiner | keines (+s / +es) | keiner |

### 1.4 Possessive Articles (mein, dein, sein, ihr, unser, euer, ihr, Ihr)

All possessive articles decline identical to `kein` (singular follows `ein`, plural follows `keine`):
- `euer` drops an internal `e` before endings: *euer* &rarr; *eure*, *euren*, *eurem*, *eurer*, *eures*.

---

## 2. Personal Pronoun Master Matrix (All 4 Cases)

| Person | English | Nominativ (Wer?) | Akkusativ (Wen?) | Dativ (Wem?) | Genitiv (Wessen?) |
|---|---|---|---|---|---|
| **1st Sing.** | I / me | ich | mich | mir | meiner |
| **2nd Sing. Inf.** | you | du | dich | dir | deiner |
| **3rd Sing. Masc.** | he / him | er | ihn | ihm | seiner |
| **3rd Sing. Fem.** | she / her | sie | sie | ihr | ihrer |
| **3rd Sing. Neut.** | it | es | es | ihm | seiner |
| **1st Plur.** | we / us | wir | uns | uns | unser |
| **2nd Plur. Inf.** | you all | ihr | euch | euch | euer |
| **3rd Plur.** | they / them | sie | sie | ihnen | ihrer |
| **2nd Formal** | you (formal) | Sie | Sie | Ihnen | Ihrer |

---

## 3. Preposition Case Rection Catalog

### 3.1 Pure Accusative Prepositions (DOGFU)
- `durch` (through)
- `für` (for)
- `gegen` (against / toward)
- `ohne` (without)
- `um` (around / at)
- `bis` (until / up to)

### 3.2 Pure Dative Prepositions
- `aus` (out of / from inside)
- `bei` (at / near / with a person)
- `mit` (with / by means of transport)
- `nach` (after / to a city or country)
- `seit` (since / for an ongoing duration)
- `von` (from / of)
- `zu` (to / toward a landmark or establishment)
- `gegenüber` (opposite / across from)
- `außer` (except for)

### 3.3 Pure Genitive Prepositions
- `während` (during)
- `wegen` (because of / on account of)
- `trotz` (despite / in spite of)
- `statt / anstatt` (instead of)
- `innerhalb` (inside of / within)
- `außerhalb` (outside of)
- `aufgrund` (due to / on the basis of)

### 3.4 Two-Way Prepositions (Wechselpräpositionen)
*an, auf, hinter, in, neben, über, unter, vor, zwischen*

- **Wo? (Location / Static Position) &rarr; DATIV**
  - *Das Buch liegt auf dem Tisch.*
  - *Der Hund läuft im Garten herum (movement inside boundary).*
- **Wohin? (Destination / Directional Movement) &rarr; AKKUSATIV**
  - *Ich lege das Buch auf den Tisch.*
  - *Der Hund rennt in den Garten (crossing into a new space).*

---

## 4. Preposition + Article Contractions

| Full Expression | Contracted Form | Case | Gender Scope | Usage Requirement |
|---|---|---|---|---|
| `in dem` | **im** | Dativ | Maskulin / Neutrum | Mandatory in standard German |
| `in das` | **ins** | Akkusativ | Neutrum | Mandatory in standard German |
| `an dem` | **am** | Dativ | Maskulin / Neutrum | Mandatory in standard German |
| `an das` | **ans** | Akkusativ | Neutrum | Standard in regular usage |
| `bei dem` | **beim** | Dativ | Maskulin / Neutrum | Mandatory in standard German |
| `von dem` | **vom** | Dativ | Maskulin / Neutrum | Mandatory in standard German |
| `zu dem` | **zum** | Dativ | Maskulin / Neutrum | Mandatory in standard German |
| `zu der` | **zur** | Dativ | Feminin | Mandatory in standard German |
| `auf das` | **aufs** | Akkusativ | Neutrum | Common in spoken / casual register |
| `für das` | **fürs** | Akkusativ | Neutrum | Common in spoken / casual register |
| `um das` | **ums** | Akkusativ | Neutrum | Common in idioms and spoken register |
