const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sourcePath = path.join(root, "src", "messages", "en", "contact.json");

const dictionaries = {
  ru: {
    "Request a Quote": "Запросить предложение",
    "Tell Us Your Sourcing Requirements": "Расскажите нам о ваших требованиях к закупке",
    "Share your product, packaging, quantity and destination market requirements. Our export team will help you prepare a suitable supply solution.": "Укажите требования к продукции, упаковке, объёму и рынку назначения. Наша экспортная команда поможет подготовить подходящее решение по поставке.",
    "Inquiry Form": "Форма запроса",
    "Selected Product": "Выбранный продукт",
    "Your information is kept confidential and used only for communication regarding your inquiry.": "Ваша информация хранится конфиденциально и используется только для связи по вашему запросу.",
    "Your Name": "Ваше имя",
    "Email Address": "Адрес электронной почты",
    "Company Name": "Название компании",
    "Destination Country / Market": "Страна / рынок назначения",
    "Germany / UAE / Saudi Arabia": "Германия / ОАЭ / Саудовская Аравия",
    "Product Category": "Категория продукции",
    "Select Product Category": "Выберите категорию продукции",
    "Product": "Продукт",
    "Select Product": "Выберите продукт",
    "Select category first": "Сначала выберите категорию",
    "Estimated Quantity": "Предполагаемый объём",
    "1 x 40HQ / Long-term cooperation": "1 × 40HQ / долгосрочное сотрудничество",
    "Packaging Preference": "Предпочтительная упаковка",
    "10kg Carton / Mesh Bag / Private Label": "Картон 10 кг / сетчатый мешок / частная марка",
    "Detailed Requirements": "Подробные требования",
    "Tell us your product, quantity, packaging and delivery requirements.": "Укажите продукт, объём, упаковку и требования к доставке.",
    "I would like to request a quote for {product}.": "Я хотел(а) бы запросить предложение на {product}.",
    "Additional Services": "Дополнительные услуги",
    "OEM Production": "OEM-производство",
    "Private Label": "Частная торговая марка",
    "Customized Packaging": "Индивидуальная упаковка",
    "Mixed Container": "Смешанная загрузка контейнера",
    "Submit Inquiry": "Отправить запрос",
    "Submitting...": "Отправка...",
    "Please review the required fields and make sure the information is complete.": "Проверьте обязательные поля и убедитесь, что информация заполнена полностью.",
    "We could not send your inquiry at this time. Please try again or contact our export team directly.": "Сейчас не удалось отправить запрос. Повторите попытку или свяжитесь напрямую с нашей экспортной командой.",
    "Export Team": "Экспортная команда",
    "Email": "Электронная почта",
    "Phone": "Телефон",
    "WhatsApp": "WhatsApp",
    "Address": "Адрес",
    "Response Time": "Время ответа",
    "Why Global Buyers Choose SanHe": "Почему международные покупатели выбирают SanHe",
    "Own planting bases for key products": "Собственные базы выращивания ключевых продуктов",
    "Factory processing and export packing": "Заводская переработка и экспортная упаковка",
    "Self-owned cold chain warehousing": "Собственные склады холодовой цепи",
    "Full quality traceability": "Полная прослеживаемость качества",
    "OEM, private label and mixed containers": "OEM, частная марка и смешанные контейнеры",
    "SGS / HACCP / BRC certification support": "Поддержка сертификации SGS / HACCP / BRC",
    "Inquiry Received": "Запрос получен",
    "Thank You for Your Inquiry": "Спасибо за ваш запрос",
    "Your request has been received. Our export team will review the information and contact you as soon as possible during business hours.": "Ваш запрос получен. Наша экспортная команда проверит информацию и свяжется с вами в ближайшее рабочее время.",
    "Browse More Products": "Посмотреть другие продукты",
    "Back to Homepage": "Вернуться на главную",
    "What Happens Next": "Что будет дальше",
    "Our Team Will Review Your Requirements": "Наша команда рассмотрит ваши требования",
    "We will use the information you provided to prepare the next steps for product sourcing and quotation.": "Мы используем предоставленную информацию, чтобы подготовить следующие шаги по подбору продукции и расчёту предложения.",
    "Requirement Review": "Проверка требований",
    "We review the selected product, estimated quantity, packaging and destination market.": "Мы проверим выбранный продукт, предполагаемый объём, упаковку и рынок назначения.",
    "Export Team Contact": "Связь с экспортной командой",
    "A team member will contact you if additional product or shipment information is required.": "Сотрудник команды свяжется с вами, если потребуется дополнительная информация о продукте или отправке.",
    "Supply Solution": "Решение по поставке",
    "We prepare a suitable product, packing and export supply proposal for further discussion.": "Мы подготовим подходящее предложение по продукту, упаковке и экспортной поставке для дальнейшего обсуждения.",
    "Need to add more information?": "Нужно добавить информацию?",
    "You can return to the inquiry page and submit additional product or sourcing requirements.": "Вы можете вернуться на страницу запроса и отправить дополнительные требования к продукции или закупке.",
    "Submit Another Inquiry": "Отправить ещё один запрос"
  },

  ar: {
    "Request a Quote": "طلب عرض سعر",
    "Tell Us Your Sourcing Requirements": "أخبرنا بمتطلبات التوريد الخاصة بك",
    "Share your product, packaging, quantity and destination market requirements. Our export team will help you prepare a suitable supply solution.": "شاركنا متطلبات المنتج والتعبئة والكمية وسوق الوجهة، وسيساعدك فريق التصدير لدينا في إعداد حل توريد مناسب.",
    "Inquiry Form": "نموذج الاستفسار",
    "Selected Product": "المنتج المحدد",
    "Your information is kept confidential and used only for communication regarding your inquiry.": "تُحفظ معلوماتك بسرية وتُستخدم فقط للتواصل بشأن استفسارك.",
    "Your Name": "اسمك",
    "Email Address": "البريد الإلكتروني",
    "Company Name": "اسم الشركة",
    "Destination Country / Market": "دولة / سوق الوجهة",
    "Germany / UAE / Saudi Arabia": "ألمانيا / الإمارات / السعودية",
    "Product Category": "فئة المنتج",
    "Select Product Category": "اختر فئة المنتج",
    "Product": "المنتج",
    "Select Product": "اختر المنتج",
    "Select category first": "اختر الفئة أولاً",
    "Estimated Quantity": "الكمية التقديرية",
    "1 x 40HQ / Long-term cooperation": "حاوية 40HQ واحدة / تعاون طويل الأجل",
    "Packaging Preference": "تفضيل التعبئة",
    "10kg Carton / Mesh Bag / Private Label": "كرتون 10 كجم / كيس شبكي / علامة خاصة",
    "Detailed Requirements": "المتطلبات التفصيلية",
    "Tell us your product, quantity, packaging and delivery requirements.": "أخبرنا بالمنتج والكمية والتعبئة ومتطلبات التسليم.",
    "I would like to request a quote for {product}.": "أود طلب عرض سعر لمنتج {product}.",
    "Additional Services": "خدمات إضافية",
    "OEM Production": "إنتاج OEM",
    "Private Label": "علامة خاصة",
    "Customized Packaging": "تعبئة مخصصة",
    "Mixed Container": "حاوية مختلطة",
    "Submit Inquiry": "إرسال الاستفسار",
    "Submitting...": "جارٍ الإرسال...",
    "Please review the required fields and make sure the information is complete.": "يرجى مراجعة الحقول المطلوبة والتأكد من اكتمال المعلومات.",
    "We could not send your inquiry at this time. Please try again or contact our export team directly.": "تعذر إرسال استفسارك حالياً. يرجى المحاولة مرة أخرى أو التواصل مباشرة مع فريق التصدير.",
    "Export Team": "فريق التصدير",
    "Email": "البريد الإلكتروني",
    "Phone": "الهاتف",
    "WhatsApp": "واتساب",
    "Address": "العنوان",
    "Response Time": "وقت الاستجابة",
    "Why Global Buyers Choose SanHe": "لماذا يختار المشترون الدوليون SanHe",
    "Own planting bases for key products": "قواعد زراعة مملوكة للمنتجات الرئيسية",
    "Factory processing and export packing": "معالجة في المصنع وتعبئة للتصدير",
    "Self-owned cold chain warehousing": "مستودعات سلسلة تبريد مملوكة",
    "Full quality traceability": "تتبع كامل للجودة",
    "OEM, private label and mixed containers": "OEM وعلامة خاصة وحاويات مختلطة",
    "SGS / HACCP / BRC certification support": "دعم شهادات SGS / HACCP / BRC",
    "Inquiry Received": "تم استلام الاستفسار",
    "Thank You for Your Inquiry": "شكراً لاستفسارك",
    "Your request has been received. Our export team will review the information and contact you as soon as possible during business hours.": "تم استلام طلبك. سيراجع فريق التصدير المعلومات ويتواصل معك في أقرب وقت ممكن خلال ساعات العمل.",
    "Browse More Products": "استعراض المزيد من المنتجات",
    "Back to Homepage": "العودة إلى الصفحة الرئيسية",
    "What Happens Next": "ماذا يحدث بعد ذلك",
    "Our Team Will Review Your Requirements": "سيراجع فريقنا متطلباتك",
    "We will use the information you provided to prepare the next steps for product sourcing and quotation.": "سنستخدم المعلومات التي قدمتها لإعداد الخطوات التالية لتوريد المنتج وعرض السعر.",
    "Requirement Review": "مراجعة المتطلبات",
    "We review the selected product, estimated quantity, packaging and destination market.": "نراجع المنتج المحدد والكمية التقديرية والتعبئة وسوق الوجهة.",
    "Export Team Contact": "تواصل فريق التصدير",
    "A team member will contact you if additional product or shipment information is required.": "سيتواصل معك أحد أعضاء الفريق إذا كانت هناك حاجة إلى معلومات إضافية عن المنتج أو الشحنة.",
    "Supply Solution": "حل التوريد",
    "We prepare a suitable product, packing and export supply proposal for further discussion.": "نُعد مقترحاً مناسباً للمنتج والتعبئة والتوريد التصديري لمزيد من المناقشة.",
    "Need to add more information?": "هل تحتاج إلى إضافة معلومات؟",
    "You can return to the inquiry page and submit additional product or sourcing requirements.": "يمكنك العودة إلى صفحة الاستفسار وإرسال متطلبات إضافية للمنتج أو التوريد.",
    "Submit Another Inquiry": "إرسال استفسار آخر"
  },

  es: {
    "Request a Quote": "Solicitar cotización",
    "Tell Us Your Sourcing Requirements": "Cuéntenos sus requisitos de abastecimiento",
    "Share your product, packaging, quantity and destination market requirements. Our export team will help you prepare a suitable supply solution.": "Comparta sus requisitos de producto, embalaje, cantidad y mercado de destino. Nuestro equipo de exportación le ayudará a preparar una solución de suministro adecuada.",
    "Inquiry Form": "Formulario de consulta",
    "Selected Product": "Producto seleccionado",
    "Your information is kept confidential and used only for communication regarding your inquiry.": "Su información se mantiene confidencial y solo se utiliza para comunicarnos sobre su consulta.",
    "Your Name": "Su nombre",
    "Email Address": "Correo electrónico",
    "Company Name": "Nombre de la empresa",
    "Destination Country / Market": "País / mercado de destino",
    "Germany / UAE / Saudi Arabia": "Alemania / EAU / Arabia Saudita",
    "Product Category": "Categoría de producto",
    "Select Product Category": "Seleccione una categoría",
    "Product": "Producto",
    "Select Product": "Seleccione un producto",
    "Select category first": "Seleccione primero una categoría",
    "Estimated Quantity": "Cantidad estimada",
    "1 x 40HQ / Long-term cooperation": "1 × 40HQ / cooperación a largo plazo",
    "Packaging Preference": "Preferencia de embalaje",
    "10kg Carton / Mesh Bag / Private Label": "Caja de 10 kg / saco de malla / marca privada",
    "Detailed Requirements": "Requisitos detallados",
    "Tell us your product, quantity, packaging and delivery requirements.": "Indíquenos el producto, la cantidad, el embalaje y los requisitos de entrega.",
    "I would like to request a quote for {product}.": "Me gustaría solicitar una cotización para {product}.",
    "Additional Services": "Servicios adicionales",
    "OEM Production": "Producción OEM",
    "Private Label": "Marca privada",
    "Customized Packaging": "Embalaje personalizado",
    "Mixed Container": "Contenedor mixto",
    "Submit Inquiry": "Enviar consulta",
    "Submitting...": "Enviando...",
    "Please review the required fields and make sure the information is complete.": "Revise los campos obligatorios y asegúrese de que la información esté completa.",
    "We could not send your inquiry at this time. Please try again or contact our export team directly.": "No pudimos enviar su consulta en este momento. Inténtelo de nuevo o contacte directamente con nuestro equipo de exportación.",
    "Export Team": "Equipo de exportación",
    "Email": "Correo electrónico",
    "Phone": "Teléfono",
    "WhatsApp": "WhatsApp",
    "Address": "Dirección",
    "Response Time": "Tiempo de respuesta",
    "Why Global Buyers Choose SanHe": "Por qué los compradores internacionales eligen SanHe",
    "Own planting bases for key products": "Bases de cultivo propias para productos clave",
    "Factory processing and export packing": "Procesamiento en fábrica y embalaje de exportación",
    "Self-owned cold chain warehousing": "Almacenamiento propio en cadena de frío",
    "Full quality traceability": "Trazabilidad completa de la calidad",
    "OEM, private label and mixed containers": "OEM, marca privada y contenedores mixtos",
    "SGS / HACCP / BRC certification support": "Apoyo para certificaciones SGS / HACCP / BRC",
    "Inquiry Received": "Consulta recibida",
    "Thank You for Your Inquiry": "Gracias por su consulta",
    "Your request has been received. Our export team will review the information and contact you as soon as possible during business hours.": "Hemos recibido su solicitud. Nuestro equipo de exportación revisará la información y se pondrá en contacto con usted lo antes posible durante el horario laboral.",
    "Browse More Products": "Ver más productos",
    "Back to Homepage": "Volver al inicio",
    "What Happens Next": "Qué ocurre después",
    "Our Team Will Review Your Requirements": "Nuestro equipo revisará sus requisitos",
    "We will use the information you provided to prepare the next steps for product sourcing and quotation.": "Utilizaremos la información proporcionada para preparar los siguientes pasos del abastecimiento y la cotización.",
    "Requirement Review": "Revisión de requisitos",
    "We review the selected product, estimated quantity, packaging and destination market.": "Revisamos el producto seleccionado, la cantidad estimada, el embalaje y el mercado de destino.",
    "Export Team Contact": "Contacto del equipo de exportación",
    "A team member will contact you if additional product or shipment information is required.": "Un miembro del equipo se pondrá en contacto con usted si se necesita información adicional sobre el producto o el envío.",
    "Supply Solution": "Solución de suministro",
    "We prepare a suitable product, packing and export supply proposal for further discussion.": "Preparamos una propuesta adecuada de producto, embalaje y suministro de exportación para continuar la conversación.",
    "Need to add more information?": "¿Necesita añadir más información?",
    "You can return to the inquiry page and submit additional product or sourcing requirements.": "Puede volver a la página de consulta y enviar requisitos adicionales de producto o abastecimiento.",
    "Submit Another Inquiry": "Enviar otra consulta"
  },

  fr: {
    "Request a Quote": "Demander un devis",
    "Tell Us Your Sourcing Requirements": "Présentez-nous vos besoins d’approvisionnement",
    "Share your product, packaging, quantity and destination market requirements. Our export team will help you prepare a suitable supply solution.": "Indiquez-nous vos exigences concernant le produit, l’emballage, la quantité et le marché de destination. Notre équipe export vous aidera à préparer une solution d’approvisionnement adaptée.",
    "Inquiry Form": "Formulaire de demande",
    "Selected Product": "Produit sélectionné",
    "Your information is kept confidential and used only for communication regarding your inquiry.": "Vos informations restent confidentielles et sont utilisées uniquement pour communiquer au sujet de votre demande.",
    "Your Name": "Votre nom",
    "Email Address": "Adresse e-mail",
    "Company Name": "Nom de l’entreprise",
    "Destination Country / Market": "Pays / marché de destination",
    "Germany / UAE / Saudi Arabia": "Allemagne / Émirats arabes unis / Arabie saoudite",
    "Product Category": "Catégorie de produit",
    "Select Product Category": "Sélectionnez une catégorie",
    "Product": "Produit",
    "Select Product": "Sélectionnez un produit",
    "Select category first": "Sélectionnez d’abord une catégorie",
    "Estimated Quantity": "Quantité estimée",
    "1 x 40HQ / Long-term cooperation": "1 × 40HQ / coopération à long terme",
    "Packaging Preference": "Préférence d’emballage",
    "10kg Carton / Mesh Bag / Private Label": "Carton de 10 kg / sac en maille / marque privée",
    "Detailed Requirements": "Exigences détaillées",
    "Tell us your product, quantity, packaging and delivery requirements.": "Indiquez-nous le produit, la quantité, l’emballage et les exigences de livraison.",
    "I would like to request a quote for {product}.": "Je souhaite demander un devis pour {product}.",
    "Additional Services": "Services supplémentaires",
    "OEM Production": "Production OEM",
    "Private Label": "Marque privée",
    "Customized Packaging": "Emballage personnalisé",
    "Mixed Container": "Conteneur mixte",
    "Submit Inquiry": "Envoyer la demande",
    "Submitting...": "Envoi en cours...",
    "Please review the required fields and make sure the information is complete.": "Vérifiez les champs obligatoires et assurez-vous que les informations sont complètes.",
    "We could not send your inquiry at this time. Please try again or contact our export team directly.": "Nous n’avons pas pu envoyer votre demande pour le moment. Réessayez ou contactez directement notre équipe export.",
    "Export Team": "Équipe export",
    "Email": "E-mail",
    "Phone": "Téléphone",
    "WhatsApp": "WhatsApp",
    "Address": "Adresse",
    "Response Time": "Délai de réponse",
    "Why Global Buyers Choose SanHe": "Pourquoi les acheteurs internationaux choisissent SanHe",
    "Own planting bases for key products": "Bases de culture propres pour les produits clés",
    "Factory processing and export packing": "Transformation en usine et emballage export",
    "Self-owned cold chain warehousing": "Entreposage frigorifique en propre",
    "Full quality traceability": "Traçabilité complète de la qualité",
    "OEM, private label and mixed containers": "OEM, marque privée et conteneurs mixtes",
    "SGS / HACCP / BRC certification support": "Support des certifications SGS / HACCP / BRC",
    "Inquiry Received": "Demande reçue",
    "Thank You for Your Inquiry": "Merci pour votre demande",
    "Your request has been received. Our export team will review the information and contact you as soon as possible during business hours.": "Votre demande a bien été reçue. Notre équipe export examinera les informations et vous contactera dès que possible pendant les heures ouvrables.",
    "Browse More Products": "Voir plus de produits",
    "Back to Homepage": "Retour à l’accueil",
    "What Happens Next": "La suite du processus",
    "Our Team Will Review Your Requirements": "Notre équipe examinera vos besoins",
    "We will use the information you provided to prepare the next steps for product sourcing and quotation.": "Nous utiliserons les informations fournies pour préparer les prochaines étapes de l’approvisionnement et du devis.",
    "Requirement Review": "Examen des besoins",
    "We review the selected product, estimated quantity, packaging and destination market.": "Nous examinons le produit sélectionné, la quantité estimée, l’emballage et le marché de destination.",
    "Export Team Contact": "Contact de l’équipe export",
    "A team member will contact you if additional product or shipment information is required.": "Un membre de l’équipe vous contactera si des informations supplémentaires sur le produit ou l’expédition sont nécessaires.",
    "Supply Solution": "Solution d’approvisionnement",
    "We prepare a suitable product, packing and export supply proposal for further discussion.": "Nous préparons une proposition adaptée concernant le produit, l’emballage et l’approvisionnement export pour poursuivre les échanges.",
    "Need to add more information?": "Besoin d’ajouter des informations ?",
    "You can return to the inquiry page and submit additional product or sourcing requirements.": "Vous pouvez revenir à la page de demande et envoyer des exigences supplémentaires concernant le produit ou l’approvisionnement.",
    "Submit Another Inquiry": "Envoyer une autre demande"
  }
};

function translateValue(value, dictionary) {
  if (Array.isArray(value)) {
    return value.map((item) => translateValue(item, dictionary));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        translateValue(item, dictionary)
      ])
    );
  }

  if (typeof value === "string") {
    return dictionary[value] ?? value;
  }

  return value;
}

if (!fs.existsSync(sourcePath)) {
  throw new Error(`English source file not found: ${sourcePath}`);
}

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

for (const [locale, dictionary] of Object.entries(dictionaries)) {
  const targetPath = path.join(
    root,
    "src",
    "messages",
    locale,
    "contact.json"
  );

  const backupPath = `${targetPath}.before-contact-translation`;

  if (fs.existsSync(targetPath) && !fs.existsSync(backupPath)) {
    fs.copyFileSync(targetPath, backupPath);
    console.log(`Backup created: ${backupPath}`);
  }

  const translated = translateValue(source, dictionary);

  fs.writeFileSync(
    targetPath,
    JSON.stringify(translated, null, 2) + "\n",
    "utf8"
  );

  JSON.parse(fs.readFileSync(targetPath, "utf8"));
  console.log(`Generated: ${locale}/contact.json`);
}

console.log("\nContact translations generated successfully.");