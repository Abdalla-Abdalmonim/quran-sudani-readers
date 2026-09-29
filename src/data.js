// بيانات السور القرآنية الكريمة
export const surahs = [
  { id: 1, name: 'الفاتحة', verses: 7, type: 'مكية' },
  { id: 2, name: 'البقرة', verses: 286, type: 'مدنية' },
  { id: 3, name: 'آل عمران', verses: 200, type: 'مدنية' },
  { id: 4, name: 'النساء', verses: 176, type: 'مدنية' },
  { id: 5, name: 'المائدة', verses: 120, type: 'مدنية' },
  { id: 6, name: 'الأنعام', verses: 165, type: 'مكية' },
  { id: 7, name: 'الأعراف', verses: 206, type: 'مكية' },
  { id: 8, name: 'الأنفال', verses: 75, type: 'مدنية' },
  { id: 9, name: 'التوبة', verses: 129, type: 'مدنية' },
  { id: 10, name: 'يونس', verses: 109, type: 'مكية' },
  { id: 11, name: 'هود', verses: 123, type: 'مكية' },
  { id: 12, name: 'يوسف', verses: 111, type: 'مكية' },
  { id: 13, name: 'الرعد', verses: 43, type: 'مدنية' },
  { id: 14, name: 'إبراهيم', verses: 52, type: 'مكية' },
  { id: 15, name: 'الحجر', verses: 99, type: 'مكية' },
  { id: 16, name: 'النحل', verses: 128, type: 'مكية' },
  { id: 17, name: 'الإسراء', verses: 111, type: 'مكية' },
  { id: 18, name: 'الكهف', verses: 110, type: 'مكية' },
  { id: 19, name: 'مريم', verses: 98, type: 'مكية' },
  { id: 20, name: 'طه', verses: 135, type: 'مكية' },
  { id: 21, name: 'الأنبياء', verses: 112, type: 'مكية' },
  { id: 22, name: 'الحج', verses: 78, type: 'مدنية' },
  { id: 23, name: 'المؤمنون', verses: 118, type: 'مكية' },
  { id: 24, name: 'النور', verses: 64, type: 'مدنية' },
  { id: 25, name: 'الفرقان', verses: 77, type: 'مكية' },
  { id: 26, name: 'الشعراء', verses: 227, type: 'مكية' },
  { id: 27, name: 'النمل', verses: 93, type: 'مكية' },
  { id: 28, name: 'القصص', verses: 88, type: 'مكية' },
  { id: 29, name: 'العنكبوت', verses: 69, type: 'مكية' },
  { id: 30, name: 'الروم', verses: 60, type: 'مكية' },
];

// بيانات القراء السودانيين
export const sudaniReaders = [
  {
    id: 1,
    name: 'محمد المختار السودانية',
    description: 'قارئ سوداني مشهور بصوت خاشع وتجويد متقن',
    state: 'الخرطوم',
    specialization: 'التجويد الكامل',
    audioUrl: 'https://www.example.com/reader1.mp3',
    imageUrl: 'https://via.placeholder.com/150?text=القارئ+1'
  },
  {
    id: 2,
    name: 'أحمد عمر السودانية',
    description: 'قارئ ذو تأثير روحاني عميق',
    state: 'أم درمان',
    specialization: 'الترتيل',
    audioUrl: 'https://www.example.com/reader2.mp3',
    imageUrl: 'https://via.placeholder.com/150?text=القارئ+2'
  },
  {
    id: 3,
    name: 'علي إبراهيم السودانية',
    description: 'قارئ متميز بسرعة ودقة في التلاوة',
    state: 'بور تسودان',
    specialization: 'السرعة المتقنة',
    audioUrl: 'https://www.example.com/reader3.mp3',
    imageUrl: 'https://via.placeholder.com/150?text=القارئ+3'
  },
  {
    id: 4,
    name: 'يوسف الحسن السودانية',
    description: 'قارئ شاب بصوت صافي وخاشع',
    state: 'الجزيرة',
    specialization: 'القراءات الشاذة',
    audioUrl: 'https://www.example.com/reader4.mp3',
    imageUrl: 'https://via.placeholder.com/150?text=القارئ+4'
  },
  {
    id: 5,
    name: 'سعيد محمد السودانية',
    description: 'قارئ متخصص في الحزن والخشوع',
    state: 'كسلا',
    specialization: 'الحزن والخشوع',
    audioUrl: 'https://www.example.com/reader5.mp3',
    imageUrl: 'https://via.placeholder.com/150?text=القارئ+5'
  },
  {
    id: 6,
    name: 'محمود عبدالله السودانية',
    description: 'قارئ موهوب بصوت عميق وجميل',
    state: 'الجنينة',
    specialization: 'التجويد المعاصر',
    audioUrl: 'https://www.example.com/reader6.mp3',
    imageUrl: 'https://via.placeholder.com/150?text=القارئ+6'
  }
];

// نصوص آيات تجريبية
export const verseTexts = {
  1: [
    'الحمد لله رب العالمين',
    'الرحمن الرحيم',
    'ملك يوم الدين',
    'إياك نعبد وإياك نستعين',
    'اهدنا الصراط المستقيم',
    'صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين',
  ],
  2: [
    'الم ذلك الكتاب لا ريب فيه هدى للمتقين',
    'الذين يؤمنون بالغيب ويقيمون الصلاة ومما رزقناهم ينفقون',
    'والذين يؤمنون بما أنزل إليك وما أنزل من قبلك وبالآخرة هم يوقنون',
  ]
};
