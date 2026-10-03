/**
 * Curriculum Data: "MORE ENGLISH MORE LOVE"
 * Unit 2: Family & Foundations
 * Supervised by Teacher Jaidaa Saqr (المعلمة جيداء صقر)
 */

export interface ReadingPassage {
  title: string;
  authorNote: string;
  text: string;
  translation: string;
  audioText: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  arabicPrompt?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface OddOneOutQuestion {
  id: string;
  words: string[];
  oddWord: string;
  reason: string;
}

export interface RiddleQuestion {
  id: string;
  riddle: string;
  arabicHint: string;
  answer: string;
  alternatives?: string[];
  explanation: string;
}

export interface PluralRule {
  singular: string;
  plural: string;
  arabic: string;
  rule: string;
}

export interface WorksheetData {
  id: number;
  title: string;
  subtitle: string;
  pageRef: string;
  description: string;
  tasks: {
    instructions: string;
    instructionsAr: string;
    type: "choice" | "text" | "fill" | "table" | "true_false";
    items: {
      id: string;
      prompt: string;
      promptAr?: string;
      options?: string[];
      correctAnswer: string;
      userAnswerPlaceholder?: string;
      teacherNote?: string;
    }[];
  }[];
}

export const UNIT_2_READING: ReadingPassage = {
  title: "My Mother",
  authorNote: "Unit 2 · Family · Page 8",
  text: `My mother is 38 years old. She is kind and beautiful. She has got short brown hair. She works as a teacher in a school. She cooks very well. She does all the housework. She often helps me do my homework. She sometimes plays with me. She loves my brother and me very much. I love my mother, she is the best.`,
  translation: `أمي تبلغ من العمر 38 عاماً. إنها لطيفة وجميلة. لديها شعر بني قصير. تعمل كمعلمة في مدرسة. تطبخ بشكل جيد جداً. تقوم بجميع الأعمال المنزلية. غالباً ما تساعدني في أداء واجباتي المدرسية. وأحياناً تلعب معي. تحب أخي وأنا كثيراً جداً. أنا أحب أمي، إنها الأفضل دائماً.`,
  audioText: `My mother is 38 years old. She is kind and beautiful. She has got short brown hair. She works as a teacher in a school. She cooks very well. She does all the housework. She often helps me do my homework. She sometimes plays with me. She loves my brother and me very much. I love my mother, she is the best.`
};

export const JOHN_STORY: ReadingPassage = {
  title: "Meet John & His Lovely Family",
  authorNote: "Unit 2 · Family · Page 10",
  text: `Hello! My name is John. I am ten years old and I am from Canada. I am going to introduce my lovely family to you. It is quite big and we are very happy. My mother's name is Liza and my father's name is Peter. My mother has got black hair and she is very kind. My father is tall and he is a very funny person. My parents have got two children: my baby sister Laura and me. Laura is only one-year-old. My father has got a sister. Her name is Olivia. She is my aunt. My mother has got a brother. His name is Richard. He is my uncle. My grandparents are Kevin and Carla. We've got two pets, a cat called Lucy and a dog called Puppy. He is my favourite!`,
  translation: `مرحباً! اسمي جون. عمري عشر سنوات وأنا من كندا. سأعرفكم على عائلتي اللطيفة. إنها عائلة كبيرة نوعاً ما ونحن سعداء جداً. اسم أمي ليزا واسم والدي بيتر. أمي تمتلك شعراً أسود وهي لطيفة جداً. والدي طويل القامة وهو شخص مرح ومضحك جداً. والداي لديهما طفلان: أختي الصغيرة لورا وأنا. لورا عمرها سنة واحدة فقط. والدي لديه أخت اسمها أوليفيا وهي عمتي. وأمي لديها أخ اسمه ريتشارد وهو خالي. وجداي هما كيفن وكارلا. لدينا حيوانان أليفان: قطة اسمها لوسي وكلب اسمه بابي، وهو المفضل لدي!`,
  audioText: `Hello! My name is John. I am ten years old and I am from Canada. I am going to introduce my lovely family to you. It is quite big and we are very happy. My mother's name is Liza and my father's name is Peter. My mother has got black hair and she is very kind. My father is tall and he is a very funny person. My parents have got two children. My baby sister Laura and me. Laura is only one-year-old. My father has got a sister. Her name is Olivia. She is my aunt. My mother has got a brother. His name is Richard. He is my uncle. My grandparents are Kevin and Carla. We have got two pets, a cat called Lucy and a dog called Puppy. He is my favourite!`
};

export const CHOOSE_CORRECT_PAGE8: QuizQuestion[] = [
  {
    id: "p8_q1",
    question: "1. My mother (is / are) 38 years old.",
    arabicPrompt: "أمي (تكون) في سن 38 عاماً",
    options: ["is", "are"],
    correctAnswer: "is",
    explanation: "نستخدم 'is' لأن الفاعل مفرد (My mother = She)."
  },
  {
    id: "p8_q2",
    question: "2. She (have / has) got short hair.",
    arabicPrompt: "هي تمتلك شعراً قصيراً",
    options: ["have", "has"],
    correctAnswer: "has",
    explanation: "مع الضمائر المفردة He / She / It نستخدم 'has got'."
  },
  {
    id: "p8_q3",
    question: "3. She (work / works) as a teacher.",
    arabicPrompt: "هي تعمل كمعلمة",
    options: ["work", "works"],
    correctAnswer: "works",
    explanation: "في زمن الحاضر البسيط نضيف 's' المفرد للفعل مع She."
  },
  {
    id: "p8_q4",
    question: "4. She can (cook / cooks) very well.",
    arabicPrompt: "هي تستطيع الطبخ بمهارة",
    options: ["cook", "cooks"],
    correctAnswer: "cook",
    explanation: "بعد الفعل المساعد 'can' يأتي الفعل بالمصدر المجرد دون أي إضافة."
  },
  {
    id: "p8_q5",
    question: "5. She loves my brother and (me / my).",
    arabicPrompt: "هي تحب أخي وأنا (مفعول به)",
    options: ["me", "my"],
    correctAnswer: "me",
    explanation: "'me' ضمير مفعول به يقع عليه فعل الحب، بينما 'my' صفة ملكية تحتاج اسماً بعدها."
  }
];

export const ODD_ONE_OUT_PAGE8: OddOneOutQuestion[] = [
  {
    id: "odd_1",
    words: ["women", "men", "children", "girl"],
    oddWord: "girl",
    reason: "كلمة girl مفرد، بينما الكلمات الثلاث الأخرى كلها صيغ جمع شاذ (women / men / children)."
  },
  {
    id: "odd_2",
    words: ["niece", "nephew", "friend", "cousin"],
    oddWord: "friend",
    reason: "كلمة friend تعني صديق، بينما باقي الكلمات هي أفراد وقرابات في العائلة."
  },
  {
    id: "odd_3",
    words: ["mother", "son", "daughter", "granddaughter"],
    oddWord: "son",
    reason: "كلمة son تشير للمذكر (ابن)، بينما باقي الكلمات إناث (أم، ابنة، حفيدة)."
  },
  {
    id: "odd_4",
    words: ["brother", "grandfather", "sister", "uncle"],
    oddWord: "sister",
    reason: "كلمة sister مؤنث (أخت)، بينما باقي الكلمات ذكور (أخ، جد، عم/خال)."
  }
];

export const GUESS_WHO_RIDDLES: RiddleQuestion[] = [
  {
    id: "r1",
    riddle: "1. My mother has a baby girl. She is her ...",
    arabicHint: "أمي أنجبت طفلة رضيعة، هي بالنسبة لها...",
    answer: "daughter",
    alternatives: ["daughter", "her daughter"],
    explanation: "ابنة الأم هي daughter بالنسبة للأم، وأخت بالنسبة للمتكلم."
  },
  {
    id: "r2",
    riddle: "2. My son calls me ...",
    arabicHint: "ابني يناديني...",
    answer: "father",
    alternatives: ["father", "mother", "dad", "mum"],
    explanation: "الابن ينادي والديه father (أبي) أو mother (أمي)."
  },
  {
    id: "r3",
    riddle: "3. My mother is my father's ...",
    arabicHint: "أمي بالنسبة لأبي هي...",
    answer: "wife",
    alternatives: ["wife"],
    explanation: "الأم هي زوجة الأب (wife)."
  },
  {
    id: "r4",
    riddle: "4. My father is my mother's ...",
    arabicHint: "أبي بالنسبة لأمي هو...",
    answer: "husband",
    alternatives: ["husband"],
    explanation: "الأب هو زوج الأم (husband)."
  },
  {
    id: "r5",
    riddle: "5. My father has got one sister. She is my ...",
    arabicHint: "أخت الأب هي...",
    answer: "aunt",
    alternatives: ["aunt"],
    explanation: "أخت الأب أو الأم تسمى في الإنجليزية aunt (عمة أو خالة)."
  },
  {
    id: "r6",
    riddle: "6. My mother has got a brother. He's my ...",
    arabicHint: "أخ الأم هو...",
    answer: "uncle",
    alternatives: ["uncle"],
    explanation: "أخ الأب أو الأم يسمى في الإنجليزية uncle (عم أو خال)."
  },
  {
    id: "r7",
    riddle: "7. My grandfather is married to my ...",
    arabicHint: "جدي متزوج من...",
    answer: "grandmother",
    alternatives: ["grandmother", "grandma"],
    explanation: "الجد متزوج من الجدة (grandmother)."
  },
  {
    id: "r8",
    riddle: "8. My grandparents call me their ...",
    arabicHint: "الأجداد ينادونني...",
    answer: "grandchild",
    alternatives: ["grandchild", "grandson", "granddaughter"],
    explanation: "ينادون الحفيد grandchild (أو grandson للحفيد الذكر، granddaughter للحفيدة)."
  },
  {
    id: "r9_a",
    riddle: "9a. My sister has two children, a boy and a girl. Her son is my ...",
    arabicHint: "ابن الأخت هو...",
    answer: "nephew",
    alternatives: ["nephew"],
    explanation: "ابن الأخ أو الأخت هو nephew."
  },
  {
    id: "r9_b",
    riddle: "9b. Her daughter is my ...",
    arabicHint: "ابنة الأخت هي...",
    answer: "niece",
    alternatives: ["niece"],
    explanation: "ابنة الأخ أو الأخت هي niece."
  },
  {
    id: "r10",
    riddle: "10. My uncle and aunt's children are my ...",
    arabicHint: "أولاد العم أو العمة هم...",
    answer: "cousins",
    alternatives: ["cousins", "cousin"],
    explanation: "أبناء العم أو الخال يطلق عليهم دائماً cousins."
  }
];

export const IRREGULAR_PLURALS: PluralRule[] = [
  { singular: "man", plural: "men", arabic: "رجل -> رجال", rule: "تحويل الحرف a إلى e" },
  { singular: "woman", plural: "women", arabic: "امرأة -> نساء", rule: "تحويل an إلى en والنطق /wɪmɪn/" },
  { singular: "child", plural: "children", arabic: "طفل -> أطفال", rule: "إضافة ren لتحويلها للجمع" },
  { singular: "wife", plural: "wives", arabic: "زوجة -> زوجات", rule: "قلب fe إلى ves" },
  { singular: "person", plural: "people", arabic: "شخص -> ناس / أشخاص", rule: "جمع شاذ تماماً يتغير جذر الكلمة" },
  { singular: "family", plural: "families", arabic: "عائلة -> عائلات", rule: "قلب y المسبوق بحرف ساكن إلى ies" }
];

export const VOCABULARY_LIST = [
  { male: "father", female: "mother", plural: "parents", arabic: "أب / أم / والدين" },
  { male: "son", female: "daughter", plural: "children", arabic: "ابن / ابنة / أطفال" },
  { male: "brother", female: "sister", plural: "siblings", arabic: "أخ / أخت / إخوة" },
  { male: "uncle", female: "aunt", plural: "uncles and aunts", arabic: "عم-خال / عمة-خالة" },
  { male: "nephew", female: "niece", plural: "nephews and nieces", arabic: "ابن الأخ-الأخت / ابنة الأخ-الأخت" },
  { male: "grandfather", female: "grandmother", plural: "grandparents", arabic: "جد / جدة / أجداد" },
  { male: "grandson", female: "granddaughter", plural: "grandchildren", arabic: "حفيد / حفيدة / أحفاد" },
  { male: "husband", female: "wife", plural: "couples", arabic: "زوج / زوجة" },
  { male: "cousin (m)", female: "cousin (f)", plural: "cousins", arabic: "ابن/ابنة العم والخال" },
];

export const POSSESSIVE_EXERCISES = [
  {
    id: "pos_1",
    base: "I forget my books in (my aunt / house).",
    answer: "my aunt's house",
    rule: "مفرد ينتهي بغير s -> نضيف 's"
  },
  {
    id: "pos_2",
    base: "(Women / bags) are made of leather.",
    answer: "Women's bags",
    rule: "جمع شاذ لا ينتهي بـ s -> نضيف 's"
  },
  {
    id: "pos_3",
    base: "(Hani / shoes) are black.",
    answer: "Hani's shoes",
    rule: "اسم علم مفرد -> نضيف 's"
  },
  {
    id: "pos_4",
    base: "(Giraffes / necks) are very long.",
    answer: "Giraffes' necks",
    rule: "جمع نظامي ينتهي بـ s -> نكتفي بفاصلة عليا فقط بعد الـ s (' )"
  },
  {
    id: "pos_5",
    base: "The (pupils / uniform) is blue.",
    answer: "pupils' uniform",
    rule: "جمع ينتهي بـ s -> نضع الفاصلة العليا بعد حرف الـ s"
  }
];

export const PHONETICS_PAIRS = [
  { sound: "/ɑː/", words: ["father", "aunt", "car", "fast"], tip: "صوت الآ المفخمة والممدودة من الحلق كما في father و aunt" },
  { sound: "/iː/", words: ["niece", "piece", "teacher", "meet"], tip: "صوت الإي الممدودة الصريحة كما في niece و piece" }
];

export const DIALOGUE_SAMPLES = [
  {
    speaker: "Teacher Jaidaa",
    textEn: "Tell me about your family!",
    textAr: "حدثني عن عائلتك!"
  },
  {
    speaker: "Student",
    textEn: "I come from a small family. I've got one brother and one sister.",
    textAr: "أنا من عائلة صغيرة. لدي أخ واحد وأخت واحدة."
  },
  {
    speaker: "Teacher Jaidaa",
    textEn: "How many brothers and sisters have you got?",
    textAr: "كم أخاً وأختاً لديك؟"
  },
  {
    speaker: "Student",
    textEn: "I am an only child. I haven't got any brothers or sisters.",
    textAr: "أنا وحيد والديّ. ليس لدي أي إخوة أو أخوات."
  }
];

/**
 * 7 Comprehensive Curriculum Worksheets with Model Answers (أوراق عمل المنهاج والحلول النموذجية)
 */
export const CURRICULUM_WORKSHEETS: WorksheetData[] = [
  {
    id: 1,
    title: "ورقة العمل 1: قراءة وفهم نص My Mother وقواعد الأفعال",
    subtitle: "Worksheet 1 · Unit 2 · Page 8",
    pageRef: "الكتاب المدرسي - صفحة 8",
    description: "اختبار مهارات استيعاب النص وقواعد المضارع البسيط والضمائر مع الأفعال (is/are, have/has, can cook).",
    tasks: [
      {
        instructions: "Choose the correct word between brackets:",
        instructionsAr: "اختر الكلمة الصحيحة بين القوسين بناءً على فهمك لقواعد النص:",
        type: "choice",
        items: [
          {
            id: "ws1_1",
            prompt: "1. My mother (is / are) 38 years old.",
            options: ["is", "are"],
            correctAnswer: "is",
            teacherNote: "نستخدم is مع الفاعل المفرد الغائب (She / My mother)."
          },
          {
            id: "ws1_2",
            prompt: "2. She (have / has) got short brown hair.",
            options: ["have", "has"],
            correctAnswer: "has",
            teacherNote: "القاعدة: She + has got للملكية مع المفرد."
          },
          {
            id: "ws1_3",
            prompt: "3. She (work / works) as a teacher in a school.",
            options: ["work", "works"],
            correctAnswer: "works",
            teacherNote: "نضيف s الشخص الثالث للفعل work ليصبح works مع الضمير She."
          },
          {
            id: "ws1_4",
            prompt: "4. She can (cook / cooks) very well.",
            options: ["cook", "cooks"],
            correctAnswer: "cook",
            teacherNote: "بعد فعل القدرة can يأتي الفعل مجرداً دائماً بدون أي إضافة."
          },
          {
            id: "ws1_5",
            prompt: "5. She loves my brother and (me / my).",
            options: ["me", "my"],
            correctAnswer: "me",
            teacherNote: "ضمير المفعول به me هو الصحيح في موقع المفعول به."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "ورقة العمل 2: الكلمة الشاذة ومخطط شجرة العائلة",
    subtitle: "Worksheet 2 · Unit 2 · Page 8",
    pageRef: "الكتاب المدرسي - صفحة 8",
    description: "تحديد الكلمة الغريبة بناءً على نوع الجمع أو الجنس وتعبئة مخطط عائلة Henry و Anaïs.",
    tasks: [
      {
        instructions: "Cross the odd word out and explain why:",
        instructionsAr: "اختر الكلمة الشاذة والغريبة من كل مجموعة:",
        type: "choice",
        items: [
          {
            id: "ws2_1",
            prompt: "1. women / men / children / girl",
            options: ["women", "men", "children", "girl"],
            correctAnswer: "girl",
            teacherNote: "السبب: girl مفرد، بينما الكلمات الأخرى كلها صيغ جمع شاذة."
          },
          {
            id: "ws2_2",
            prompt: "2. niece / nephew / friend / cousin",
            options: ["niece", "nephew", "friend", "cousin"],
            correctAnswer: "friend",
            teacherNote: "السبب: friend (صديق) ليس من أفراد العائلة والقرابة."
          },
          {
            id: "ws2_3",
            prompt: "3. mother / son / daughter / granddaughter",
            options: ["mother", "son", "daughter", "granddaughter"],
            correctAnswer: "son",
            teacherNote: "السبب: son مذكر (ابن)، وباقي الكلمات تدل على مؤنث."
          },
          {
            id: "ws2_4",
            prompt: "4. brother / grandfather / sister / uncle",
            options: ["brother", "grandfather", "sister", "uncle"],
            correctAnswer: "sister",
            teacherNote: "السبب: sister مؤنث (أخت)، وباقي الكلمات تدل على ذكور."
          }
        ]
      },
      {
        instructions: "Complete the family diagram labels for Henry's family:",
        instructionsAr: "أكمل تصنيف أسماء العائلة في المخطط:",
        type: "fill",
        items: [
          {
            id: "ws2_diag_1",
            prompt: "Henry is the ...",
            correctAnswer: "Husband",
            userAnswerPlaceholder: "Husband / Father",
            teacherNote: "Henry هو الأب والزوج في المخطط."
          },
          {
            id: "ws2_diag_2",
            prompt: "Anaïs is the ...",
            correctAnswer: "Mother",
            userAnswerPlaceholder: "Mother / Wife",
            teacherNote: "Anaïs هي الأم والزوجة."
          },
          {
            id: "ws2_diag_3",
            prompt: "Robin is the ...",
            correctAnswer: "Brother",
            userAnswerPlaceholder: "Brother / Son",
            teacherNote: "Robin هو الابن والأخ لـ Elsa."
          },
          {
            id: "ws2_diag_4",
            prompt: "Elsa is the ...",
            correctAnswer: "Daughter",
            userAnswerPlaceholder: "Daughter / Sister",
            teacherNote: "Elsa هي الابنة والأخت الصغرى."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "ورقة العمل 3: فوازير العائلة Guess Who وقواعد الجموع الشاذة",
    subtitle: "Worksheet 3 · Unit 2 · Page 9",
    pageRef: "الكتاب المدرسي - صفحة 9",
    description: "حل ألغاز القرابات العائلية العشر وكتابة الجمع الشاذ للأسماء الأساسية.",
    tasks: [
      {
        instructions: "Guess who? Write the correct family member:",
        instructionsAr: "احزر صلة القرابة واكتب الكلمة الإنجليزية المناسبة:",
        type: "fill",
        items: [
          {
            id: "ws3_g1",
            prompt: "1. My mother has a baby girl. She is her ...",
            correctAnswer: "daughter",
            userAnswerPlaceholder: "e.g. daughter",
            teacherNote: "ابنة الأم بالنسبة للأم هي daughter."
          },
          {
            id: "ws3_g2",
            prompt: "2. My mother is my father's ...",
            correctAnswer: "wife",
            userAnswerPlaceholder: "e.g. wife",
            teacherNote: "الأم هي زوجة الأب (wife)."
          },
          {
            id: "ws3_g3",
            prompt: "3. My father has got one sister. She is my ...",
            correctAnswer: "aunt",
            userAnswerPlaceholder: "e.g. aunt",
            teacherNote: "أخت الأب هي العمة (aunt)."
          },
          {
            id: "ws3_g4",
            prompt: "4. My mother has got a brother. He's my ...",
            correctAnswer: "uncle",
            userAnswerPlaceholder: "e.g. uncle",
            teacherNote: "أخ الأم هو الخال (uncle)."
          },
          {
            id: "ws3_g5",
            prompt: "5. My sister's son is my ... and her daughter is my ...",
            correctAnswer: "nephew and niece",
            userAnswerPlaceholder: "e.g. nephew and niece",
            teacherNote: "ابن الأخت nephew، وابنة الأخت niece."
          }
        ]
      },
      {
        instructions: "Write the plural of these irregular nouns:",
        instructionsAr: "اكتب صيغة الجمع الصحيحة لهذه الأسماء:",
        type: "fill",
        items: [
          { id: "pl_1", prompt: "man -> ", correctAnswer: "men", teacherNote: "جمع شاذ: men" },
          { id: "pl_2", prompt: "woman -> ", correctAnswer: "women", teacherNote: "جمع شاذ: women" },
          { id: "pl_3", prompt: "child -> ", correctAnswer: "children", teacherNote: "جمع شاذ: children" },
          { id: "pl_4", prompt: "wife -> ", correctAnswer: "wives", teacherNote: "جمع شاذ: wives (قلب fe إلى ves)" },
          { id: "pl_5", prompt: "person -> ", correctAnswer: "people", teacherNote: "جمع شاذ: people" },
          { id: "pl_6", prompt: "family -> ", correctAnswer: "families", teacherNote: "جمع: families (قلب y إلى ies)" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "ورقة العمل 4: استماع ومطابقة عائلة Nina ونطق الأصوات",
    subtitle: "Worksheet 4 · Unit 2 · Page 9 (Activity)",
    pageRef: "كتاب النشاط - صفحة 9",
    description: "مطابقة أسماء الأشخاص بصلات القرابة في عائلة نينا وتدريب نطق الأصوات /ɑː/ و /iː/.",
    tasks: [
      {
        instructions: "Listen again and match the family roles:",
        instructionsAr: "طابق بين أفراد عائلة نينا وصفات قرابتهم:",
        type: "choice",
        items: [
          {
            id: "ws4_m1",
            prompt: "a. Sue is Nina's ...",
            options: ["mother", "grandparents", "brother", "husband", "son"],
            correctAnswer: "mother",
            teacherNote: "Sue هي والدة Nina."
          },
          {
            id: "ws4_m2",
            prompt: "b. Ben is Clark's ...",
            options: ["brother", "mother", "grandparents", "husband", "son"],
            correctAnswer: "brother",
            teacherNote: "Ben هو شقيق Clark."
          },
          {
            id: "ws4_m3",
            prompt: "c. John and Lucy are Nina's ...",
            options: ["grandparents", "mother", "brother", "husband", "son"],
            correctAnswer: "grandparents",
            teacherNote: "John و Lucy هما الجدان لـ Nina."
          },
          {
            id: "ws4_m4",
            prompt: "d. Clark is Sue's ...",
            options: ["husband", "mother", "brother", "grandparents", "son"],
            correctAnswer: "husband",
            teacherNote: "Clark هو زوج Sue."
          }
        ]
      },
      {
        instructions: "Phonetics Classification (/ɑː/ vs /iː/):",
        instructionsAr: "صنف الكلمات التالية حسب الصوت الصوتي السائد فيها:",
        type: "choice",
        items: [
          {
            id: "ph_1",
            prompt: "The word 'father' contains the sound:",
            options: ["/ɑː/ as in father, aunt", "/iː/ as in niece, piece"],
            correctAnswer: "/ɑː/ as in father, aunt",
            teacherNote: "الصوت /ɑː/ مفخم وممدود."
          },
          {
            id: "ph_2",
            prompt: "The word 'niece' contains the sound:",
            options: ["/iː/ as in niece, piece", "/ɑː/ as in father, aunt"],
            correctAnswer: "/iː/ as in niece, piece",
            teacherNote: "الصوت /iː/ إي ممدودة صريحة."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "ورقة العمل 5: الملكية وأغراض Molly و Fred",
    subtitle: "Worksheet 5 · Unit 2 · Page 10",
    pageRef: "الكتاب المدرسي - صفحة 10",
    description: "صياغة جمل الملكية ('s) لأغراض Molly و Fred وتصحيح الفاصلة العليا في الجمل.",
    tasks: [
      {
        instructions: "Look at the items and write possessive phrases:",
        instructionsAr: "اختر الصياغة الصحيحة للتعبير عن ملكية أغراض مولي وفريد:",
        type: "choice",
        items: [
          {
            id: "mf_1",
            prompt: "Molly has got a doll. We say:",
            options: ["Molly's doll", "Molly doll's", "Mollys doll"],
            correctAnswer: "Molly's doll",
            teacherNote: "نضع 's بعد اسم المالك Molly."
          },
          {
            id: "mf_2",
            prompt: "Fred has got a skateboard. We say:",
            options: ["Fred's skateboard", "Fred skateboard's", "Freds' skateboard"],
            correctAnswer: "Fred's skateboard",
            teacherNote: "نضع 's بعد اسم Fred."
          },
          {
            id: "mf_3",
            prompt: "Write ('s or '): The pupils (...) uniform is blue.",
            options: ["pupils'", "pupil's", "pupilss'"],
            correctAnswer: "pupils'",
            teacherNote: "لأن pupils جمع ينتهي بـ s نكتفي بفاصلة عليا فقط بعد الـ s."
          },
          {
            id: "mf_4",
            prompt: "Write ('s or '): My friend (...) pet is a golden fish.",
            options: ["friend's", "friends'", "friends"],
            correctAnswer: "friend's",
            teacherNote: "friend مفرد ينتهي بحرف d، لذلك نضيف 's."
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "ورقة العمل 6: قصة John From Canada واستيعاب القرابات",
    subtitle: "Worksheet 6 · Unit 2 · Page 10 (Activity)",
    pageRef: "كتاب النشاط - صفحة 10",
    description: "قراءة نص جون من كندا، والتحقق من صحة العبارات (صح أم خطأ) وتحديد أسماء أفراد العائلة.",
    tasks: [
      {
        instructions: "Read the story of John and mark True (T) or False (F):",
        instructionsAr: "اقرأ نص جون وضع علامة صح (True) أو خطأ (False):",
        type: "true_false",
        items: [
          {
            id: "j_tf1",
            prompt: "1. Carla is Kevin's wife.",
            correctAnswer: "True",
            teacherNote: "صحيح، النص يذكر: My grandparents are Kevin and Carla."
          },
          {
            id: "j_tf2",
            prompt: "2. Laura is Olivia's sister.",
            correctAnswer: "False",
            teacherNote: "خطأ، Laura هي ابنة أخيها (niece) وليست أختها."
          },
          {
            id: "j_tf3",
            prompt: "3. Liza and Peter are John's parents.",
            correctAnswer: "True",
            teacherNote: "صحيح، Liza هي الأم و Peter هو الأب."
          },
          {
            id: "j_tf4",
            prompt: "4. Richard is Laura's uncle.",
            correctAnswer: "True",
            teacherNote: "صحيح، Richard هو أخ الأم Liza، فهو خال Laura وجون."
          },
          {
            id: "j_tf5",
            prompt: "5. John's cat is called Puppy.",
            correctAnswer: "False",
            teacherNote: "خطأ، الكلب هو Puppy بينما القطة اسمها Lucy."
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "ورقة العمل 7: قواعد الملكية الشاملة وجدول التصنيف العائلي",
    subtitle: "Worksheet 7 · Unit 2 · Page 11 (Activity)",
    pageRef: "كتاب النشاط - صفحة 11",
    description: "قاعدة Let's Learn لإضافة 's أو ' وجدول تصنيف القرابات (مذكر / مؤنث / جمع) وإكمال الملف الشخصي.",
    tasks: [
      {
        instructions: "Complete sentences using the correct possessive form:",
        instructionsAr: "أكمل الجمل باستخدام صيغة الملكية الصحيحة ('s أو '):",
        type: "fill",
        items: [
          {
            id: "ws7_1",
            prompt: "1. I forget my books in (my aunt / house) ->",
            correctAnswer: "my aunt's house",
            userAnswerPlaceholder: "my aunt's house",
            teacherNote: "مفرد: my aunt's house"
          },
          {
            id: "ws7_2",
            prompt: "2. (Women / bags) are made of leather ->",
            correctAnswer: "Women's bags",
            userAnswerPlaceholder: "Women's bags",
            teacherNote: "جمع شاذ لا ينتهي بـ s: Women's bags"
          },
          {
            id: "ws7_3",
            prompt: "3. (Hani / shoes) are black ->",
            correctAnswer: "Hani's shoes",
            userAnswerPlaceholder: "Hani's shoes",
            teacherNote: "اسم علم: Hani's shoes"
          },
          {
            id: "ws7_4",
            prompt: "4. (Giraffes / necks) are very long ->",
            correctAnswer: "Giraffes' necks",
            userAnswerPlaceholder: "Giraffes' necks",
            teacherNote: "جمع نظامي ينتهي بـ s: Giraffes' necks (فاصلة بعد s فقط)"
          }
        ]
      },
      {
        instructions: "Family Classification Matrix (Male / Female / Plural):",
        instructionsAr: "صنف أفراد العائلة التالية في العمود المناسب:",
        type: "choice",
        items: [
          {
            id: "mat_1",
            prompt: "Where does 'grandchildren' belong?",
            options: ["plural", "male", "female"],
            correctAnswer: "plural",
            teacherNote: "كلمة جمع تعني الأحفاد."
          },
          {
            id: "mat_2",
            prompt: "Where does 'nephew' belong?",
            options: ["male", "female", "plural"],
            correctAnswer: "male",
            teacherNote: "مذكر: ابن الأخ أو الأخت."
          },
          {
            id: "mat_3",
            prompt: "Where does 'niece' belong?",
            options: ["female", "male", "plural"],
            correctAnswer: "female",
            teacherNote: "مؤنث: ابنة الأخ أو الأخت."
          }
        ]
      }
    ]
  }
];
