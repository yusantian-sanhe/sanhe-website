const fs = require("fs");
const path = require("path");

const root = process.cwd();
const commonSourcePath = path.join(
  root,
  "src",
  "messages",
  "en",
  "common.json"
);

const homeSourcePath = path.join(
  root,
  "src",
  "messages",
  "en",
  "home.json"
);
const translations = {
  "ru": {
    "navigation.home": "Главная",
    "navigation.products": "Продукция",
    "navigation.markets": "Рынки",
    "navigation.quality": "Качество",
    "navigation.about": "О компании",
    "navigation.contact": "Контакты",
    "navigation.quote": "Запросить предложение",
    "hero.badge": "Надёжный партнёр по экспорту сельскохозяйственной продукции",
    "hero.titleLine1": "Надёжные поставки сельскохозяйственной продукции",
    "hero.titleLine2": "Для мировых рынков",
    "hero.description": "Мы поддерживаем импортёров, оптовиков и производителей продуктов питания отборной сельскохозяйственной продукцией, экспортной упаковкой и надёжной логистикой.",
    "hero.viewProducts": "Посмотреть продукцию",
    "hero.contactSales": "Связаться с отделом продаж",
    "hero.supplyChainTitle": "Интегрированная цепочка поставок",
    "hero.process.planting": "Базы выращивания",
    "hero.process.processing": "Заводская переработка",
    "hero.process.coldChain": "Холодное хранение",
    "hero.process.export": "Мировой экспорт",
    "hero.trustItems.planting.title": "Собственные базы выращивания",
    "hero.trustItems.planting.description": "Надёжное качество контролируется с самого источника.",
    "hero.trustItems.processing.title": "Прямая заводская переработка",
    "hero.trustItems.processing.description": "Профессиональная калибровка, переработка и упаковка.",
    "hero.trustItems.coldChain.title": "Собственная холодовая цепь",
    "hero.trustItems.coldChain.description": "Сохранение свежести при хранении и экспорте.",
    "hero.trustItems.traceability.title": "Полная прослеживаемость продукции",
    "hero.trustItems.traceability.description": "Каждую поставку можно отследить от выращивания до доставки.",
    "featuredProducts.eyebrow": "Рекомендуемая продукция",
    "featuredProducts.title": "Свежая продукция, замороженные и готовые пищевые решения",
    "featuredProducts.description": "Изучите основные категории продукции для международных покупателей.",
    "featuredProducts.learnMore": "Подробнее",
    "featuredProducts.items.freshVegetables.name": "Свежие овощи",
    "featuredProducts.items.freshVegetables.description": "Свежие овощи для мировых рынков.",
    "featuredProducts.items.freshFruits.name": "Свежие фрукты",
    "featuredProducts.items.freshFruits.description": "Свежие фрукты, отобранные для международных покупателей.",
    "featuredProducts.items.frozenFoods.name": "Замороженные продукты",
    "featuredProducts.items.frozenFoods.description": "Замороженные пищевые решения со стабильными поставками.",
    "featuredProducts.items.preparedFoods.name": "Готовые пищевые продукты",
    "featuredProducts.items.preparedFoods.description": "Готовые пищевые решения для международных клиентов.",
    "supplyChain.eyebrow": "Обзор цепочки поставок",
    "supplyChain.title": "От наших полей к мировым рынкам",
    "supplyChain.description": "Каждая поставка проходит через нашу интегрированную цепочку — от собственных баз выращивания до международной доставки, обеспечивая свежесть, качество и полную прослеживаемость.",
    "supplyChain.steps.planting.title": "Собственные базы выращивания",
    "supplyChain.steps.planting.description": "Стабильное качество контролируется с источника.",
    "supplyChain.steps.processing.title": "Заводская переработка",
    "supplyChain.steps.processing.description": "Очистка, калибровка и переработка в контролируемых условиях.",
    "supplyChain.steps.coldChain.title": "Холодное складирование",
    "supplyChain.steps.coldChain.description": "Профессиональное хранение помогает сохранять свежесть продукции.",
    "supplyChain.steps.inspection.title": "Контроль качества и упаковка",
    "supplyChain.steps.inspection.description": "Продукция проверяется и упаковывается по спецификациям заказчика.",
    "supplyChain.steps.export.title": "Мировой экспорт",
    "supplyChain.steps.export.description": "Надёжная доставка на мировые рынки.",
    "supplyChain.closing": "Объединяя выращивание, переработку, холодное хранение и экспортную логистику, SanHe помогает снижать риски поставок и строить долгосрочные партнёрства.",
    "whyChooseUs.eyebrow": "Почему выбирают нас",
    "whyChooseUs.title": "Создано для надёжной международной торговли",
    "whyChooseUs.description": "Мы объединяем подбор продукции, контроль качества, экспортную упаковку и координацию логистики, помогая покупателям снижать риски и выстраивать долгосрочные отношения.",
    "whyChooseUs.items.planting.title": "Собственные базы выращивания",
    "whyChooseUs.items.planting.description": "Ключевые продукты поступают с управляемых баз выращивания, обеспечивая стабильное качество и поставки.",
    "whyChooseUs.items.processing.title": "Прямая заводская переработка",
    "whyChooseUs.items.processing.description": "Очистка, калибровка, переработка и упаковка управляются производственными площадками для стабильного качества.",
    "whyChooseUs.items.coldChain.title": "Собственные холодильные склады",
    "whyChooseUs.items.coldChain.description": "Профессиональное холодное хранение поддерживает свежесть и эффективную экспортную логистику.",
    "whyChooseUs.items.traceability.title": "Полная прослеживаемость продукции",
    "whyChooseUs.items.traceability.description": "Каждую поставку можно отследить от выращивания и переработки до упаковки и экспорта.",
    "whyChooseUs.items.customPackaging.title": "Индивидуальная упаковка и OEM",
    "whyChooseUs.items.customPackaging.description": "Доступны гибкая упаковка, частная марка и OEM-производство.",
    "whyChooseUs.items.stableSupply.title": "Стабильные круглогодичные поставки",
    "whyChooseUs.items.stableSupply.description": "Интегрированное управление цепочкой поставок помогает обеспечивать надёжные поставки круглый год.",
    "exportMarkets.eyebrow": "Экспортные рынки",
    "exportMarkets.title": "Поставляем сельскохозяйственную продукцию международным покупателям",
    "exportMarkets.description": "Мы поддерживаем клиентов на ключевых импортных рынках гибкими поставками, экспортной документацией и логистической координацией.",
    "exportMarkets.regions.middleEast.title": "Ближний Восток",
    "exportMarkets.regions.middleEast.countries": "ОАЭ, Саудовская Аравия, Катар, Кувейт и соседние рынки",
    "exportMarkets.regions.europe.title": "Европа",
    "exportMarkets.regions.europe.countries": "Германия, Франция, Испания, Италия и другие европейские импортные рынки",
    "exportMarkets.regions.asia.title": "Азия",
    "exportMarkets.regions.asia.countries": "Китай, Юго-Восточная Азия, Япония, Корея и региональные дистрибьюторы",
    "exportMarkets.regions.africa.title": "Африка",
    "exportMarkets.regions.africa.countries": "Северная и Западная Африка и отдельные рынки импорта продуктов питания",
    "exportMarkets.regions.americas.title": "Америка",
    "exportMarkets.regions.americas.countries": "США, Канада, Латинская Америка и оптовые каналы",
    "certificates.eyebrow": "Качество и сертификация",
    "certificates.title": "Укрепляем доверие через контроль качества",
    "certificates.description": "SanHe поддерживает международных покупателей признанными стандартами сертификации, прослеживаемыми цепочками, холодным хранением и экспортным контролем качества.",
    "certificates.panel.eyebrow": "Качество SanHe",
    "certificates.panel.supportLabel": "Поддержка экспортного качества",
    "certificates.panel.notice": "Заявления о качестве должны подтверждаться фактическими отчётами инспекций, сертификатами и отгрузочными документами.",
    "certificates.items.sgs.description": "Поддержка сторонней инспекции для международных покупателей.",
    "certificates.items.haccp.description": "Управление пищевой безопасностью при переработке и экспортном контроле.",
    "certificates.items.brc.description": "Поддержка международных стандартов пищевых цепочек поставок.",
    "certificates.items.traceability.title": "Полная прослеживаемость",
    "certificates.items.traceability.description": "Продукцию можно отследить от выращивания до конечной отгрузки.",
    "certificates.items.coldChain.title": "Управление холодовой цепью",
    "certificates.items.coldChain.description": "Хранение с контролем температуры помогает сохранять свежесть.",
    "certificates.items.inspection.title": "Контроль качества",
    "certificates.items.inspection.description": "Инспекция и контроль упаковки перед экспортной отгрузкой.",
    "statistics.items.stages.label": "Этапа интегрированной цепочки поставок",
    "statistics.items.categories.label": "Основные категории продукции",
    "statistics.items.languages.label": "Поддерживаемых языков сайта",
    "statistics.items.service.label": "Международный сервис экспортных поставок",
    "testimonials.eyebrow": "Отзывы покупателей",
    "testimonials.title": "Нам доверяют импортёры и дистрибьюторы",
    "testimonials.description": "Мы ориентированы на долгосрочное сотрудничество, стабильное качество и оперативный экспортный сервис.",
    "cta.eyebrow": "Начать сотрудничество",
    "cta.title": "Готовы закупать сельскохозяйственную продукцию?",
    "cta.description": "Независимо от того, являетесь ли вы импортёром, оптовиком или производителем продуктов питания, мы готовы поддержать ваш бизнес надёжной продукцией и профессиональным экспортным сервисом.",
    "cta.contact": "Связаться с отделом продаж",
    "cta.products": "Посмотреть продукцию",
    "cta.responseNote": "Сообщите требования к закупке, и наша экспортная команда свяжется с вами в рабочее время.",
    "cta.highlights.oem": "OEM-производство",
    "cta.highlights.privateLabel": "Частная марка",
    "cta.highlights.mixedContainers": "Сервис смешанных контейнеров",
    "cta.highlights.stableSupply": "Стабильные круглогодичные поставки"
  },
  "ar": {
    "navigation.home": "الرئيسية",
    "navigation.products": "المنتجات",
    "navigation.markets": "الأسواق",
    "navigation.quality": "الجودة",
    "navigation.about": "من نحن",
    "navigation.contact": "اتصل بنا",
    "navigation.quote": "طلب عرض سعر",
    "hero.badge": "شريك موثوق لتصدير المنتجات الزراعية",
    "hero.titleLine1": "توريد زراعي موثوق",
    "hero.titleLine2": "للأسواق العالمية",
    "hero.description": "ندعم المستوردين وتجار الجملة ومصنعي الأغذية بمنتجات زراعية مختارة وتعبئة جاهزة للتصدير وخدمات لوجستية موثوقة.",
    "hero.viewProducts": "عرض المنتجات",
    "hero.contactSales": "اتصل بالمبيعات",
    "hero.supplyChainTitle": "سلسلة توريد متكاملة",
    "hero.process.planting": "قواعد الزراعة",
    "hero.process.processing": "المعالجة في المصنع",
    "hero.process.coldChain": "التخزين المبرد",
    "hero.process.export": "التصدير العالمي",
    "hero.trustItems.planting.title": "قواعد زراعة مملوكة",
    "hero.trustItems.planting.description": "جودة موثوقة تُدار من المصدر.",
    "hero.trustItems.processing.title": "معالجة مباشرة في المصنع",
    "hero.trustItems.processing.description": "تدريج ومعالجة وتعبئة احترافية.",
    "hero.trustItems.coldChain.title": "سلسلة تبريد مملوكة",
    "hero.trustItems.coldChain.description": "الحفاظ على النضارة أثناء التخزين والتصدير.",
    "hero.trustItems.traceability.title": "تتبع كامل للمنتج",
    "hero.trustItems.traceability.description": "يمكن تتبع كل شحنة من الزراعة حتى التسليم.",
    "featuredProducts.eyebrow": "منتجات مميزة",
    "featuredProducts.title": "منتجات طازجة وأغذية مجمدة وحلول غذائية مُحضّرة",
    "featuredProducts.description": "استعرض فئات منتجاتنا الرئيسية للمشترين الدوليين.",
    "featuredProducts.learnMore": "اعرف المزيد",
    "featuredProducts.items.freshVegetables.name": "خضروات طازجة",
    "featuredProducts.items.freshVegetables.description": "خضروات طازجة للأسواق العالمية.",
    "featuredProducts.items.freshFruits.name": "فواكه طازجة",
    "featuredProducts.items.freshFruits.description": "فواكه طازجة مختارة للمشترين الدوليين.",
    "featuredProducts.items.frozenFoods.name": "أغذية مجمدة",
    "featuredProducts.items.frozenFoods.description": "حلول أغذية مجمدة مع توريد مستقر.",
    "featuredProducts.items.preparedFoods.name": "أغذية مُحضّرة",
    "featuredProducts.items.preparedFoods.description": "حلول غذائية مُحضّرة للعملاء الدوليين.",
    "supplyChain.eyebrow": "نظرة عامة على سلسلة التوريد",
    "supplyChain.title": "من حقولنا إلى الأسواق العالمية",
    "supplyChain.description": "تُدار كل شحنة عبر سلسلة توريدنا المتكاملة، من قواعد الزراعة المملوكة إلى التسليم العالمي، لضمان النضارة والجودة والتتبع الكامل.",
    "supplyChain.steps.planting.title": "قواعد زراعة مملوكة",
    "supplyChain.steps.planting.description": "جودة مستقرة تُدار من المصدر.",
    "supplyChain.steps.processing.title": "المعالجة في المصنع",
    "supplyChain.steps.processing.description": "تنظيف وتدريج ومعالجة ضمن إنتاج خاضع للرقابة.",
    "supplyChain.steps.coldChain.title": "التخزين ضمن سلسلة التبريد",
    "supplyChain.steps.coldChain.description": "يساعد التخزين الاحترافي في الحفاظ على نضارة المنتج.",
    "supplyChain.steps.inspection.title": "فحص الجودة والتعبئة",
    "supplyChain.steps.inspection.description": "يتم فحص المنتجات وتعبئتها وفق مواصفات العميل.",
    "supplyChain.steps.export.title": "التصدير العالمي",
    "supplyChain.steps.export.description": "تسليم موثوق إلى الأسواق العالمية.",
    "supplyChain.closing": "من خلال دمج الزراعة والمعالجة والتخزين المبرد ولوجستيات التصدير، تساعد SanHe العملاء على تقليل مخاطر التوريد وبناء شراكات طويلة الأجل.",
    "whyChooseUs.eyebrow": "لماذا تختارنا",
    "whyChooseUs.title": "مصمم للتجارة الدولية الموثوقة",
    "whyChooseUs.description": "نجمع بين توريد المنتجات ومراقبة الجودة والتعبئة التصديرية وتنسيق الخدمات اللوجستية لمساعدة المشترين على تقليل المخاطر وبناء علاقات توريد طويلة الأجل.",
    "whyChooseUs.items.planting.title": "قواعد زراعة مملوكة",
    "whyChooseUs.items.planting.description": "تأتي المنتجات الرئيسية من قواعد زراعة مُدارة لضمان جودة مستقرة وتوريد موثوق.",
    "whyChooseUs.items.processing.title": "معالجة مباشرة في المصنع",
    "whyChooseUs.items.processing.description": "تُدار عمليات التنظيف والتدريج والمعالجة والتعبئة بواسطة منشآت الإنتاج لضمان جودة متسقة.",
    "whyChooseUs.items.coldChain.title": "تخزين مبرد مملوك",
    "whyChooseUs.items.coldChain.description": "يساعد التخزين المبرد الاحترافي في الحفاظ على النضارة ودعم لوجستيات التصدير.",
    "whyChooseUs.items.traceability.title": "تتبع كامل للمنتج",
    "whyChooseUs.items.traceability.description": "يمكن تتبع كل شحنة من الزراعة والمعالجة والتعبئة حتى التصدير.",
    "whyChooseUs.items.customPackaging.title": "تعبئة مخصصة وOEM",
    "whyChooseUs.items.customPackaging.description": "تتوفر حلول تعبئة مرنة وعلامة خاصة وإنتاج OEM.",
    "whyChooseUs.items.stableSupply.title": "توريد مستقر على مدار العام",
    "whyChooseUs.items.stableSupply.description": "تساعد إدارة سلسلة التوريد المتكاملة في الحفاظ على توريد موثوق طوال العام.",
    "exportMarkets.eyebrow": "أسواق التصدير",
    "exportMarkets.title": "توريد المنتجات الزراعية للمشترين الدوليين",
    "exportMarkets.description": "ندعم العملاء في أسواق الاستيراد الرئيسية بتوريد مرن ووثائق تصدير وتنسيق لوجستي.",
    "exportMarkets.regions.middleEast.title": "الشرق الأوسط",
    "exportMarkets.regions.middleEast.countries": "الإمارات والسعودية وقطر والكويت والأسواق المحيطة",
    "exportMarkets.regions.europe.title": "أوروبا",
    "exportMarkets.regions.europe.countries": "ألمانيا وفرنسا وإسبانيا وإيطاليا وأسواق أوروبية أخرى",
    "exportMarkets.regions.asia.title": "آسيا",
    "exportMarkets.regions.asia.countries": "الصين وجنوب شرق آسيا واليابان وكوريا والموزعون الإقليميون",
    "exportMarkets.regions.africa.title": "أفريقيا",
    "exportMarkets.regions.africa.countries": "شمال أفريقيا وغرب أفريقيا وأسواق مختارة لاستيراد الأغذية",
    "exportMarkets.regions.americas.title": "الأمريكيتان",
    "exportMarkets.regions.americas.countries": "الولايات المتحدة وكندا وأمريكا اللاتينية وقنوات الجملة",
    "certificates.eyebrow": "الجودة والشهادات",
    "certificates.title": "بناء الثقة من خلال مراقبة الجودة",
    "certificates.description": "تدعم SanHe المشترين الدوليين بمعايير شهادات معترف بها وسلاسل توريد قابلة للتتبع وتخزين مبرد وفحص جودة موجه للتصدير.",
    "certificates.panel.eyebrow": "جودة SanHe",
    "certificates.panel.supportLabel": "دعم جودة التصدير",
    "certificates.panel.notice": "يجب دعم ادعاءات الجودة بسجلات فحص وشهادات ووثائق شحن فعلية.",
    "certificates.items.sgs.description": "دعم فحص طرف ثالث للمشترين الدوليين.",
    "certificates.items.haccp.description": "إدارة سلامة الغذاء للمعالجة والرقابة على التصدير.",
    "certificates.items.brc.description": "دعم المعايير الدولية لسلاسل توريد الأغذية.",
    "certificates.items.traceability.title": "تتبع كامل",
    "certificates.items.traceability.description": "يمكن تتبع المنتجات من الزراعة حتى الشحنة النهائية.",
    "certificates.items.coldChain.title": "إدارة سلسلة التبريد",
    "certificates.items.coldChain.description": "يساعد التخزين المتحكم في حرارته على الحفاظ على النضارة.",
    "certificates.items.inspection.title": "فحص الجودة",
    "certificates.items.inspection.description": "فحص ومراقبة التعبئة قبل شحنة التصدير.",
    "statistics.items.stages.label": "مراحل سلسلة التوريد المتكاملة",
    "statistics.items.categories.label": "فئات المنتجات الرئيسية",
    "statistics.items.languages.label": "لغات الموقع المدعومة",
    "statistics.items.service.label": "خدمة توريد تصدير دولية",
    "testimonials.eyebrow": "آراء المشترين",
    "testimonials.title": "موثوق لدى المستوردين والموزعين",
    "testimonials.description": "نركز على التعاون طويل الأجل والجودة المستقرة وخدمة التصدير السريعة.",
    "cta.eyebrow": "ابدأ التعاون",
    "cta.title": "هل أنت مستعد لتوريد المنتجات الزراعية؟",
    "cta.description": "سواء كنت مستورداً أو تاجر جملة أو مصنع أغذية، فنحن مستعدون لدعم أعمالك بمنتجات موثوقة وخدمة تصدير احترافية.",
    "cta.contact": "اتصل بالمبيعات",
    "cta.products": "عرض المنتجات",
    "cta.responseNote": "شارك متطلبات التوريد وسيتابع فريق التصدير خلال ساعات العمل.",
    "cta.highlights.oem": "إنتاج OEM",
    "cta.highlights.privateLabel": "علامة خاصة",
    "cta.highlights.mixedContainers": "خدمة الحاويات المختلطة",
    "cta.highlights.stableSupply": "توريد مستقر على مدار العام"
  },
  "es": {
    "navigation.home": "Inicio",
    "navigation.products": "Productos",
    "navigation.markets": "Mercados",
    "navigation.quality": "Calidad",
    "navigation.about": "Nosotros",
    "navigation.contact": "Contacto",
    "navigation.quote": "Solicitar cotización",
    "hero.badge": "Socio confiable de exportación agrícola",
    "hero.titleLine1": "Suministro agrícola confiable",
    "hero.titleLine2": "Para mercados globales",
    "hero.description": "Apoyamos a importadores, mayoristas y fabricantes de alimentos con productos agrícolas seleccionados, embalaje de exportación y logística confiable.",
    "hero.viewProducts": "Ver productos",
    "hero.contactSales": "Contactar con ventas",
    "hero.supplyChainTitle": "Cadena de suministro integrada",
    "hero.process.planting": "Bases de cultivo",
    "hero.process.processing": "Procesamiento en fábrica",
    "hero.process.coldChain": "Almacenamiento en frío",
    "hero.process.export": "Exportación global",
    "hero.trustItems.planting.title": "Bases de cultivo propias",
    "hero.trustItems.planting.description": "Calidad confiable gestionada desde el origen.",
    "hero.trustItems.processing.title": "Procesamiento directo en fábrica",
    "hero.trustItems.processing.description": "Clasificación, procesamiento y embalaje profesionales.",
    "hero.trustItems.coldChain.title": "Cadena de frío propia",
    "hero.trustItems.coldChain.description": "Conservación de la frescura durante el almacenamiento y la exportación.",
    "hero.trustItems.traceability.title": "Trazabilidad completa del producto",
    "hero.trustItems.traceability.description": "Cada envío puede rastrearse desde el cultivo hasta la entrega.",
    "featuredProducts.eyebrow": "Productos destacados",
    "featuredProducts.title": "Productos frescos, alimentos congelados y soluciones preparadas",
    "featuredProducts.description": "Explore nuestras principales categorías para compradores internacionales.",
    "featuredProducts.learnMore": "Más información",
    "featuredProducts.items.freshVegetables.name": "Verduras frescas",
    "featuredProducts.items.freshVegetables.description": "Verduras frescas para mercados globales.",
    "featuredProducts.items.freshFruits.name": "Frutas frescas",
    "featuredProducts.items.freshFruits.description": "Frutas frescas seleccionadas para compradores internacionales.",
    "featuredProducts.items.frozenFoods.name": "Alimentos congelados",
    "featuredProducts.items.frozenFoods.description": "Soluciones congeladas con suministro estable.",
    "featuredProducts.items.preparedFoods.name": "Alimentos preparados",
    "featuredProducts.items.preparedFoods.description": "Soluciones alimentarias preparadas para clientes internacionales.",
    "supplyChain.eyebrow": "Resumen de la cadena de suministro",
    "supplyChain.title": "De nuestros campos a los mercados globales",
    "supplyChain.description": "Cada envío se gestiona mediante nuestra cadena de suministro integrada, desde las bases de cultivo propias hasta la entrega global, garantizando frescura, calidad y trazabilidad completa.",
    "supplyChain.steps.planting.title": "Bases de cultivo propias",
    "supplyChain.steps.planting.description": "Calidad estable gestionada desde el origen.",
    "supplyChain.steps.processing.title": "Procesamiento en fábrica",
    "supplyChain.steps.processing.description": "Limpieza, clasificación y procesamiento bajo producción controlada.",
    "supplyChain.steps.coldChain.title": "Almacenamiento en cadena de frío",
    "supplyChain.steps.coldChain.description": "El almacenamiento profesional ayuda a conservar la frescura.",
    "supplyChain.steps.inspection.title": "Inspección de calidad y embalaje",
    "supplyChain.steps.inspection.description": "Los productos se revisan y embalan según las especificaciones del cliente.",
    "supplyChain.steps.export.title": "Exportación global",
    "supplyChain.steps.export.description": "Entrega confiable a mercados de todo el mundo.",
    "supplyChain.closing": "Al integrar cultivo, procesamiento, almacenamiento en frío y logística de exportación, SanHe ayuda a reducir riesgos y construir relaciones a largo plazo.",
    "whyChooseUs.eyebrow": "Por qué elegirnos",
    "whyChooseUs.title": "Diseñado para un comercio internacional confiable",
    "whyChooseUs.description": "Combinamos abastecimiento, control de calidad, embalaje de exportación y coordinación logística para reducir riesgos y construir relaciones de suministro duraderas.",
    "whyChooseUs.items.planting.title": "Bases de cultivo propias",
    "whyChooseUs.items.planting.description": "Los productos clave proceden de bases gestionadas, garantizando calidad estable y suministro confiable.",
    "whyChooseUs.items.processing.title": "Procesamiento directo en fábrica",
    "whyChooseUs.items.processing.description": "La limpieza, clasificación, procesamiento y embalaje se gestionan en instalaciones de producción para garantizar calidad constante.",
    "whyChooseUs.items.coldChain.title": "Almacenamiento en frío propio",
    "whyChooseUs.items.coldChain.description": "El almacenamiento profesional mantiene la frescura y apoya una logística de exportación eficiente.",
    "whyChooseUs.items.traceability.title": "Trazabilidad completa del producto",
    "whyChooseUs.items.traceability.description": "Cada envío puede rastrearse desde el cultivo y el procesamiento hasta el embalaje y la exportación.",
    "whyChooseUs.items.customPackaging.title": "Embalaje personalizado y OEM",
    "whyChooseUs.items.customPackaging.description": "Disponemos de embalaje flexible, marca privada y producción OEM.",
    "whyChooseUs.items.stableSupply.title": "Suministro estable todo el año",
    "whyChooseUs.items.stableSupply.description": "La gestión integrada de la cadena ayuda a mantener un suministro confiable durante todo el año.",
    "exportMarkets.eyebrow": "Mercados de exportación",
    "exportMarkets.title": "Suministro de productos agrícolas a compradores globales",
    "exportMarkets.description": "Apoyamos a clientes en mercados clave con suministro flexible, documentación de exportación y coordinación logística.",
    "exportMarkets.regions.middleEast.title": "Oriente Medio",
    "exportMarkets.regions.middleEast.countries": "EAU, Arabia Saudita, Catar, Kuwait y mercados cercanos",
    "exportMarkets.regions.europe.title": "Europa",
    "exportMarkets.regions.europe.countries": "Alemania, Francia, España, Italia y otros mercados europeos",
    "exportMarkets.regions.asia.title": "Asia",
    "exportMarkets.regions.asia.countries": "China, Sudeste Asiático, Japón, Corea y distribuidores regionales",
    "exportMarkets.regions.africa.title": "África",
    "exportMarkets.regions.africa.countries": "Norte y oeste de África y mercados seleccionados de importación de alimentos",
    "exportMarkets.regions.americas.title": "América",
    "exportMarkets.regions.americas.countries": "Estados Unidos, Canadá, América Latina y canales mayoristas",
    "certificates.eyebrow": "Calidad y certificaciones",
    "certificates.title": "Generamos confianza mediante el control de calidad",
    "certificates.description": "SanHe apoya a compradores globales con estándares reconocidos, cadenas trazables, almacenamiento en frío e inspección orientada a la exportación.",
    "certificates.panel.eyebrow": "Calidad SanHe",
    "certificates.panel.supportLabel": "Apoyo de calidad para exportación",
    "certificates.panel.notice": "Las afirmaciones de calidad deben respaldarse con registros de inspección, certificados y documentos de envío reales.",
    "certificates.items.sgs.description": "Apoyo de inspección de terceros para compradores internacionales.",
    "certificates.items.haccp.description": "Gestión de seguridad alimentaria para procesamiento y control de exportación.",
    "certificates.items.brc.description": "Apoyo de estándares internacionales para cadenas alimentarias.",
    "certificates.items.traceability.title": "Trazabilidad completa",
    "certificates.items.traceability.description": "Los productos pueden rastrearse desde el cultivo hasta el envío final.",
    "certificates.items.coldChain.title": "Gestión de la cadena de frío",
    "certificates.items.coldChain.description": "El almacenamiento con temperatura controlada ayuda a conservar la frescura.",
    "certificates.items.inspection.title": "Inspección de calidad",
    "certificates.items.inspection.description": "Inspección y control del embalaje antes del envío de exportación.",
    "statistics.items.stages.label": "Etapas de la cadena de suministro integrada",
    "statistics.items.categories.label": "Categorías principales de productos",
    "statistics.items.languages.label": "Idiomas compatibles del sitio",
    "statistics.items.service.label": "Servicio internacional de suministro para exportación",
    "testimonials.eyebrow": "Opiniones de compradores",
    "testimonials.title": "La confianza de importadores y distribuidores",
    "testimonials.description": "Nos centramos en la cooperación a largo plazo, la calidad estable y un servicio de exportación ágil.",
    "cta.eyebrow": "Iniciar cooperación",
    "cta.title": "¿Listo para abastecerse de productos agrícolas?",
    "cta.description": "Tanto si es importador, mayorista o fabricante, estamos preparados para apoyar su negocio con productos confiables y servicio profesional de exportación.",
    "cta.contact": "Contactar con ventas",
    "cta.products": "Ver productos",
    "cta.responseNote": "Comparta sus requisitos y nuestro equipo de exportación responderá durante el horario laboral.",
    "cta.highlights.oem": "Producción OEM",
    "cta.highlights.privateLabel": "Marca privada",
    "cta.highlights.mixedContainers": "Servicio de contenedor mixto",
    "cta.highlights.stableSupply": "Suministro estable todo el año"
  },
  "fr": {
    "navigation.home": "Accueil",
    "navigation.products": "Produits",
    "navigation.markets": "Marchés",
    "navigation.quality": "Qualité",
    "navigation.about": "À propos",
    "navigation.contact": "Contact",
    "navigation.quote": "Demander un devis",
    "hero.badge": "Partenaire fiable pour l’exportation agricole",
    "hero.titleLine1": "Approvisionnement agricole fiable",
    "hero.titleLine2": "Pour les marchés mondiaux",
    "hero.description": "Nous accompagnons les importateurs, grossistes et fabricants avec des produits agricoles sélectionnés, un emballage export et une logistique fiable.",
    "hero.viewProducts": "Voir les produits",
    "hero.contactSales": "Contacter le service commercial",
    "hero.supplyChainTitle": "Chaîne d’approvisionnement intégrée",
    "hero.process.planting": "Bases de culture",
    "hero.process.processing": "Transformation en usine",
    "hero.process.coldChain": "Stockage frigorifique",
    "hero.process.export": "Exportation mondiale",
    "hero.trustItems.planting.title": "Bases de culture propres",
    "hero.trustItems.planting.description": "Une qualité fiable gérée dès l’origine.",
    "hero.trustItems.processing.title": "Transformation directe en usine",
    "hero.trustItems.processing.description": "Calibrage, transformation et emballage professionnels.",
    "hero.trustItems.coldChain.title": "Chaîne du froid en propre",
    "hero.trustItems.coldChain.description": "Préservation de la fraîcheur pendant le stockage et l’exportation.",
    "hero.trustItems.traceability.title": "Traçabilité complète des produits",
    "hero.trustItems.traceability.description": "Chaque expédition est traçable de la culture à la livraison.",
    "featuredProducts.eyebrow": "Produits vedettes",
    "featuredProducts.title": "Produits frais, aliments surgelés et solutions préparées",
    "featuredProducts.description": "Découvrez nos principales catégories destinées aux acheteurs internationaux.",
    "featuredProducts.learnMore": "En savoir plus",
    "featuredProducts.items.freshVegetables.name": "Légumes frais",
    "featuredProducts.items.freshVegetables.description": "Légumes frais destinés aux marchés mondiaux.",
    "featuredProducts.items.freshFruits.name": "Fruits frais",
    "featuredProducts.items.freshFruits.description": "Fruits frais sélectionnés pour les acheteurs internationaux.",
    "featuredProducts.items.frozenFoods.name": "Aliments surgelés",
    "featuredProducts.items.frozenFoods.description": "Solutions surgelées avec approvisionnement stable.",
    "featuredProducts.items.preparedFoods.name": "Produits préparés",
    "featuredProducts.items.preparedFoods.description": "Solutions alimentaires préparées pour les clients internationaux.",
    "supplyChain.eyebrow": "Vue d’ensemble de la chaîne d’approvisionnement",
    "supplyChain.title": "De nos champs aux marchés mondiaux",
    "supplyChain.description": "Chaque expédition est gérée au moyen de notre chaîne intégrée, de nos bases de culture à la livraison mondiale, afin de garantir fraîcheur, qualité et traçabilité.",
    "supplyChain.steps.planting.title": "Bases de culture propres",
    "supplyChain.steps.planting.description": "Une qualité stable gérée dès l’origine.",
    "supplyChain.steps.processing.title": "Transformation en usine",
    "supplyChain.steps.processing.description": "Nettoyage, calibrage et transformation sous production contrôlée.",
    "supplyChain.steps.coldChain.title": "Entreposage frigorifique",
    "supplyChain.steps.coldChain.description": "Un stockage professionnel aide à préserver la fraîcheur.",
    "supplyChain.steps.inspection.title": "Inspection qualité et emballage",
    "supplyChain.steps.inspection.description": "Les produits sont contrôlés et emballés selon les spécifications du client.",
    "supplyChain.steps.export.title": "Exportation mondiale",
    "supplyChain.steps.export.description": "Livraison fiable sur les marchés du monde entier.",
    "supplyChain.closing": "En intégrant culture, transformation, stockage frigorifique et logistique export, SanHe aide les clients à réduire les risques et à bâtir des partenariats durables.",
    "whyChooseUs.eyebrow": "Pourquoi nous choisir",
    "whyChooseUs.title": "Conçu pour un commerce international fiable",
    "whyChooseUs.description": "Nous combinons approvisionnement, contrôle qualité, emballage export et coordination logistique afin de réduire les risques et bâtir des relations durables.",
    "whyChooseUs.items.planting.title": "Bases de culture propres",
    "whyChooseUs.items.planting.description": "Les produits clés proviennent de bases gérées, garantissant une qualité stable et un approvisionnement fiable.",
    "whyChooseUs.items.processing.title": "Transformation directe en usine",
    "whyChooseUs.items.processing.description": "Nettoyage, calibrage, transformation et emballage sont gérés par les sites de production pour assurer une qualité constante.",
    "whyChooseUs.items.coldChain.title": "Stockage frigorifique en propre",
    "whyChooseUs.items.coldChain.description": "Le stockage professionnel préserve la fraîcheur et facilite une logistique export efficace.",
    "whyChooseUs.items.traceability.title": "Traçabilité complète des produits",
    "whyChooseUs.items.traceability.description": "Chaque expédition est traçable de la culture et la transformation jusqu’à l’emballage et l’exportation.",
    "whyChooseUs.items.customPackaging.title": "Emballage personnalisé et OEM",
    "whyChooseUs.items.customPackaging.description": "Des solutions d’emballage flexibles, de marque privée et de production OEM sont disponibles.",
    "whyChooseUs.items.stableSupply.title": "Approvisionnement stable toute l’année",
    "whyChooseUs.items.stableSupply.description": "La gestion intégrée de la chaîne aide à maintenir un approvisionnement fiable toute l’année.",
    "exportMarkets.eyebrow": "Marchés d’exportation",
    "exportMarkets.title": "Fournir des produits agricoles aux acheteurs mondiaux",
    "exportMarkets.description": "Nous accompagnons les clients sur les principaux marchés avec un approvisionnement flexible, des documents export et une coordination logistique.",
    "exportMarkets.regions.middleEast.title": "Moyen-Orient",
    "exportMarkets.regions.middleEast.countries": "Émirats arabes unis, Arabie saoudite, Qatar, Koweït et marchés voisins",
    "exportMarkets.regions.europe.title": "Europe",
    "exportMarkets.regions.europe.countries": "Allemagne, France, Espagne, Italie et autres marchés européens",
    "exportMarkets.regions.asia.title": "Asie",
    "exportMarkets.regions.asia.countries": "Chine, Asie du Sud-Est, Japon, Corée et distributeurs régionaux",
    "exportMarkets.regions.africa.title": "Afrique",
    "exportMarkets.regions.africa.countries": "Afrique du Nord, Afrique de l’Ouest et marchés sélectionnés d’importation alimentaire",
    "exportMarkets.regions.americas.title": "Amériques",
    "exportMarkets.regions.americas.countries": "États-Unis, Canada, Amérique latine et circuits de gros",
    "certificates.eyebrow": "Qualité et certifications",
    "certificates.title": "Renforcer la confiance grâce au contrôle qualité",
    "certificates.description": "SanHe accompagne les acheteurs avec des normes reconnues, des chaînes traçables, un stockage frigorifique et une inspection orientée export.",
    "certificates.panel.eyebrow": "Qualité SanHe",
    "certificates.panel.supportLabel": "Support qualité à l’export",
    "certificates.panel.notice": "Les déclarations de qualité doivent être étayées par des rapports d’inspection, certificats et documents d’expédition réels.",
    "certificates.items.sgs.description": "Support d’inspection par un tiers pour les acheteurs internationaux.",
    "certificates.items.haccp.description": "Gestion de la sécurité alimentaire pour la transformation et le contrôle export.",
    "certificates.items.brc.description": "Support des normes internationales pour les chaînes alimentaires.",
    "certificates.items.traceability.title": "Traçabilité complète",
    "certificates.items.traceability.description": "Les produits sont traçables de la culture à l’expédition finale.",
    "certificates.items.coldChain.title": "Gestion de la chaîne du froid",
    "certificates.items.coldChain.description": "Le stockage à température contrôlée aide à préserver la fraîcheur.",
    "certificates.items.inspection.title": "Inspection qualité",
    "certificates.items.inspection.description": "Inspection et contrôle de l’emballage avant expédition.",
    "statistics.items.stages.label": "Étapes de la chaîne d’approvisionnement intégrée",
    "statistics.items.categories.label": "Principales catégories de produits",
    "statistics.items.languages.label": "Langues prises en charge par le site",
    "statistics.items.service.label": "Service international d’approvisionnement export",
    "testimonials.eyebrow": "Avis des acheteurs",
    "testimonials.title": "La confiance des importateurs et distributeurs",
    "testimonials.description": "Nous privilégions la coopération à long terme, une qualité stable et un service export réactif.",
    "cta.eyebrow": "Commencer une coopération",
    "cta.title": "Prêt à vous approvisionner en produits agricoles ?",
    "cta.description": "Que vous soyez importateur, grossiste ou fabricant, nous sommes prêts à soutenir votre activité avec des produits fiables et un service export professionnel.",
    "cta.contact": "Contacter le service commercial",
    "cta.products": "Voir les produits",
    "cta.responseNote": "Partagez vos besoins et notre équipe export vous répondra pendant les heures ouvrables.",
    "cta.highlights.oem": "Production OEM",
    "cta.highlights.privateLabel": "Marque privée",
    "cta.highlights.mixedContainers": "Service de conteneur mixte",
    "cta.highlights.stableSupply": "Approvisionnement stable toute l’année"
  }
};

const commonExtras = {
  ru: {
    learnMore: "Подробнее",
    viewDetails: "Подробнее",
    viewProducts: "Посмотреть продукцию",
    contactSales: "Связаться с отделом продаж",
    backHome: "Вернуться на главную",
    loading: "Загрузка...",
    noResults: "Результаты не найдены",
    readMore: "Читать далее"
  },
  ar: {
    learnMore: "اعرف المزيد",
    viewDetails: "عرض التفاصيل",
    viewProducts: "عرض المنتجات",
    contactSales: "اتصل بالمبيعات",
    backHome: "العودة إلى الرئيسية",
    loading: "جارٍ التحميل...",
    noResults: "لم يتم العثور على نتائج",
    readMore: "اقرأ المزيد"
  },
  es: {
    learnMore: "Más información",
    viewDetails: "Ver detalles",
    viewProducts: "Ver productos",
    contactSales: "Contactar con ventas",
    backHome: "Volver al inicio",
    loading: "Cargando...",
    noResults: "No se encontraron resultados",
    readMore: "Leer más"
  },
  fr: {
    learnMore: "En savoir plus",
    viewDetails: "Voir les détails",
    viewProducts: "Voir les produits",
    contactSales: "Contacter le service commercial",
    backHome: "Retour à l’accueil",
    loading: "Chargement...",
    noResults: "Aucun résultat trouvé",
    readMore: "Lire la suite"
  }
};

function setByPath(target, dottedPath, value) {
  const parts = dottedPath.split(".");
  let current = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i];
    if (!current[key] || typeof current[key] !== "object") {
      throw new Error(`Missing path segment: ${dottedPath}`);
    }
    current = current[key];
  }
  current[parts[parts.length - 1]] = value;
}

if (!fs.existsSync(commonSourcePath)) {
  throw new Error(`English source file not found: ${commonSourcePath}`);
}

if (!fs.existsSync(homeSourcePath)) {
  throw new Error(`English source file not found: ${homeSourcePath}`);
}

const commonSource = JSON.parse(
  fs.readFileSync(commonSourcePath, "utf8")
);

const homeSource = JSON.parse(
  fs.readFileSync(homeSourcePath, "utf8")
);

for (const [locale, values] of Object.entries(translations)) {
  const commonLocalized = JSON.parse(
    JSON.stringify(commonSource)
  );

  const homeLocalized = JSON.parse(
    JSON.stringify(homeSource)
  );

  for (const [key, value] of Object.entries(values)) {
    if (key.startsWith("navigation.")) {
      setByPath(commonLocalized, key, value);
      continue;
    }

    setByPath(homeLocalized, key, value);
  }

  Object.assign(
    commonLocalized,
    commonExtras[locale] ?? {}
  );

  const commonTargetPath = path.join(
    root,
    "src",
    "messages",
    locale,
    "common.json"
  );

  const homeTargetPath = path.join(
    root,
    "src",
    "messages",
    locale,
    "home.json"
  );

  const commonBackupPath =
    `${commonTargetPath}.before-final-i18n-sync`;

  const homeBackupPath =
    `${homeTargetPath}.before-final-i18n-sync`;

  if (
    fs.existsSync(commonTargetPath) &&
    !fs.existsSync(commonBackupPath)
  ) {
    fs.copyFileSync(
      commonTargetPath,
      commonBackupPath
    );
    console.log(
      `Backup created: ${commonBackupPath}`
    );
  }

  if (
    fs.existsSync(homeTargetPath) &&
    !fs.existsSync(homeBackupPath)
  ) {
    fs.copyFileSync(
      homeTargetPath,
      homeBackupPath
    );
    console.log(
      `Backup created: ${homeBackupPath}`
    );
  }

  fs.writeFileSync(
    commonTargetPath,
    JSON.stringify(commonLocalized, null, 2) + "\n",
    "utf8"
  );

  fs.writeFileSync(
    homeTargetPath,
    JSON.stringify(homeLocalized, null, 2) + "\n",
    "utf8"
  );

  JSON.parse(
    fs.readFileSync(commonTargetPath, "utf8")
  );

  JSON.parse(
    fs.readFileSync(homeTargetPath, "utf8")
  );

  console.log(
    `Generated: ${locale}/common.json`
  );

  console.log(
    `Generated: ${locale}/home.json`
  );
}

console.log(
  "\nFinal common and home translations generated successfully."
);