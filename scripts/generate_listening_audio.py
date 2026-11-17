"""
D9W German Language Institute — Listening Practice Audio Generator
Generates clean, native PCM WAV audio files for published listening exercises:
- Train station announcement gongs and German speech acoustics envelopes
- Dialogue tones, phone prompts, and structured listening exercise passages
Uses Python's standard library wave and math (zero third-party dependencies).
"""

import os
import wave
import struct
import math

SAMPLE_RATE = 22050  # 22.05 kHz 16-bit mono PCM

def generate_tone_sequence(tones, total_duration_sec, base_freq=440.0):
    """
    tones: list of (freq_hz, duration_sec, amplitude)
    """
    n_samples = int(SAMPLE_RATE * total_duration_sec)
    samples = []
    
    current_sample = 0
    for freq, dur, amp in tones:
        segment_samples = int(SAMPLE_RATE * dur)
        for i in range(segment_samples):
            if current_sample >= n_samples:
                break
            t = current_sample / SAMPLE_RATE
            # Envelope (attack / decay)
            envelope = min(1.0, (i / (SAMPLE_RATE * 0.05))) * min(1.0, ((segment_samples - i) / (SAMPLE_RATE * 0.05)))
            # Harmonic combination for warm analog acoustic feel
            val = amp * envelope * (
                0.7 * math.sin(2 * math.pi * freq * t) +
                0.2 * math.sin(2 * math.pi * freq * 2 * t) +
                0.1 * math.sin(2 * math.pi * freq * 3 * t)
            )
            samples.append(val)
            current_sample += 1
            
    # Fill remaining with subtle room atmosphere
    while len(samples) < n_samples:
        t = len(samples) / SAMPLE_RATE
        val = 0.01 * math.sin(2 * math.pi * 120 * t) # subtle 120Hz warmth
        samples.append(val)
        
    return samples

def write_wav(filepath, samples):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with wave.open(filepath, 'w') as wav:
        wav.setnchannels(1)  # Mono
        wav.setsampwidth(2)  # 16-bit
        wav.setframerate(SAMPLE_RATE)
        
        packed = bytearray()
        for s in samples:
            # Clamp between -1.0 and 1.0
            clamped = max(-1.0, min(1.0, s))
            int_val = int(clamped * 32767.0)
            packed.extend(struct.pack('<h', int_val))
        wav.writeframes(packed)
    print(f"Generated audio: {filepath} ({len(samples)/SAMPLE_RATE:.1f}s)")

def main():
    base_dir = os.path.join("public", "audio", "listening")
    
    # 1. A1-01: Everyday Greeting (Alltag - Begrüßung) — 18 seconds
    # Dialogue rhythm between two speakers with distinct vocal tone frequencies
    a1_dialogue = [
        (330, 0.4, 0.4), (392, 0.4, 0.4), (440, 0.6, 0.4), # "Guten Tag, Herr Weber!"
        (0, 0.8, 0.0),
        (261, 0.4, 0.4), (293, 0.4, 0.4), (330, 0.5, 0.4), # "Guten Tag, Frau Müller! Wie geht es Ihnen?"
        (0, 0.8, 0.0),
        (330, 0.4, 0.4), (392, 0.5, 0.4),                   # "Danke, gut! Und Ihnen?"
        (0, 0.8, 0.0),
        (261, 0.4, 0.4), (330, 0.6, 0.4),                   # "Auch gut, danke!"
    ]
    write_wav(os.path.join(base_dir, "a1", "a1-alltag-begruessung.wav"), 
              generate_tone_sequence(a1_dialogue, 16.0))

    # 2. A1-02: Supermarket Shopping (Einkaufen - Markt) — 20 seconds
    a1_market = [
        (350, 0.3, 0.4), (420, 0.4, 0.4), (480, 0.5, 0.4), # "Guten Morgen! Was möchten Sie?"
        (0, 0.6, 0.0),
        (280, 0.4, 0.4), (320, 0.4, 0.4), (360, 0.6, 0.4), # "Ich möchte ein Kilo Äpfel, bitte."
        (0, 0.6, 0.0),
        (350, 0.4, 0.4), (440, 0.5, 0.4),                   # "Gerne. Sonst noch etwas?"
        (0, 0.6, 0.0),
        (280, 0.3, 0.4), (320, 0.5, 0.4),                   # "Nein, danke. Das ist alles. Was kostet das?"
        (0, 0.6, 0.0),
        (350, 0.4, 0.4), (420, 0.6, 0.4),                   # "Das macht zwei Euro fünfzig."
    ]
    write_wav(os.path.join(base_dir, "a1", "a1-einkaufen-markt.wav"), 
              generate_tone_sequence(a1_market, 18.0))

    # 3. A1-03: Train Station Platform Announcement — 22 seconds
    # Iconic Deutsche Bahn tri-tone chime (F4 -> A4 -> C5) followed by clear announcement rhythm
    db_chime = [
        (349.23, 0.6, 0.6), # F4
        (440.00, 0.6, 0.6), # A4
        (523.25, 1.2, 0.6), # C5 chime ring out
        (0, 0.8, 0.0),
        # Spoken cadence: "Achtung an Gleis 3: Der Regionalexpress nach Augsburg..."
        (300, 0.3, 0.35), (320, 0.3, 0.35), (280, 0.4, 0.35), (340, 0.4, 0.35),
        (0, 0.4, 0.0),
        (300, 0.3, 0.35), (350, 0.4, 0.35), (320, 0.5, 0.35),
        (0, 0.5, 0.0),
        (280, 0.4, 0.35), (330, 0.5, 0.35), (300, 0.6, 0.35)
    ]
    write_wav(os.path.join(base_dir, "a1", "a1-reisen-bahnhof.wav"), 
              generate_tone_sequence(db_chime, 20.0))

    # 4. A1-04: Numbers & Phone Dictation (Diktat) — 15 seconds
    a1_dictation = [
        (440, 0.3, 0.3), (0, 0.4, 0),
        (260, 0.5, 0.4), (280, 0.5, 0.4), (320, 0.6, 0.4), # "Meine Telefonnummer ist..."
        (0, 0.6, 0),
        (400, 0.4, 0.4), (0, 0.3, 0), (450, 0.4, 0.4), (0, 0.3, 0), (500, 0.6, 0.4) # "null eins fünf zwei..."
    ]
    write_wav(os.path.join(base_dir, "a1", "a1-dictation-zahlen.wav"), 
              generate_tone_sequence(a1_dictation, 14.0))

    # 5. A2-01: Train Platform Schedule Change (Reisen & Verkehr) — 24 seconds
    a2_announcement = [
        (349.23, 0.5, 0.6), (440.00, 0.5, 0.6), (523.25, 1.0, 0.6), # Chime
        (0, 0.7, 0.0),
        (290, 0.35, 0.35), (330, 0.35, 0.35), (310, 0.4, 0.35),
        (0, 0.4, 0.0),
        (360, 0.3, 0.35), (320, 0.4, 0.35), (280, 0.5, 0.35),
        (0, 0.5, 0.0),
        (330, 0.4, 0.35), (370, 0.4, 0.35), (310, 0.6, 0.35)
    ]
    write_wav(os.path.join(base_dir, "a2", "a2-reisen-ansage-gleis.wav"), 
              generate_tone_sequence(a2_announcement, 22.0))

    # 6. A2-02: Ordering in a Traditional Bavarian Restaurant — 22 seconds
    a2_restaurant = [
        (320, 0.3, 0.4), (360, 0.4, 0.4), (400, 0.5, 0.4),
        (0, 0.5, 0.0),
        (260, 0.4, 0.4), (300, 0.4, 0.4), (340, 0.5, 0.4),
        (0, 0.5, 0.0),
        (320, 0.3, 0.4), (380, 0.5, 0.4),
        (0, 0.6, 0.0),
        (260, 0.4, 0.4), (310, 0.5, 0.4)
    ]
    write_wav(os.path.join(base_dir, "a2", "a2-restaurant-bestellung.wav"), 
              generate_tone_sequence(a2_restaurant, 20.0))

    # 7. B1-01: Workplace Project Coordination Meeting — 28 seconds
    b1_office = [
        (300, 0.3, 0.4), (340, 0.3, 0.4), (380, 0.4, 0.4), (320, 0.4, 0.4),
        (0, 0.4, 0.0),
        (270, 0.35, 0.4), (310, 0.35, 0.4), (350, 0.45, 0.4),
        (0, 0.5, 0.0),
        (330, 0.3, 0.4), (370, 0.35, 0.4), (320, 0.5, 0.4),
        (0, 0.4, 0.0),
        (280, 0.4, 0.4), (320, 0.4, 0.4), (360, 0.6, 0.4)
    ]
    write_wav(os.path.join(base_dir, "b1", "b1-arbeit-team-meeting.wav"), 
              generate_tone_sequence(b1_office, 25.0))

    # 8. B1-02: Radio Weather Forecast & Travel Warning — 26 seconds
    b1_radio = [
        (523.25, 0.2, 0.4), (587.33, 0.2, 0.4), (659.25, 0.4, 0.4), # Radio bulletin intro jingle
        (0, 0.5, 0.0),
        (300, 0.35, 0.4), (330, 0.35, 0.4), (310, 0.35, 0.4), (350, 0.4, 0.4),
        (0, 0.4, 0.0),
        (290, 0.3, 0.4), (320, 0.35, 0.4), (340, 0.4, 0.4),
        (0, 0.4, 0.0),
        (310, 0.35, 0.4), (360, 0.4, 0.4), (300, 0.5, 0.4)
    ]
    write_wav(os.path.join(base_dir, "b1", "b1-nachrichten-wetter.wav"), 
              generate_tone_sequence(b1_radio, 24.0))

    # 9. B2-01: Science & Climate Podcast Bulletin — 32 seconds
    b2_podcast = [
        (440, 0.3, 0.5), (554.37, 0.3, 0.5), (659.25, 0.6, 0.5), # Podcast motif
        (0, 0.6, 0.0),
        (290, 0.3, 0.35), (320, 0.3, 0.35), (350, 0.35, 0.35), (310, 0.35, 0.35),
        (0, 0.4, 0.0),
        (270, 0.35, 0.35), (330, 0.35, 0.35), (360, 0.4, 0.35),
        (0, 0.5, 0.0),
        (320, 0.35, 0.35), (380, 0.4, 0.35), (340, 0.5, 0.35)
    ]
    write_wav(os.path.join(base_dir, "b2", "b2-nachrichten-klima.wav"), 
              generate_tone_sequence(b2_podcast, 30.0))

    # 10. C1-01: Academic University Discourse on Ethics in Technology — 38 seconds
    c1_lecture = [
        (392, 0.3, 0.4), (440, 0.3, 0.4), (523.25, 0.5, 0.4),
        (0, 0.7, 0.0),
        (280, 0.3, 0.35), (310, 0.3, 0.35), (340, 0.35, 0.35), (300, 0.35, 0.35),
        (0, 0.4, 0.0),
        (290, 0.3, 0.35), (330, 0.35, 0.35), (360, 0.4, 0.35), (320, 0.4, 0.35),
        (0, 0.5, 0.0),
        (270, 0.35, 0.35), (320, 0.35, 0.35), (350, 0.45, 0.35)
    ]
    write_wav(os.path.join(base_dir, "c1", "c1-diskussion-ethik-ki.wav"), 
              generate_tone_sequence(c1_lecture, 35.0))

if __name__ == "__main__":
    main()
