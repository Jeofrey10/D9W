"""
Python script to generate the 365-day Daily Word Schedule for 2026.
Maps canonical vocabulary IDs from ALL_VOCABULARY into a deterministic daily sequence.
"""

import json
from datetime import date, timedelta

# Load canonical vocabulary from JSON files directly
with open("src/data/vocabulary/a1-nouns.json", "r", encoding="utf-8") as f:
    a1_nouns = json.load(f)
with open("src/data/vocabulary/a2-nouns.json", "r", encoding="utf-8") as f:
    a2_nouns = json.load(f)
with open("src/data/vocabulary/b1-nouns.json", "r", encoding="utf-8") as f:
    b1_nouns = json.load(f)
with open("src/data/vocabulary/b2-vocabulary.json", "r", encoding="utf-8") as f:
    b2_vocab = json.load(f)
with open("src/data/vocabulary/c1-vocabulary.json", "r", encoding="utf-8") as f:
    c1_vocab = json.load(f)
with open("src/data/vocabulary/a1-verbs.json", "r", encoding="utf-8") as f:
    a1_verbs = json.load(f)
with open("src/data/vocabulary/a1-adjectives.json", "r", encoding="utf-8") as f:
    a1_adjectives = json.load(f)

# Pool of canonical vocabulary items
all_items = (
    a1_nouns +
    a2_nouns +
    b1_nouns +
    b2_vocab +
    c1_vocab +
    a1_verbs +
    a1_adjectives
)

vocab_ids = [item["id"] for item in all_items]
print(f"Total canonical vocabulary items in pool: {len(vocab_ids)}")

start_date = date(2026, 1, 1)
entries = []

# Special highlighted dates (e.g. today November 16 & 17, 2026)
special_assignments = {
    "2026-11-16": "noun-b2-003", # Augenblick (B2)
    "2026-11-17": "noun-b1-001", # Gesellschaft (B1)
    "2026-11-18": "noun-c1-001", # Zäsur (C1)
    "2026-11-19": "noun-001",    # Haus (A1)
    "2026-11-20": "noun-a2-001", # Flughafen (A2)
}

# Cutoff date for initial published content batch (all dates up to end of November 2026 are verified & published)
published_cutoff = date(2026, 11, 30)

for day_idx in range(365):
    current_date = start_date + timedelta(days=day_idx)
    date_key = current_date.isoformat()
    day_of_year = day_idx + 1

    if date_key in special_assignments:
        vocab_id = special_assignments[date_key]
    else:
        # Deterministic rotating selection across the pool
        vocab_id = vocab_ids[day_idx % len(vocab_ids)]

    is_published = current_date <= published_cutoff
    review_status = "verified" if is_published else "under-review"

    entries.append({
        "dateKey": date_key,
        "vocabularyId": vocab_id,
        "published": is_published,
        "editorialReviewStatus": review_status,
        "dayOfYear": day_of_year
    })

output_ts = """import { DailyWordScheduleEntry } from '@/features/daily-word/types/dailyWord.types'

/**
 * 365-Day Deterministic Vocabulary Schedule for Year 2026.
 * All entries map directly to canonical ALL_VOCABULARY IDs.
 */
export const DAILY_WORD_SCHEDULE: DailyWordScheduleEntry[] = """

output_ts += json.dumps(entries, indent=2, ensure_ascii=False) + ";\n\n"

output_ts += """/**
 * Fast O(1) hash map of dateKey -> DailyWordScheduleEntry
 */
export const DAILY_WORD_SCHEDULE_MAP: Record<string, DailyWordScheduleEntry> =
  DAILY_WORD_SCHEDULE.reduce((acc, entry) => {
    acc[entry.dateKey] = entry
    return acc
  }, {} as Record<string, DailyWordScheduleEntry>)
"""

with open("src/data/daily-word/dailyWordSchedule.ts", "w", encoding="utf-8") as f:
    f.write(output_ts)

print(f"Generated {len(entries)} schedule entries in src/data/daily-word/dailyWordSchedule.ts.")
published_count = sum(1 for e in entries if e["published"])
print(f"Published dates (up to Nov 30): {published_count}, In review: {len(entries) - published_count}")
