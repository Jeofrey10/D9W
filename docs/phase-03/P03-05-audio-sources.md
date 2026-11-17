# P03-05: Audio Manifest & Licensing Reference

**Status:** Verified & Physically Present in `public/audio/listening/`  
**Standard Audio Format:** PCM 16-bit WAV, 24,000 Hz, Single Channel (Mono)  
**Total Bundled Audio Assets:** 10 Files  
**Total Audio Duration:** ~3 minutes 30 seconds  
**License:** D9W German Language Hub Proprietary Educational Assets (Free for Non-Commercial Educational Use)

---

## 1. Master Audio Manifest

| Exercise ID | Level | Category | Audio Path | Duration | File Size | Description |
|---|---|---|---|---|---|---|
| `ex-a1-alltag-01` | **A1** | `alltag` | `/audio/listening/a1/a1_alltag_kaffee.wav` | 14.5s | ~696 KB | Ordering cappuccino and croissant in a Berlin café. |
| `ex-a1-zahlen-02` | **A1** | `einkaufen` | `/audio/listening/a1/a1_einkauf_supermarkt.wav` | 15.0s | ~720 KB | Supermarket cashier price and cash payment dialogue. |
| `ex-a2-reisen-01` | **A2** | `reisen-verkehr` | `/audio/listening/a2/a2_durchsage_hbf.wav` | 21.0s | ~1.01 MB | Frankfurt Hauptbahnhof track change and ICE delay announcement. |
| `ex-a2-arzt-02` | **A2** | `gesundheit` | `/audio/listening/a2/a2_arzt_termin.wav` | 20.0s | ~960 KB | Patient scheduling an urgent doctor appointment for fever. |
| `ex-b1-beruf-01` | **B1** | `arbeit-beruf` | `/audio/listening/b1/b1_buero_projekt.wav` | 26.0s | ~1.25 MB | Office team sync regarding budget revisions and timeline extensions. |
| `ex-b1-bildung-02` | **B1** | `bildung` | `/audio/listening/b1/b1_uni_seminar.wav` | 25.0s | ~1.20 MB | Academic advising interview regarding university master's thesis prerequisites. |
| `ex-b2-diskussion-01`| **B2** | `diskussionen`| `/audio/listening/b2/b2_nachhaltigkeit_stadt.wav` | 31.0s | ~1.49 MB | Urban debate on low-emission public transit and car-free zones. |
| `ex-b2-wirtschaft-02`| **B2** | `nachrichten-durchsagen`| `/audio/listening/b2/b2_wirtschaft_nachrichten.wav` | 30.0s | ~1.44 MB | Radio financial bulletin reporting on mid-sized manufacturing export trends. |
| `ex-c1-wissenschaft-01`| **C1** | `bildung` | `/audio/listening/c1/c1_ki_ethik_vortrag.wav` | 38.0s | ~1.82 MB | Academic symposium lecture on algorithmic bias and ethical oversight in deep learning. |
| `ex-c1-kultur-02` | **C1** | `diskussionen`| `/audio/listening/c1/c1_literatur_rezension.wav` | 36.0s | ~1.73 MB | Highbrow literary critique analyzing existential solitude in contemporary German literature. |

---

## 2. Directory Tree of Audio Assets

```
public/audio/listening/
├── a1/
│   ├── a1_alltag_kaffee.wav
│   └── a1_einkauf_supermarkt.wav
├── a2/
│   ├── a2_durchsage_hbf.wav
│   └── a2_arzt_termin.wav
├── b1/
│   ├── b1_buero_projekt.wav
│   └── b1_uni_seminar.wav
├── b2/
│   ├── b2_nachhaltigkeit_stadt.wav
│   └── b2_wirtschaft_nachrichten.wav
└── c1/
    ├── c1_ki_ethik_vortrag.wav
    └── c1_literatur_rezension.wav
```

---

## 3. Production Studio Drop-in Protocol

When recording or acquiring human voice talent audio for the 26 pending exercises (`audioStatus: 'pending'`), follow these exact technical specifications:

1. **Format:** PCM 16-bit WAV (or 320 kbps MP3 / AAC).
2. **Sampling Rate:** 44,100 Hz or 48,000 Hz (normalized to 24,000 Hz or 44,100 Hz for web delivery).
3. **Channel:** Mono or Stereo (Mono preferred for lightweight delivery).
4. **Target Integrated Loudness:** -16 LUFS to -14 LUFS (EBU R128 standard).
5. **Procedure to Publish:**
   - Save the master file to `public/audio/listening/[level]/[file].wav`.
   - Update `src/data/listening/audioManifest.ts` with file metadata.
   - In `src/data/listening/exercises.ts`, set `published: true` and `audioStatus: 'ready'`.
   - Re-run `npm run test:listening` and `npm run build` to verify automated passing checks.
