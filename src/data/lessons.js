export const roadmap = [
  {
    id: 'module-1',
    title: 'Russian Alphabet',
    description: 'Master the Cyrillic alphabet, pronunciation, vowels and consonants with interactive memory aids.',
    lessons: [
      { id: 'letters', title: 'Russian Letters', completed: false },
      { id: 'pronunciation', title: 'Pronunciation', completed: false },
      { id: 'vowels', title: 'Vowels', completed: false },
      { id: 'consonants', title: 'Consonants', completed: false }
    ]
  },
  {
    id: 'module-2',
    title: 'Basic Greetings',
    description: 'Learn greetings, farewells, polite phrases and basic daily conversations.',
    lessons: [
      { id: 'hello', title: 'Hello', completed: false },
      { id: 'goodbye', title: 'Goodbye', completed: false },
      { id: 'thank-you', title: 'Thank You', completed: false },
      { id: 'sorry', title: 'Sorry', completed: false }
    ]
  },
  {
    id: 'module-3',
    title: 'Daily Conversations',
    description: 'Practice introductions, asking questions, shopping, and eating out with real-life dialogs.',
    lessons: [
      { id: 'introducing-yourself', title: 'Introducing Yourself', completed: false },
      { id: 'asking-questions', title: 'Asking Questions', completed: false },
      { id: 'shopping', title: 'Shopping', completed: false },
      { id: 'restaurant', title: 'Restaurant', completed: false }
    ]
  },
  {
    id: 'module-4',
    title: 'Grammar Basics',
    description: 'Build strong grammar foundations with nouns, verbs, adjectives, and sentence structure lessons.',
    lessons: [
      { id: 'nouns', title: 'Nouns', completed: false },
      { id: 'verbs', title: 'Verbs', completed: false },
      { id: 'adjectives', title: 'Adjectives', completed: false },
      { id: 'structure', title: 'Sentence Structure', completed: false }
    ]
  },
  {
    id: 'module-5',
    title: 'Intermediate Russian',
    description: 'Improve travel, directions and business vocabulary for practical conversations.',
    lessons: [
      { id: 'travel', title: 'Travel', completed: false },
      { id: 'directions', title: 'Directions', completed: false },
      { id: 'business', title: 'Business Conversation', completed: false }
    ]
  },
  {
    id: 'module-6',
    title: 'Advanced Russian',
    description: 'Advance with news reading, formal writing, and professional Russian vocabulary.',
    lessons: [
      { id: 'news', title: 'News Reading', completed: false },
      { id: 'formal', title: 'Formal Communication', completed: false },
      { id: 'professional', title: 'Professional Vocabulary', completed: false }
    ]
  }
];

export const wordOfDayList = [
  { word: 'Урок', translation: 'Lesson', transcription: 'u-rok', example: 'Сегодня у меня урок русского.' },
  { word: 'Друзья', translation: 'Friends', transcription: 'dru-zya', example: 'Я встречаюсь с друзьями.' },
  { word: 'Путешествие', translation: 'Travel', transcription: 'pu-te-she-stvi-ye', example: 'Путешествие в Москву увлекательно.' },
  { word: 'Вдохновение', translation: 'Inspiration', transcription: 'vdokh-no-ve-ni-ye', example: 'Русский язык даёт вдохновение.' },
  { word: 'Уверенность', translation: 'Confidence', transcription: 'u-ve-ren-nost', example: 'Практика даёт уверенность.' }
];

export const studyPlanner = [
  { title: 'Alphabet Review', description: 'Spend 15 minutes reviewing letter shapes and pronunciation.', type: 'core' },
  { title: 'Dialog Practice', description: 'Repeat the restaurant dialogue out loud to build fluency.', type: 'speaking' },
  { title: 'Grammar Drill', description: 'Complete an adjective agreement exercise and check your answers.', type: 'grammar' },
  { title: 'Vocabulary Boost', description: 'Learn 10 new travel phrases and use them in a sentence.', type: 'vocabulary' }
];

export const lessonContent = {
  letters: {
    title: 'Russian Letters',
    content: 'The Russian alphabet has 33 letters. Learn the uppercase and lowercase shapes, their phonetic values, and the letters that are unique to Cyrillic.',
    details: 'Start with the vowels: А, Е, Ё, И, О, У, Ы, Э, Ю, Я. Add consonants next and practice the sounds in pairs like Б/П, В/Ф, Г/К.',
    exercises: [
      { type: 'mcq', question: 'Which letter is the Russian vowel A?', options: ['А', 'Б', 'В', 'Г'], answer: 'А' },
      { type: 'fill', question: 'The Russian word for "yes" is ____.', answer: 'да' },
      { type: 'match', question: 'Match Ъ and Ь with their purpose.', answer: 'soft/hard signs' }
    ]
  },
  pronunciation: {
    title: 'Pronunciation',
    content: 'Practice Russian vowel and consonant sounds, paying attention to soft and hard pronunciations.',
    details: 'Focus on the difference between "ы" and "и", and how soft consonants change meaning in words.',
    exercises: [
      { type: 'mcq', question: 'Which sound is closest to the Russian letter "ы"?', options: ['ee', 'oo', 'i', 'uh'], answer: 'uh' },
      { type: 'fill', question: 'The letter "ш" sounds like ____.', answer: 'sh' },
      { type: 'match', question: 'Soft sign (Ь) makes a consonant sound:', answer: 'softer' }
    ]
  },
  vowels: {
    title: 'Vowels',
    content: 'Russian vowels are essential for proper pronunciation. Learn how they sound in stressed and unstressed positions.',
    details: 'Unstressed vowels often reduce in sound. Listen for the difference in words like мама and молоко.',
    exercises: [
      { type: 'mcq', question: 'Which word has the stressed vowel O?', options: ['молоко', 'дело', 'папа', 'комната'], answer: 'молоко' },
      { type: 'fill', question: 'The vowel after "б" in the word "брат" is ____.', answer: 'a' }
    ]
  },
  consonants: {
    title: 'Consonants',
    content: 'Practice Russian consonants, especially the pairs that are hard vs soft and voiced vs unvoiced.',
    details: 'Pairs like б/п, в/ф, г/к, д/т are key. Also practice consonant clusters like ст, шк, and тр.',
    exercises: [
      { type: 'mcq', question: 'Which consonant pair is voiced/unvoiced?', options: ['б/п', 'м/н', 'ш/щ', 'р/л'], answer: 'б/п' },
      { type: 'fill', question: 'The word "кот" begins with the consonant ____.', answer: 'к' }
    ]
  },
  hello: {
    title: 'Hello',
    content: 'Learn common Russian greetings and the difference between formal and informal speech.',
    details: 'Use Привет with friends and Здравствуйте in formal settings.',
    exercises: [
      { type: 'mcq', question: 'How do you say "Hello" informally in Russian?', options: ['Привет', 'Здравствуйте', 'До свидания', 'Спасибо'], answer: 'Привет' },
      { type: 'fill', question: 'Formal "hello" in Russian is ____.', answer: 'Здравствуйте' }
    ]
  },
  goodbye: {
    title: 'Goodbye',
    content: 'Practice different ways to say goodbye and leave conversations politely.',
    details: 'Пока is casual; До свидания is polite and suitable for strangers.',
    exercises: [
      { type: 'mcq', question: 'How do you say "Goodbye" politely?', options: ['Пока', 'Привет', 'До свидания', 'Спасибо'], answer: 'До свидания' },
      { type: 'fill', question: 'The casual goodbye phrase is ____.', answer: 'Пока' }
    ]
  },
  'thank-you': {
    title: 'Thank You',
    content: 'Learn to express gratitude and respond politely in Russian.',
    details: 'Спасибо is used in most cases. Add большое for stronger emphasis: Спасибо большое.',
    exercises: [
      { type: 'mcq', question: 'What does Спасибо mean?', options: ['Sorry', 'Thank you', 'Please', 'Goodbye'], answer: 'Thank you' },
      { type: 'fill', question: 'Say "Thank you very much" in Russian: ____.', answer: 'Спасибо большое' }
    ]
  },
  sorry: {
    title: 'Sorry',
    content: 'Use apologies and polite phrases in everyday conversations.',
    details: 'Извините is polite for apologies. Прости is used with friends or family.',
    exercises: [
      { type: 'mcq', question: 'How do you say "Excuse me"?', options: ['Прости', 'Извините', 'Спасибо', 'Пожалуйста'], answer: 'Извините' },
      { type: 'fill', question: 'The Russian word for "sorry" is ____.', answer: 'прости' }
    ]
  },
  'introducing-yourself': {
    title: 'Introducing Yourself',
    content: 'Learn how to introduce yourself with name, origin, and profession in Russian.',
    details: 'Start with Меня зовут..., then add Я из... and Я работаю... for a complete introduction.',
    exercises: [
      { type: 'mcq', question: 'How do you say "My name is" in Russian?', options: ['Я живу', 'Меня зовут', 'Я иду', 'Мне нравится'], answer: 'Меня зовут' },
      { type: 'fill', question: 'Say "I am from Russia" in Russian: ____.', answer: 'Я из России' }
    ]
  },
  'asking-questions': {
    title: 'Asking Questions',
    content: 'Practice forming simple questions and polite requests in Russian.',
    details: 'Important question words include где, что, кто, когда, почему, как. Practice intonation too.',
    exercises: [
      { type: 'mcq', question: 'What does "где" mean?', options: ['Why', 'How', 'Where', 'What'], answer: 'Where' },
      { type: 'fill', question: 'Translate "What is your name?": ____.', answer: 'Как вас зовут?' }
    ]
  },
  shopping: {
    title: 'Shopping',
    content: 'Learn phrases for buying items, asking prices, and handling currencies in Russian.',
    details: 'Use Сколько стоит? to ask the price, and Я беру это to say you will take it.',
    exercises: [
      { type: 'mcq', question: 'How do you ask "How much is it?"?', options: ['Где это?', 'Сколько стоит?', 'Что это?', 'Кто это?'], answer: 'Сколько стоит?' },
      { type: 'fill', question: 'Say "I will take it" in Russian: ____.', answer: 'Я беру это' }
    ]
  },
  restaurant: {
    title: 'Restaurant',
    content: 'Study useful restaurant phrases for ordering, asking for the bill, and giving compliments.',
    details: 'Use Я хотел бы... for polite requests and Счёт, пожалуйста for the bill.',
    exercises: [
      { type: 'mcq', question: 'What does "Счёт, пожалуйста" mean?', options: ['The menu, please', 'The bill, please', 'The food is delicious', 'I am ready'], answer: 'The bill, please' },
      { type: 'fill', question: 'Order politely: "I would like coffee." = ____.', answer: 'Я хотел бы кофе' }
    ]
  },
  nouns: {
    title: 'Nouns',
    content: 'Learn how Russian nouns change with gender and number.',
    details: 'There are three genders: masculine, feminine, and neuter. The endings help you identify which one to use.',
    exercises: [
      { type: 'mcq', question: 'Which noun is feminine?', options: ['стол', 'машина', 'окно', 'дом'], answer: 'машина' },
      { type: 'fill', question: 'The word for "book" is ____.', answer: 'книга' }
    ]
  },
  verbs: {
    title: 'Verbs',
    content: 'Learn Russian verb conjugation in present tense and common irregular forms.',
    details: 'Practice verbs like говорить, читать, писать and see how endings change for я, ты, он/она.',
    exercises: [
      { type: 'mcq', question: 'Which ending is for "я" in present tense?', options: ['-ешь', '-ет', '-ю', '-ут'], answer: '-ю' },
      { type: 'fill', question: 'I speak = ____.', answer: 'я говорю' }
    ]
  },
  adjectives: {
    title: 'Adjectives',
    content: 'Practice adjective agreement with gender and number in Russian sentences.',
    details: 'Adjectives must agree with nouns they describe. Learn endings like -ый, -ая, -ое.',
    exercises: [
      { type: 'mcq', question: 'The adjective for a big house is:', options: ['большой дом', 'большая дом', 'большое дом'], answer: 'большой дом' },
      { type: 'fill', question: 'Small window = ____.', answer: 'маленькое окно' }
    ]
  },
  structure: {
    title: 'Sentence Structure',
    content: 'Learn how Russian word order works and how to build clear sentences.',
    details: 'Russian allows flexible order, but subject–verb–object is the easiest pattern for learners.',
    exercises: [
      { type: 'mcq', question: 'Choose the correct sentence order:', options: ['Я люблю чай', 'Чай я люблю', 'Люблю я чай'], answer: 'Я люблю чай' },
      { type: 'fill', question: 'Translate: "I read a book" = ____.', answer: 'Я читаю книгу' }
    ]
  },
  travel: {
    title: 'Travel',
    content: 'Learn vocabulary for airports, trains, hotels, and travel planning in Russian.',
    details: 'Key phrases include Я хочу купить билет, Есть ли свободные места, and Где находится вокзал?.',
    exercises: [
      { type: 'mcq', question: 'How do you ask "Where is the station?"?', options: ['Где станция?', 'Где вокзал?', 'Где магазин?', 'Где документ?'], answer: 'Где вокзал?' },
      { type: 'fill', question: 'Say "I need a ticket" in Russian: ____.', answer: 'Мне нужен билет' }
    ]
  },
  directions: {
    title: 'Directions',
    content: 'Practice asking for and giving directions in Russian using landmarks and street names.',
    details: 'Use phrases like Поверните направо, Идите прямо, and Это рядом с... for natural directions.',
    exercises: [
      { type: 'mcq', question: 'How do you say "Turn right"?', options: ['Поверните налево', 'Поверните направо', 'Идите прямо', 'Зайдите',], answer: 'Поверните направо' },
      { type: 'fill', question: 'Go straight = ____.', answer: 'Идите прямо' }
    ]
  },
  business: {
    title: 'Business Conversation',
    content: 'Build your professional Russian with polite introductions, meetings, and email phrases.',
    details: 'Learn useful business expressions like Давайте обсудим, Спасибо за встречу, and Я менеджер по продажам.',
    exercises: [
      { type: 'mcq', question: 'How do you say "Thank you for the meeting"?', options: ['Спасибо за встречу', 'Здравствуйте, я', 'Где встреча', 'Пока'], answer: 'Спасибо за встречу' },
      { type: 'fill', question: 'Business card = ____.', answer: 'визитная карточка' }
    ]
  },
  news: {
    title: 'News Reading',
    content: 'Practice reading current events and news headlines in Russian with comprehension support.',
    details: 'Focus on common news verbs like заявил, сообщил, отметил, and notice how dates and locations are presented.',
    exercises: [
      { type: 'mcq', question: 'Which word often appears in news reports?', options: ['заявил', 'поел', 'спал', 'купил'], answer: 'заявил' },
      { type: 'fill', question: 'Translate "reported" in Russian: ____.', answer: 'сообщил' }
    ]
  },
  formal: {
    title: 'Formal Communication',
    content: 'Learn formal Russian for emails, letters, and business communication.',
    details: 'Use formal openings like Уважаемые господа and closings like С уважением.',
    exercises: [
      { type: 'mcq', question: 'What is a formal closing in a letter?', options: ['С уважением', 'Пока', 'Спасибо', 'Привет'], answer: 'С уважением' },
      { type: 'fill', question: 'Formal "Dear Sir/Madam" = ____.', answer: 'Уважаемые господа' }
    ]
  },
  professional: {
    title: 'Professional Vocabulary',
    content: 'Expand your vocabulary for career-focused conversations in Russian.',
    details: 'Study terms like проект, команда, цель, отчет and verbs like разработать, анализировать, сотрудничать.',
    exercises: [
      { type: 'mcq', question: 'What does "проект" mean?', options: ['Project', 'Problem', 'Product', 'Person'], answer: 'Project' },
      { type: 'fill', question: 'The word for "team" is ____.', answer: 'команда' }
    ]
  }
};
