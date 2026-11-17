/**
 * D9W German Language Institute — Listening Practice Exercises Dataset
 * 
 * Target: 36 Exercises
 * A1 (8), A2 (8), B1 (8), B2 (6), C1 (6)
 * 
 * Audio Status:
 * - 'available': bundled with native PCM audio asset in public/audio/listening/
 * - 'pending': studio recording scheduled; complete transcript & curriculum schema ready
 */

import { ListeningExercise } from '@/features/listening/types/listening.types'

export const LISTENING_EXERCISES: ListeningExercise[] = [
  {
    "id": "ex-a1-alltag-01",
    "title": "Guten Tag! Erste Begrüßung",
    "subtitleDe": "Alltägliche Höflichkeitsfloskeln zwischen zwei Nachbarn",
    "level": "A1",
    "category": "alltag",
    "exerciseType": "conversation",
    "difficulty": "easy",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/a1/a1-alltag-begruessung.wav",
    "audioDurationSeconds": 16.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie das Gespräch zwischen Herrn Weber und Frau Müller. Beantworten Sie anschließend die Fragen.",
    "instructionsEn": "Listen to the conversation between Mr. Weber and Mrs. Müller. Then answer the questions.",
    "transcript": {
      "summary": "Herr Weber und Frau Müller treffen sich im Hausflur und tauschen freundliche Grüße aus.",
      "dialogue": [
        {
          "speaker": "Herr Weber",
          "text": "Guten Tag, Frau Müller! Wie geht es Ihnen?",
          "timestampSeconds": 0
        },
        {
          "speaker": "Frau Müller",
          "text": "Guten Tag, Herr Weber! Danke, sehr gut. Und Ihnen?",
          "timestampSeconds": 4
        },
        {
          "speaker": "Herr Weber",
          "text": "Auch gut, danke! Haben Sie heute noch viel vor?",
          "timestampSeconds": 8
        },
        {
          "speaker": "Frau Müller",
          "text": "Nein, ich gehe nur kurz zum Supermarkt.",
          "timestampSeconds": 12
        }
      ]
    },
    "vocabulary": [
      {
        "german": "Guten Tag",
        "english": "Good day / Hello",
        "context": "Formal greeting"
      },
      {
        "german": "Wie geht es Ihnen?",
        "english": "How are you? (formal)",
        "context": "Polite inquiry"
      },
      {
        "german": "der Hausflur",
        "english": "hallway / corridor"
      },
      {
        "german": "vorhaben",
        "english": "to have plans / to intend"
      }
    ],
    "listeningTip": "Achten Sie auf die Höflichkeitsform 'Ihnen' im Unterschied zur informellen Form 'dir'.",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wie geht es Frau Müller?",
        "options": [
          "Sie ist müde",
          "Sehr gut",
          "Nicht so gut",
          "Sie ist krank"
        ],
        "correctAnswer": 1,
        "explanation": "Frau Müller antwortet wörtlich: 'Danke, sehr gut.'",
        "points": 10
      },
      {
        "id": "q2",
        "type": "true-false",
        "statement": "Frau Müller geht heute zur Arbeit.",
        "isCorrect": false,
        "explanation": "Falsch. Frau Müller sagt: 'Nein, ich gehe nur kurz zum Supermarkt.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-a1-einkaufen-01",
    "title": "Auf dem Wochenmarkt: Äpfel kaufen",
    "subtitleDe": "Mengenangaben und Preise beim Obstkauf",
    "level": "A1",
    "category": "einkaufen",
    "exerciseType": "multiple-choice",
    "difficulty": "easy",
    "estimatedDurationMinutes": 4,
    "audioSrc": "/audio/listening/a1/a1-einkaufen-markt.wav",
    "audioDurationSeconds": 18.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie den Dialog am Marktstand und wählen Sie die richtige Antwort aus.",
    "instructionsEn": "Listen to the market stall dialogue and select the correct answer.",
    "transcript": {
      "summary": "Ein Kunde kauft frische Äpfel auf dem Münchner Viktualienmarkt.",
      "dialogue": [
        {
          "speaker": "Verkäufer",
          "text": "Guten Morgen! Was darf es sein?",
          "timestampSeconds": 0
        },
        {
          "speaker": "Kunde",
          "text": "Guten Morgen. Ich möchte ein Kilo Äpfel, bitte.",
          "timestampSeconds": 4
        },
        {
          "speaker": "Verkäufer",
          "text": "Gerne. Möchten Sie die roten Boskop oder die grünen Granny Smith?",
          "timestampSeconds": 8
        },
        {
          "speaker": "Kunde",
          "text": "Die roten, bitte. Was kostet das?",
          "timestampSeconds": 12
        },
        {
          "speaker": "Verkäufer",
          "text": "Das macht genau zwei Euro fünfzig.",
          "timestampSeconds": 15
        }
      ]
    },
    "vocabulary": [
      {
        "german": "das Kilo",
        "english": "kilogram"
      },
      {
        "german": "die Äpfel",
        "english": "apples (plural)"
      },
      {
        "german": "Was darf es sein?",
        "english": "What would you like? / How can I help you?"
      },
      {
        "german": "Das macht...",
        "english": "That comes to... (price)"
      }
    ],
    "listeningTip": "Konzentrieren Sie sich auf Zahlwörter ('zwei Euro fünfzig') und Mengenangaben ('ein Kilo').",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wie viel kosten die Äpfel insgesamt?",
        "options": [
          "1,50 Euro",
          "2,00 Euro",
          "2,50 Euro",
          "3,50 Euro"
        ],
        "correctAnswer": 2,
        "explanation": "Der Verkäufer sagt deutlich: 'Das macht genau zwei Euro fünfzig' (2,50 €).",
        "points": 10
      },
      {
        "id": "q2",
        "type": "multiple-choice",
        "prompt": "Welche Äpfel wählt der Kunde?",
        "options": [
          "Die grünen Äpfel",
          "Die roten Boskop-Äpfel",
          "Bio-Birnen",
          "Keine Äpfel"
        ],
        "correctAnswer": 1,
        "explanation": "Der Kunde antwortet auf die Frage des Verkäufers mit: 'Die roten, bitte.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-a1-reisen-01",
    "title": "Durchsage: Regionalbahn nach Augsburg",
    "subtitleDe": "Gleisansage und Abfahrtszeit am Hauptbahnhof",
    "level": "A1",
    "category": "reisen-verkehr",
    "exerciseType": "announcement",
    "difficulty": "easy",
    "estimatedDurationMinutes": 4,
    "audioSrc": "/audio/listening/a1/a1-reisen-bahnhof.wav",
    "audioDurationSeconds": 20.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie die Lautsprecherdurchsage am Bahnhof genau an.",
    "instructionsEn": "Listen carefully to the loudspeaker announcement at the train station.",
    "transcript": {
      "summary": "Lautsprecherdurchsage für Reisende nach Augsburg Hauptbahnhof.",
      "fullText": "Achtung an Gleis 3: Der Regionalexpress nach Augsburg Hauptbahnhof, planmäßige Abfahrt um 10 Uhr 15, fährt jetzt ein. Bitte Vorsicht an der Bahnsteigkante."
    },
    "vocabulary": [
      {
        "german": "das Gleis",
        "english": "track / platform"
      },
      {
        "german": "die Abfahrt",
        "english": "departure"
      },
      {
        "german": "einfahren",
        "english": "to arrive / pull in (train)"
      },
      {
        "german": "die Bahnsteigkante",
        "english": "platform edge"
      }
    ],
    "listeningTip": "In deutschen Bahnhöfen kündigt ein dreitöniger Gong die Durchsage an. Hören Sie direkt auf Gleisnummer und Uhrzeit.",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "An welchem Gleis fährt der Zug ein?",
        "options": [
          "Gleis 1",
          "Gleis 3",
          "Gleis 5",
          "Gleis 13"
        ],
        "correctAnswer": 1,
        "explanation": "Die Ansage beginnt mit: 'Achtung an Gleis 3'.",
        "points": 10
      },
      {
        "id": "q2",
        "type": "multiple-choice",
        "prompt": "Wann ist die planmäßige Abfahrt?",
        "options": [
          "Um 9:45 Uhr",
          "Um 10:15 Uhr",
          "Um 10:50 Uhr",
          "Um 11:15 Uhr"
        ],
        "correctAnswer": 1,
        "explanation": "In der Ansage heißt es: 'planmäßige Abfahrt um 10 Uhr 15'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-a1-dictation-01",
    "title": "Diktat: Telefonnummern und Postleitzahlen",
    "subtitleDe": "Akustisches Notieren von Ziffern und Kontaktdaten",
    "level": "A1",
    "category": "alltag",
    "exerciseType": "dictation",
    "difficulty": "easy",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/a1/a1-dictation-zahlen.wav",
    "audioDurationSeconds": 14.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie die Telefonnummer und tippen Sie den Satz exakt ab.",
    "instructionsEn": "Listen to the phone number and type out the complete sentence accurately.",
    "transcript": {
      "summary": "Eine Stimme diktiert eine Mobilfunknummer für Notizen.",
      "fullText": "Meine Telefonnummer ist 01520 3994636."
    },
    "vocabulary": [
      {
        "german": "die Telefonnummer",
        "english": "telephone number"
      },
      {
        "german": "die Ziffer",
        "english": "digit"
      }
    ],
    "listeningTip": "Hören Sie im ersten Durchgang nur zu, tippen Sie im zweiten Durchgang mit.",
    "questions": [
      {
        "id": "q1",
        "type": "dictation",
        "prompt": "Tippen Sie den gehörten Satz ab:",
        "fullText": "Meine Telefonnummer ist 01520 3994636.",
        "hint": "Beginnen Sie mit 'Meine Telefonnummer ist...'",
        "explanation": "Deutsche Ziffern werden meist einzeln oder paarweise vorgelesen: null-eins-fünf-zwei-null...",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-a1-familie-01",
    "title": "Meine Familie stellt sich vor",
    "subtitleDe": "Familienmitglieder, Berufe und Wohnorte",
    "level": "A1",
    "category": "familie-freunde",
    "exerciseType": "true-false",
    "difficulty": "easy",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/a1/a1-familie-vorstellung.wav",
    "audioDurationSeconds": 24.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie Michaels kurze Vorstellung seiner Familie.",
    "instructionsEn": "Listen to Michael's short family introduction.",
    "transcript": {
      "summary": "Michael erzählt von seinen Eltern und seiner Schwester in Köln.",
      "fullText": "Hallo! Mein Name ist Michael. Ich wohne in Köln. Meine Schwester heißt Sarah und studiert Medizin in Berlin. Meine Eltern sind beide Lehrer und leben in Hamburg."
    },
    "vocabulary": [
      {
        "german": "die Schwester",
        "english": "sister"
      },
      {
        "german": "die Eltern",
        "english": "parents"
      },
      {
        "german": "wohnen",
        "english": "to reside / live"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "statement": "Michaels Schwester wohnt in Berlin.",
        "isCorrect": true,
        "explanation": "Richtig. Michael sagt: 'Meine Schwester heißt Sarah und studiert Medizin in Berlin.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-a1-restaurant-01",
    "title": "Im Café: Kaffee und Kuchen bestellen",
    "subtitleDe": "Klassische Gastronomiebestellung am Tresen",
    "level": "A1",
    "category": "restaurant-cafe",
    "exerciseType": "fill-blank",
    "difficulty": "easy",
    "estimatedDurationMinutes": 4,
    "audioSrc": "/audio/listening/a1/a1-restaurant-cafe.wav",
    "audioDurationSeconds": 19.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Vervollständigen Sie das fehlende Wort aus dem Dialog.",
    "instructionsEn": "Fill in the missing word from the dialogue.",
    "transcript": {
      "summary": "Bestellung eines Cappuccinos und eines Stücks Käsekuchen.",
      "fullText": "Guten Tag! Ich nehme bitte einen Cappuccino mit Hafermilch und ein Stück Kuchen."
    },
    "vocabulary": [
      {
        "german": "nehmen",
        "english": "to take / to order"
      },
      {
        "german": "die Hafermilch",
        "english": "oat milk"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "fill-blank",
        "prompt": "Ergänzen Sie das Getränk:",
        "sentencePrefix": "Ich nehme bitte einen ",
        "sentenceSuffix": " mit Hafermilch.",
        "acceptedAnswers": [
          "Cappuccino",
          "Kaffee"
        ],
        "explanation": "Im Audio bestellt der Gast 'einen Cappuccino'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-a1-alltag-02",
    "title": "Uhrzeit und Verabredung am Nachmittag",
    "subtitleDe": "Uhrzeitangaben und Wochentage",
    "level": "A1",
    "category": "alltag",
    "exerciseType": "multiple-choice",
    "difficulty": "easy",
    "estimatedDurationMinutes": 4,
    "audioSrc": "/audio/listening/a1/a1-alltag-uhrzeit.wav",
    "audioDurationSeconds": 21.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie, wann sich Jonas und Lisa treffen.",
    "instructionsEn": "Listen for when Jonas and Lisa agree to meet.",
    "transcript": {
      "summary": "Jonas und Lisa vereinbaren ein Treffen um halb vier im Park.",
      "fullText": "Hallo Lisa, hast du heute Zeit? Lass uns um halb vier im Park spazieren gehen. Ja, 15 Uhr 30 passt mir sehr gut!"
    },
    "vocabulary": [
      {
        "german": "halb vier",
        "english": "half past three (3:30)"
      },
      {
        "german": "passen",
        "english": "to suit / fit schedule"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Um wie viel Uhr treffen sich Jonas und Lisa?",
        "options": [
          "14:30 Uhr",
          "15:00 Uhr",
          "15:30 Uhr",
          "16:30 Uhr"
        ],
        "correctAnswer": 2,
        "explanation": "'Halb vier' bedeutet im Deutschen 15:30 Uhr.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-a1-bildung-01",
    "title": "Der Deutschkurs beginnt um neun",
    "subtitleDe": "Kurszeiten und Raumnummern am D9W Institut",
    "level": "A1",
    "category": "bildung",
    "exerciseType": "true-false",
    "difficulty": "easy",
    "estimatedDurationMinutes": 4,
    "audioSrc": "/audio/listening/a1/a1-bildung-kursbeginn.wav",
    "audioDurationSeconds": 18.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie die Information über den A1-Intensivkurs.",
    "instructionsEn": "Listen to the information about the A1 intensive course.",
    "transcript": {
      "summary": "Durchsage am ersten Kurstag über Raum und Kurszeiten.",
      "fullText": "Liebe Kursteilnehmer, herzlich willkommen bei D9W! Ihr Deutschkurs A1 findet montags bis freitags von neun bis zwölf Uhr in Raum 204 statt."
    },
    "vocabulary": [
      {
        "german": "die Kursteilnehmer",
        "english": "course participants"
      },
      {
        "german": "stattfinden",
        "english": "to take place"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "statement": "Der Deutschkurs findet im Raum 204 statt.",
        "isCorrect": true,
        "explanation": "Richtig. Die Sprecherin sagt deutlich: 'in Raum 204 statt'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-a2-reisen-01",
    "title": "Gleisänderung am Hauptbahnhof München",
    "subtitleDe": "Verkehrsdurchsage mit Gleiswechsel und Verspätung",
    "level": "A2",
    "category": "reisen-verkehr",
    "exerciseType": "announcement",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/a2/a2-reisen-ansage-gleis.wav",
    "audioDurationSeconds": 22.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie die Durchsage über die Gleisänderung für den ICE nach Berlin.",
    "instructionsEn": "Listen to the announcement regarding the platform change for the ICE to Berlin.",
    "transcript": {
      "summary": "Durchsage am Münchner Hauptbahnhof mit Gleiswechsel und Verspätung.",
      "fullText": "Gleis 18: Bitte beachten Sie die geänderte Gleisbelegung. ICE 702 nach Berlin Hauptbahnhof über Nürnberg und Leipzig, planmäßige Abfahrt 14 Uhr 28, fährt heute ausnahmsweise von Gleis 22 ab. Grund dafür ist eine verspätete Bereitstellung des Zuges."
    },
    "vocabulary": [
      {
        "german": "die Gleisänderung",
        "english": "platform change"
      },
      {
        "german": "ausnahmsweise",
        "english": "as an exception"
      },
      {
        "german": "die Bereitstellung",
        "english": "preparation / marshalling of train"
      },
      {
        "german": "beachten",
        "english": "to note / pay attention"
      }
    ],
    "listeningTip": "Achten Sie auf das Wort 'ausnahmsweise'. Dahinter folgt fast immer das neue Gleis.",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Von welchem Gleis fährt der ICE 702 heute ab?",
        "options": [
          "Gleis 14",
          "Gleis 18",
          "Gleis 22",
          "Gleis 28"
        ],
        "correctAnswer": 2,
        "explanation": "In der Durchsage wird angekündigt: 'fährt heute ausnahmsweise von Gleis 22 ab.'",
        "points": 10
      },
      {
        "id": "q2",
        "type": "true-false",
        "statement": "Der Zug fährt pünktlich von Gleis 18 ab.",
        "isCorrect": false,
        "explanation": "Falsch. Wegen einer verspäteten Bereitstellung fährt der Zug von Gleis 22.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-a2-restaurant-01",
    "title": "Bestellung im bayerischen Gasthaus",
    "subtitleDe": "Regionale Spezialitäten und Sonderwünsche",
    "level": "A2",
    "category": "restaurant-cafe",
    "exerciseType": "conversation",
    "difficulty": "medium",
    "estimatedDurationMinutes": 6,
    "audioSrc": "/audio/listening/a2/a2-restaurant-bestellung.wav",
    "audioDurationSeconds": 20.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie das Gespräch zwischen dem Kellner und Herrn Becker.",
    "instructionsEn": "Listen to the conversation between the waiter and Mr. Becker.",
    "transcript": {
      "summary": "Ein Gast bestellt ein vegetarisches Gericht und ein alkoholfreies Getränk.",
      "dialogue": [
        {
          "speaker": "Kellner",
          "text": "Grüß Gott! Haben Sie schon gewählt?",
          "timestampSeconds": 0
        },
        {
          "speaker": "Herr Becker",
          "text": "Ja, ich hätte gerne die hausgemachten Käsespätzle mit Röstzwiebeln.",
          "timestampSeconds": 4
        },
        {
          "speaker": "Kellner",
          "text": "Sehr gerne. Und dazu einen gemischten Beilagensalat?",
          "timestampSeconds": 9
        },
        {
          "speaker": "Herr Becker",
          "text": "Ja, bitte. Und zu trinken eine große Apfelschorle.",
          "timestampSeconds": 13
        },
        {
          "speaker": "Kellner",
          "text": "Kommt sofort!",
          "timestampSeconds": 17
        }
      ]
    },
    "vocabulary": [
      {
        "german": "Grüß Gott",
        "english": "Hello / Good day (Southern Germany/Austria)"
      },
      {
        "german": "die Käsespätzle",
        "english": "cheese spätzle (egg noodles)"
      },
      {
        "german": "die Röstzwiebeln",
        "english": "crispy fried onions"
      },
      {
        "german": "die Apfelschorle",
        "english": "apple spritzer (sparkling water + juice)"
      }
    ],
    "listeningTip": "Der Konjunktiv II 'Ich hätte gerne...' ist die standardmäßige höfliche Bestellformel im Deutschen.",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Welches Hauptgericht wählt Herr Becker?",
        "options": [
          "Wiener Schnitzel",
          "Käsespätzle mit Röstzwiebeln",
          "Bayerischer Schweinebraten",
          "Nur einen Salat"
        ],
        "correctAnswer": 1,
        "explanation": "Herr Becker bestellt: 'die hausgemachten Käsespätzle mit Röstzwiebeln.'",
        "points": 10
      },
      {
        "id": "q2",
        "type": "multiple-choice",
        "prompt": "Was trinkt der Gast?",
        "options": [
          "Bier",
          "Mineralwasser ohne Kohlensäure",
          "Große Apfelschorle",
          "Kaffee"
        ],
        "correctAnswer": 2,
        "explanation": "Er bittet um 'eine große Apfelschorle'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-a2-gesundheit-01",
    "title": "Terminvereinbarung in der Arztpraxis",
    "subtitleDe": "Symptome schildern und Krankenversicherungskarte",
    "level": "A2",
    "category": "gesundheit",
    "exerciseType": "multiple-choice",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/a2/a2-gesundheit-termin.wav",
    "audioDurationSeconds": 24.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie das Telefonat mit der Praxisassistenz.",
    "instructionsEn": "Listen to the phone call with the doctor's medical assistant.",
    "transcript": {
      "summary": "Ein Patient vereinbart einen Notfalltermin wegen akuter Halsschmerzen.",
      "fullText": "Praxis Dr. Schmidt, guten Tag! Mein Name ist Thomas Kurz. Ich habe seit gestern starke Halsschmerzen und Fieber. Könnte ich heute noch vorbeikommen? Ja, bitte kommen Sie um 11:30 Uhr in die Akutsprechstunde und bringen Sie Ihre Versichertenkarte mit."
    },
    "vocabulary": [
      {
        "german": "die Halsschmerzen",
        "english": "sore throat"
      },
      {
        "german": "die Versichertenkarte",
        "english": "health insurance card"
      },
      {
        "german": "die Akutsprechstunde",
        "english": "walk-in urgent consultation hours"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wann soll der Patient in die Praxis kommen?",
        "options": [
          "Um 9:00 Uhr",
          "Um 11:30 Uhr",
          "Morgen früh",
          "Nächsten Montag"
        ],
        "correctAnswer": 1,
        "explanation": "Die Assistentin sagt: 'kommen Sie um 11:30 Uhr in die Akutsprechstunde'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-a2-einkaufen-01",
    "title": "Reklamation im Bekleidungsgeschäft",
    "subtitleDe": "Umtausch eines Pullovers mit Kassenbon",
    "level": "A2",
    "category": "einkaufen",
    "exerciseType": "true-false",
    "difficulty": "medium",
    "estimatedDurationMinutes": 4,
    "audioSrc": "/audio/listening/a2/a2-einkaufen-reklamation.wav",
    "audioDurationSeconds": 22.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie den Dialog an der Kasse.",
    "instructionsEn": "Listen to the checkout dialogue.",
    "transcript": {
      "summary": "Eine Kundin tauscht einen Pullover in einer anderen Größe um.",
      "fullText": "Guten Tag, ich möchte diesen blauen Pullover umtauschen. Er ist mir in Größe M leider zu klein. Haben Sie ihn in Größe L? Ja, haben wir vorrätig. Haben Sie den Kassenbon dabei?"
    },
    "vocabulary": [
      {
        "german": "der Kassenbon",
        "english": "receipt"
      },
      {
        "german": "umtauschen",
        "english": "to exchange item"
      },
      {
        "german": "vorrätig",
        "english": "in stock"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "statement": "Der blaue Pullover in Größe M ist der Kundin zu groß.",
        "isCorrect": false,
        "explanation": "Falsch. Die Kundin sagt: 'Er ist mir in Größe M leider zu klein.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-a2-arbeit-01",
    "title": "Nachricht auf dem Anrufbeantworter",
    "subtitleDe": "Verschiebung eines geschäftlichen Vorstellungsgesprächs",
    "level": "A2",
    "category": "arbeit-beruf",
    "exerciseType": "fill-blank",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/a2/a2-arbeit-anrufbeantworter.wav",
    "audioDurationSeconds": 24.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Ergänzen Sie den neuen Wochentag aus der Voicemail-Nachricht.",
    "instructionsEn": "Fill in the rescheduled weekday from the voicemail message.",
    "transcript": {
      "summary": "Personalabteilung verschiebt ein Vorstellungsgespräch auf Donnerstag.",
      "fullText": "Guten Tag, Herr Meier. Hier spricht Susanne Berger von der Personalabteilung. Wir müssen unseren Termin von Mittwoch leider auf Donnerstag verschieben."
    },
    "vocabulary": [
      {
        "german": "die Personalabteilung",
        "english": "HR department"
      },
      {
        "german": "verschieben",
        "english": "to postpone / reschedule"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "fill-blank",
        "prompt": "Auf welchen Tag wird der Termin verschoben?",
        "sentencePrefix": "Der Termin findet jetzt am ",
        "sentenceSuffix": " statt.",
        "acceptedAnswers": [
          "Donnerstag"
        ],
        "explanation": "Frau Berger sagt: 'leider auf Donnerstag verschieben.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-a2-dictation-01",
    "title": "Diktat: Wegbeschreibung zum Goetheplatz",
    "subtitleDe": "Orientierung im Stadtraum mit Präpositionen",
    "level": "A2",
    "category": "reisen-verkehr",
    "exerciseType": "dictation",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/a2/a2-dictation-wegbeschreibung.wav",
    "audioDurationSeconds": 20.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie die Wegbeschreibung und tippen Sie den Satz fehlerfrei ab.",
    "instructionsEn": "Listen to the directions and type the sentence accurately.",
    "transcript": {
      "summary": "Ein Passant erklärt den Weg zur nächsten U-Bahn-Station.",
      "fullText": "Gehen Sie an der Kreuzung nach links und geradeaus bis zur U-Bahn."
    },
    "vocabulary": [
      {
        "german": "die Kreuzung",
        "english": "intersection"
      },
      {
        "german": "geradeaus",
        "english": "straight ahead"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "dictation",
        "prompt": "Tippen Sie den gehörten Satz ab:",
        "fullText": "Gehen Sie an der Kreuzung nach links und geradeaus bis zur U-Bahn.",
        "hint": "Imperativ: 'Gehen Sie an der Kreuzung...'",
        "explanation": "Achten Sie auf die Großschreibung von 'Kreuzung' und 'U-Bahn'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-a2-familie-01",
    "title": "Einladung zur Geburtstagsparty am Samstag",
    "subtitleDe": "Freizeitplanung und Mitbringsel für das Buffet",
    "level": "A2",
    "category": "familie-freunde",
    "exerciseType": "multiple-choice",
    "difficulty": "medium",
    "estimatedDurationMinutes": 4,
    "audioSrc": "/audio/listening/a2/a2-familie-geburtstag.wav",
    "audioDurationSeconds": 22.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie, was die Gäste zur Party mitbringen sollen.",
    "instructionsEn": "Listen for what guests are asked to bring to the party.",
    "transcript": {
      "summary": "Felix lädt Freunde zu seinem 25. Geburtstag ein und bittet um Salate.",
      "fullText": "Hallo zusammen! Ich feiere am Samstag ab 19 Uhr meinen Geburtstag im Garten. Getränke sind da, aber bringt bitte Salate oder Snacks fürs Buffet mit!"
    },
    "vocabulary": [
      {
        "german": "mitbringen",
        "english": "to bring along"
      },
      {
        "german": "das Buffet",
        "english": "buffet"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was sollen die Gäste mitbringen?",
        "options": [
          "Getränke",
          "Salate oder Snacks",
          "Besteck und Teller",
          "Kuchen"
        ],
        "correctAnswer": 1,
        "explanation": "Felix sagt: 'bringt bitte Salate oder Snacks fürs Buffet mit!'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-a2-alltag-01",
    "title": "Wohnungssuche: Zimmer mit Balkon",
    "subtitleDe": "Mietkonditionen, Warmmiete und Kaution",
    "level": "A2",
    "category": "alltag",
    "exerciseType": "true-false",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/a2/a2-alltag-wohnung.wav",
    "audioDurationSeconds": 23.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie das Gespräch zwischen Vermieter und Mietinteressent.",
    "instructionsEn": "Listen to the conversation between landlord and prospective tenant.",
    "transcript": {
      "summary": "Ein Vermieter beschreibt eine Zweizimmerwohnung in München-Sendling.",
      "fullText": "Die Wohnung hat zwei Zimmer, circa 55 Quadratmeter, eine Einbauküche und einen sonnigen Südbalkon. Die Warmmiete beträgt 850 Euro im Monat inklusive Heizkosten."
    },
    "vocabulary": [
      {
        "german": "die Warmmiete",
        "english": "warm rent (including heating and utilities)"
      },
      {
        "german": "der Südbalkon",
        "english": "south-facing balcony"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "statement": "Die Heizkosten sind in der Warmmiete von 850 Euro bereits enthalten.",
        "isCorrect": true,
        "explanation": "Richtig. Der Vermieter sagt ausdrücklich: 'inklusive Heizkosten'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b1-arbeit-01",
    "title": "Projekt-Meeting: Aufgabenverteilung im Team",
    "subtitleDe": "Diskussion über Meilensteine, Deadlines und Verantwortlichkeiten",
    "level": "B1",
    "category": "arbeit-beruf",
    "exerciseType": "conversation",
    "difficulty": "medium",
    "estimatedDurationMinutes": 6,
    "audioSrc": "/audio/listening/b1/b1-arbeit-team-meeting.wav",
    "audioDurationSeconds": 25.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie dem Projektleiter und seiner Kollegin Sabine im Team-Meeting zu.",
    "instructionsEn": "Listen to the project manager and his colleague Sabine in a team meeting.",
    "transcript": {
      "summary": "Abstimmung über die Fertigstellung des Kundenportals vor dem Launch-Termin.",
      "dialogue": [
        {
          "speaker": "Herr Klein",
          "text": "Guten Morgen, Team. Bis Ende nächster Woche müssen wir den Prototyp für den Kunden fertiggestellt haben.",
          "timestampSeconds": 0
        },
        {
          "speaker": "Sabine",
          "text": "Ich kümmere mich um die Schnittstellen-Tests. Allerdings fehlt mir noch das Feedback aus der Design-Abteilung.",
          "timestampSeconds": 6
        },
        {
          "speaker": "Herr Klein",
          "text": "Ich spreche heute Nachmittag mit Florian aus dem Design. Konzentriere dich bitte zuerst auf die Fehlerbereinigung im Backend.",
          "timestampSeconds": 13
        },
        {
          "speaker": "Sabine",
          "text": "In Ordnung. Dann präsentiere ich die Zwischenergebnisse im Donnerstags-Meeting.",
          "timestampSeconds": 19
        }
      ]
    },
    "vocabulary": [
      {
        "german": "die Schnittstelle",
        "english": "interface / API"
      },
      {
        "german": "die Fehlerbereinigung",
        "english": "bug fixing / debugging"
      },
      {
        "german": "das Feedback",
        "english": "feedback"
      },
      {
        "german": "das Zwischenergebnis",
        "english": "interim result"
      }
    ],
    "listeningTip": "Achten Sie auf Signalwörter wie 'Allerdings', 'Zuerst' und 'Allerdings fehlt mir noch...'.",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Worauf soll sich Sabine laut Herrn Klein zuerst konzentrieren?",
        "options": [
          "Auf die Design-Entwürfe",
          "Auf die Fehlerbereinigung im Backend",
          "Auf das Kundentelefonat",
          "Auf ihren Urlaubsantrag"
        ],
        "correctAnswer": 1,
        "explanation": "Herr Klein sagt: 'Konzentriere dich bitte zuerst auf die Fehlerbereinigung im Backend.'",
        "points": 10
      },
      {
        "id": "q2",
        "type": "true-false",
        "statement": "Sabine wird die Zwischenergebnisse bereits am Dienstag präsentieren.",
        "isCorrect": false,
        "explanation": "Falsch. Sabine sagt: 'Dann präsentiere ich die Zwischenergebnisse im Donnerstags-Meeting.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-b1-nachrichten-01",
    "title": "Radio-Wetterbericht und Sturmwarnung",
    "subtitleDe": "Meteorologische Vorhersage mit Windgeschwindigkeiten",
    "level": "B1",
    "category": "nachrichten-durchsagen",
    "exerciseType": "announcement",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/b1/b1-nachrichten-wetter.wav",
    "audioDurationSeconds": 24.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie die amtliche Unwetterwarnung im Regionalradio.",
    "instructionsEn": "Listen to the official severe weather warning on regional radio.",
    "transcript": {
      "summary": "Der Deutsche Wetterdienst warnt vor orkanartigen Sturmböen in den Alpen.",
      "fullText": "Hier ist der Wetterdienst Bayern mit einer Unwetterwarnung für die Abendstunden. Tiefdruckgebiet 'Karin' bringt ab 18 Uhr schwere Sturmböen mit Geschwindigkeiten von bis zu 100 Stundenkilometern in den Voralpen. Im Schienenverkehr ist mit Ausfällen und Verspätungen zu rechnen."
    },
    "vocabulary": [
      {
        "german": "das Tiefdruckgebiet",
        "english": "low-pressure area"
      },
      {
        "german": "die Sturmböen",
        "english": "gale-force wind gusts"
      },
      {
        "german": "der Schienenverkehr",
        "english": "rail transport"
      }
    ],
    "listeningTip": "Nachrichtenmeldungen im Radio sind im Präsens und Passiv formuliert. Merken Sie sich Zeit ('ab 18 Uhr') und Windstärke.",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Ab welcher Uhrzeit wird mit schweren Sturmböen gerechnet?",
        "options": [
          "Ab 12 Uhr",
          "Ab 15 Uhr",
          "Ab 18 Uhr",
          "Ab Mitternacht"
        ],
        "correctAnswer": 2,
        "explanation": "Der Sprecher meldet: 'Tiefdruckgebiet Karin bringt ab 18 Uhr schwere Sturmböen'.",
        "points": 10
      },
      {
        "id": "q2",
        "type": "true-false",
        "statement": "Der Schienenverkehr läuft voraussichtlich völlig ungestört.",
        "isCorrect": false,
        "explanation": "Falsch. Es heißt: 'Im Schienenverkehr ist mit Ausfällen und Verspätungen zu rechnen.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-b1-bildung-01",
    "title": "Immatrikulation und Studienberatung",
    "subtitleDe": "Fristen, Semesterbeiträge und Sprachanforderungen",
    "level": "B1",
    "category": "bildung",
    "exerciseType": "multiple-choice",
    "difficulty": "medium",
    "estimatedDurationMinutes": 6,
    "audioSrc": "/audio/listening/b1/b1-bildung-studienberatung.wav",
    "audioDurationSeconds": 27.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie die Ausführungen des universitären Studienberaters.",
    "instructionsEn": "Listen to the university study advisor's remarks.",
    "transcript": {
      "summary": "Ein Studienberater erklärt die Voraussetzungen für internationale Master-Bewerber.",
      "fullText": "Für die Zulassung zum Masterstudiengang müssen internationale Bewerber ein B2-Zertifikat oder TestDaF mit mindestens Stufe 4 nachweisen. Die Immatrikulationsfrist endet am 15. Juli."
    },
    "vocabulary": [
      {
        "german": "die Zulassung",
        "english": "admission / acceptance"
      },
      {
        "german": "die Immatrikulationsfrist",
        "english": "enrollment deadline"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wann endet die Frist zur Immatrikulation?",
        "options": [
          "1. Juni",
          "15. Juli",
          "1. September",
          "15. Oktober"
        ],
        "correctAnswer": 1,
        "explanation": "Der Berater nennt den '15. Juli' als Fristende.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b1-gesundheit-01",
    "title": "Beratungsgespräch in der Apotheke",
    "subtitleDe": "Dosierungsanweisung und Einnahmehinweise für Antibiotika",
    "level": "B1",
    "category": "gesundheit",
    "exerciseType": "fill-blank",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/b1/b1-gesundheit-apotheke.wav",
    "audioDurationSeconds": 24.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Ergänzen Sie den Einnahmehinweis der Apothekerin.",
    "instructionsEn": "Complete the pharmacist's intake instructions.",
    "transcript": {
      "summary": "Apothekerin erklärt die Einnahme von Tabletten morgens und abends vor dem Essen.",
      "fullText": "Nehmen Sie bitte zweimal täglich eine Tablette mit reichlich Wasser ein, am besten jeweils vor den Mahlzeiten."
    },
    "vocabulary": [
      {
        "german": "die Mahlzeiten",
        "english": "meals"
      },
      {
        "german": "reichlich",
        "english": "plenty of / copious"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "fill-blank",
        "prompt": "Wie oft soll die Tablette eingenommen werden?",
        "sentencePrefix": "Nehmen Sie bitte ",
        "sentenceSuffix": " täglich eine Tablette ein.",
        "acceptedAnswers": [
          "zweimal",
          "2-mal"
        ],
        "explanation": "Die Apothekerin empfiehlt: 'zweimal täglich'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b1-reisen-01",
    "title": "Verspätung wegen Streckensperrung",
    "subtitleDe": "Schienenersatzverkehr zwischen Nürnberg und Regensburg",
    "level": "B1",
    "category": "reisen-verkehr",
    "exerciseType": "true-false",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/b1/b1-reisen-streckensperrung.wav",
    "audioDurationSeconds": 25.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie die Lautsprecherdurchsage im Zug.",
    "instructionsEn": "Listen to the train loudspeaker announcement.",
    "transcript": {
      "summary": "Zugbegleiter informiert über einen Schienenersatzverkehr mit Bussen.",
      "fullText": "Sehr geehrte Fahrgäste, wegen Bauarbeiten ist der Streckenabschnitt zwischen Neumarkt und Regensburg gesperrt. Für Reisende steht am Bahnhofsvorplatz ein Schienenersatzverkehr mit Bussen bereit."
    },
    "vocabulary": [
      {
        "german": "der Schienenersatzverkehr",
        "english": "rail replacement bus service"
      },
      {
        "german": "gesperrt",
        "english": "blocked / closed"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "statement": "Der Schienenersatzverkehr wird mit Bussen organisiert.",
        "isCorrect": true,
        "explanation": "Richtig. Der Zugbegleiter bestätigt: 'steht am Bahnhofsvorplatz ein Schienenersatzverkehr mit Bussen bereit.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b1-dictation-01",
    "title": "Diktat: Formelles Bewerbungsanschreiben",
    "subtitleDe": "Höflicher Einleitungssatz einer E-Mail an die Personalabteilung",
    "level": "B1",
    "category": "arbeit-beruf",
    "exerciseType": "dictation",
    "difficulty": "medium",
    "estimatedDurationMinutes": 6,
    "audioSrc": "/audio/listening/b1/b1-dictation-anschreiben.wav",
    "audioDurationSeconds": 20.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie das Diktat und tippen Sie den formellen Satz fehlerfrei ab.",
    "instructionsEn": "Listen to the dictation and type out the formal sentence accurately.",
    "transcript": {
      "summary": "Einleitungssatz einer Bewerbung auf eine Stellenausschreibung.",
      "fullText": "Mit großem Interesse habe ich Ihre Stellenausschreibung im Internet gelesen."
    },
    "vocabulary": [
      {
        "german": "die Stellenausschreibung",
        "english": "job advertisement"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "dictation",
        "prompt": "Tippen Sie den Satz ab:",
        "fullText": "Mit großem Interesse habe ich Ihre Stellenausschreibung im Internet gelesen.",
        "hint": "Perfektform: 'Mit großem Interesse habe ich...'",
        "explanation": "Typischer deutscher Bewerbungssatz mit 'Mit großem Interesse'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b1-alltag-01",
    "title": "Nachbarschaftshilfe und Reparaturen",
    "subtitleDe": "Absprachen zur Hausordnung und Heizkörperentlüftung",
    "level": "B1",
    "category": "alltag",
    "exerciseType": "multiple-choice",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/b1/b1-alltag-nachbarn.wav",
    "audioDurationSeconds": 23.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie das Gespräch zwischen Hausmeister und Mieterin.",
    "instructionsEn": "Listen to the conversation between caretaker and tenant.",
    "transcript": {
      "summary": "Der Hausmeister erklärt, wie man im Winter den Heizkörper richtig entlüftet.",
      "fullText": "Wenn der Heizkörper gluckert, müssen Sie mit diesem kleinen Vierkantschlüssel das Ventil vorsichtig öffnen, bis Wasser austritt."
    },
    "vocabulary": [
      {
        "german": "entlüften",
        "english": "to bleed / vent air from radiator"
      },
      {
        "german": "das Ventil",
        "english": "valve"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wann soll das Ventil wieder geschlossen werden?",
        "options": [
          "Sofort nach dem Öffnen",
          "Sobald Wasser austritt",
          "Erst nach zehn Minuten",
          "Nie"
        ],
        "correctAnswer": 1,
        "explanation": "Der Hausmeister erklärt: 'vorsichtig öffnen, bis Wasser austritt.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b1-diskussion-01",
    "title": "Öffentlicher Nahverkehr vs. Fahrrad",
    "subtitleDe": "Zwei Arbeitskollegen vergleichen ihre Pendelgewohnheiten",
    "level": "B1",
    "category": "diskussionen",
    "exerciseType": "true-false",
    "difficulty": "medium",
    "estimatedDurationMinutes": 5,
    "audioSrc": "/audio/listening/b1/b1-diskussion-mobilitaet.wav",
    "audioDurationSeconds": 24.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie die Argumente der beiden Pendler.",
    "instructionsEn": "Listen to the two commuters' arguments.",
    "transcript": {
      "summary": "Diskussion über das Deutschlandticket im Vergleich zum Fahrrad im Stadtverkehr.",
      "fullText": "Ich fahre auch im Winter mit dem E-Bike zur Arbeit, weil ich dadurch Staus und Zugverspätungen komplett vermeide."
    },
    "vocabulary": [
      {
        "german": "der Pendler",
        "english": "commuter"
      },
      {
        "german": "vermeiden",
        "english": "to avoid"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "statement": "Der Sprecher verzichtet im Winter auf das Fahrrad.",
        "isCorrect": false,
        "explanation": "Falsch. Er sagt: 'Ich fahre auch im Winter mit dem E-Bike'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b2-nachrichten-01",
    "title": "Wissenschaftspodcast: Energiewende und Netzausbau",
    "subtitleDe": "Experteninterview über Stromtrassen und Speichertechnologien",
    "level": "B2",
    "category": "nachrichten-durchsagen",
    "exerciseType": "conversation",
    "difficulty": "hard",
    "estimatedDurationMinutes": 7,
    "audioSrc": "/audio/listening/b2/b2-nachrichten-klima.wav",
    "audioDurationSeconds": 30.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie den Auszug aus dem wissenschaftlichen Podcast zur Energiewende.",
    "instructionsEn": "Listen to the excerpt from the scientific podcast on the energy transition.",
    "transcript": {
      "summary": "Ein Energieexperte erörtert die technischen Hürden beim Transport von Windstrom.",
      "dialogue": [
        {
          "speaker": "Moderatorin",
          "text": "Herr Dr. Hoffmann, warum verzögert sich der Bau der großen Stromtrassen von Nord- nach Süddeutschland?",
          "timestampSeconds": 0
        },
        {
          "speaker": "Dr. Hoffmann",
          "text": "Die Verzögerungen liegen primär in langwierigen Genehmigungsverfahren und dem rechtlichen Vorrang von Erdkabeln begründet.",
          "timestampSeconds": 7
        },
        {
          "speaker": "Moderatorin",
          "text": "Welche alternativen Lösungsansätze sehen Sie kurzfristig?",
          "timestampSeconds": 15
        },
        {
          "speaker": "Dr. Hoffmann",
          "text": "Wir müssen dezentrale Großbatteriespeicher beschleunigt ausbauen, um Lastspitzen direkt regional abzufedern.",
          "timestampSeconds": 20
        }
      ]
    },
    "vocabulary": [
      {
        "german": "die Stromtrasse",
        "english": "power transmission line"
      },
      {
        "german": "das Genehmigungsverfahren",
        "english": "regulatory approval procedure"
      },
      {
        "german": "abfedern",
        "english": "to cushion / mitigate impact"
      },
      {
        "german": "die Lastspitze",
        "english": "peak load"
      }
    ],
    "listeningTip": "B2-Hörtexte nutzen gehobene Verben ('liegen begründet in') und Passivkonstruktionen.",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was nennt Dr. Hoffmann als Hauptursache für die Verzögerungen?",
        "options": [
          "Finanzieller Mangel bei den Stadtwerken",
          "Langwierige Genehmigungsverfahren und Erdkabel-Auflagen",
          "Widerstand der europäischen Kommission",
          "Streik der Bauarbeiter"
        ],
        "correctAnswer": 1,
        "explanation": "Dr. Hoffmann erklärt: 'Die Verzögerungen liegen primär in langwierigen Genehmigungsverfahren und dem rechtlichen Vorrang von Erdkabeln begründet.'",
        "points": 10
      },
      {
        "id": "q2",
        "type": "true-false",
        "statement": "Dr. Hoffmann befürwortet den beschleunigten Bau dezentraler Großbatteriespeicher.",
        "isCorrect": true,
        "explanation": "Richtig. Er empfiehlt: 'Wir müssen dezentrale Großbatteriespeicher beschleunigt ausbauen.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-b2-arbeit-01",
    "title": "Gehaltsverhandlung und Zielvereinbarung",
    "subtitleDe": "Argumentationsstrategien im jährlichen Mitarbeitergespräch",
    "level": "B2",
    "category": "arbeit-beruf",
    "exerciseType": "multiple-choice",
    "difficulty": "hard",
    "estimatedDurationMinutes": 6,
    "audioSrc": "/audio/listening/b2/b2-arbeit-gehaltsverhandlung.wav",
    "audioDurationSeconds": 28.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie den Auszug aus dem Mitarbeitergespräch.",
    "instructionsEn": "Listen to the excerpt from the employee performance review.",
    "transcript": {
      "summary": "Eine Marketing-Managerin begründet ihre Forderung nach einer Gehaltsanpassung.",
      "fullText": "Angesichts der Tatsache, dass ich im vergangenen Geschäftsjahr die Lead-Generierung um 35 Prozent gesteigert und zwei Großkunden akquiriert habe, halte ich eine Anpassung meines Grundgehalts für angemessen."
    },
    "vocabulary": [
      {
        "german": "die Zielvereinbarung",
        "english": "performance agreement"
      },
      {
        "german": "akquirieren",
        "english": "to acquire new clients"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Um wie viel Prozent stieg die Lead-Generierung?",
        "options": [
          "15 Prozent",
          "25 Prozent",
          "35 Prozent",
          "50 Prozent"
        ],
        "correctAnswer": 2,
        "explanation": "Sie nennt eine Steigerung um '35 Prozent'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b2-bildung-01",
    "title": "Einführungsvorlesung: Wirtschaftspsychologie",
    "subtitleDe": "Kognitive Verzerrungen bei Konsumentscheidungen",
    "level": "B2",
    "category": "bildung",
    "exerciseType": "true-false",
    "difficulty": "hard",
    "estimatedDurationMinutes": 6,
    "audioSrc": "/audio/listening/b2/b2-bildung-vorlesung.wav",
    "audioDurationSeconds": 29.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie die Ausführungen des Hochschuldozenten.",
    "instructionsEn": "Listen to the lecturer's remarks on cognitive bias.",
    "transcript": {
      "summary": "Vorlesungsausschnitt über den Ankereffekt bei Preisverhandlungen.",
      "fullText": "Der sogenannte Ankereffekt beschreibt ein Phänomen, bei dem Menschen sich bei Urteilen unbewusst an einem anfangs genannten Zahlenwert orientieren."
    },
    "vocabulary": [
      {
        "german": "der Ankereffekt",
        "english": "anchoring bias"
      },
      {
        "german": "kognitiv",
        "english": "cognitive"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "statement": "Der Ankereffekt geschieht laut Dozent meistens unbewusst.",
        "isCorrect": true,
        "explanation": "Richtig. Der Dozent sagt: 'sich bei Urteilen unbewusst an einem anfangs genannten Zahlenwert orientieren.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b2-gesundheit-01",
    "title": "Podiumsdiskussion: Work-Life-Balance und Resilienz",
    "subtitleDe": "Prävention von Burnout im Zeitalter ständiger Erreichbarkeit",
    "level": "B2",
    "category": "gesundheit",
    "exerciseType": "fill-blank",
    "difficulty": "hard",
    "estimatedDurationMinutes": 6,
    "audioSrc": "/audio/listening/b2/b2-gesundheit-resilienz.wav",
    "audioDurationSeconds": 27.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Vervollständigen Sie das Schlüsselwort der Psychologin.",
    "instructionsEn": "Complete the psychologist's key term.",
    "transcript": {
      "summary": "Eine Psychologin plädiert für klare digitale Ruhephasen nach Feierabend.",
      "fullText": "Psychische Erholung setzt voraus, dass wir nach Dienstschluss eine bewusste Trennung von beruflicher und privater Kommunikation herbeiführen."
    },
    "vocabulary": [
      {
        "german": "die Dienstschluss",
        "english": "end of workday"
      },
      {
        "german": "herbeiführen",
        "english": "to bring about"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "fill-blank",
        "prompt": "Wann soll die Trennung stattfinden?",
        "sentencePrefix": "Die Trennung erfolgt nach ",
        "sentenceSuffix": ".",
        "acceptedAnswers": [
          "Dienstschluss",
          "Feierabend"
        ],
        "explanation": "Im Audio heißt es: 'dass wir nach Dienstschluss...'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b2-dictation-01",
    "title": "Diktat: Akademisches Thesenpapier zur Stadtentwicklung",
    "subtitleDe": "Syntaktisch anspruchsvolles Satzgefüge mit Relativsatz",
    "level": "B2",
    "category": "bildung",
    "exerciseType": "dictation",
    "difficulty": "hard",
    "estimatedDurationMinutes": 6,
    "audioSrc": "/audio/listening/b2/b2-dictation-stadtentwicklung.wav",
    "audioDurationSeconds": 25.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie den wissenschaftlichen Satz und tippen Sie ihn vollständig ab.",
    "instructionsEn": "Listen to the scientific sentence and type it out completely.",
    "transcript": {
      "summary": "These zur nachhaltigen Stadtplanung und Begrünung von Metropolen.",
      "fullText": "Nachhaltige Stadtplanung erfordert Konzepte, die ökologische Belange mit sozialer Gerechtigkeit verknüpfen."
    },
    "vocabulary": [
      {
        "german": "die Belange",
        "english": "interests / concerns"
      },
      {
        "german": "verknüpfen",
        "english": "to link / interconnect"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "dictation",
        "prompt": "Tippen Sie den Satz ab:",
        "fullText": "Nachhaltige Stadtplanung erfordert Konzepte, die ökologische Belange mit sozialer Gerechtigkeit verknüpfen.",
        "hint": "Relativsatz mit Komma: 'erfordert Konzepte, die...'",
        "explanation": "Achten Sie auf das Komma vor dem Relativpronomen 'die'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-b2-diskussion-01",
    "title": "Homeoffice-Pflicht oder Präsenzkultur?",
    "subtitleDe": "Debatte zweier Geschäftsführer über Unternehmenskultur",
    "level": "B2",
    "category": "diskussionen",
    "exerciseType": "multiple-choice",
    "difficulty": "hard",
    "estimatedDurationMinutes": 6,
    "audioSrc": "/audio/listening/b2/b2-diskussion-homeoffice.wav",
    "audioDurationSeconds": 29.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie die Argumente zur hybriden Arbeitsgestaltung.",
    "instructionsEn": "Listen to the arguments on hybrid work models.",
    "transcript": {
      "summary": "Kontroverse Debatte über Spontankreativität im Büro vs. konzentriertes Arbeiten zuhause.",
      "fullText": "Während das Homeoffice unbestritten für konzentrierte Einzelleistungen von Vorteil ist, leiden spontane Innovationsprozesse gravierend unter mangelndem direktem Austausch."
    },
    "vocabulary": [
      {
        "german": "unbestritten",
        "english": "undisputed"
      },
      {
        "german": "gravierend",
        "english": "severely / profoundly"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was leidet laut Sprecher unter zu viel Homeoffice?",
        "options": [
          "Die Pünktlichkeit der Angestellten",
          "Spontane Innovationsprozesse",
          "Die IT-Sicherheit",
          "Das Gehaltsniveau"
        ],
        "correctAnswer": 1,
        "explanation": "Der Sprecher betont: 'leiden spontane Innovationsprozesse gravierend'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-c1-diskussion-01",
    "title": "Kolloquium: Ethische Grenzen generativer KI",
    "subtitleDe": "Wissenschaftlicher Disput über Urheberrecht, Autonomie und epistemische Risiken",
    "level": "C1",
    "category": "diskussionen",
    "exerciseType": "conversation",
    "difficulty": "hard",
    "estimatedDurationMinutes": 8,
    "audioSrc": "/audio/listening/c1/c1-diskussion-ethik-ki.wav",
    "audioDurationSeconds": 35.0,
    "audioStatus": "available",
    "published": true,
    "instructionsDe": "Hören Sie den Auszug aus dem interdisziplinären Philosophie-Kolloquium.",
    "instructionsEn": "Listen to the excerpt from the interdisciplinary philosophy colloquium.",
    "transcript": {
      "summary": "Prof. Dr. von Berg und Herr Vogt debattieren über den ontologischen Status maschinengenerierter Texte.",
      "dialogue": [
        {
          "speaker": "Prof. Dr. von Berg",
          "text": "Wir dürfen keineswegs der Illusion erliegen, dass probabilistische Wortfolge-Modelle ein genuines hermeneutisches Textverständnis besitzen.",
          "timestampSeconds": 0
        },
        {
          "speaker": "Lukas Vogt",
          "text": "Gewiss, Frau Kollegin, dennoch lässt sich kaum bestreiten, dass die gesellschaftliche Rezeption dieser Artefakte de facto dieselben Wirkmuster entfaltet wie originär menschliche Autorschaft.",
          "timestampSeconds": 11
        },
        {
          "speaker": "Prof. Dr. von Berg",
          "text": "Gerade in dieser Verwechslung von formaler Eloquenz und intentionaler Urheberschaft manifestiert sich das fundamentale Risiko für den demokratischen Diskurs.",
          "timestampSeconds": 22
        }
      ]
    },
    "vocabulary": [
      {
        "german": "hermeneutisch",
        "english": "hermeneutic / interpretative"
      },
      {
        "german": "erliegen",
        "english": "to succumb to / fall prey to"
      },
      {
        "german": "die Eloquenz",
        "english": "eloquence"
      },
      {
        "german": "die Urheberschaft",
        "english": "authorship / origination"
      }
    ],
    "listeningTip": "C1-Hörtexte fordern das Erfassen von Implikaturen und registergebundener Fachsprache.",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Welche Position vertritt Prof. Dr. von Berg in Bezug auf Sprachmodelle?",
        "options": [
          "Modelle besitzen ein tieferes Textverständnis als Menschen",
          "Modelle imitieren formale Eloquenz ohne echtes Textverständnis",
          "KI gefährdet vor allem die physikalische Grundlagenforschung",
          "Urheberrecht sollte auf Algorithmen ausgeweitet werden"
        ],
        "correctAnswer": 1,
        "explanation": "Prof. von Berg spricht von einer 'Illusion' und warnt vor der 'Verwechslung von formaler Eloquenz und intentionaler Urheberschaft'.",
        "points": 10
      },
      {
        "id": "q2",
        "type": "true-false",
        "statement": "Lukas Vogt bestreitet, dass maschinengenerierte Texte gesellschaftliche Wirkmuster entfalten.",
        "isCorrect": false,
        "explanation": "Falsch. Er argumentiert explizit, dass sie 'de facto dieselben Wirkmuster entfaltet wie originär menschliche Autorschaft.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0",
      "speakerName": "D9W Native Voice Cast"
    }
  },
  {
    "id": "ex-c1-bildung-01",
    "title": "Wissenschaftsbericht: Neueste Forschung in der Immunologie",
    "subtitleDe": "Akademischer Vortrag über mRNA-basierte Tumortherapien",
    "level": "C1",
    "category": "bildung",
    "exerciseType": "multiple-choice",
    "difficulty": "hard",
    "estimatedDurationMinutes": 7,
    "audioSrc": "/audio/listening/c1/c1-bildung-forschung.wav",
    "audioDurationSeconds": 33.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie den Bericht über klinische Studien zur Immunonkologie.",
    "instructionsEn": "Listen to the report on clinical trials in immuno-oncology.",
    "transcript": {
      "summary": "Ein Forscherteam analysiert individualisierte Neoantigen-Impfstoffe.",
      "fullText": "Die Personalisierung therapeutischer Impfstoffe ermöglicht eine gezielte T-Zell-Aktivierung gegen mutationsspezifische Neoantigene, wodurch autoimmune Kollateralschäden signifikant minimiert werden."
    },
    "vocabulary": [
      {
        "german": "das Neoantigen",
        "english": "neoantigen"
      },
      {
        "german": "die Kollateralschäden",
        "english": "collateral damage"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was wird durch die gezielte T-Zell-Aktivierung minimiert?",
        "options": [
          "Die Produktionskosten der Vakzine",
          "Autoimmune Kollateralschäden",
          "Die Wirksamkeit der Antikörper",
          "Die Behandlungsdauer im Krankenhaus"
        ],
        "correctAnswer": 1,
        "explanation": "Im Bericht heißt es wörtlich: 'wodurch autoimmune Kollateralschäden signifikant minimiert werden.'",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-c1-nachrichten-01",
    "title": "Politischer Leitartikel: Föderalismus im Wandel",
    "subtitleDe": "Kommentar zur Reform der Bund-Länder-Finanzbeziehungen",
    "level": "C1",
    "category": "nachrichten-durchsagen",
    "exerciseType": "true-false",
    "difficulty": "hard",
    "estimatedDurationMinutes": 7,
    "audioSrc": "/audio/listening/c1/c1-nachrichten-foederalismus.wav",
    "audioDurationSeconds": 32.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie den Radio-Kommentar zur Finanzreform.",
    "instructionsEn": "Listen to the radio commentary on fiscal federalism.",
    "transcript": {
      "summary": "Ein politischer Kommentator hinterfragt das Kooperationsverbot in der Bildungspolitik.",
      "fullText": "Das verfassungsrechtliche Kooperationsverbot erweist sich zunehmend als Hemmschuh für die dringend gebotene Digitalisierung an bundesdeutschen Schulen."
    },
    "vocabulary": [
      {
        "german": "das Kooperationsverbot",
        "english": "constitutional ban on federal-state educational cooperation"
      },
      {
        "german": "der Hemmschuh",
        "english": "obstacle / stumbling block"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "statement": "Der Kommentator bewertet das Kooperationsverbot als Beschleuniger der Digitalisierung.",
        "isCorrect": false,
        "explanation": "Falsch. Er bezeichnet es als 'Hemmschuh' (Hindernis).",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-c1-arbeit-01",
    "title": "Strategische Unternehmensfusion im Technologiesektor",
    "subtitleDe": "Pressekonferenz zu Kartellauflagen und Synergieeffekten",
    "level": "C1",
    "category": "arbeit-beruf",
    "exerciseType": "fill-blank",
    "difficulty": "hard",
    "estimatedDurationMinutes": 7,
    "audioSrc": "/audio/listening/c1/c1-arbeit-fusion.wav",
    "audioDurationSeconds": 31.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Ergänzen Sie den juristischen Fachbegriff aus der Presseerklärung.",
    "instructionsEn": "Fill in the legal term from the press release.",
    "transcript": {
      "summary": "Vorstandsvorsitzender äußert sich zu kartellrechtlichen Auflagen der EU-Kommission.",
      "fullText": "Um eine marktbeherrschende Stellung abzuwenden, hat sich der Konzern zur Veräußerung zweier Tochtergesellschaften bereit erklärt."
    },
    "vocabulary": [
      {
        "german": "die Veräußerung",
        "english": "divestiture / sale of assets"
      },
      {
        "german": "marktbeherrschend",
        "english": "market-dominating"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "fill-blank",
        "prompt": "Wozu hat sich der Konzern bereit erklärt?",
        "sentencePrefix": "Der Konzern erklärt sich zur ",
        "sentenceSuffix": " zweier Tochtergesellschaften bereit.",
        "acceptedAnswers": [
          "Veräußerung",
          "Veraeusserung"
        ],
        "explanation": "Er nennt die 'Veräußerung zweier Tochtergesellschaften'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-c1-dictation-01",
    "title": "Diktat: Sprachwissenschaftliche Abhandlung über Dialektik",
    "subtitleDe": "Komplexes Satzgefüge mit Nominalstil und Partizipialkonstruktion",
    "level": "C1",
    "category": "bildung",
    "exerciseType": "dictation",
    "difficulty": "hard",
    "estimatedDurationMinutes": 7,
    "audioSrc": "/audio/listening/c1/c1-dictation-abhandlung.wav",
    "audioDurationSeconds": 28.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie den anspruchsvollen Text und tippen Sie ihn mit korrekter Zeichensetzung ab.",
    "instructionsEn": "Listen to the sophisticated text and type it with correct punctuation.",
    "transcript": {
      "summary": "Auszug aus einer linguistischen Untersuchung zum Sprachwandel.",
      "fullText": "Die sukzessive Verdrängung regionaler Dialekte reflektiert tiefgreifende sozioökonomische Transformationsprozesse innerhalb der modernen Industriegesellschaft."
    },
    "vocabulary": [
      {
        "german": "sukzessive",
        "english": "successive / gradual"
      },
      {
        "german": "die Verdrängung",
        "english": "displacement / crowding out"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "dictation",
        "prompt": "Tippen Sie den Satz ab:",
        "fullText": "Die sukzessive Verdrängung regionaler Dialekte reflektiert tiefgreifende sozioökonomische Transformationsprozesse innerhalb der modernen Industriegesellschaft.",
        "hint": "Substantivierter Nominalstil: 'Die sukzessive Verdrängung...'",
        "explanation": "Prüfen Sie die Schreibung von 'sukzessive', 'Verdrängung' und 'Transformationsprozesse'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  },
  {
    "id": "ex-c1-diskussion-02",
    "title": "Kulturkritik: Literatur und digitale Medien",
    "subtitleDe": "Feuilleton-Diskussion über die Zukunft des Romans",
    "level": "C1",
    "category": "diskussionen",
    "exerciseType": "multiple-choice",
    "difficulty": "hard",
    "estimatedDurationMinutes": 8,
    "audioSrc": "/audio/listening/c1/c1-diskussion-feuilleton.wav",
    "audioDurationSeconds": 34.0,
    "audioStatus": "pending",
    "published": false,
    "instructionsDe": "Hören Sie den Auszug aus dem Literaturgespräch.",
    "instructionsEn": "Listen to the literary critique conversation.",
    "transcript": {
      "summary": "Ein Literaturkritiker verteidigt das Buch als Raum kontemplativer Entschleunigung.",
      "fullText": "Im Gegensatz zur algorithmisch kuratierten Fragmentierung digitaler Reize verlangt die Lektüre eines Romans eine kognitive Tiefenversenkung, die gegenwärtig zusehends erodiert."
    },
    "vocabulary": [
      {
        "german": "die Tiefenversenkung",
        "english": "deep immersion / contemplation"
      },
      {
        "german": "erodieren",
        "english": "to erode"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was verlangt das Lesen eines Romans laut Literaturkritiker?",
        "options": [
          "Rasche Informationsaufnahme",
          "Eine kognitive Tiefenversenkung",
          "Interaktive digitale Verknüpfung",
          "Wirtschaftswissenschaftliche Vorkenntnisse"
        ],
        "correctAnswer": 1,
        "explanation": "Er betont: 'verlangt die Lektüre eines Romans eine kognitive Tiefenversenkung'.",
        "points": 10
      }
    ],
    "attribution": {
      "source": "D9W German Curriculum Studio",
      "license": "CC-BY-NC-ND 4.0"
    }
  }
]

export function getExerciseById(id: string): ListeningExercise | undefined {
  return LISTENING_EXERCISES.find((ex) => ex.id === id)
}

export function getExercisesByLevel(level: string): ListeningExercise[] {
  return LISTENING_EXERCISES.filter((ex) => ex.level === level)
}

export function getExercisesByCategory(category: string): ListeningExercise[] {
  return LISTENING_EXERCISES.filter((ex) => ex.category === category)
}
