const fs = require("node:fs");
const path = require("node:path");

const translations = {
  "fresh-carrot": {
    "name": "Zanahoria fresca",
    "description": "Zanahorias frescas seleccionadas para los mercados internacionales mayoristas, minoristas y de procesamiento de alimentos.",
    "details": "SanHe coordina el abastecimiento, lavado, clasificación, envasado y manejo en cadena de frío para zanahorias frescas listas para exportación.",
    "specifications": [
      "Raíces frescas y firmes",
      "Opciones lavadas y clasificadas",
      "Varios tamaños disponibles",
      "Envasado listo para exportación"
    ],
    "packaging": "Cajas de cartón, sacos o embalaje personalizado",
    "moq": "Un contenedor",
    "supplyAbility": "Suministro estacional estable",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "fresh-taro": {
    "name": "Taro fresco",
    "description": "Taro fresco para importadores, mayoristas y fabricantes de alimentos.",
    "details": "SanHe ofrece taro cuidadosamente seleccionado con clasificación, envasado y coordinación de envíos según los requisitos del mercado de destino.",
    "specifications": [
      "Aspecto natural",
      "Textura firme",
      "Varios grados disponibles",
      "Envasado listo para exportación"
    ],
    "packaging": "Cajas de cartón, sacos de malla o embalaje personalizado",
    "moq": "Un contenedor",
    "supplyAbility": "Suministro estacional estable",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "peach": {
    "name": "Melocotón",
    "description": "Melocotones frescos seleccionados para programas de exportación estacionales.",
    "details": "SanHe coordina la selección, calibrado, embalaje protector, manejo en cadena de frío y planificación de envíos de melocotones.",
    "specifications": [
      "Variedades estacionales disponibles",
      "Clasificación por tamaño",
      "Embalaje protector para exportación",
      "Soporte de cadena de frío"
    ],
    "packaging": "Cajas protectoras de cartón o embalaje personalizado",
    "moq": "Un contenedor",
    "supplyAbility": "Suministro estacional",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "grape": {
    "name": "Uva",
    "description": "Uvas frescas preparadas para los mercados internacionales mayoristas y minoristas.",
    "details": "SanHe apoya la exportación de uvas con selección de variedades, manipulación cuidadosa, coordinación de cadena de frío y embalaje personalizado.",
    "specifications": [
      "Opciones de uvas verdes, rojas y oscuras",
      "Bayas frescas y firmes",
      "Manejo en cadena de frío",
      "Embalaje para venta minorista y mayorista"
    ],
    "packaging": "Cajas de cartón, bandejas o embalaje personalizado",
    "moq": "Un contenedor",
    "supplyAbility": "Suministro estacional",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "blueberry": {
    "name": "Arándano",
    "description": "Arándanos frescos con clasificación cuidadosa y soporte de cadena de frío.",
    "details": "SanHe coordina la selección, envasado en bandejas, control de temperatura y manejo de exportación para programas de arándanos.",
    "specifications": [
      "Bayas frescas y carnosas",
      "Envasado en bandejas disponible",
      "Manejo en cadena de frío",
      "Opciones listas para venta minorista"
    ],
    "packaging": "Bandejas, cajas de cartón o embalaje personalizado",
    "moq": "Un contenedor",
    "supplyAbility": "Suministro estacional",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "frozen-ginger": {
    "name": "Jengibre congelado",
    "description": "Productos de jengibre congelado para fabricantes de alimentos, distribuidores y compradores de servicios de alimentación.",
    "details": "SanHe suministra jengibre congelado en rodajas, cubos, tiras o formatos personalizados, con almacenamiento congelado y soporte de exportación.",
    "specifications": [
      "Formatos en rodajas, cubos o tiras",
      "Cortes personalizados disponibles",
      "Almacenamiento congelado",
      "Soporte de documentación de exportación"
    ],
    "packaging": "Bolsas, cajas de cartón o embalaje personalizado",
    "moq": "Negociable según el tipo de producto",
    "supplyAbility": "Suministro estable de productos congelados",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "frozen-garlic": {
    "name": "Ajo congelado",
    "description": "Ajo congelado preparado para el procesamiento industrial de alimentos y aplicaciones de servicios de alimentación.",
    "details": "SanHe suministra ajo congelado en cubos, picado o en formatos personalizados, con procesamiento controlado y manejo en cadena de frío.",
    "specifications": [
      "Formatos en cubos o picado",
      "Procesamiento personalizado disponible",
      "Almacenamiento congelado",
      "Adecuado para procesamiento de alimentos"
    ],
    "packaging": "Bolsas, cajas de cartón o embalaje personalizado",
    "moq": "Negociable según el tipo de producto",
    "supplyAbility": "Suministro estable de productos congelados",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "frozen-onion": {
    "name": "Cebolla congelada",
    "description": "Cebolla congelada suministrada en formatos prácticos para servicios de alimentación y uso industrial.",
    "details": "SanHe ofrece cebolla congelada en cubos y rodajas con especificaciones, embalaje y logística de cadena de frío personalizados.",
    "specifications": [
      "Formatos en cubos o rodajas",
      "Cortes personalizados disponibles",
      "Almacenamiento congelado",
      "Adecuado para procesamiento de alimentos"
    ],
    "packaging": "Bolsas, cajas de cartón o embalaje personalizado",
    "moq": "Negociable según el tipo de producto",
    "supplyAbility": "Suministro estable de productos congelados",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "frozen-green-onion": {
    "name": "Cebolleta congelada",
    "description": "Cebolleta picada y congelada para servicios de alimentación y aplicaciones de fabricación.",
    "details": "SanHe suministra cebolleta congelada con corte controlado, congelación rápida, envasado y coordinación de cadena de frío.",
    "specifications": [
      "Formato picado",
      "Tamaños de corte personalizados",
      "Congelación rápida",
      "Almacenamiento congelado"
    ],
    "packaging": "Bolsas, cajas de cartón o embalaje personalizado",
    "moq": "Negociable según el tipo de producto",
    "supplyAbility": "Suministro estable de productos congelados",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "frozen-mixed-vegetables": {
    "name": "Mezcla de verduras congeladas",
    "description": "Mezclas de verduras congeladas para fabricantes de alimentos, supermercados y distribuidores.",
    "details": "SanHe suministra combinaciones de verduras, tamaños de corte, formatos de envasado y logística de cadena de frío personalizados.",
    "specifications": [
      "Múltiples combinaciones de verduras",
      "Cortes personalizados disponibles",
      "Almacenamiento congelado",
      "Adecuado para procesamiento de alimentos"
    ],
    "packaging": "Bolsas, cajas de cartón o embalaje personalizado",
    "moq": "Negociable según el tipo de producto",
    "supplyAbility": "Suministro estable de productos congelados",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "frozen-fruits": {
    "name": "Frutas congeladas",
    "description": "Frutas congeladas para procesamiento de alimentos, panadería, bebidas y servicios de alimentación.",
    "details": "SanHe coordina la selección de frutas, congelación rápida, envasado y servicio de cadena de frío para exportación.",
    "specifications": [
      "Múltiples opciones de frutas",
      "Enteras, en rodajas o en cubos",
      "Congelación rápida",
      "Embalaje personalizado"
    ],
    "packaging": "Bolsas, cajas de cartón o embalaje personalizado",
    "moq": "Negociable según el tipo de producto",
    "supplyAbility": "Suministro estable de productos congelados",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "garlic-paste": {
    "name": "Pasta de ajo",
    "description": "Pasta de ajo lista para usar para fabricantes de alimentos, operadores de servicios de alimentación y compradores de marca privada.",
    "details": "SanHe admite producción personalizada de pasta de ajo, textura, formulación, envasado y servicio de marca privada.",
    "specifications": [
      "Textura suave o gruesa",
      "Formulación personalizada",
      "Marca privada disponible",
      "Formato listo para usar"
    ],
    "packaging": "Frascos, bolsas, cubetas o embalaje personalizado",
    "moq": "Negociable según la especificación",
    "supplyAbility": "Capacidad de producción personalizada",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "ginger-paste": {
    "name": "Pasta de jengibre",
    "description": "Pasta de jengibre lista para usar para aplicaciones industriales, minoristas y de servicios de alimentación.",
    "details": "SanHe suministra pasta de jengibre con textura, formulación, envasado y opciones de marca privada personalizados.",
    "specifications": [
      "Textura suave o gruesa",
      "Formulación personalizada",
      "Marca privada disponible",
      "Formato listo para usar"
    ],
    "packaging": "Frascos, bolsas, cubetas o embalaje personalizado",
    "moq": "Negociable según la especificación",
    "supplyAbility": "Capacidad de producción personalizada",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "minced-garlic": {
    "name": "Ajo picado",
    "description": "Ajo picado preparado para compradores de servicios de alimentación, fabricación y venta minorista.",
    "details": "SanHe admite tamaño de partícula, formulación, envasado y producción de marca privada personalizados.",
    "specifications": [
      "Múltiples tamaños de partícula",
      "Formulación personalizada",
      "Marca privada disponible",
      "Formato listo para usar"
    ],
    "packaging": "Frascos, bolsas, cubetas o embalaje personalizado",
    "moq": "Negociable según la especificación",
    "supplyAbility": "Capacidad de producción personalizada",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "minced-ginger": {
    "name": "Jengibre picado",
    "description": "Jengibre picado preparado para procesamiento industrial de alimentos y uso en servicios de alimentación.",
    "details": "SanHe suministra jengibre picado con tamaño de partícula, formulación, envasado y opciones de marca privada personalizados.",
    "specifications": [
      "Múltiples tamaños de partícula",
      "Formulación personalizada",
      "Marca privada disponible",
      "Formato listo para usar"
    ],
    "packaging": "Frascos, bolsas, cubetas o embalaje personalizado",
    "moq": "Negociable según la especificación",
    "supplyAbility": "Capacidad de producción personalizada",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "mixed-vegetables": {
    "name": "Verduras mixtas",
    "description": "Verduras mixtas preparadas para aplicaciones prácticas de servicios de alimentación y venta minorista.",
    "details": "SanHe admite combinaciones de verduras, tamaños de corte, opciones de condimento y formatos de envasado personalizados.",
    "specifications": [
      "Combinaciones de verduras personalizadas",
      "Múltiples tamaños de corte",
      "Opciones de condimento disponibles",
      "Marca privada disponible"
    ],
    "packaging": "Bolsas, bandejas, envases flexibles o embalaje personalizado",
    "moq": "Negociable según la especificación",
    "supplyAbility": "Capacidad de producción personalizada",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "stir-fry-vegetable-mix": {
    "name": "Mezcla de verduras para saltear",
    "description": "Mezcla práctica de verduras para saltear destinada a programas minoristas, de servicios de alimentación y de marca privada.",
    "details": "SanHe ofrece combinaciones de verduras, tamaños de porción, opciones de condimento y envasado personalizados.",
    "specifications": [
      "Formato listo para cocinar",
      "Combinaciones personalizadas",
      "Condimento opcional",
      "Marca privada disponible"
    ],
    "packaging": "Bolsas, bandejas, envases flexibles o embalaje personalizado",
    "moq": "Negociable según la especificación",
    "supplyAbility": "Capacidad de producción personalizada",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "soup-vegetable-mix": {
    "name": "Mezcla de verduras para sopa",
    "description": "Mezcla de verduras preparada para sopas, guisos y aplicaciones de comidas prácticas.",
    "details": "SanHe suministra combinaciones de verduras para sopa, tamaños de corte, porcionado y envasado de marca privada personalizados.",
    "specifications": [
      "Formato listo para cocinar",
      "Combinaciones personalizadas",
      "Múltiples tamaños de corte",
      "Marca privada disponible"
    ],
    "packaging": "Bolsas, bandejas, envases flexibles o embalaje personalizado",
    "moq": "Negociable según la especificación",
    "supplyAbility": "Capacidad de producción personalizada",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "dumpling-filling": {
    "name": "Relleno para dumplings",
    "description": "Relleno preparado para fabricantes de alimentos, compradores de servicios de alimentación y programas de marca privada.",
    "details": "SanHe admite rellenos vegetales personalizados, ajuste de recetas, tamaño de partícula, envasado y coordinación de exportación.",
    "specifications": [
      "Formulaciones a base de verduras",
      "Recetas personalizadas",
      "Tamaño de partícula controlado",
      "Marca privada disponible"
    ],
    "packaging": "Bolsas, envases flexibles, cubetas o embalaje personalizado",
    "moq": "Negociable según la especificación",
    "supplyAbility": "Capacidad de producción personalizada",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  },
  "seasoned-vegetable-mix": {
    "name": "Mezcla de verduras sazonadas",
    "description": "Mezcla de verduras sazonadas para programas minoristas, de servicios de alimentación y de marca privada personalizada.",
    "details": "SanHe admite verduras, perfiles de condimento, tamaños de porción y embalaje listo para exportación personalizados.",
    "specifications": [
      "Perfiles de condimento personalizados",
      "Múltiples combinaciones de verduras",
      "Formato listo para usar",
      "Marca privada disponible"
    ],
    "packaging": "Bolsas, envases flexibles, bandejas o embalaje personalizado",
    "moq": "Negociable según la especificación",
    "supplyAbility": "Capacidad de producción personalizada",
    "loadingCapacity": "Según la especificación del embalaje y el tipo de contenedor"
  }
};
const root = process.cwd();
const filePath = path.join(
  root, "src", "messages", "es", "products.json"
);
const backupPath =
  `${filePath}.before-spanish-product-localization`;

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(filePath, backupPath);
}

const data = JSON.parse(
  fs.readFileSync(filePath, "utf8")
);

for (const [slug, translated] of Object.entries(
  translations
)) {
  data.products.items[slug] = {
    ...data.products.items[slug],
    ...translated,
  };

  data.products.detailSections.relatedProducts
    .items[slug] = {
      name: translated.name,
      description: translated.description,
    };
}

fs.writeFileSync(
  filePath,
  JSON.stringify(data, null, 2) + "\n",
  "utf8"
);

console.log(
  `Spanish localization updated: ${Object.keys(translations).length} products`
);
