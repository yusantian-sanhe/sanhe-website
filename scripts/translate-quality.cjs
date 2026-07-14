const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "src", "messages", "en", "quality.json");

const translations = {
  "ru": {
    "Quality Control": "Контроль качества",
    "Reliable Standards for Export Trade": "Надёжные стандарты для экспортной торговли",
    "We support buyers with quality-focused sourcing, inspection coordination, export packing and documentation support.": "Мы поддерживаем покупателей благодаря контролируемому подбору продукции, координации инспекций, экспортной упаковке и документальному сопровождению.",
    "Food Quality Inspection": "Контроль качества пищевой продукции",
    "Quality-focused Inspection": "Инспекция с акцентом на качество",
    "Quality Control Stages": "Этапа контроля качества",
    "Export Quality Support": "Поддержка экспортного качества",
    "Our Process": "Наш процесс",
    "How We Control Product Quality": "Как мы контролируем качество продукции",
    "Every order is handled with attention to product consistency, packing requirements and export compliance.": "Каждый заказ обрабатывается с учётом стабильности продукции, требований к упаковке и экспортного соответствия.",
    "Supplier Selection": "Отбор поставщиков",
    "We work with qualified farms and reliable suppliers according to product and buyer requirements.": "Мы работаем с проверенными хозяйствами и надёжными поставщиками с учётом требований к продукции и покупателя.",
    "Product Inspection": "Инспекция продукции",
    "Products are checked for appearance, condition, consistency and agreed specifications.": "Продукция проверяется по внешнему виду, состоянию, однородности и согласованным спецификациям.",
    "Packing Control": "Контроль упаковки",
    "Packing materials, labels and loading preparation are coordinated for export delivery.": "Упаковочные материалы, маркировка и подготовка к загрузке координируются для экспортной поставки.",
    "Export Documentation": "Экспортная документация",
    "Commercial documents, packing lists and inspection requirements are reviewed before shipment.": "Коммерческие документы, упаковочные листы и требования к инспекции проверяются до отгрузки.",
    "Quality Commitment": "Обязательства по качеству",
    "Reliable Control Across the Supply Chain": "Надёжный контроль по всей цепочке поставок",
    "Our quality approach combines sourcing coordination, product inspection, cold chain support and continuous process improvement.": "Наш подход к качеству объединяет координацию закупок, инспекцию продукции, поддержку холодовой цепи и постоянное совершенствование процессов.",
    "Pre-shipment Inspection": "Предотгрузочная инспекция",
    "Product condition, specifications and packing are reviewed before shipment.": "Состояние продукции, спецификации и упаковка проверяются до отгрузки.",
    "Traceable Supply Chain": "Прослеживаемая цепочка поставок",
    "Key supply and handling stages are managed with clear product information.": "Ключевые этапы поставки и обработки управляются с использованием прозрачной информации о продукции.",
    "Cold Chain Management": "Управление холодовой цепью",
    "Temperature-controlled storage supports product freshness and export handling.": "Хранение с контролем температуры помогает сохранять свежесть продукции и поддерживает экспортную обработку.",
    "Continuous Improvement": "Постоянное совершенствование",
    "We refine quality processes based on buyer requirements and shipment experience.": "Мы совершенствуем процессы контроля качества на основе требований покупателей и опыта поставок.",
    "Export Packing": "Экспортная упаковка",
    "We coordinate packing according to buyer requirements, product characteristics and destination market needs.": "Мы координируем упаковку с учётом требований покупателя, характеристик продукции и потребностей рынка назначения.",
    "Documentation Support": "Документальное сопровождение",
    "We support commercial documents, packing lists, inspection coordination and other export-related requirements.": "Мы поддерживаем подготовку коммерческих документов, упаковочных листов, координацию инспекций и другие экспортные требования."
  },
  "ar": {
    "Quality Control": "مراقبة الجودة",
    "Reliable Standards for Export Trade": "معايير موثوقة للتجارة التصديرية",
    "We support buyers with quality-focused sourcing, inspection coordination, export packing and documentation support.": "ندعم المشترين من خلال توريد يركز على الجودة وتنسيق الفحص والتعبئة التصديرية ودعم الوثائق.",
    "Food Quality Inspection": "فحص جودة الأغذية",
    "Quality-focused Inspection": "فحص يركز على الجودة",
    "Quality Control Stages": "مراحل مراقبة الجودة",
    "Export Quality Support": "دعم جودة التصدير",
    "Our Process": "عمليتنا",
    "How We Control Product Quality": "كيف نراقب جودة المنتج",
    "Every order is handled with attention to product consistency, packing requirements and export compliance.": "يتم التعامل مع كل طلب مع الاهتمام بتجانس المنتج ومتطلبات التعبئة والامتثال للتصدير.",
    "Supplier Selection": "اختيار الموردين",
    "We work with qualified farms and reliable suppliers according to product and buyer requirements.": "نعمل مع مزارع مؤهلة وموردين موثوقين وفق متطلبات المنتج والمشتري.",
    "Product Inspection": "فحص المنتج",
    "Products are checked for appearance, condition, consistency and agreed specifications.": "يتم فحص المنتجات من حيث المظهر والحالة والتجانس والمواصفات المتفق عليها.",
    "Packing Control": "مراقبة التعبئة",
    "Packing materials, labels and loading preparation are coordinated for export delivery.": "يتم تنسيق مواد التعبئة والملصقات والتحضير للتحميل من أجل التسليم التصديري.",
    "Export Documentation": "وثائق التصدير",
    "Commercial documents, packing lists and inspection requirements are reviewed before shipment.": "تتم مراجعة المستندات التجارية وقوائم التعبئة ومتطلبات الفحص قبل الشحن.",
    "Quality Commitment": "الالتزام بالجودة",
    "Reliable Control Across the Supply Chain": "مراقبة موثوقة عبر سلسلة التوريد",
    "Our quality approach combines sourcing coordination, product inspection, cold chain support and continuous process improvement.": "يجمع نهجنا للجودة بين تنسيق التوريد وفحص المنتج ودعم سلسلة التبريد والتحسين المستمر للعمليات.",
    "Pre-shipment Inspection": "فحص ما قبل الشحن",
    "Product condition, specifications and packing are reviewed before shipment.": "تتم مراجعة حالة المنتج والمواصفات والتعبئة قبل الشحن.",
    "Traceable Supply Chain": "سلسلة توريد قابلة للتتبع",
    "Key supply and handling stages are managed with clear product information.": "تتم إدارة مراحل التوريد والمناولة الرئيسية بمعلومات واضحة عن المنتج.",
    "Cold Chain Management": "إدارة سلسلة التبريد",
    "Temperature-controlled storage supports product freshness and export handling.": "يساعد التخزين المتحكم في درجة حرارته على الحفاظ على نضارة المنتج ودعم عمليات التصدير.",
    "Continuous Improvement": "التحسين المستمر",
    "We refine quality processes based on buyer requirements and shipment experience.": "نطور عمليات الجودة بناءً على متطلبات المشترين وخبرة الشحن.",
    "Export Packing": "تعبئة التصدير",
    "We coordinate packing according to buyer requirements, product characteristics and destination market needs.": "ننسق التعبئة وفق متطلبات المشتري وخصائص المنتج واحتياجات سوق الوجهة.",
    "Documentation Support": "دعم الوثائق",
    "We support commercial documents, packing lists, inspection coordination and other export-related requirements.": "ندعم المستندات التجارية وقوائم التعبئة وتنسيق الفحص والمتطلبات الأخرى المتعلقة بالتصدير."
  },
  "es": {
    "Quality Control": "Control de calidad",
    "Reliable Standards for Export Trade": "Estándares confiables para el comercio de exportación",
    "We support buyers with quality-focused sourcing, inspection coordination, export packing and documentation support.": "Apoyamos a los compradores con abastecimiento orientado a la calidad, coordinación de inspecciones, embalaje de exportación y apoyo documental.",
    "Food Quality Inspection": "Inspección de calidad alimentaria",
    "Quality-focused Inspection": "Inspección centrada en la calidad",
    "Quality Control Stages": "Etapas de control de calidad",
    "Export Quality Support": "Apoyo de calidad para exportación",
    "Our Process": "Nuestro proceso",
    "How We Control Product Quality": "Cómo controlamos la calidad del producto",
    "Every order is handled with attention to product consistency, packing requirements and export compliance.": "Cada pedido se gestiona atendiendo a la uniformidad del producto, los requisitos de embalaje y el cumplimiento de exportación.",
    "Supplier Selection": "Selección de proveedores",
    "We work with qualified farms and reliable suppliers according to product and buyer requirements.": "Trabajamos con explotaciones cualificadas y proveedores confiables según los requisitos del producto y del comprador.",
    "Product Inspection": "Inspección del producto",
    "Products are checked for appearance, condition, consistency and agreed specifications.": "Los productos se revisan por su aspecto, estado, uniformidad y especificaciones acordadas.",
    "Packing Control": "Control del embalaje",
    "Packing materials, labels and loading preparation are coordinated for export delivery.": "Los materiales de embalaje, las etiquetas y la preparación de la carga se coordinan para la entrega de exportación.",
    "Export Documentation": "Documentación de exportación",
    "Commercial documents, packing lists and inspection requirements are reviewed before shipment.": "Los documentos comerciales, las listas de empaque y los requisitos de inspección se revisan antes del envío.",
    "Quality Commitment": "Compromiso con la calidad",
    "Reliable Control Across the Supply Chain": "Control confiable en toda la cadena de suministro",
    "Our quality approach combines sourcing coordination, product inspection, cold chain support and continuous process improvement.": "Nuestro enfoque de calidad combina coordinación de abastecimiento, inspección del producto, apoyo de cadena de frío y mejora continua de procesos.",
    "Pre-shipment Inspection": "Inspección previa al envío",
    "Product condition, specifications and packing are reviewed before shipment.": "El estado del producto, las especificaciones y el embalaje se revisan antes del envío.",
    "Traceable Supply Chain": "Cadena de suministro trazable",
    "Key supply and handling stages are managed with clear product information.": "Las etapas clave de suministro y manipulación se gestionan con información clara del producto.",
    "Cold Chain Management": "Gestión de la cadena de frío",
    "Temperature-controlled storage supports product freshness and export handling.": "El almacenamiento con temperatura controlada ayuda a mantener la frescura del producto y la gestión de exportación.",
    "Continuous Improvement": "Mejora continua",
    "We refine quality processes based on buyer requirements and shipment experience.": "Mejoramos los procesos de calidad según los requisitos del comprador y la experiencia de los envíos.",
    "Export Packing": "Embalaje de exportación",
    "We coordinate packing according to buyer requirements, product characteristics and destination market needs.": "Coordinamos el embalaje según los requisitos del comprador, las características del producto y las necesidades del mercado de destino.",
    "Documentation Support": "Apoyo documental",
    "We support commercial documents, packing lists, inspection coordination and other export-related requirements.": "Apoyamos los documentos comerciales, las listas de empaque, la coordinación de inspecciones y otros requisitos relacionados con la exportación."
  },
  "fr": {
    "Quality Control": "Contrôle qualité",
    "Reliable Standards for Export Trade": "Des normes fiables pour le commerce d’exportation",
    "We support buyers with quality-focused sourcing, inspection coordination, export packing and documentation support.": "Nous accompagnons les acheteurs avec un approvisionnement axé sur la qualité, la coordination des inspections, l’emballage export et le support documentaire.",
    "Food Quality Inspection": "Inspection de la qualité alimentaire",
    "Quality-focused Inspection": "Inspection axée sur la qualité",
    "Quality Control Stages": "Étapes du contrôle qualité",
    "Export Quality Support": "Support qualité à l’exportation",
    "Our Process": "Notre processus",
    "How We Control Product Quality": "Comment nous contrôlons la qualité des produits",
    "Every order is handled with attention to product consistency, packing requirements and export compliance.": "Chaque commande est gérée en tenant compte de la régularité du produit, des exigences d’emballage et de la conformité export.",
    "Supplier Selection": "Sélection des fournisseurs",
    "We work with qualified farms and reliable suppliers according to product and buyer requirements.": "Nous travaillons avec des exploitations qualifiées et des fournisseurs fiables selon les exigences du produit et de l’acheteur.",
    "Product Inspection": "Inspection des produits",
    "Products are checked for appearance, condition, consistency and agreed specifications.": "Les produits sont contrôlés selon leur aspect, leur état, leur homogénéité et les spécifications convenues.",
    "Packing Control": "Contrôle de l’emballage",
    "Packing materials, labels and loading preparation are coordinated for export delivery.": "Les matériaux d’emballage, les étiquettes et la préparation du chargement sont coordonnés pour la livraison export.",
    "Export Documentation": "Documentation d’exportation",
    "Commercial documents, packing lists and inspection requirements are reviewed before shipment.": "Les documents commerciaux, les listes de colisage et les exigences d’inspection sont vérifiés avant expédition.",
    "Quality Commitment": "Engagement qualité",
    "Reliable Control Across the Supply Chain": "Un contrôle fiable sur toute la chaîne d’approvisionnement",
    "Our quality approach combines sourcing coordination, product inspection, cold chain support and continuous process improvement.": "Notre approche qualité associe coordination de l’approvisionnement, inspection des produits, soutien de la chaîne du froid et amélioration continue des processus.",
    "Pre-shipment Inspection": "Inspection avant expédition",
    "Product condition, specifications and packing are reviewed before shipment.": "L’état du produit, les spécifications et l’emballage sont vérifiés avant expédition.",
    "Traceable Supply Chain": "Chaîne d’approvisionnement traçable",
    "Key supply and handling stages are managed with clear product information.": "Les principales étapes d’approvisionnement et de manutention sont gérées avec des informations produit claires.",
    "Cold Chain Management": "Gestion de la chaîne du froid",
    "Temperature-controlled storage supports product freshness and export handling.": "Le stockage à température contrôlée contribue à préserver la fraîcheur du produit et à faciliter les opérations export.",
    "Continuous Improvement": "Amélioration continue",
    "We refine quality processes based on buyer requirements and shipment experience.": "Nous améliorons les processus qualité selon les exigences des acheteurs et l’expérience des expéditions.",
    "Export Packing": "Emballage export",
    "We coordinate packing according to buyer requirements, product characteristics and destination market needs.": "Nous coordonnons l’emballage selon les exigences de l’acheteur, les caractéristiques du produit et les besoins du marché de destination.",
    "Documentation Support": "Support documentaire",
    "We support commercial documents, packing lists, inspection coordination and other export-related requirements.": "Nous accompagnons les documents commerciaux, les listes de colisage, la coordination des inspections et les autres exigences liées à l’exportation."
  }
};

function translateValue(value, dictionary) {
  if (Array.isArray(value)) return value.map((item) => translateValue(item, dictionary));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateValue(item, dictionary)]));
  }
  if (typeof value === "string") return dictionary[value] ?? value;
  return value;
}

if (!fs.existsSync(sourcePath)) throw new Error(`English source file not found: ${sourcePath}`);

let source;
try {
  source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
} catch (error) {
  throw new Error(`Invalid English quality.json:\n${error.message}`);
}

for (const [locale, dictionary] of Object.entries(translations)) {
  const translated = translateValue(source, dictionary);
  const targetPath = path.join(projectRoot, "src", "messages", locale, "quality.json");
  const backupPath = `${targetPath}.before-quality-translation`;

  if (fs.existsSync(targetPath) && !fs.existsSync(backupPath)) {
    fs.copyFileSync(targetPath, backupPath);
    console.log(`Backup created: ${backupPath}`);
  }

  fs.writeFileSync(targetPath, JSON.stringify(translated, null, 2) + "\n", "utf8");
  JSON.parse(fs.readFileSync(targetPath, "utf8"));
  console.log(`Generated: ${locale}/quality.json`);
}

console.log("\nQuality translations generated successfully.");