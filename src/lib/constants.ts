// ─── Contact Information ───

export const CONTACT = {
  name: "D9W German Language Institution",
  address: "New Ellis Nagar, 20th Extension Road, Madurai – 625016",
  phone: "+91-8056657640",
  phoneHref: "tel:+918056657640",
  email: "info@d9wgermanlanguage.com",
  emailHref: "mailto:info@d9wgermanlanguage.com",
  instagram: "https://www.instagram.com/d9wgermanlanguage/",
  mapUrl:
    "https://www.google.com/maps/search/New+Ellis+Nagar+20th+Extension+Road+Madurai+625016",
  mapEmbed:
    "https://www.google.com/maps?q=New+Ellis+Nagar+20th+Extension+Road+Madurai+625016&output=embed",
} as const;

// ─── Navigation ───

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "German Courses", href: "#courses" },
  { label: "Why D9W", href: "#why-d9w" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Course Levels ───

export interface CourseLevel {
  level: string;
  title: string;
  description: string;
}

export const COURSE_LEVELS: CourseLevel[] = [
  {
    level: "A1",
    title: "Beginner",
    description:
      "Understand and use familiar, everyday expressions and very simple sentences related to concrete needs. Introduce yourself and others, ask and answer basic personal questions, and communicate simply if the other person speaks slowly and is willing to help.",
  },
  {
    level: "A2",
    title: "Elementary",
    description:
      "Understand sentences and frequently used expressions about immediate personal relevance — family, shopping, work, local surroundings. Communicate in simple, routine tasks and describe your background, education, and immediate needs in simple terms.",
  },
  {
    level: "B1",
    title: "Intermediate",
    description:
      "Understand the main points of clear, standard input on familiar topics — work, school, leisure. Handle most travel situations, express opinions and experiences, and give short justifications or explanations for plans and views.",
  },
  {
    level: "B2",
    title: "Upper Intermediate",
    description:
      "Understand the main content of complex text on concrete and abstract topics, including discussions in your own specialty. Converse fluently and spontaneously with native speakers, and explain a viewpoint on a current issue with pros and cons.",
  },
  {
    level: "C1",
    title: "Advanced",
    description:
      "Understand a wide range of demanding texts and recognise implicit meaning. Express ideas fluently and spontaneously, use the language effectively in social, academic, and professional life, and produce clear, well-structured, detailed text on complex subjects.",
  },
  {
    level: "C2",
    title: "Mastery",
    description:
      "Effortlessly understand virtually everything read or heard. Summarise information from multiple written and spoken sources coherently. Express yourself spontaneously, with high precision and fine shades of meaning, even on complex topics.",
  },
];

// ─── Testimonials ───

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string | null;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Leena Devi Balan Ravi",
    role: "Student",
    location: "Lives in Germany",
    rating: 4.5,
    quote:
      "Nisha's classes are consistently great. Her unique teaching style pushes you to converse in German. Her professionalism, patience, and cultural knowledge have improved my speaking, reading, writing, verb tenses, vocabulary, and everyday conversational comfort in German.",
  },
  {
    name: "Saravana Kumar",
    role: "Student",
    location: "Lives in Germany",
    rating: 4.5,
    quote:
      "Nisha's individualised approach expands your vocabulary with multiple ways to express the same idea. She corrects pronunciation and mistakes carefully, sends grammar and audio study materials, and is positive and easy to learn from.",
  },
  {
    name: "Nagaraja Prabhu",
    role: "Volkswagen",
    location: "Lives in Germany",
    rating: 5,
    quote:
      "Nisha teaches with the goal of genuinely building student knowledge. D9W is the best German institute I found in Madurai after comparing others. She puts in extra effort to help students speak fluently.",
  },
  {
    name: "Kaarthick",
    role: "Software Engineer",
    location: "Bangalore",
    rating: 4.5,
    quote:
      "I travelled to Madurai from Coimbatore and Trichy to study with Nisha after hearing how comfortable her students were with her. I stayed locally during the course and completed A1 in about one month, thanks to her own grammar teaching approach.",
  },
  {
    name: "Anish Kumar",
    role: "Student",
    location: "Lives in Germany",
    rating: 5,
    quote: null,
  },
];

// ─── FAQs ───

export interface FAQ {
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    question: "What can you expect when learning German with D9W?",
    answer:
      "A free insight into the offline or online course and D9W's learning platform, so you can experience the format before committing.",
  },
  {
    question: "Is the D9W course right for me?",
    answer:
      "The course is primarily designed for college and school students aged 15 and above who want to study and work in Germany. Good progress requires roughly eight hours of study per week and strong self-organisation, since much of the work is independent on the learning platform.",
  },
  {
    question: "What do I need to do a course at D9W?",
    answer:
      "Register on the website, then book an available slot and pay for your chosen course.",
  },
  {
    question: "Do I have to apply to take a course at D9W?",
    answer:
      "No. A course can be booked at any time via the website — no formal application is needed.",
  },
  {
    question: "How many hours per week should I plan?",
    answer:
      "Around eight hours per week, scheduled at your own pace on the learning platform.",
  },
  {
    question: "When will I get a Goethe Certificate?",
    answer:
      "Your tutor evaluates your learning progress at the end of the course. With regular, successful participation, the tutor will recommend sitting the Goethe exam.",
  },
  {
    question: "When can I start the D9W Germany Course?",
    answer: "Any time, from anywhere.",
  },
  {
    question: "What do the course levels mean?",
    answer:
      "All D9W courses follow the Common European Framework of Reference for Languages (CEFR). Prior knowledge and course levels are stated using CEFR levels, from A1 (beginner) through C2 (mastery).",
  },
];

// ─── Learning Formats ───

export interface LearningFormat {
  name: string;
  description: string;
}

export const LEARNING_FORMATS: LearningFormat[] = [
  {
    name: "Offline",
    description:
      "In-person classes at our Madurai centre with hands-on guidance from experienced tutors.",
  },
  {
    name: "Online",
    description:
      "Live sessions from anywhere, with the same personalised attention as in-person learning.",
  },
  {
    name: "Intensive",
    description:
      "Accelerated programmes designed for faster progress when time is of the essence.",
  },
  {
    name: "Interactive",
    description:
      "Engaging sessions focused on conversation, practice, and real-world language use.",
  },
];

// ─── Why D9W reasons ───

export const WHY_D9W_REASONS = [
  {
    number: "01",
    title: "Study & work in Germany",
    description:
      "D9W prepares students at any starting level — none, basic, or advanced — specifically and continuously for study or work in Germany.",
  },
  {
    number: "02",
    title: "Goethe exam preparation",
    description:
      "Structured preparation for Goethe Institut examinations and TestDaF, with guidance from tutors who understand the exam format inside out.",
  },
  {
    number: "03",
    title: "All four language skills",
    description:
      "Practice covers Listening, Speaking, Reading, and Writing — building well-rounded fluency, not just textbook knowledge.",
  },
  {
    number: "04",
    title: "Experienced, individual support",
    description:
      "D9W tutors are experienced and support each learner individually, adapting the pace and focus to your needs.",
  },
  {
    number: "05",
    title: "Learn independently or supplement",
    description:
      "Learn German at your own pace on the platform, or use D9W to strengthen and accelerate an existing language course.",
  },
  {
    number: "06",
    title: "A global community of learners",
    description:
      "Over 1,000 learners from around the world have learned with D9W — join a growing community working toward the same goal.",
  },
] as const;
