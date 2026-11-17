import { ReadingPassage } from '@/features/reading/types/reading.types'

export const READING_PASSAGES: ReadingPassage[] = [
  {
    "id": "pass-a1-alltag-01",
    "titleGerman": "Mein Morgen in Berlin",
    "titleEnglish": "My Morning in Berlin",
    "level": "A1",
    "category": "alltag",
    "difficulty": "easy",
    "estimatedMinutes": 3,
    "description": "Lukas describes his simple morning routine, from waking up at 7:00 to having coffee and taking the U-Bahn.",
    "provenance": "D9W Pedagogical Curriculum Team (Hochdeutsch Standard)",
    "status": "published",
    "paragraphs": [
      "Mein Name ist Lukas. Ich wohne in Berlin-Mitte. Jeden Morgen stehe ich um sieben Uhr auf.",
      "Zuerst trinke ich eine Tasse Kaffee mit Milch und esse ein frisches Brötchen mit Butter und Marmelade.",
      "Um acht Uhr verlasse ich meine Wohnung. Ich nehme die U-Bahn zur Sprachschule. Der Unterricht beginnt pünktlich um halb neun."
    ],
    "keyVocabulary": [
      {
        "word": "Morgen",
        "baseForm": "Morgen",
        "article": "der",
        "plural": "Morgen",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "The early part of the day before noon.",
        "englishMeaning": "morning",
        "exampleSentence": "Am Morgen trinke ich gern Kaffee.",
        "exampleTranslation": "In the morning I like to drink coffee."
      },
      {
        "word": "Wohnung",
        "baseForm": "Wohnung",
        "article": "die",
        "plural": "Wohnungen",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "A flat or apartment in a building.",
        "englishMeaning": "apartment / flat",
        "exampleSentence": "Meine Wohnung hat zwei Zimmer.",
        "exampleTranslation": "My apartment has two rooms."
      },
      {
        "word": "Brötchen",
        "baseForm": "Brötchen",
        "article": "das",
        "plural": "Brötchen",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "A small crusty bread roll common in Germany.",
        "englishMeaning": "bread roll",
        "exampleSentence": "Ich kaufe zwei Brötchen beim Bäcker.",
        "exampleTranslation": "I buy two bread rolls at the bakery."
      },
      {
        "word": "aufstehen",
        "baseForm": "aufstehen",
        "wordType": "verb",
        "level": "A1",
        "contextMeaning": "To get out of bed in the morning.",
        "englishMeaning": "to get up / wake up",
        "exampleSentence": "Wann stehst du sonntags auf?",
        "exampleTranslation": "When do you get up on Sundays?"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wann steht Lukas jeden Morgen auf?",
        "explanation": "Im Text steht: 'Jeden Morgen stehe ich um sieben Uhr auf.'",
        "options": [
          "Um 6:30 Uhr",
          "Um 7:00 Uhr",
          "Um 8:00 Uhr",
          "Um 8:30 Uhr"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "true-false",
        "prompt": "Lukas fährt mit dem Fahrrad zur Sprachschule.",
        "statement": "Lukas fährt mit dem Fahrrad zur Sprachschule.",
        "explanation": "Falsch. Er sagt: 'Ich nehme die U-Bahn zur Sprachschule.'",
        "correctAnswer": false
      },
      {
        "id": "q3",
        "type": "fill-blank",
        "prompt": "Ergänzen Sie das Wort aus dem Text.",
        "explanation": "Lukas isst ein frisches Brötchen mit Butter und Marmelade.",
        "sentenceWithBlank": "Lukas isst ein frisches ___ mit Butter.",
        "acceptedAnswers": [
          "Brötchen",
          "broetchen"
        ]
      },
      {
        "id": "q4",
        "type": "short-answer",
        "prompt": "Wann beginnt der Unterricht an der Sprachschule?",
        "explanation": "Der Unterricht beginnt pünktlich um 8:30 Uhr (halb neun).",
        "modelAnswer": "Der Unterricht beginnt um halb neun (8:30 Uhr).",
        "gradingGuidance": "Award credit if student specifies 8:30, 08:30, or halb neun."
      }
    ],
    "wordCount": 53
  },
  {
    "id": "pass-a1-familie-02",
    "titleGerman": "Meine Familie in München",
    "titleEnglish": "My Family in Munich",
    "level": "A1",
    "category": "familie",
    "difficulty": "easy",
    "estimatedMinutes": 3,
    "description": "Sarah introduces her family, her brother Jonas, and their weekend dinner together.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "Hallo! Ich heiße Sarah und ich bin zwanzig Jahre alt. Meine Familie wohnt in München.",
      "Mein Vater heißt Thomas und ist Ingenieur. Meine Mutter heißt Claudia und arbeitet als Lehrerin.",
      "Ich habe einen kleinen Bruder. Sein Name ist Jonas und er ist zwölf Jahre alt. Am Sonntag essen wir immer alle zusammen zu Mittag."
    ],
    "keyVocabulary": [
      {
        "word": "Vater",
        "baseForm": "Vater",
        "article": "der",
        "plural": "Väter",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "A male parent.",
        "englishMeaning": "father",
        "exampleSentence": "Mein Vater liest die Zeitung.",
        "exampleTranslation": "My father is reading the newspaper."
      },
      {
        "word": "Mutter",
        "baseForm": "Mutter",
        "article": "die",
        "plural": "Mütter",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "A female parent.",
        "englishMeaning": "mother",
        "exampleSentence": "Meine Mutter kocht gern Suppe.",
        "exampleTranslation": "My mother likes cooking soup."
      },
      {
        "word": "Bruder",
        "baseForm": "Bruder",
        "article": "der",
        "plural": "Brüder",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "A male sibling.",
        "englishMeaning": "brother",
        "exampleSentence": "Jonas ist mein kleiner Bruder.",
        "exampleTranslation": "Jonas is my younger brother."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was arbeitet Sarahs Mutter?",
        "explanation": "Im Text steht: 'Meine Mutter heißt Claudia und arbeitet als Lehrerin.'",
        "options": [
          "Ingenieurin",
          "Lehrerin",
          "Ärztin",
          "Verkäuferin"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "true-false",
        "prompt": "Jonas ist zwanzig Jahre alt.",
        "statement": "Jonas ist zwanzig Jahre alt.",
        "explanation": "Falsch. Sarah ist 20 Jahre alt; Jonas ist 12 Jahre alt.",
        "correctAnswer": false
      },
      {
        "id": "q3",
        "type": "fill-blank",
        "prompt": "Ergänzen Sie den Wochentag.",
        "explanation": "Am Sonntag essen sie zusammen.",
        "sentenceWithBlank": "Am ___ essen wir immer alle zusammen zu Mittag.",
        "acceptedAnswers": [
          "Sonntag",
          "sonntag"
        ]
      }
    ],
    "wordCount": 54
  },
  {
    "id": "pass-a1-essen-03",
    "titleGerman": "Beim Bäcker um die Ecke",
    "titleEnglish": "At the Corner Bakery",
    "level": "A1",
    "category": "essen-kultur",
    "difficulty": "easy",
    "estimatedMinutes": 3,
    "description": "Ordering bread and pretzels at a traditional German bakery.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "Guten Morgen! Die Bäckerei Schmidt öffnet jeden Tag um sechs Uhr. Der Duft von frischem Brot ist wunderbar.",
      "Herr Weber möchte zwei Brezeln und ein Roggenbrot kaufen. Die Verkäuferin packt alles in eine Papiertüte.",
      "Das kostet zusammen vier Euro und fünfzig Cent. Herr Weber bezahlt mit Bargeld und sagt: 'Vielen Dank, einen schönen Tag!'"
    ],
    "keyVocabulary": [
      {
        "word": "Brot",
        "baseForm": "Brot",
        "article": "das",
        "plural": "Brote",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "Baked dough staple food.",
        "englishMeaning": "bread",
        "exampleSentence": "Wir essen oft deutsches Brot.",
        "exampleTranslation": "We often eat German bread."
      },
      {
        "word": "Brezel",
        "baseForm": "Brezel",
        "article": "die",
        "plural": "Brezeln",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "A traditional baked pastry twisted into a knot.",
        "englishMeaning": "pretzel",
        "exampleSentence": "Zwei Brezeln bitte!",
        "exampleTranslation": "Two pretzels, please!"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was kauft Herr Weber beim Bäcker?",
        "explanation": "Er kauft zwei Brezeln und ein Roggenbrot.",
        "options": [
          "Zwei Brötchen und Kuchen",
          "Zwei Brezeln und ein Roggenbrot",
          "Nur einen Kaffee",
          "Drei Croissants"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "fill-blank",
        "prompt": "Wie viel kostet der Einkauf?",
        "explanation": "Das kostet 4,50 Euro (vier Euro fünfzig).",
        "sentenceWithBlank": "Das kostet zusammen ___ Euro und fünfzig Cent.",
        "acceptedAnswers": [
          "vier",
          "4"
        ]
      }
    ],
    "wordCount": 54
  },
  {
    "id": "pass-a1-reisen-04",
    "titleGerman": "Auf dem Bahnsteig in Köln",
    "titleEnglish": "On the Train Platform in Cologne",
    "level": "A1",
    "category": "reisen",
    "difficulty": "easy",
    "estimatedMinutes": 3,
    "description": "Waiting for the regional train and reading schedule boards at Cologne Central Station.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Der Hauptbahnhof in Köln ist sehr groß. Viele Menschen reisen heute nach Bonn und Düsseldorf.",
      "Auf der Anzeigetafel steht: Der Regional-Express nach Aachen fährt auf Gleis 7 ab. Die Abfahrt ist um zehn Uhr fünfzehn.",
      "Die Passagiere steigen ein und suchen einen freien Sitzplatz. Die Türen schließen automatisch."
    ],
    "keyVocabulary": [
      {
        "word": "Zug",
        "baseForm": "Zug",
        "article": "der",
        "plural": "Züge",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "Railway passenger transport vehicle.",
        "englishMeaning": "train",
        "exampleSentence": "Der Zug kommt pünktlich an.",
        "exampleTranslation": "The train arrives on time."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Auf welchem Gleis fährt der Zug nach Aachen?",
        "explanation": "Der Zug fährt auf Gleis 7 ab.",
        "options": [
          "Gleis 3",
          "Gleis 5",
          "Gleis 7",
          "Gleis 12"
        ],
        "correctIndex": 2
      }
    ],
    "wordCount": 48
  },
  {
    "id": "pass-a1-bildung-05",
    "titleGerman": "Mein erster Tag im Deutschkurs",
    "titleEnglish": "My First Day in German Class",
    "level": "A1",
    "category": "bildung",
    "difficulty": "easy",
    "estimatedMinutes": 3,
    "description": "Meeting fellow students from Italy, Spain, and Japan in a beginner language class.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Heute ist mein erster Tag im Deutschkurs A1. Im Klassenzimmer sind zwölf Teilnehmer.",
      "Die Lehrerin heißt Frau Wagner. Sie ist sehr freundlich und spricht langsam Deutsch.",
      "Wir lernen neue Wörter und üben einfache Dialoge: 'Wie heißen Sie?' und 'Woher kommen Sie?'"
    ],
    "keyVocabulary": [
      {
        "word": "Lehrerin",
        "baseForm": "Lehrerin",
        "article": "die",
        "plural": "Lehrerinnen",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "Female teacher or instructor.",
        "englishMeaning": "female teacher",
        "exampleSentence": "Die Lehrerin erklärt die Grammatik.",
        "exampleTranslation": "The teacher explains the grammar."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Im Deutschkurs sind zwanzig Teilnehmer.",
        "statement": "Im Deutschkurs sind zwanzig Teilnehmer.",
        "explanation": "Falsch, es sind zwölf Teilnehmer.",
        "correctAnswer": false
      }
    ],
    "wordCount": 41
  },
  {
    "id": "pass-a1-arbeit-06",
    "titleGerman": "Im Büro von Herrn Klein",
    "titleEnglish": "In Mr. Klein's Office",
    "level": "A1",
    "category": "arbeit-karriere",
    "difficulty": "easy",
    "estimatedMinutes": 3,
    "description": "Daily office greetings, checking emails, and scheduling meetings.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Herr Klein arbeitet bei einer Firma in Hamburg. Sein Schreibtisch steht am Fenster.",
      "Um neun Uhr öffnet er seinen Computer und liest fünf wichtige E-Mails.",
      "Um elf Uhr hat er ein kurzes Telefonat mit einem Kunden aus Wien."
    ],
    "keyVocabulary": [
      {
        "word": "Schreibtisch",
        "baseForm": "Schreibtisch",
        "article": "der",
        "plural": "Schreibtische",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "A desk used for work and writing.",
        "englishMeaning": "desk",
        "exampleSentence": "Auf dem Schreibtisch steht mein Laptop.",
        "exampleTranslation": "My laptop is on the desk."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wo steht der Schreibtisch von Herrn Klein?",
        "explanation": "Sein Schreibtisch steht am Fenster.",
        "options": [
          "An der Tür",
          "Am Fenster",
          "In der Küche",
          "Im Keller"
        ],
        "correctIndex": 1
      }
    ],
    "wordCount": 38
  },
  {
    "id": "pass-a1-gesundheit-07",
    "titleGerman": "In der Apotheke",
    "titleEnglish": "At the Pharmacy",
    "level": "A1",
    "category": "gesundheit",
    "difficulty": "easy",
    "estimatedMinutes": 3,
    "description": "Buying pain medication and vitamin tea for a mild winter cold.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Anna hat Halsschmerzen und ein bisschen Fieber. Sie geht zur Apotheke am Marktplatz.",
      "Der Apotheker empfiehlt einen warmen Kräutertee und Halstabletten.",
      "Anna soll viel Wasser trinken und zwei Tage im Bett bleiben."
    ],
    "keyVocabulary": [
      {
        "word": "Apotheke",
        "baseForm": "Apotheke",
        "article": "die",
        "plural": "Apotheken",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "Pharmacy or chemist shop dispensing medicine.",
        "englishMeaning": "pharmacy",
        "exampleSentence": "Ich hole Medizin in der Apotheke.",
        "exampleTranslation": "I am picking up medicine at the pharmacy."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Anna geht zum Supermarkt.",
        "statement": "Anna geht zum Supermarkt.",
        "explanation": "Falsch, sie geht zur Apotheke.",
        "correctAnswer": false
      }
    ],
    "wordCount": 32
  },
  {
    "id": "pass-a1-technologie-08",
    "titleGerman": "Ein neues Smartphone",
    "titleEnglish": "A New Smartphone",
    "level": "A1",
    "category": "technologie",
    "difficulty": "easy",
    "estimatedMinutes": 3,
    "description": "Setting up a smartphone, connecting to Wi-Fi, and downloading language apps.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Maximilian hat zum Geburtstag ein neues Smartphone bekommen. Das Gerät ist modern und schwarz.",
      "Er schaltet das Handy ein und verbindet sich mit dem WLAN zu Hause.",
      "Zuerst installiert er eine Wörterbuch-App, um unterwegs Deutsch zu lernen."
    ],
    "keyVocabulary": [
      {
        "word": "Handy",
        "baseForm": "Handy",
        "article": "das",
        "plural": "Handys",
        "wordType": "noun",
        "level": "A1",
        "contextMeaning": "Mobile phone or smartphone in German everyday usage.",
        "englishMeaning": "mobile phone / smartphone",
        "exampleSentence": "Mein Handy ist auf dem Tisch.",
        "exampleTranslation": "My mobile phone is on the table."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Welche Farbe hat das Smartphone?",
        "explanation": "Das Gerät ist modern und schwarz.",
        "options": [
          "Weiß",
          "Blau",
          "Schwarz",
          "Rot"
        ],
        "correctIndex": 2
      }
    ],
    "wordCount": 37
  },
  {
    "id": "pass-a2-reisen-01",
    "titleGerman": "Wochenendausflug an den Bodensee",
    "titleEnglish": "Weekend Trip to Lake Constance",
    "level": "A2",
    "category": "reisen",
    "difficulty": "moderate",
    "estimatedMinutes": 4,
    "description": "A sunny summer excursion with boat rides, cycling, and lakeside dinner in Lindau.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "Letztes Wochenende bin ich mit zwei Freunden an den Bodensee gefahren. Wir haben den Zug von Stuttgart nach Lindau genommen.",
      "Das Wetter war herrlich: Die Sonne schien und es wehte ein angenehmer Wind. Am Samstag haben wir Fahrräder gemietet und sind entlang des Seeufers gefahren.",
      "Mittags haben wir frischen Bodenseefisch in einem traditionellen Gasthaus gegessen. Es war ein wunderbarer Ausflug, weil wir uns nach einer anstrengenden Arbeitswoche so gut erholt haben."
    ],
    "keyVocabulary": [
      {
        "word": "Ausflug",
        "baseForm": "Ausflug",
        "article": "der",
        "plural": "Ausflüge",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "A short journey or recreational excursion.",
        "englishMeaning": "excursion / day trip",
        "exampleSentence": "Wir planen einen Ausflug in die Berge.",
        "exampleTranslation": "We are planning an excursion to the mountains."
      },
      {
        "word": "Ufer",
        "baseForm": "Ufer",
        "article": "das",
        "plural": "Ufer",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "The land along the edge of a lake, river, or sea.",
        "englishMeaning": "shore / riverbank",
        "exampleSentence": "Sie spazieren am Seeufer entlang.",
        "exampleTranslation": "They are strolling along the lakeshore."
      },
      {
        "word": "erholen",
        "baseForm": "erholen",
        "wordType": "verb",
        "level": "A2",
        "contextMeaning": "To rest, relax, and recover after effort.",
        "englishMeaning": "to recover / relax",
        "exampleSentence": "Im Urlaub habe ich mich gut erholt.",
        "exampleTranslation": "On holiday I relaxed very well."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wie sind die Freunde nach Lindau gereist?",
        "explanation": "Sie haben den Zug von Stuttgart nach Lindau genommen.",
        "options": [
          "Mit dem Auto",
          "Mit dem Zug",
          "Mit dem Bus",
          "Mit dem Flugzeug"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "true-false",
        "prompt": "Am Samstag hat es am Bodensee stark geregnet.",
        "statement": "Am Samstag hat es am Bodensee stark geregnet.",
        "explanation": "Falsch. Das Wetter war herrlich und die Sonne schien.",
        "correctAnswer": false
      },
      {
        "id": "q3",
        "type": "fill-blank",
        "prompt": "Welches Verkehrsmittel haben sie am Samstag gemietet?",
        "explanation": "Am Samstag haben sie Fahrräder gemietet.",
        "sentenceWithBlank": "Am Samstag haben wir ___ gemietet.",
        "acceptedAnswers": [
          "Fahrräder",
          "Fahrraeder"
        ]
      }
    ],
    "wordCount": 71
  },
  {
    "id": "pass-a2-arbeit-02",
    "titleGerman": "Ein Vorstellungsgespräch in Frankfurt",
    "titleEnglish": "A Job Interview in Frankfurt",
    "level": "A2",
    "category": "arbeit-karriere",
    "difficulty": "moderate",
    "estimatedMinutes": 4,
    "description": "Clara prepares for an interview at an international logistics firm, discussing her resume and language skills.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "Clara hatte gestern ein wichtiges Vorstellungsgespräch bei einem Logistikunternehmen in Frankfurt. Sie war vor dem Termin ziemlich nervös.",
      "Die Personalchefin stellte ihr Fragen zu ihrem Lebenslauf und ihren Sprachkenntnissen. Clara konnte fließend auf Englisch und gut auf Deutsch antworten.",
      "Das Gespräch dauerte fünfundvierzig Minuten. Am Ende sagte die Chefin: 'Sie haben einen sehr positiven Eindruck hinterlassen. Wir melden uns nächste Woche bei Ihnen.'"
    ],
    "keyVocabulary": [
      {
        "word": "Vorstellungsgespräch",
        "baseForm": "Vorstellungsgespräch",
        "article": "das",
        "plural": "Vorstellungsgespräche",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "A formal interview for prospective employment.",
        "englishMeaning": "job interview",
        "exampleSentence": "Ich bereite mich auf das Vorstellungsgespräch vor.",
        "exampleTranslation": "I am preparing for the job interview."
      },
      {
        "word": "Eindruck",
        "baseForm": "Eindruck",
        "article": "der",
        "plural": "Eindrücke",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "An idea, feeling, or opinion of someone or something.",
        "englishMeaning": "impression",
        "exampleSentence": "Der Kandidat machte einen hervorragenden Eindruck.",
        "exampleTranslation": "The candidate made an outstanding impression."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wie lange dauerte das Vorstellungsgespräch?",
        "explanation": "Das Gespräch dauerte fünfundvierzig Minuten.",
        "options": [
          "30 Minuten",
          "45 Minuten",
          "60 Minuten",
          "90 Minuten"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "short-answer",
        "prompt": "Wann meldet sich das Unternehmen bei Clara?",
        "explanation": "Die Chefin sagte, sie melden sich nächste Woche.",
        "modelAnswer": "Das Unternehmen meldet sich nächste Woche bei Clara.",
        "gradingGuidance": "Award points if student mentions 'nächste Woche' or next week."
      }
    ],
    "wordCount": 63
  },
  {
    "id": "pass-a2-wohnen-03",
    "titleGerman": "Die neue Wohnungssuche",
    "titleEnglish": "Searching for a New Flat",
    "level": "A2",
    "category": "alltag",
    "difficulty": "moderate",
    "estimatedMinutes": 4,
    "description": "Comparing rental advertisements, square meters, and public transit links in Leipzig.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "In Leipzig sucht David seit drei Monaten eine Zweizimmerwohnung. Die Mieten im Zentrum sind in den letzten Jahren deutlich gestiegen.",
      "Gestern hat er eine helle Wohnung im Stadtteil Plagwitz besichtigt. Sie hat sechzig Quadratmeter, einen kleinen Balkon und eine Einbauküche.",
      "Die Straßenbahn hält direkt vor der Haustür, sodass er in nur fünfzehn Minuten an der Universität ist."
    ],
    "keyVocabulary": [
      {
        "word": "Miete",
        "baseForm": "Miete",
        "article": "die",
        "plural": "Mieten",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "Regular monthly payment for living in property.",
        "englishMeaning": "rent",
        "exampleSentence": "Die Miete ist im Voraus zu bezahlen.",
        "exampleTranslation": "The rent must be paid in advance."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wie groß ist die Wohnung in Plagwitz?",
        "explanation": "Sie hat sechzig Quadratmeter (60 m²).",
        "options": [
          "45 Quadratmeter",
          "50 Quadratmeter",
          "60 Quadratmeter",
          "80 Quadratmeter"
        ],
        "correctIndex": 2
      }
    ],
    "wordCount": 57
  },
  {
    "id": "pass-a2-umwelt-04",
    "titleGerman": "Mülltrennung in Deutschland",
    "titleEnglish": "Waste Separation in Germany",
    "level": "A2",
    "category": "umwelt",
    "difficulty": "moderate",
    "estimatedMinutes": 4,
    "description": "Understanding the yellow bin, paper recycling, and bottle deposits (Pfand).",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Wer nach Deutschland zieht, muss sich an die genaue Mülltrennung gewöhnen. Es gibt verschiedene Tonnen für unterschiedliche Abfälle.",
      "Papier kommt in die blaue Tonne, Verpackungen aus Plastik in die gelbe Tonne und Bioabfall in die braune Tonne.",
      "Besonders wichtig ist das Pfandsystem: Für die meisten Glas- und Plastikflaschen bekommt man im Supermarkt Geld zurück."
    ],
    "keyVocabulary": [
      {
        "word": "Müll",
        "baseForm": "Müll",
        "article": "der",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "Refuse, trash, or discarded domestic waste.",
        "englishMeaning": "rubbish / waste / trash",
        "exampleSentence": "Bitte werfen Sie den Müll in den Eimer.",
        "exampleTranslation": "Please throw the trash into the bin."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Plastikverpackungen kommen in die blaue Tonne.",
        "statement": "Plastikverpackungen kommen in die blaue Tonne.",
        "explanation": "Falsch. Plastik gehört in die gelbe Tonne; Papier in die blaue.",
        "correctAnswer": false
      }
    ],
    "wordCount": 54
  },
  {
    "id": "pass-a2-gesundheit-05",
    "titleGerman": "Beim Hausarzt",
    "titleEnglish": "At the General Practitioner",
    "level": "A2",
    "category": "gesundheit",
    "difficulty": "moderate",
    "estimatedMinutes": 4,
    "description": "Describing symptoms, presenting the health insurance card, and receiving a medical note (Krankschreibung).",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Herr Meier wacht am Montagmorgen mit starkem Husten und Kopfschmerzen auf. Er ruft in der Arztpraxis an.",
      "Um zehn Uhr darf er vorbeikommen. Die Arzthelferin bittet um seine elektronische Gesundheitskarte.",
      "Die Ärztin untersucht ihn gründlich und stellt eine Krankschreibung für drei Tage aus."
    ],
    "keyVocabulary": [
      {
        "word": "Arzt",
        "baseForm": "Arzt",
        "article": "der",
        "plural": "Ärzte",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "Medical practitioner or physician.",
        "englishMeaning": "doctor / physician",
        "exampleSentence": "Der Arzt untersucht den Patienten.",
        "exampleTranslation": "The doctor is examining the patient."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Für wie viele Tage wird Herr Meier krankgeschrieben?",
        "explanation": "Die Ärztin stellt eine Krankschreibung für drei Tage aus.",
        "options": [
          "Einen Tag",
          "Zwei Tage",
          "Drei Tage",
          "Eine Woche"
        ],
        "correctIndex": 2
      }
    ],
    "wordCount": 43
  },
  {
    "id": "pass-a2-essen-06",
    "titleGerman": "Ein Abendessen im Biergarten",
    "titleEnglish": "An Evening at the Beer Garden",
    "level": "A2",
    "category": "essen-kultur",
    "difficulty": "moderate",
    "estimatedMinutes": 4,
    "description": "Bavarian open-air dining under chestnut trees with pretzels, Obazda, and apple spritzer.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Im Sommer sind die Biergärten in Bayern beliebte Treffpunkte für Jung und Alt. Man sitzt auf langen Holzbänken unter Kastanienbäumen.",
      "Das Besondere: In den Selbstbedienungsbereichen darf man seine eigene Brotzeit wie Käse, Radieschen und Brot mitbringen.",
      "Nur die Getränke wie Apfelschorle oder Bier muss man direkt am Ausschank kaufen."
    ],
    "keyVocabulary": [
      {
        "word": "Biergarten",
        "baseForm": "Biergarten",
        "article": "der",
        "plural": "Biergärten",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "Outdoor garden restaurant serving drinks and snacks.",
        "englishMeaning": "beer garden",
        "exampleSentence": "Wir treffen uns im Biergarten.",
        "exampleTranslation": "We are meeting in the beer garden."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Man darf in keinem Biergarten eigene Speisen mitbringen.",
        "statement": "Man darf in keinem Biergarten eigene Speisen mitbringen.",
        "explanation": "Falsch. Im Selbstbedienungsbereich ist eigene Brotzeit erlaubt.",
        "correctAnswer": false
      }
    ],
    "wordCount": 49
  },
  {
    "id": "pass-a2-bildung-07",
    "titleGerman": "Die Stadtbibliothek",
    "titleEnglish": "The City Library",
    "level": "A2",
    "category": "bildung",
    "difficulty": "moderate",
    "estimatedMinutes": 4,
    "description": "Applying for a library card, borrowing books, and using quiet study desks.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Lisa geht jeden Mittwoch in die Stadtbibliothek. Dort kann sie in Ruhe für ihre Prüfungen lernen.",
      "Mit ihrem Bibliotheksausweis kann sie bis zu zwanzig Bücher und Hörbücher gleichzeitig ausleihen.",
      "Die Leihfrist beträgt vier Wochen und kann online verlängert werden."
    ],
    "keyVocabulary": [
      {
        "word": "Buch",
        "baseForm": "Buch",
        "article": "das",
        "plural": "Bücher",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "Bound printed written work.",
        "englishMeaning": "book",
        "exampleSentence": "Das Buch liegt auf dem Tisch.",
        "exampleTranslation": "The book is on the table."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wie lange ist die normale Leihfrist für Bücher?",
        "explanation": "Die Leihfrist beträgt vier Wochen.",
        "options": [
          "Zwei Wochen",
          "Drei Wochen",
          "Vier Wochen",
          "Sechs Wochen"
        ],
        "correctIndex": 2
      }
    ],
    "wordCount": 39
  },
  {
    "id": "pass-a2-geschichte-08",
    "titleGerman": "Das Brandenburger Tor",
    "titleEnglish": "The Brandenburg Gate",
    "level": "A2",
    "category": "geschichte",
    "difficulty": "moderate",
    "estimatedMinutes": 4,
    "description": "A brief historical overview of Berlin's famous monument and symbol of unity.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Das Brandenburger Tor ist das bekannteste Wahrzeichen der deutschen Hauptstadt Berlin.",
      "Früher stand das Tor direkt an der Berliner Mauer und trennte Ost- und West-Berlin voneinander.",
      "Heute ist es ein weltweites Symbol für Einheit, Freiheit und den Frieden in Europa."
    ],
    "keyVocabulary": [
      {
        "word": "Tor",
        "baseForm": "Tor",
        "article": "das",
        "plural": "Tore",
        "wordType": "noun",
        "level": "A2",
        "contextMeaning": "Large gateway or monumental entrance portal.",
        "englishMeaning": "gate / portal",
        "exampleSentence": "Das Tor öffnet sich am Morgen.",
        "exampleTranslation": "The gate opens in the morning."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Das Brandenburger Tor steht in München.",
        "statement": "Das Brandenburger Tor steht in München.",
        "explanation": "Falsch, es steht in Berlin.",
        "correctAnswer": false
      }
    ],
    "wordCount": 40
  },
  {
    "id": "pass-b1-gesellschaft-01",
    "titleGerman": "Ehrenamt und Bürgerengagement in Deutschland",
    "titleEnglish": "Volunteering and Civic Engagement in Germany",
    "level": "B1",
    "category": "gesellschaft",
    "difficulty": "moderate",
    "estimatedMinutes": 5,
    "description": "How community volunteer work in sports clubs, fire departments, and senior care strengthens social cohesion.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "In Deutschland engagieren sich fast dreißig Millionen Menschen in ihrer Freizeit ehrenamtlich. Das bedeutet, dass sie wichtige gesellschaftliche Aufgaben übernehmen, ohne dafür ein reguläres Gehalt zu erhalten.",
      "Besonders in Sportvereinen, bei der freiwilligen Feuerwehr, im Naturschutz und in der Betreuung älterer Mitbürger spielt das Ehrenamt eine unersetzliche Rolle. Ohne diesen freiwilligen Einsatz könnten viele soziale Einrichtungen gar nicht existieren.",
      "Für viele Bürger ist dieses Engagement nicht nur eine Hilfe für andere, sondern auch eine Bereicherung für das eigene Leben: Man knüpft neue Freundschaften, sammelt wertvolle Erfahrungen und stärkt das Gemeinschaftsgefühl in der Nachbarschaft."
    ],
    "keyVocabulary": [
      {
        "word": "Ehrenamt",
        "baseForm": "Ehrenamt",
        "article": "das",
        "plural": "Ehrenämter",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "Unpaid voluntary community service or civic duty.",
        "englishMeaning": "volunteer work / honorary post",
        "exampleSentence": "Sie engagiert sich seit Jahren im Ehrenamt.",
        "exampleTranslation": "She has been involved in volunteer work for years."
      },
      {
        "word": "Gemeinschaft",
        "baseForm": "Gemeinschaft",
        "article": "die",
        "plural": "Gemeinschaften",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "A feeling of fellowship or unified social group.",
        "englishMeaning": "community / fellowship",
        "exampleSentence": "Der Verein stärkt die Gemeinschaft im Dorf.",
        "exampleTranslation": "The club strengthens the community in the village."
      },
      {
        "word": "Bereicherung",
        "baseForm": "Bereicherung",
        "article": "die",
        "plural": "Bereicherungen",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "Something that enriches or adds deep value to life.",
        "englishMeaning": "enrichment",
        "exampleSentence": "Die Reise war eine große Bereicherung.",
        "exampleTranslation": "The journey was a great enrichment."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wie viele Menschen engagieren sich in Deutschland ungefähr ehrenamtlich?",
        "explanation": "Im Text steht: 'fast dreißig Millionen Menschen'.",
        "options": [
          "Zehn Millionen",
          "Zwanzig Millionen",
          "Fast dreißig Millionen",
          "Fünfzig Millionen"
        ],
        "correctIndex": 2
      },
      {
        "id": "q2",
        "type": "true-false",
        "prompt": "Ehrenamtliche Helfer erhalten ein normales monatliches Gehalt.",
        "statement": "Ehrenamtliche Helfer erhalten ein normales monatliches Gehalt.",
        "explanation": "Falsch. Sie übernehmen Aufgaben, ohne dafür ein reguläres Gehalt zu erhalten.",
        "correctAnswer": false
      },
      {
        "id": "q3",
        "type": "fill-blank",
        "prompt": "Ergänzen Sie das Substantiv aus dem Text.",
        "explanation": "Das Ehrenamt spielt bei der freiwilligen Feuerwehr eine unersetzliche Rolle.",
        "sentenceWithBlank": "Besonders bei der freiwilligen ___ spielt das Ehrenamt eine Rolle.",
        "acceptedAnswers": [
          "Feuerwehr",
          "feuerwehr"
        ]
      },
      {
        "id": "q4",
        "type": "short-answer",
        "prompt": "Warum ist das Ehrenamt auch für die Helfer selbst positiv?",
        "explanation": "Sie knüpfen neue Freundschaften, sammeln wertvolle Erfahrungen und stärken das Gemeinschaftsgefühl.",
        "modelAnswer": "Man knüpft neue Freundschaften, sammelt Erfahrungen und stärkt das Gemeinschaftsgefühl.",
        "gradingGuidance": "Award points if student mentions friendships, new experience, or community spirit."
      }
    ],
    "wordCount": 93
  },
  {
    "id": "pass-b1-bildung-02",
    "titleGerman": "Das duale Ausbildungssystem",
    "titleEnglish": "The Dual Vocational Training System",
    "level": "B1",
    "category": "bildung",
    "difficulty": "moderate",
    "estimatedMinutes": 5,
    "description": "The globally renowned combination of practical enterprise apprentice work and vocational school theory.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "Das duale Ausbildungssystem in Deutschland gilt weltweit als vorbildlich. Es verbindet theoretischen Unterricht in der Berufsschule mit praktischer Arbeit in einem Betrieb.",
      "Jugendliche, die eine duale Ausbildung beginnen, verbringen in der Regel drei Tage pro Woche im Betrieb und zwei Tage in der Schule. Dadurch erwerben sie von Beginn an fundiertes Fachwissen und echte Berufserfahrung.",
      "Ein wesentlicher Vorteil ist die Ausbildungsvergütung: Die Auszubildenden verdienen bereits während ihrer Ausbildung ihr eigenes Geld und werden nach erfolgreicher Abschlussprüfung oft direkt vom Unternehmen übernommen."
    ],
    "keyVocabulary": [
      {
        "word": "Ausbildung",
        "baseForm": "Ausbildung",
        "article": "die",
        "plural": "Ausbildungen",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "Vocational apprenticeship or structured career training.",
        "englishMeaning": "apprenticeship / vocational training",
        "exampleSentence": "Er macht eine Ausbildung zum Mechatroniker.",
        "exampleTranslation": "He is doing an apprenticeship as a mechatronics technician."
      },
      {
        "word": "Betrieb",
        "baseForm": "Betrieb",
        "article": "der",
        "plural": "Betriebe",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "A commercial company, enterprise, or firm.",
        "englishMeaning": "enterprise / company / business",
        "exampleSentence": "Der Betrieb bildet jedes Jahr fünf Azubis aus.",
        "exampleTranslation": "The company trains five apprentices each year."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Welche zwei Lernorte kombiniert das duale Ausbildungssystem?",
        "explanation": "Es kombiniert die Berufsschule mit einem praktischen Betrieb.",
        "options": [
          "Universität und Fachhochschule",
          "Berufsschule und Betrieb",
          "Gymnasium und Praktikum",
          "Homeoffice und Online-Kurse"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "true-false",
        "prompt": "Auszubildende verdienen während ihrer Ausbildung überhaupt kein Geld.",
        "statement": "Auszubildende verdienen während ihrer Ausbildung überhaupt kein Geld.",
        "explanation": "Falsch. Sie erhalten eine Ausbildungsvergütung.",
        "correctAnswer": false
      }
    ],
    "wordCount": 81
  },
  {
    "id": "pass-b1-umwelt-03",
    "titleGerman": "Erneuerbare Energien und die Energiewende",
    "titleEnglish": "Renewable Energies and the Energy Transition",
    "level": "B1",
    "category": "umwelt",
    "difficulty": "moderate",
    "estimatedMinutes": 5,
    "description": "Wind turbines in the North Sea, solar rooftops, and the ambitious goal of carbon neutrality.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Deutschland hat sich im Rahmen der Energiewende ehrgeizige Klimaziele gesetzt: Bis zum Jahr 2045 soll die gesamte Volkswirtschaft treibhausgasneutral wirtschaften.",
      "Um dieses Ziel zu erreichen, wird der Ausbau von Windenergie und Photovoltaik massiv vorangetrieben. Große Offshore-Windparks in der Nord- und Ostsee liefern bereits erhebliche Mengen an sauberem Strom.",
      "Gleichzeitig stehen die Stromnetzbetreiber vor der Herausforderung, die gewonnene Energie effizient von den windreichen Küstenregionen in die industriellen Zentren des Südens zu transportieren."
    ],
    "keyVocabulary": [
      {
        "word": "Energie",
        "baseForm": "Energie",
        "article": "die",
        "plural": "Energien",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "Power derived from physical or chemical resources.",
        "englishMeaning": "energy / power",
        "exampleSentence": "Solarenergie schont das Klima.",
        "exampleTranslation": "Solar energy protects the climate."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Bis zu welchem Jahr will Deutschland treibhausgasneutral sein?",
        "explanation": "Bis zum Jahr 2045.",
        "options": [
          "2030",
          "2040",
          "2045",
          "2050"
        ],
        "correctIndex": 2
      }
    ],
    "wordCount": 71
  },
  {
    "id": "pass-b1-reisen-04",
    "titleGerman": "Reisen mit dem Deutschlandticket",
    "titleEnglish": "Traveling with the Germany Ticket",
    "level": "B1",
    "category": "reisen",
    "difficulty": "moderate",
    "estimatedMinutes": 5,
    "description": "How the nationwide flat-rate transit subscription revolutionized regional rail and bus travel.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Seit der Einführung des bundesweiten Deutschlandtickets hat sich das Reiseverhalten vieler Menschen grundlegend verändert. Mit einem monatlichen Abonnement können Fahrgäste alle Busse, Straßenbahnen, U-Bahnen und Regionalzüge in ganz Deutschland nutzen.",
      "Vor allem Pendler im Umland von Ballungsräumen sparen dadurch monatlich viel Geld und lassen das Auto häufiger stehen.",
      "Kritiker betonen jedoch, dass das Ticket allein nicht ausreicht: Die Bahninfrastruktur muss dringend modernisiert werden, um Verspätungen und Ausfälle zu reduzieren."
    ],
    "keyVocabulary": [
      {
        "word": "Fahrgast",
        "baseForm": "Fahrgast",
        "article": "der",
        "plural": "Fahrgäste",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "A person traveling in transit without driving.",
        "englishMeaning": "passenger",
        "exampleSentence": "Die Fahrgäste steigen in den Zug.",
        "exampleTranslation": "The passengers board the train."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Das Deutschlandticket gilt auch für ICE- und IC-Züge der Fernverkehrs.",
        "statement": "Das Deutschlandticket gilt auch für ICE- und IC-Züge der Fernverkehrs.",
        "explanation": "Falsch. Es gilt für den Nah- und Regionalverkehr (Busse, U-Bahnen, Regionalzüge).",
        "correctAnswer": false
      }
    ],
    "wordCount": 69
  },
  {
    "id": "pass-b1-technologie-05",
    "titleGerman": "Künstliche Intelligenz am Arbeitsplatz",
    "titleEnglish": "Artificial Intelligence in the Workplace",
    "level": "B1",
    "category": "technologie",
    "difficulty": "moderate",
    "estimatedMinutes": 5,
    "description": "Automation tools aiding document translation, customer service, and scheduling.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "In immer mehr deutschen Büros halten digitale Assistenzsysteme und generative Sprachmodelle Einzug. Sie helfen Mitarbeitern beim Entwerfen von Texten, beim Übersetzen von Dokumenten und bei der automatischen Datenanalyse.",
      "Unternehmen erhoffen sich dadurch spürbare Produktivitätssteigerungen und eine Entlastung der Belegschaft von zeitraubenden Routinearbeiten.",
      "Gleichzeitig fordern Gewerkschaften und Betriebsräte klare Regelungen zum Datenschutz und fordern Weiterbildungsprogramme, damit kein Beschäftigter den Anschluss verliert."
    ],
    "keyVocabulary": [
      {
        "word": "Arbeitsplatz",
        "baseForm": "Arbeitsplatz",
        "article": "der",
        "plural": "Arbeitsplätze",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "Workplace or designated employment position.",
        "englishMeaning": "workplace / job",
        "exampleSentence": "Mein Arbeitsplatz ist modern ausgestattet.",
        "exampleTranslation": "My workplace is equipped with modern tools."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was fordern Gewerkschaften bezüglich des KI-Einsatzes?",
        "explanation": "Sie fordern klare Datenschutzregelungen und Weiterbildungsprogramme.",
        "options": [
          "Ein vollständiges Verbot von Computern",
          "Datenschutzregelungen und Weiterbildung",
          "Mehr Überstunden",
          "Höhere Kaffeepreise"
        ],
        "correctIndex": 1
      }
    ],
    "wordCount": 60
  },
  {
    "id": "pass-b1-familie-06",
    "titleGerman": "Familienmodelle im Wandel",
    "titleEnglish": "Evolving Family Models",
    "level": "B1",
    "category": "familie",
    "difficulty": "moderate",
    "estimatedMinutes": 5,
    "description": "Patchwork families, shared parental leave (Elternzeit), and modern work-life balance.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Das Bild der traditionellen Familie hat sich in den letzten Jahrzehnten stark gewandelt. Neben der klassischen Kernfamilie gibt es heute viele Patchworkfamilien, Alleinerziehende und binationale Partnerschaften.",
      "Auch die Verteilung der Sorgearbeit verändert sich: Immer mehr Väter nehmen mehrere Monate Elternzeit, um die frühe Entwicklung ihrer Kinder aktiv mitzugestalten.",
      "Dennoch bleibt die Vereinbarkeit von Familie und Beruf eine Herausforderung, vor allem wenn im Wohnort Betreuungsplätze in Kindertagesstätten fehlen."
    ],
    "keyVocabulary": [
      {
        "word": "Elternzeit",
        "baseForm": "Elternzeit",
        "article": "die",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "Legally protected parental leave after birth.",
        "englishMeaning": "parental leave",
        "exampleSentence": "Er nimmt zwei Monate Elternzeit.",
        "exampleTranslation": "He is taking two months of parental leave."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "In Deutschland nehmen heutzutage keine Väter mehr Elternzeit.",
        "statement": "In Deutschland nehmen heutzutage keine Väter mehr Elternzeit.",
        "explanation": "Falsch. Immer mehr Väter nehmen mehrere Monate Elternzeit.",
        "correctAnswer": false
      }
    ],
    "wordCount": 67
  },
  {
    "id": "pass-b1-gesundheit-07",
    "titleGerman": "Gesunde Ernährung im stressigen Alltag",
    "titleEnglish": "Healthy Nutrition in a Busy Routine",
    "level": "B1",
    "category": "gesundheit",
    "difficulty": "moderate",
    "estimatedMinutes": 5,
    "description": "Meal prepping, Mediterranean cooking, and avoiding processed fast food during office hours.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Zwischen Arbeit, Pendeln und Terminen fällt es vielen Berufstätigen schwer, sich ausgewogen zu ernähren. Schnelle Snacks und Kantinenessen enthalten oft zu viel Salz und Zucker.",
      "Ernährungsexperten empfehlen daher sogenanntes 'Meal Prepping': Man bereitet Mahlzeiten am Wochenende vor und nimmt sie in wiederverwendbaren Dosen mit ins Büro.",
      "Frisches Gemüse, Hülsenfrüchte, Nüsse und ausreichend Wasser sorgen den ganzen Tag über für konstante Konzentration."
    ],
    "keyVocabulary": [
      {
        "word": "Ernährung",
        "baseForm": "Ernährung",
        "article": "die",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "The food and nourishment consumed by a person.",
        "englishMeaning": "nutrition / diet",
        "exampleSentence": "Eine gesunde Ernährung ist wichtig.",
        "exampleTranslation": "A healthy diet is important."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was versteht man unter 'Meal Prepping'?",
        "explanation": "Das Vorbereiten von Mahlzeiten für die kommende Woche.",
        "options": [
          "Fastfood bestellen",
          "Mahlzeiten im Voraus vorbereiten",
          "Nur im Restaurant essen",
          "Das Frühstück ausfallen lassen"
        ],
        "correctIndex": 1
      }
    ],
    "wordCount": 61
  },
  {
    "id": "pass-b1-geschichte-08",
    "titleGerman": "Die Geschichte der Berliner Mauer",
    "titleEnglish": "The History of the Berlin Wall",
    "level": "B1",
    "category": "geschichte",
    "difficulty": "moderate",
    "estimatedMinutes": 5,
    "description": "The construction in August 1961, divided families, and the peaceful revolution of 1989.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Am 13. August 1961 begann der Bau der Berliner Mauer. Fast drei Jahrzehnte lang trennte diese befestigte Grenze Ost- und West-Berlin unbarmherzig voneinander.",
      "Viele Familien wurden über Nacht auseinandergerissen, und Hunderte Menschen verloren bei Fluchtversuchen ihr Leben.",
      "Am 9. November 1989 fiel die Mauer schließlich infolge der friedlichen Revolution in der DDR – ein historischer Tag, der die Wiedervereinigung Deutschlands einleitete."
    ],
    "keyVocabulary": [
      {
        "word": "Mauer",
        "baseForm": "Mauer",
        "article": "die",
        "plural": "Mauern",
        "wordType": "noun",
        "level": "B1",
        "contextMeaning": "A stone or concrete dividing structure.",
        "englishMeaning": "wall",
        "exampleSentence": "Die Mauer trennte die Stadt.",
        "exampleTranslation": "The wall separated the city."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "An welchem Datum fiel die Berliner Mauer?",
        "explanation": "Am 9. November 1989.",
        "options": [
          "13. August 1961",
          "9. November 1989",
          "3. Oktober 1990",
          "1. Januar 2000"
        ],
        "correctIndex": 1
      }
    ],
    "wordCount": 60
  },
  {
    "id": "pass-b2-technologie-01",
    "titleGerman": "Automatisierung und die Zukunft der Industrie 4.0",
    "titleEnglish": "Automation and the Future of Industry 4.0",
    "level": "B2",
    "category": "technologie",
    "difficulty": "challenging",
    "estimatedMinutes": 6,
    "description": "Smart manufacturing factories, cyber-physical systems, and digital sovereignty in Germany's Mittelstand.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "Das Konzept der 'Industrie 4.0' beschreibt die umfassende Vernetzung industrieller Produktionsprozesse durch das Internet der Dinge, maschinelles Lernen und vorausschauende Wartungssysteme. Für den deutschen Maschinenbau und die exportorientierten mittelständischen Unternehmen steht dabei die Wettbewerbsfähigkeit auf dem Weltmarkt auf dem Spiel.",
      "In hochautomatisierten 'Smart Factories' kommunizieren Roboter und Werkstücke in Echtzeit miteinander, wodurch Fertigungsfehler minimiert und individuelle Kundenwünsche ohne nennenswerte Rüstzeiten realisiert werden können. Doch dieser Wandel erfordert gewaltige Investitionen in IT-Sicherheit und Cloud-Infrastruktur.",
      "Arbeitsmarktforscher betonen, dass einfache mechanische Tätigkeiten zunehmend verschwinden, während die Nachfrage nach interdisziplinären Fachkräften – etwa an der Schnittstelle von Software-Engineering und Mechatronik – rasant ansteigt. Kontinuierliche Weiterbildung wird somit zum entscheidenden Erfolgsfaktor für Arbeitnehmer."
    ],
    "keyVocabulary": [
      {
        "word": "Vernetzung",
        "baseForm": "Vernetzung",
        "article": "die",
        "plural": "Vernetzungen",
        "wordType": "noun",
        "level": "B2",
        "contextMeaning": "Interconnection, networking, or linked digital systems.",
        "englishMeaning": "interconnection / networking",
        "exampleSentence": "Die digitale Vernetzung optimiert Produktionsabläufe.",
        "exampleTranslation": "Digital networking optimizes production procedures."
      },
      {
        "word": "Wettbewerbsfähigkeit",
        "baseForm": "Wettbewerbsfähigkeit",
        "article": "die",
        "wordType": "noun",
        "level": "B2",
        "contextMeaning": "Ability of a firm or economy to compete successfully.",
        "englishMeaning": "competitiveness",
        "exampleSentence": "Innovation sichert die Wettbewerbsfähigkeit.",
        "exampleTranslation": "Innovation safeguards competitiveness."
      },
      {
        "word": "Weiterbildung",
        "baseForm": "Weiterbildung",
        "article": "die",
        "plural": "Weiterbildungen",
        "wordType": "noun",
        "level": "B2",
        "contextMeaning": "Further education, advanced vocational training.",
        "englishMeaning": "continuing education / upskilling",
        "exampleSentence": "Er nimmt an einer Weiterbildung im Bereich KI teil.",
        "exampleTranslation": "He is participating in an upskilling course in AI."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was kennzeichnet sogenannte 'Smart Factories' vor allem?",
        "explanation": "Roboter und Werkstücke kommunizieren in Echtzeit miteinander.",
        "options": [
          "Vollständiger Verzicht auf Roboter",
          "Echtzeit-Kommunikation zwischen Robotern und Werkstücken",
          "Ausschließlich manuelle Fertigung",
          "Verlagerung aller Fabriken ins Ausland"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "true-false",
        "prompt": "Laut Arbeitsmarktforschern sinkt der Bedarf an Software-Ingenieuren in der Industrie 4.0.",
        "statement": "Laut Arbeitsmarktforschern sinkt der Bedarf an Software-Ingenieuren in der Industrie 4.0.",
        "explanation": "Falsch. Die Nachfrage nach interdisziplinären Fachkräften steigt rasant an.",
        "correctAnswer": false
      },
      {
        "id": "q3",
        "type": "short-answer",
        "prompt": "Welche Art von Tätigkeiten wird laut Text künftig zunehmend verdrängt?",
        "explanation": "Einfache mechanische Tätigkeiten verschwinden zunehmend.",
        "modelAnswer": "Einfache mechanische Routinetätigkeiten werden zunehmend verdrängt.",
        "gradingGuidance": "Award points if student mentions simple mechanical tasks or routine manual work."
      }
    ],
    "wordCount": 106
  },
  {
    "id": "pass-b2-umwelt-02",
    "titleGerman": "Kreislaufwirtschaft und nachhaltiges Produktdesign",
    "titleEnglish": "Circular Economy and Sustainable Product Design",
    "level": "B2",
    "category": "umwelt",
    "difficulty": "challenging",
    "estimatedMinutes": 6,
    "description": "Moving beyond linear 'take-make-waste' to cradle-to-cradle durability, reparability, and material recycling.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "Das traditionelle lineare Wirtschaftsmodell – beruhend auf dem Prinzip 'Gewinnen, Verbrauchen, Wegwerfen' – stößt angesichts knapper werdender Rohstoffe und wachsender Müllberge unweigerlich an seine planetaren Grenzen. Als zukunftsfähige Alternative gewinnt das Konzept der Kreislaufwirtschaft (*Circular Economy*) international an Bedeutung.",
      "Ziel ist es, Produkte bereits in der Entwurfsphase so zu gestalten, dass sie langlebig, modular reparierbar und nach Ablauf ihrer Nutzungsdauer vollständig demontierbar sind. Wenn wertvolle Metalle und Kunststoffe ohne Qualitätsverlust wiederverwertet werden, verringert sich die Abhängigkeit von Primärrohstoffen drastisch.",
      "Um diesen Übergang zu beschleunigen, setzt die Europäische Union auf gesetzliche Vorgaben wie das 'Recht auf Reparatur' und die Einführung digitaler Produktpässe, die lückenlose Transparenz über Lieferketten und ökologische Fußabdrücke gewährleisten."
    ],
    "keyVocabulary": [
      {
        "word": "Kreislaufwirtschaft",
        "baseForm": "Kreislaufwirtschaft",
        "article": "die",
        "wordType": "noun",
        "level": "B2",
        "contextMeaning": "Economic model minimizing resource waste through recycling.",
        "englishMeaning": "circular economy",
        "exampleSentence": "Die Kreislaufwirtschaft schützt wertvolle Ressourcen.",
        "exampleTranslation": "The circular economy protects valuable resources."
      },
      {
        "word": "Rohstoff",
        "baseForm": "Rohstoff",
        "article": "der",
        "plural": "Rohstoffe",
        "wordType": "noun",
        "level": "B2",
        "contextMeaning": "Unprocessed basic natural material used in production.",
        "englishMeaning": "raw material / commodity",
        "exampleSentence": "Seltene Erden sind gefragte Rohstoffe.",
        "exampleTranslation": "Rare earths are sought-after raw materials."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Was fordert die Kreislaufwirtschaft bereits für die Produktentwurfsphase?",
        "explanation": "Produkte sollen langlebig, reparierbar und modular demontierbar gestaltet werden.",
        "options": [
          "Produkte möglichst billig zu fertigen",
          "Langlebigkeit und modulare Reparierbarkeit",
          "Nur noch Plastik zu verwenden",
          "Produkte nach einem Jahr zu ersetzen"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "fill-blank",
        "prompt": "Welches gesetzliche Recht treibt die EU voran?",
        "explanation": "Das Recht auf Reparatur.",
        "sentenceWithBlank": "Die EU setzt auf Vorgaben wie das 'Recht auf ___'.",
        "acceptedAnswers": [
          "Reparatur",
          "reparatur"
        ]
      }
    ],
    "wordCount": 108
  },
  {
    "id": "pass-b2-arbeit-03",
    "titleGerman": "Remote Work und hybride Arbeitswelten",
    "titleEnglish": "Remote Work and Hybrid Work Environments",
    "level": "B2",
    "category": "arbeit-karriere",
    "difficulty": "challenging",
    "estimatedMinutes": 6,
    "description": "Analyzing how distributed teams balance autonomous home office flexibility with corporate culture cohesion.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Die dauerhafte Etablierung des mobilen Arbeitens hat die traditionelle Büropräsenz in vielen Branchen nachhaltig verdrängt. Immer mehr Organisationen setzen auf hybride Modelle, bei denen Mitarbeiter flexibel zwischen Heimbüro und Firmenzentrale wählen können.",
      "Befürworter heben die verbesserte Vereinbarkeit von Familie und Beruf sowie den Wegfall zeitraubender Arbeitswege hervor. Allerdings warnen Psychologen vor schleichender sozialer Isolation und der Gefahr einer Entgrenzung der Arbeitszeit.",
      "Führungskräfte müssen daher neue Kompetenzen entwickeln: Statt Anwesenheitskontrolle sind Vertrauenskultur, klare Zielvereinbarungen und zielgerichtete persönliche Teamtage gefragt."
    ],
    "keyVocabulary": [
      {
        "word": "Arbeitswelt",
        "baseForm": "Arbeitswelt",
        "article": "die",
        "plural": "Arbeitswelten",
        "wordType": "noun",
        "level": "B2",
        "contextMeaning": "The professional domain and socio-technical work landscape.",
        "englishMeaning": "working world / world of work",
        "exampleSentence": "Die Digitalisierung formt die Arbeitswelt neu.",
        "exampleTranslation": "Digitalization is reshaping the working world."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Psychologen sehen im dauerhaften Heimbüro keinerlei Risiken für Beschäftigte.",
        "statement": "Psychologen sehen im dauerhaften Heimbüro keinerlei Risiken für Beschäftigte.",
        "explanation": "Falsch. Sie warnen vor sozialer Isolation und Entgrenzung der Arbeitszeit.",
        "correctAnswer": false
      }
    ],
    "wordCount": 78
  },
  {
    "id": "pass-b2-gesellschaft-04",
    "titleGerman": "Demografischer Wandel und das Rentensystem",
    "titleEnglish": "Demographic Change and the Pension System",
    "level": "B2",
    "category": "gesellschaft",
    "difficulty": "challenging",
    "estimatedMinutes": 6,
    "description": "The generational contract under pressure from an aging baby boomer cohort.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Die Alterung der Gesellschaft stellt das umlagefinanzierte deutsche Rentensystem vor erhebliche Herausforderungen. Wenn in den kommenden Jahren die geburtenstarken Jahrgänge der sogenannten Babyboomer in den Ruhestand eintreten, verschiebt sich das Verhältnis zwischen Beitragszahlern und Rentenempfängern dramatisch.",
      "Ökonomen diskutieren verschiedene Lösungsansätze: Eine Anhebung des Renteneintrittsalters, eine stärkere steuerliche Bezuschussung aus dem Bundeshaushalt oder die Ergänzung durch kapitalgedeckte Aktienfonds.",
      "Gleichzeitig wird betont, dass gezielte Zuwanderung qualifizierter Fachkräfte aus dem Ausland unverzichtbar ist, um die soziale Sicherung langfristig zu stabilisieren."
    ],
    "keyVocabulary": [
      {
        "word": "Ruhestand",
        "baseForm": "Ruhestand",
        "article": "der",
        "wordType": "noun",
        "level": "B2",
        "contextMeaning": "Retirement period after conclusion of working life.",
        "englishMeaning": "retirement",
        "exampleSentence": "Er geht mit 67 Jahren in den Ruhestand.",
        "exampleTranslation": "He is entering retirement at the age of 67."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Welche Generation tritt in den kommenden Jahren vermehrt in den Ruhestand ein?",
        "explanation": "Die geburtenstarken Babyboomer-Jahrgänge.",
        "options": [
          "Generation Z",
          "Die Babyboomer",
          "Generation Alpha",
          "Die Millennials"
        ],
        "correctIndex": 1
      }
    ],
    "wordCount": 77
  },
  {
    "id": "pass-b2-kultur-05",
    "titleGerman": "Die Renaissance des deutschen Autorenkinos",
    "titleEnglish": "The Renaissance of German Auteur Cinema",
    "level": "B2",
    "category": "literatur",
    "difficulty": "challenging",
    "estimatedMinutes": 6,
    "description": "The Berlinale, historical reflections, and auteur narratives winning global film accolades.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "In den vergangenen Jahren hat das deutsche Kino international für Aufsehen gesorgt. Regisseure wie Christian Petzold oder Maren Ade überzeugen mit tiefgründigen Charakterstudien und gesellschaftskritischen Beobachtungen.",
      "Im Gegensatz zu Hollywoods Blockbuster-Konventionen zeichnet sich der Autorenfilm durch eine zurückhaltende Bildsprache, psychologische Vielschichtigkeit und den Mut zu offenen Enden aus.",
      "Filmförderungen und Festivals wie die Berlinale bieten eine unverzichtbare Plattform, um anspruchsvolle europäische Filmkunst gegenüber rein kommerziellen Streaming-Formaten zu behaupten."
    ],
    "keyVocabulary": [
      {
        "word": "Regisseur",
        "baseForm": "Regisseur",
        "article": "der",
        "plural": "Regisseure",
        "wordType": "noun",
        "level": "B2",
        "contextMeaning": "Film director managing artistic staging and acting.",
        "englishMeaning": "director (film / theatre)",
        "exampleSentence": "Der Regisseur gewann einen goldenen Bären.",
        "exampleTranslation": "The director won a Golden Bear."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Deutscher Autorenfilm kopiert exakt die Formeln von Hollywood-Blockbustern.",
        "statement": "Deutscher Autorenfilm kopiert exakt die Formeln von Hollywood-Blockbustern.",
        "explanation": "Falsch. Er zeichnet sich durch psychologische Vielschichtigkeit und Mut zu offenen Enden aus.",
        "correctAnswer": false
      }
    ],
    "wordCount": 68
  },
  {
    "id": "pass-b2-geschichte-06",
    "titleGerman": "Das Bauhaus und die moderne Architektur",
    "titleEnglish": "The Bauhaus and Modern Architecture",
    "level": "B2",
    "category": "geschichte",
    "difficulty": "challenging",
    "estimatedMinutes": 6,
    "description": "Walter Gropius, Dessau, and the timeless principle that form follows function.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Gegründet im Jahr 1919 in Weimar durch Walter Gropius, revolutionierte das Bauhaus das Verständnis von Architektur, Kunst und Kunsthandwerk. Die Kunstschule verfolgte die radikale Idee, Kunst und industrielle Serienproduktion miteinander zu versöhnen.",
      "Der Leitspruch 'Form follows function' (Die Form folgt der Funktion) prägte schlichte Fassaden aus Glas, Stahl und Beton sowie zeitlose Möbelklassiker wie den Freischwinger-Stuhl.",
      "Trotz der Schließung durch das NS-Regime im Jahr 1933 trugen emigrierte Bauhaus-Meister ihre avantgardistischen Ideen in die ganze Welt, wo sie die moderne Stadtplanung bis heute beeinflussen."
    ],
    "keyVocabulary": [
      {
        "word": "Architektur",
        "baseForm": "Architektur",
        "article": "die",
        "wordType": "noun",
        "level": "B2",
        "contextMeaning": "The art and science of building design and spatial planning.",
        "englishMeaning": "architecture",
        "exampleSentence": "Bauhaus-Architektur besticht durch klare Linien.",
        "exampleTranslation": "Bauhaus architecture impresses through clean lines."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Wer gründete 1919 das Bauhaus in Weimar?",
        "explanation": "Walter Gropius gründete das Bauhaus.",
        "options": [
          "Ludwig Mies van der Rohe",
          "Walter Gropius",
          "Le Corbusier",
          "Alvar Aalto"
        ],
        "correctIndex": 1
      }
    ],
    "wordCount": 83
  },
  {
    "id": "pass-c1-literatur-01",
    "titleGerman": "Die Poetik der Entfremdung: Franz Kafkas Erzählkunst",
    "titleEnglish": "The Poetics of Alienation: Franz Kafka's Narrative Art",
    "level": "C1",
    "category": "literatur",
    "difficulty": "challenging",
    "estimatedMinutes": 7,
    "description": "A close literary critique of bureaucratic absurdity, existential solitude, and unyielding modern alienation in Kafka's prose.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "Kaum ein deutschsprachiger Autor des zwanzigsten Jahrhunderts hat die existenzielle Verunsicherung des modernen Individuums so prägnant verdichtet wie Franz Kafka. Seine Erzählungen – von der 'Verwandlung' bis hin zum unvollendeten Romanfragment 'Der Prozess' – konfrontieren den Leser mit einer unerbittlichen, scheinbar rational organisierten bürokratischen Maschinerie, deren innere Logik sich jedem menschlichen Verstehen entzieht.",
      "Kafkas sprachliche Meisterschaft manifestiert sich in einem nüchternen, fast protokolliarischen Duktus, der im scharfen Kontrast zur ungeheuerlichen Monstrosität des geschilderten Geschehens steht. Diese kalkulierte Diskrepanz erzeugt jenes beklemmende Gefühl von Fremdheit und Ohnmacht, das heute weltweit als 'kafkaesk' bezeichnet wird.",
      "In der literaturwissenschaftlichen Rezeption wird dieses Werk daher weniger als historisch gebundene Allegorie der k.u.k.-Bürokratie gedeutet, sondern vielmehr als zeitlose Chiffre für die metaphysische Obdachlosigkeit des Menschen im Zeitalter der Technokratie."
    ],
    "keyVocabulary": [
      {
        "word": "Entfremdung",
        "baseForm": "Entfremdung",
        "article": "die",
        "plural": "Entfremdungen",
        "wordType": "noun",
        "level": "C1",
        "contextMeaning": "The state or experience of being isolated from a group or reality.",
        "englishMeaning": "alienation / estrangement",
        "exampleSentence": "Die soziologische Entfremdung des modernen Menschen.",
        "exampleTranslation": "The sociological alienation of modern human beings."
      },
      {
        "word": "kafkaesk",
        "baseForm": "kafkaesk",
        "wordType": "adjective",
        "level": "C1",
        "contextMeaning": "Characteristic of the nightmarish complexity in Kafka's works.",
        "englishMeaning": "kafkaesque",
        "exampleSentence": "Ein kafkaeskes Labyrinth aus Vorschriften.",
        "exampleTranslation": "A kafkaesque labyrinth of bureaucratic regulations."
      },
      {
        "word": "Chiffre",
        "baseForm": "Chiffre",
        "article": "die",
        "plural": "Chiffren",
        "wordType": "noun",
        "level": "C1",
        "contextMeaning": "A coded, metaphorical, or enigmatic symbolic representation.",
        "englishMeaning": "cipher / cryptographic symbol",
        "exampleSentence": "Der Turm diente als Chiffre für Einsamkeit.",
        "exampleTranslation": "The tower served as a cipher for loneliness."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Welcher stilistische Kontrast erzeugt in Kafkas Prosa die 'kafkaeske' Wirkung?",
        "explanation": "Der nüchterne, protokollarische Duktus im scharfen Kontrast zur Monstrosität des Geschehens.",
        "options": [
          "Reimschema und pathetische Metaphern",
          "Nüchterner, protokollarischer Duktus im Kontrast zum monströsen Geschehen",
          "Humorvolle Dialoge und Happy Ends",
          "Umgangssprachliche Dialektausdrücke"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "true-false",
        "prompt": "Die neuere Literaturwissenschaft deutet Kafkas Werk ausschließlich als Kritik der österreichisch-ungarischen Bürokratie.",
        "statement": "Die neuere Literaturwissenschaft deutet Kafkas Werk ausschließlich als Kritik der österreichisch-ungarischen Bürokratie.",
        "explanation": "Falsch. Es wird vielmehr als zeitlose Chiffre für die metaphysische Obdachlosigkeit des Menschen gedeutet.",
        "correctAnswer": false
      },
      {
        "id": "q3",
        "type": "short-answer",
        "prompt": "Was bedeutet das weltweit gebräuchliche Adjektiv 'kafkaesk' im Kern?",
        "explanation": "Ein beklemmendes Gefühl von Ohnmacht, absurder Bürokratie und Fremdheit.",
        "modelAnswer": "Es beschreibt ein beklemmendes Gefühl absurder Ohnmacht gegenüber unbegreiflichen bürokratischen Systemen.",
        "gradingGuidance": "Award points if student mentions absurd bureaucracy, oppressive powerlessness, or nightmarish alienation."
      }
    ],
    "wordCount": 122
  },
  {
    "id": "pass-c1-technologie-02",
    "titleGerman": "Algorithmische Souveränität und die Ethik autonomer Systeme",
    "titleEnglish": "Algorithmic Sovereignty and the Ethics of Autonomous Systems",
    "level": "C1",
    "category": "technologie",
    "difficulty": "challenging",
    "estimatedMinutes": 7,
    "description": "Examining European regulatory frameworks (EU AI Act), systemic biases in generative foundations, and human autonomy.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "published",
    "paragraphs": [
      "Die zunehmende Delegation existentieller Entscheidungsbefugnisse an selbstlernende Algorithmen berührt fundamentale Grundpfeiler des rechtsstaatlichen Diskurses. Ob bei der Bonitätsprüfung, im Strafvollzug oder in medizinischen Triage-Szenarien: Die scheinbare Objektivität statistischer Wahrscheinlichkeitsmodelle verdeckt häufig systematische Verzerrungen (*algorithmic bias*), die in den Trainingsdaten historisch zementiert sind.",
      "Um der drohenden Erosion demokratischer Selbstbestimmung entgegenzuwirken, hat die Europäische Union mit dem 'AI Act' einen weltweit beachteten risikobasierten Regulierungsrahmen etabliert. Dieser untersagt biometrische Massenüberwachung im öffentlichen Raum und unterwirft Hochrisiko-Anwendungen rigorosen Transparenz- und Konformitätsprüfungen.",
      "Gleichwohl mahnen Technikphilosophen, dass regulatorische Schutzwälle unzureichend bleiben, solange die technologische Infrastruktur monopolisierter Hyperscaler nicht durch offene, europäische Alternativen ergänzt wird. Wahre algorithmische Souveränität erfordert die emanzipatorische Befähigung der Bürger, digitale Systeme nicht bloß zu konsumieren, sondern deren epistemische Fundamente kritisch zu hinterfragen."
    ],
    "keyVocabulary": [
      {
        "word": "Souveränität",
        "baseForm": "Souveränität",
        "article": "die",
        "wordType": "noun",
        "level": "C1",
        "contextMeaning": "Supreme authority, self-determination, and independence.",
        "englishMeaning": "sovereignty",
        "exampleSentence": "Digitale Souveränität erfordert technologische Unabhängigkeit.",
        "exampleTranslation": "Digital sovereignty requires technological independence."
      },
      {
        "word": "Verzerrung",
        "baseForm": "Verzerrung",
        "article": "die",
        "plural": "Verzerrungen",
        "wordType": "noun",
        "level": "C1",
        "contextMeaning": "Systematic bias or skewing of data and representation.",
        "englishMeaning": "distortion / bias",
        "exampleSentence": "Trainingsdaten enthalten oft gesellschaftliche Verzerrungen.",
        "exampleTranslation": "Training data often contains societal biases."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Welchen regulatorischen Ansatz verfolgt der 'EU AI Act'?",
        "explanation": "Einen risikobasierten Regulierungsrahmen.",
        "options": [
          "Vollständiges Verbot aller KI-Systeme",
          "Einen risikobasierten Regulierungsrahmen",
          "Völlige Freigabe ohne Auflagen",
          "Ausschließlich Steuern auf Rechenzentren"
        ],
        "correctIndex": 1
      },
      {
        "id": "q2",
        "type": "fill-blank",
        "prompt": "Welche Art der Überwachung im öffentlichen Raum untersagt der EU AI Act?",
        "explanation": "Biometrische Massenüberwachung.",
        "sentenceWithBlank": "Der AI Act untersagt ___ Massenüberwachung im öffentlichen Raum.",
        "acceptedAnswers": [
          "biometrische",
          "Biometrische"
        ]
      }
    ],
    "wordCount": 120
  },
  {
    "id": "pass-c1-gesellschaft-03",
    "titleGerman": "Die Krise der deliberativen Demokratie",
    "titleEnglish": "The Crisis of Deliberative Democracy",
    "level": "C1",
    "category": "gesellschaft",
    "difficulty": "challenging",
    "estimatedMinutes": 7,
    "description": "Echo chambers, discursive fragmentation, and Jürgen Habermas's theory of communicative action.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "In seiner monumentalen Demokratietheorie postulierte Jürgen Habermas die Öffentlichkeit als herrschaftsfreien Diskursraum, in dem das 'zwanglose Zwingen des besseren Arguments' rationalen Konsens stiftet. Doch in der gegenwärtigen Ära digitaler Plattformökonomien erodiert dieses normative Ideal zusehends.",
      "Algorithmische Polarisierungsanreize fragmentieren die gesellschaftliche Arena in unversöhnliche Echokammern, in denen affektive Empörung systematisch vor argumentativer Redlichkeit honoriert wird.",
      "Um den Zusammenhalt demokratischer Gesellschaften zu gewährleisten, bedarf es einer institutionellen Erneuerung vermittelnder Instanzen – von qualitätsjournalistischen Medien bis hin zu deliberativen Bürgerräten, die gemeinsame Faktenräume restituieren."
    ],
    "keyVocabulary": [
      {
        "word": "Diskurs",
        "baseForm": "Diskurs",
        "article": "der",
        "plural": "Diskurse",
        "wordType": "noun",
        "level": "C1",
        "contextMeaning": "Formal debate or systematic verbal interchange.",
        "englishMeaning": "discourse / debate",
        "exampleSentence": "Der gesellschaftliche Diskurs verlangt Respekt.",
        "exampleTranslation": "Societal discourse requires respect."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Welches normative Prinzip prägte Habermas' Vorstellung von Diskurs?",
        "explanation": "Das 'zwanglose Zwingen des besseren Arguments'.",
        "options": [
          "Die Macht des Meistbietenden",
          "Das zwanglose Zwingen des besseren Arguments",
          "Emotionale Überwältigung",
          "Die Diktatur der Mehrheit"
        ],
        "correctIndex": 1
      }
    ],
    "wordCount": 80
  },
  {
    "id": "pass-c1-umwelt-04",
    "titleGerman": "Das Anthropozän: Der Mensch als geologischer Faktor",
    "titleEnglish": "The Anthropocene: Humankind as a Geological Factor",
    "level": "C1",
    "category": "umwelt",
    "difficulty": "challenging",
    "estimatedMinutes": 7,
    "description": "Planetary boundaries, bio-geochemical cycles, and the geological imprint of industrial civilizations.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Der Begriff des Anthropozäns markiert eine epochale Zäsur in der Natur- und Geistesgeschichte: Nicht mehr kosmische Zyklen oder vulkanische Eruptionen dominieren die biophysikalischen Dynamiken der Erde, sondern die kumulierten Artefakte menschlicher Zivilisation.",
      "Durch die globale Ausbringung von synthetischen Düngemitteln, Plastiksedimenten und Radionukliden hinterlässt die Menschheit eine stratigraphisch unmissverständliche Signatur in den geologischen Gesteinsschichten.",
      "Diese fundamentale Verschränkung von Erdgeschichte und Menschheitsgeschichte zwingt zu einer radikalen Überwindung der cartesianischen Dichotomie von Natur und Kultur."
    ],
    "keyVocabulary": [
      {
        "word": "Zäsur",
        "baseForm": "Zäsur",
        "article": "die",
        "plural": "Zäsuren",
        "wordType": "noun",
        "level": "C1",
        "contextMeaning": "A profound, critical break, turning point, or caesura.",
        "englishMeaning": "caesura / turning point",
        "exampleSentence": "Der Mauerfall war eine historische Zäsur.",
        "exampleTranslation": "The fall of the wall was a historical caesura."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Im Anthropozän haben menschliche Aktivitäten keinerlei messbare Spuren in den Gesteinsschichten hinterlassen.",
        "statement": "Im Anthropozän haben menschliche Aktivitäten keinerlei messbare Spuren in den Gesteinsschichten hinterlassen.",
        "explanation": "Falsch. Plastiksedimente und Radionuklide bilden eine deutliche stratigraphische Signatur.",
        "correctAnswer": false
      }
    ],
    "wordCount": 72
  },
  {
    "id": "pass-c1-geschichte-05",
    "titleGerman": "Erinnerungskultur und historische Verantwortung",
    "titleEnglish": "Culture of Remembrance and Historical Responsibility",
    "level": "C1",
    "category": "geschichte",
    "difficulty": "challenging",
    "estimatedMinutes": 7,
    "description": "Germany's critical confrontation with the Nazi past (Vergangenheitsbewältigung) as a civic imperative.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Die bundesdeutsche Erinnerungskultur – oft unter dem Terminus der 'Vergangenheitsbewältigung' subsumiert – stellt ein weltweit beispielloses historiografisches und moralisches Projekt dar. Sie basiert auf dem Konsens, dass die selbstkritische Aufarbeitung der nationalsozialistischen Verbrechen ein unabdingbares Fundament des demokratischen Selbstverständnisses bildet.",
      "Gleichwohl wandelt sich diese Gedenkkultur im Zuge des Generationswechsels: Mit dem fortschreitenden Ableben der letzten Zeitzeugen verliert das Gedenken seine unmittelbar erfahrbare emotionale Verankerung.",
      "Künftige Gedenkarbeit muss daher neue didaktische und digitale Formen finden, um das unnachgiebige 'Nie wieder' in einer postmigrantischen, pluralistischen Gesellschaft lebendig und handlungsleitend zu halten."
    ],
    "keyVocabulary": [
      {
        "word": "Erinnerungskultur",
        "baseForm": "Erinnerungskultur",
        "article": "die",
        "plural": "Erinnerungskulturen",
        "wordType": "noun",
        "level": "C1",
        "contextMeaning": "The collective societal memory and commemoration of past events.",
        "englishMeaning": "culture of remembrance",
        "exampleSentence": "Eine lebendige Erinnerungskultur schützt vor Wiederholung.",
        "exampleTranslation": "A living culture of remembrance protects against repetition."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "prompt": "Welche Herausforderung betrifft die Erinnerungskultur durch den Generationswechsel?",
        "explanation": "Das fortschreitende Ableben der letzten Zeitzeugen.",
        "options": [
          "Mangel an Museen",
          "Das fortschreitende Ableben der letzten Zeitzeugen",
          "Zu viele Gedenktage",
          "Vollständige Vergessenheit im Ausland"
        ],
        "correctIndex": 1
      }
    ],
    "wordCount": 87
  },
  {
    "id": "pass-c1-essen-kultur-06",
    "titleGerman": "Gastrosophie: Die Philosophie des Geschmacks",
    "titleEnglish": "Gastrosophy: The Philosophy of Taste",
    "level": "C1",
    "category": "essen-kultur",
    "difficulty": "challenging",
    "estimatedMinutes": 7,
    "description": "From Brillat-Savarin to modern slow food: the culinary art as a mirror of ethics, ecology, and cultural identity.",
    "provenance": "D9W Pedagogical Curriculum Team",
    "status": "draft",
    "paragraphs": [
      "Längst hat sich die Gastrosophie von der bloßen Betrachtung lukullischer Gaumenfreuden emanzipiert und zu einer eigenständigen philosophischen Reflexion über Ernährung, Identität und soziale Gerechtigkeit entwickelt.",
      "In einer globalisierten Lebensmittelindustrie, in der Entfremdung von landwirtschaftlicher Urproduktion und industrielle Hochverarbeitung vorherrschen, wird der bewusste Konsum zu einem eminent politischen Akt.",
      "Initiativen wie die Slow-Food-Bewegung fordern nicht bloß kulinarische Raffinesse, sondern ein ganzheitliches Ethos, das Biodiversität, faire Erzeugerpreise und das tradierte handwerkliche Wissen als unschätzbare Kulturgüter bewahrt."
    ],
    "keyVocabulary": [
      {
        "word": "Gastrosophie",
        "baseForm": "Gastrosophie",
        "article": "die",
        "wordType": "noun",
        "level": "C1",
        "contextMeaning": "Philosophical study and culinary theory of food and eating culture.",
        "englishMeaning": "gastrosophy / philosophy of food",
        "exampleSentence": "Gastrosophie verbindet Kochkunst mit Ethik.",
        "exampleTranslation": "Gastrosophy unites culinary arts with ethics."
      }
    ],
    "questions": [
      {
        "id": "q1",
        "type": "true-false",
        "prompt": "Die moderne Gastrosophie versteht den bewussten Lebensmittelkonsum auch als politischen Akt.",
        "statement": "Die moderne Gastrosophie versteht den bewussten Lebensmittelkonsum auch als politischen Akt.",
        "explanation": "Richtig. Bewusster Konsum wird angesichts industrieller Entfremdung zu einem eminent politischen Akt.",
        "correctAnswer": true
      }
    ],
    "wordCount": 74
  }
];
