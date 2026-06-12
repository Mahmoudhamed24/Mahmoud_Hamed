/* ==========================================================================
   Mahmoud Hamed — Portfolio (standalone Vanilla JS)
   - Sidebar drawer works on ALL screens
   - Featured GitHub projects appear first
   - All repositories are fetched automatically from GitHub
   - Resources section includes CV + teaching demo + key links
   ========================================================================== */

/* ----------------------------- DATA ----------------------------- */
const profile = {
  name: "محمود حامد أحمد",
  nameEn: "Mahmoud Hamed Ahmed",
  title: "Project & Program Coordinator • Python Instructor • AI / Data & Community Engagement",
  email: "mahmoud.hamed.ahmed25@gmail.com",
  phone: "+201004959936",
  phoneDisplay: "01004959936",
  location: "سوهاج، مصر",
  github: "https://github.com/Mahmoudhamed24",
  linkedin: "https://www.linkedin.com/in/mahmoudhamedahmed",
  facebook: "https://www.facebook.com/mahmoudhamed25",
  whatsapp: "https://wa.me/201004959936",
  cv: "assets/Mahmoud_Hamed_CV.pdf",
};

const summary = [
  "منسّق مشاريع وبرامج بخبرة تتجاوز 3 سنوات في إدارة المشاريع، الجدولة، إعداد التقارير، والتواصل مع فرق متعددة. لديّ سجلّ واضح في تنسيق مبادرات تدريبية رقمية ومدنية، وإدارة لوجستيات برامج متزامنة، وضمان التسليم في الوقت المحدد بجودة عالية.",
  "أعمل بكفاءة في البيئات الحضورية وعن بُعد، مع خلفية قوية في التدريب وتيسير الجلسات وتدريس البرمجة، بالإضافة إلى تدريب عملي في الذكاء الاصطناعي وتحليل البيانات. أستخدم Python وPyCharm وJupyter Notebook وScikit-Learn وNumPy وPandas، إلى جانب Excel وPower BI وKobo وGoogle Workspace.",
  "يُظهر هذا البورتفوليو خبراتي كاملةً: التنسيق الميداني، التدريب، التطوع، المهارات التقنية، والمواد التعليمية ، بالإضافة إلى مشاريعي على GitHub بشكل تلقائي ومحدّث.",
];

const experience = [
  {
    period: "مايو 2026 — حتى الآن",
    role: "Project Coordinator (Part-Time)",
    org: "EYouth — مبادرة أشبال مصر الرقمية",
    place: "سوهاج، مصر",
    icon: "briefcase",
    points: [
      "المنسّق الحضوري الممثّل لـ EYouth في سوهاج بمقر تدريب صُحبة الخير، والإشراف على العمليات اليومية لمبادرة أشبال مصر الرقمية التابعة لوزارة الاتصالات (MCIT).",
      "إدارة كامل لوجستيات التدريب: تجهيز القاعات وإعداد المعدّات والتحقق من جميع الأدوات التقنية قبل كل جلسة.",
      "متابعة سجلات الحضور والغياب يوميًا وضمان سير التدريب بسلاسة وحلّ أي مشكلات فورًا.",
      "التنسيق بين المدرّبين والمشاركين وإدارة EYouth لضمان الجودة والالتزام بجداول البرنامج.",
    ],
  },
  {
    period: "مارس 2026",
    role: "Training Coordinator",
    org: "Career 180 & NTI",
    place: "Creativa Hub سوهاج، مصر",
    icon: "users",
    points: [
      "تنسيق وتنفيذ جلسات تدريب حضورية لمسار Web Designer عبر فعاليات متعددة، وإدارة اللوجستيات من التجهيز حتى الإغلاق.",
      "إعداد المواد ومتابعة الحضور وتجهيز الجلسات بدقة عالية والتزام بالجداول.",
      "العمل كحلقة وصل بين المدرّبين والمشاركين والفرق المنظّمة لضمان تنفيذ احترافي.",
      "جمع ملاحظات ما بعد الجلسة وإعداد التقارير لدعم التحسين المستمر.",
    ],
  },
  {
    period: "يناير 2025 — أغسطس 2025",
    role: "Project Coordinator (Remote)",
    org: "EYouth — Link To your dream Job",
    place: "عن بُعد",
    icon: "briefcase",
    points: [
      "متابعة مؤشرات الإنجاز لأكثر من 3 برامج تدريبية متزامنة وضمان التسليم في الوقت وإعداد تقارير دورية لدعم اتخاذ القرار.",
      "تنسيق التواصل مع العملاء وجداول التدريب وحل المشكلات عبر أقسام متعددة في بيئة سريعة الإيقاع.",
      "التعاون متعدد الوظائف للحفاظ على جودة التدريب ورصد المخاطر مبكرًا لتجنب التأخير.",
      "الحفاظ على توثيق منظم للأنشطة والاتصالات والمخرجات.",
    ],
  },
  {
    period: "أبريل 2024 — ديسمبر 2024",
    role: "Online Programming Instructor",
    org: "Special Course",
    place: "عن بُعد",
    icon: "code",
    points: [
      "تقديم دورات Python لأكثر من 50 طالبًا، تغطي أساسيات البرمجة وأنواع البيانات والدوال والحلقات وOOP.",
      "تصميم معامل تفاعلية وتمارين عملية ومشاريع ختامية لترسيخ التطبيق الواقعي للمفاهيم.",
      "إنشاء تقييمات منظّمة وتتبّع تقدّم كل طالب لاكتشاف فجوات التعلّم ومعالجتها.",
      "جلسات إرشاد فردي أدّت إلى تحسّن أداء الطلاب ورفع نسب إتمام الدورة.",
    ],
  },
  {
    period: "مايو 2025 — يوليو 2025",
    role: "Library Assistant",
    org: "El Daheeh Library",
    place: "المنشأة، سوهاج",
    icon: "book",
    points: [
      "إدارة عمليات البيع اليومية وتقديم خدمات المكتبة من طباعة وتجهيز مستندات ودعم العملاء.",
      "إدارة المعاملات المالية وأداء مهام المحاسبة الأساسية وإمساك الدفاتر.",
      "إدخال البيانات والحفاظ على سجلات دقيقة ومحدثة باستخدام Microsoft Excel.",
    ],
  },
  {
    period: "يناير 2021 — يوليو 2021",
    role: "Student Coordinator (Online)",
    org: "Abwaab Egypt",
    place: "عن بُعد",
    icon: "users",
    points: [
      "التواصل مع الطلاب لتأكيد التسجيل وضمان انتظام الحضور في الدورات.",
      "معالجة استفسارات الطلاب وحل مشكلات الوصول للمنصّة والاشتراكات وتفعيل الحسابات.",
      "الحفاظ على سجلات دقيقة لتفاعل الطلاب والمتابعات ونتائج حل المشكلات.",
    ],
  },
];

const internships = [
  {
    period: "أغسطس 2025 — أكتوبر 2025",
    role: "Office Management Intern",
    org: "Life Makers Egypt",
    place: "سوهاج، مصر",
    icon: "building",
    points: [
      "تقديم الدعم الإداري والتشغيلي للأنشطة اليومية ومهام إدارة المشاريع.",
      "تطوير أنظمة توثيق منظّمة لتبسيط التواصل وتنظيم الملفات وحفظ السجلات.",
      "المساعدة في تنظيم الاجتماعات وتتبّع مخرجات المشاريع وإعداد تقارير داخلية واضحة للإدارة.",
    ],
  },
  {
    period: "أكتوبر 2024 — أبريل 2025",
    role: "Coordinator Intern",
    org: "Creativa Hub Sohag (with Edventures)",
    place: "سوهاج، مصر",
    icon: "users",
    points: [
      "تنظيم ورش العمل التطوعية وتنسيق الجلسات من التخطيط حتى التنفيذ.",
      "إدارة متابعة الحضور وجمع الملاحظات وإدخال البيانات عبر فعاليات مجتمعية متعددة.",
      "دعم تنسيق اللوجستيات والحفاظ على تواصل واضح مع الشركاء والجهات المعنية.",
    ],
  },
];

const skillGroups = [
  {
    title: "مهارات التنسيق والعمليات",
    items: [
      "تنسيق المشاريع",
      "تتبّع مؤشرات الإنجاز",
      "إدارة المهام",
      "الجدولة وإدارة التقويم",
      "لوجستيات التدريب",
      "إعداد التقارير والتوثيق",
      "تيسير الاجتماعات",
      "التواصل مع الجهات المعنية",
      "التنقل الميداني والمتابعة",
      "العمل مع الشركاء المحليين",
    ],
  },
  {
    title: "التدريس والتيسير",
    items: [
      "تدريس Python وScratch وC/C++",
      "تصميم المناهج وخطط الدروس",
      "تقييم مخرجات التعلّم",
      "الإرشاد الفردي",
      "تصميم المعامل التفاعلية",
      "التدريب المجتمعي",
      "إدارة الجلسات المباشرة",
      "دعم المتعلمين",
    ],
  },
  {
    title: "المهارات التقنية والتحليلية",
    items: [
      "Python (OOP)",
      "NumPy",
      "Pandas",
      "Scikit-Learn",
      "PyCharm",
      "Jupyter Notebook",
      "Power BI",
      "Advanced Excel",
      "Kobo Toolbox",
      "Data Analysis & Visualization",
    ],
  },
  {
    title: "الأدوات والمنصّات",
    items: [
      "Excel & Google Sheets",
      "Google Forms",
      "Word & PowerPoint",
      "Zoom / MS Teams / Google Meet",
      "Google Classroom",
      "Code.org & Tynker",
      "Google Workspace",
      "Git & GitHub",
      "VS Code",
    ],
  },
  {
    title: "المجتمع والقطاع غير الربحي",
    items: [
      "Community Outreach",
      "Volunteer Engagement",
      "Beneficiary Tracking",
      "Monitoring & Evaluation Support",
      "Needs Assessment Support",
      "Stakeholder Engagement",
      "CSO Coordination",
      "Field Reporting",
      "Case Management Workflow Awareness",
    ],
  },
  {
    title: "مهارات شخصية",
    items: [
      "التواصل والاستماع الفعّال",
      "القيادة والعمل الجماعي",
      "إدارة الوقت والتنظيم",
      "إدارة أولويات متعددة",
      "التكيّف وحل المشكلات",
      "الدقّة والانتباه للتفاصيل",
      "المبادرة والاعتماد على النفس",
      "العمل تحت الضغط",
    ],
  },
];

const courses = [
  { title: "Artificial Intelligence Program", org: "Samsung Innovation Campus", period: "أغسطس — نوفمبر 2025", icon: "🧠", points: ["Python للبيانات", "NumPy & Pandas", "تحليل البيانات (EDA)", "أساسيات تعلّم الآلة"] },
  { title: "Python Programming", org: "Samsung Innovation Campus", period: "يوليو — سبتمبر 2023", icon: "💻", points: ["أساسيات Python", "الدوال والحلقات", "OOP", "حل المشكلات"] },
  { title: "Front-end Development", org: "GDSC Sohag", period: "يونيو — سبتمبر 2022", icon: "🎓", points: ["HTML", "CSS", "JavaScript", "مشاريع ويب"] },
];

const resources = [
  {
    title: "السيرة الذاتية",
    description: "نسخة محدثة واحترافية من السيرة الذاتية بصيغة PDF.",
    href: "assets/Mahmoud_Hamed_CV.pdf",
    cta: "فتح السيرة الذاتية",
    icon: "📄",
  },
  {
    title: "GitHub Profile",
    description: "كل المستودعات والمشاريع البرمجية الخاصة بي مع المشاريع المميزة أولًا.",
    href: profile.github,
    cta: "زيارة GitHub",
    icon: "🐙",
  },
  {
    title: "LinkedIn",
    description: "الملف المهني والتحديثات المهنية والظهور الاحترافي على المنصة.",
    href: profile.linkedin,
    cta: "زيارة LinkedIn",
    icon: "in",
  },
];

const volunteering = [
  { role: "CS50 Facilitator", org: "Cipher & Ma3refa", period: "يناير 2023 — يناير 2024", desc: "تقديم جلسات Scratch و Python و C و C++ بالعربية لأكثر من 50 متعلّمًا وبناء أساسيات البرمجة وحل المشكلات.", icon: "code" },
  { role: "Ambassador & Coordinator", org: "TIEC", period: "مايو 2024 — حتى الآن", desc: "تنسيق فعاليات تقنية مجتمعية وتنظيم ورش للمبتكرين والطلاب المحليين.", icon: "users" },
  { role: "Accounts Officer", org: "Life Makers Sohag", period: "مايو 2024 — مايو 2025", desc: "إدارة حسابات التبرعات وتتبع المعاملات المالية والحفاظ على ملخصات مالية دقيقة.", icon: "heart" },
  { role: "Problem Solving Facilitator", org: "Athar", period: "يناير 2022 — يناير 2023", desc: "تقديم ورش حل المشكلات بـ C++ وتدريب المشاركين على التفكير الخوارزمي وأساسيات البرمجة التنافسية.", icon: "brain" },
  { role: "EDGE Training", org: "Life Makers Sohag", period: "أبريل 2023 — مايو 2025", desc: "تطوير خطط تدريبية لدعم المتطوعين وبناء مهارات الفريق بشكل عملي ومستمر.", icon: "users" },
  { role: "Operation", org: "Hult Prize", period: "مايو 2023 — مايو 2024", desc: "تنسيق العمليات اللوجستية والفعاليات والإشراف على سير الحدث بشكل منظم.", icon: "briefcase" },
];

const education = {
  school: "كلية التربية، جامعة سوهاج",
  grad: "التخرج المتوقع: 2026",
  degree: "بكالوريوس التربية — قسم الرياضيات",
};

const languages = [
  { name: "العربية", level: "اللغة الأم", value: 100 },
  { name: "الإنجليزية", level: "B1 — متوسط", value: 60 },
];

const stats = [
  { value: "3+", label: "سنوات خبرة في التنسيق" },
  { value: "50+", label: "متدرّب على Python" },
  { value: "3+", label: "برامج متزامنة منسّقة" },
  { value: "2026", label: "تخرج متوقع" },
];

const NAV = [
  { id: "home", label: "الرئيسية" },
  { id: "about", label: "نبذة" },
  { id: "experience", label: "الخبرات" },
  { id: "skills", label: "المهارات" },
  { id: "resources", label: "المواد" },
  { id: "projects", label: "المشاريع" },
  { id: "volunteering", label: "التطوع" },
  { id: "contact", label: "تواصل" },
];

/* GitHub integration */
const GITHUB_USERS = ["Mahmoudhamed24"];

// Featured projects are detected automatically from the repos you starred
// in your GitHub account, but only if they also belong to your portfolio repos.
let featuredRepoNames = new Set();

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dart: "#00B4AB",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  PHP: "#4F5D95",
  Shell: "#89e051",
};

const SVG = {
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.142 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  fork: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9M12 12v3"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  cap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
};

const socials = [
  { href: profile.github, icon: "github", label: "GitHub" },
  { href: profile.linkedin, icon: "linkedin", label: "LinkedIn" },
  { href: profile.facebook, icon: "facebook", label: "Facebook" },
  { href: profile.whatsapp, icon: "whatsapp", label: "WhatsApp" },
];

/* ----------------------------- HELPERS ----------------------------- */
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[c]));

function isFeaturedRepo(repo) {
  return featuredRepoNames.has(repo.full_name);
}

function byFeaturedAndScore(a, b) {
  const aFeat = isFeaturedRepo(a);
  const bFeat = isFeaturedRepo(b);
  if (aFeat !== bFeat) return Number(bFeat) - Number(aFeat);
  const starDiff = (b.stargazers_count || 0) - (a.stargazers_count || 0);
  if (starDiff) return starDiff;
  const updatedDiff = new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
  if (updatedDiff) return updatedDiff;
  return (a.name || "").localeCompare(b.name || "");
}

function iconWrap(key) {
  return SVG[key] || SVG.briefcase;
}

function buildDrawerHTML() {
  return `
    <div class="profile-top">
      <div class="avatar-wrap">
        <div class="avatar-glow"></div>
        <img src="assets/mahmoud.jpg" alt="Mahmoud Hamed Ahmed" class="avatar" />
      </div>
      <span class="pill">Portfolio</span>
      <h2 class="profile-name">${esc(profile.name)}</h2>
      <p class="profile-title">${esc(profile.title)}</p>
    </div>

    <nav class="nav" data-nav>
      ${NAV.map((n) => `<a href="#${esc(n.id)}" data-link="${esc(n.id)}">${esc(n.label)}</a>`).join("")}
    </nav>

    <div class="sidebar-foot">
      <a href="${profile.cv}" target="_blank" rel="noopener noreferrer" class="btn btn-primary cv-btn">⬇ السيرة الذاتية</a>
      <div class="socials">
        ${socials.map((s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" class="social-btn">${SVG[s.icon]}</a>`).join("")}
      </div>
    </div>
  `;
}

function timelineHTML(items) {
  return items.map((x) => `
    <div class="tl-item reveal">
      <span class="tl-icon">${iconWrap(x.icon)}</span>
      <div class="tl-card">
        <div class="tl-head">
          <h4 class="tl-role">${esc(x.role)}</h4>
          <span class="tl-period">${esc(x.period)}</span>
        </div>
        <p class="tl-org">${esc(x.org)} <span>· ${esc(x.place)}</span></p>
        <ul class="tl-points">${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>
    </div>
  `).join("");
}

function projectCard(repo) {
  const live = repo.homepage || (repo.fork ? "" : `https://${repo.owner.login}.github.io/${repo.name}/`);
  const dotColor = repo.language ? (LANG_COLORS[repo.language] || "var(--gold)") : "var(--muted-foreground)";
  const featured = isFeaturedRepo(repo);
  return `
    <article class="project-card reveal">
      ${featured ? `<span class="proj-feat">📌 مميز</span>` : ""}
      <div class="proj-title">${SVG.github}<h4 title="${esc(repo.name)}">${esc(repo.name)}</h4></div>
      <p class="proj-desc">${esc(repo.description || "مشروع برمجي من أعمالي على GitHub.")}</p>
      <div class="proj-meta">
        ${repo.language ? `<span style="display:inline-flex;align-items:center;gap:.35rem"><span class="lang-dot" style="background:${dotColor}"></span>${esc(repo.language)}</span>` : ""}
        <span style="display:inline-flex;align-items:center;gap:.25rem">${SVG.star}${repo.stargazers_count || 0}</span>
        <span style="display:inline-flex;align-items:center;gap:.25rem">${SVG.fork}${repo.forks_count || 0}</span>
        <span class="owner">@${esc(repo.owner.login)}</span>
      </div>
      <div class="proj-links">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="proj-code">${SVG.github} الكود</a>
        ${live ? `<a href="${live}" target="_blank" rel="noopener noreferrer" class="proj-live">${SVG.link} معاينة</a>` : ""}
      </div>
    </article>
  `;
}

/* ----------------------------- RENDER STATIC ----------------------------- */
function renderStatic() {
  document.getElementById("sidebar-inner").innerHTML = buildDrawerHTML();

  document.getElementById("hero-sub").textContent =
    `أنا ${profile.name}، منسّق مشاريع وبرامج ومدرّب Python بخبرة تتجاوز 3 سنوات في التنسيق الميداني والتدريب وإدارة اللوجستيات والتواصل مع فرق متعددة، مع اهتمام واضح بالذكاء الاصطناعي وتحليل البيانات والعمل المجتمعي.`;

  document.getElementById("stats").innerHTML = stats.map((s) =>
    `<div class="stat reveal"><div class="stat-value text-gradient">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`
  ).join("");

  document.getElementById("summary").innerHTML =
    summary.map((p) => `<p>${esc(p)}</p>`).join("") +
    `<div class="about-tags">
      <span class="about-tag">${SVG.cap} ${esc(education.school)} — ${esc(education.degree)}</span>
      <span class="about-tag">${SVG.globe} العربية (الأم) • الإنجليزية (B1)</span>
      <span class="about-tag">${SVG.mapPin} ${esc(profile.location)}</span>
    </div>`;

  const facts = [
    { k: "الموقع", v: profile.location },
    { k: "المجالات", v: "Coordination · Training · AI/Data" },
    { k: "الأدوات", v: "Git · GitHub · Office · Python" },
    { k: "الهدف", v: "Impactful programs & learning" },
  ];
  document.getElementById("about-side").innerHTML =
    facts.map((f) => `<div class="fact"><span class="fact-k">${esc(f.k)}</span><strong class="fact-v">${esc(f.v)}</strong></div>`).join("") +
    `<div class="langs">
      ${languages.map((l) => `
        <div class="lang">
          <div class="lang-row"><span style="font-weight:800">${esc(l.name)}</span><span style="color:var(--muted-foreground);font-size:.78rem">${esc(l.level)}</span></div>
          <div class="lang-bar"><div class="lang-fill" style="width:${l.value}%"></div></div>
        </div>
      `).join("")}
    </div>`;

  document.getElementById("experience-list").innerHTML = timelineHTML(experience);
  document.getElementById("internships-list").innerHTML = timelineHTML(internships);

  document.getElementById("skills-grid").innerHTML = skillGroups.map((g) => `
    <div class="skill-card reveal">
      <h4>${esc(g.title)}</h4>
      <div class="skill-tags">${g.items.map((s) => `<span class="skill-tag">${esc(s)}</span>`).join("")}</div>
    </div>
  `).join("");

  document.getElementById("courses-grid").innerHTML = courses.map((c) => `
    <div class="course-card reveal">
      <div class="course-icon">${c.icon}</div>
      <h5>${esc(c.title)}</h5>
      <p class="course-org">${esc(c.org)}</p>
      <p class="course-period">${esc(c.period)}</p>
      <div class="course-points">${c.points.map((p) => `<span class="course-point">${esc(p)}</span>`).join("")}</div>
    </div>
  `).join("");

  document.getElementById("resources-grid").innerHTML = resources.map((r) => `
    <article class="resource-card reveal">
      <div class="resource-icon">${r.icon}</div>
      <div>
        <h4>${esc(r.title)}</h4>
        <p>${esc(r.description)}</p>
      </div>
      <a href="${r.href}" target="_blank" rel="noopener noreferrer" class="resource-link">${esc(r.cta)}</a>
    </article>
  `).join("");

  document.getElementById("volunteer-grid").innerHTML = volunteering.map((v) => `
    <div class="vol-card reveal">
      <div class="vol-head">
        <span class="vol-icon">${iconWrap(v.icon)}</span>
        <div>
          <h4 class="vol-role">${esc(v.role)}</h4>
          <p class="vol-org">${esc(v.org)}</p>
          <p class="vol-period">${esc(v.period)}</p>
        </div>
      </div>
      <p class="vol-desc">${esc(v.desc)}</p>
    </div>
  `).join("");

  document.getElementById("contact-info").innerHTML = `
    <a href="mailto:${profile.email}" class="contact-row"><span class="contact-icon">${SVG.mail}</span><span style="overflow:hidden;text-overflow:ellipsis">${esc(profile.email)}</span></a>
    <a href="tel:${profile.phone}" class="contact-row" dir="ltr"><span class="contact-icon">${SVG.phone}</span>${esc(profile.phone)}</a>
    <div class="contact-row"><span class="contact-icon">${SVG.mapPin}</span>${esc(profile.location)}</div>
    <div class="contact-row"><span class="contact-icon">${SVG.cap}</span>${esc(education.grad)}</div>
    <div class="contact-socials">
      ${socials.map((s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" class="social-btn">${SVG[s.icon]}</a>`).join("")}
    </div>
  `;

  document.getElementById("footer").innerHTML = `© ${new Date().getFullYear()} ${esc(profile.name)}`;
}

/* ----------------------------- GITHUB PROJECTS ----------------------------- */
let allRepos = [];
const state = { search: "", lang: "الكل" };

async function fetchUserRepos(username) {
  const out = [];
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&page=${page}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

async function fetchStarredRepos(username) {
  const out = [];
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/starred?per_page=100&page=${page}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

async function loadRepos() {
  const featuredGrid = document.getElementById("featured-projects-grid");
  const grid = document.getElementById("projects-grid");
  featuredGrid.innerHTML = Array.from({ length: 3 }).map(() => `<div class="skeleton"></div>`).join("");
  grid.innerHTML = Array.from({ length: 6 }).map(() => `<div class="skeleton"></div>`).join("");
  document.getElementById("projects-count").textContent = "";
  document.getElementById("featured-count").textContent = "";

  try {
    const [repoResults, starredResults] = await Promise.all([
      Promise.all(GITHUB_USERS.map(fetchUserRepos)),
      Promise.allSettled(GITHUB_USERS.map(fetchStarredRepos)),
    ]);

    const map = new Map();
    repoResults.flat().forEach((r) => {
      if (r && r.name) map.set(r.full_name, r);
    });

    const starredSet = new Set();
    starredResults.forEach((result) => {
      if (result.status === "fulfilled" && Array.isArray(result.value)) {
        result.value.forEach((repo) => {
          if (repo && repo.full_name) starredSet.add(repo.full_name);
        });
      }
    });

    featuredRepoNames = new Set([...map.keys()].filter((name) => starredSet.has(name)));
    allRepos = [...map.values()].sort(byFeaturedAndScore);
    renderLangFilters();
    renderProjects();
  } catch (e) {
    const err = `<div class="state-box"><div style="font-size:1.5rem">⚠️</div><p>تعذّر جلب المشاريع من GitHub حاليًا. حاول التحديث بعد قليل.</p><button class="btn btn-primary" id="retry">⟳ إعادة المحاولة</button></div>`;
    featuredGrid.innerHTML = err;
    grid.innerHTML = "";
    const r = document.getElementById("retry");
    if (r) r.onclick = loadRepos;
  }
}

function renderLangFilters() {
  const langs = ["الكل", ...[...new Set(allRepos.map((r) => r.language).filter(Boolean))].sort()];
  const box = document.getElementById("lang-filters");
  if (langs.length <= 1) { box.innerHTML = ""; return; }
  box.innerHTML = langs.map((l) => `<button class="lang-pill ${l === state.lang ? "active" : ""}" data-lang="${esc(l)}">${esc(l)}</button>`).join("");
  box.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.lang = btn.dataset.lang;
      renderLangFilters();
      renderProjects();
    });
  });
}

function renderProjects() {
  const featuredGrid = document.getElementById("featured-projects-grid");
  const grid = document.getElementById("projects-grid");

  const filtered = allRepos.filter((r) => {
    if (state.lang !== "الكل" && r.language !== state.lang) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      return (
        (r.name || "").toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q) ||
        (r.language || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const featured = filtered.filter(isFeaturedRepo).sort(byFeaturedAndScore);
  const other = filtered.filter((r) => !isFeaturedRepo(r)).sort(byFeaturedAndScore);

  featuredGrid.innerHTML = featured.length
    ? featured.map(projectCard).join("")
    : `<div class="state-box" style="grid-column:1/-1"><p>لا توجد مشاريع مميزة مطابقة حاليًا.</p></div>`;

  grid.innerHTML = other.length
    ? other.map(projectCard).join("")
    : `<div class="state-box" style="grid-column:1/-1"><p>لا توجد مشاريع أخرى مطابقة للبحث أو الفلتر الحالي.</p></div>`;

  document.getElementById("featured-count").textContent = `${featured.length} مشروع`;
  document.getElementById("projects-count").innerHTML = `إجمالي المشاريع المجلوبة من GitHub: <strong style="color:var(--foreground)">${allRepos.length}</strong> • الظاهر حاليًا: <strong style="color:var(--foreground)">${filtered.length}</strong>`;
  observeReveals();
}

/* ----------------------------- NAV / DRAWER ----------------------------- */
function setupNav() {
  const drawer = document.getElementById("drawer");
  const openBtn = document.getElementById("open-menu");
  const closeBtn = document.getElementById("close-menu");
  const backdrop = document.getElementById("drawer-backdrop");
  const links = document.querySelectorAll("[data-link]");

  const openDrawer = () => {
    drawer.hidden = false;
    openBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
  };
  const closeDrawer = () => {
    drawer.hidden = true;
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  };

  openBtn.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);
  links.forEach((a) => a.addEventListener("click", closeDrawer));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.hidden) closeDrawer();
  });

  const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll("[data-link]").forEach((a) => a.classList.toggle("active", a.dataset.link === entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((section) => observer.observe(section));
}

let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "-60px" });
  }
  document.querySelectorAll(".reveal:not(.in)").forEach((node) => revealObserver.observe(node));
}

function setupProjectControls() {
  const search = document.getElementById("search");
  const refresh = document.getElementById("refresh");
  search.addEventListener("input", () => {
    state.search = search.value.trim();
    renderProjects();
  });
  refresh.addEventListener("click", loadRepos);
}

/* ----------------------------- INIT ----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderStatic();
  setupNav();
  setupProjectControls();
  observeReveals();
  loadRepos();
});
