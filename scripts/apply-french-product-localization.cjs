const fs = require("node:fs");
const path = require("node:path");

const translations = {
  "fresh-carrot": {
    "name": "Carotte fraîche",
    "description": "Carottes fraîches sélectionnées pour les marchés internationaux de gros, de détail et de transformation alimentaire.",
    "details": "SanHe coordonne l’approvisionnement, le lavage, le tri, le calibrage, l’emballage et la chaîne du froid pour des carottes fraîches prêtes à l’exportation.",
    "specifications": [
      "Racines fraîches et fermes",
      "Options lavées et calibrées",
      "Plusieurs calibres disponibles",
      "Emballage prêt à l’exportation"
    ],
    "packaging": "Cartons, sacs ou emballage personnalisé",
    "moq": "Un conteneur",
    "supplyAbility": "Approvisionnement saisonnier stable",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "fresh-taro": {
    "name": "Taro frais",
    "description": "Taro frais destiné aux importateurs, grossistes et fabricants de produits alimentaires.",
    "details": "SanHe fournit du taro soigneusement sélectionné avec tri, calibrage, emballage et coordination des expéditions selon les exigences du marché de destination.",
    "specifications": [
      "Aspect naturel",
      "Texture ferme",
      "Plusieurs grades disponibles",
      "Emballage prêt à l’exportation"
    ],
    "packaging": "Cartons, sacs en filet ou emballage personnalisé",
    "moq": "Un conteneur",
    "supplyAbility": "Approvisionnement saisonnier stable",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "peach": {
    "name": "Pêche",
    "description": "Pêches fraîches sélectionnées pour des programmes d’exportation saisonniers.",
    "details": "SanHe coordonne la sélection, le calibrage, l’emballage protecteur, la chaîne du froid et la planification des expéditions de pêches.",
    "specifications": [
      "Variétés saisonnières disponibles",
      "Calibrage par taille",
      "Emballage protecteur pour l’export",
      "Soutien de la chaîne du froid"
    ],
    "packaging": "Cartons protecteurs ou emballage personnalisé",
    "moq": "Un conteneur",
    "supplyAbility": "Approvisionnement saisonnier",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "grape": {
    "name": "Raisin",
    "description": "Raisins frais préparés pour les marchés internationaux de gros et de détail.",
    "details": "SanHe accompagne l’exportation de raisins grâce à la sélection des variétés, une manipulation soignée, la coordination de la chaîne du froid et des emballages personnalisés.",
    "specifications": [
      "Raisins verts, rouges ou foncés",
      "Baies fraîches et fermes",
      "Gestion de la chaîne du froid",
      "Emballage pour le gros et le détail"
    ],
    "packaging": "Cartons, barquettes ou emballage personnalisé",
    "moq": "Un conteneur",
    "supplyAbility": "Approvisionnement saisonnier",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "blueberry": {
    "name": "Myrtille",
    "description": "Myrtilles fraîches avec tri soigné et soutien de la chaîne du froid.",
    "details": "SanHe coordonne la sélection, le conditionnement en barquettes, le contrôle de la température et la manutention à l’exportation pour les programmes de myrtilles.",
    "specifications": [
      "Baies fraîches et charnues",
      "Conditionnement en barquettes disponible",
      "Gestion de la chaîne du froid",
      "Options prêtes pour la vente au détail"
    ],
    "packaging": "Barquettes, cartons ou emballage personnalisé",
    "moq": "Un conteneur",
    "supplyAbility": "Approvisionnement saisonnier",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "frozen-ginger": {
    "name": "Gingembre surgelé",
    "description": "Produits de gingembre surgelé pour les fabricants, distributeurs et professionnels de la restauration.",
    "details": "SanHe fournit du gingembre surgelé en tranches, en dés, en julienne ou selon des formats personnalisés, avec stockage surgelé et soutien à l’exportation.",
    "specifications": [
      "Tranches, dés ou julienne",
      "Découpes personnalisées disponibles",
      "Stockage surgelé",
      "Soutien documentaire à l’export"
    ],
    "packaging": "Sacs, cartons ou emballage personnalisé",
    "moq": "Négociable selon le type de produit",
    "supplyAbility": "Approvisionnement stable en produits surgelés",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "frozen-garlic": {
    "name": "Ail surgelé",
    "description": "Ail surgelé destiné à la transformation industrielle et à la restauration.",
    "details": "SanHe fournit de l’ail surgelé en dés, haché ou selon des formats personnalisés, avec transformation contrôlée et gestion de la chaîne du froid.",
    "specifications": [
      "Formats en dés ou hachés",
      "Transformation personnalisée disponible",
      "Stockage surgelé",
      "Adapté à la transformation alimentaire"
    ],
    "packaging": "Sacs, cartons ou emballage personnalisé",
    "moq": "Négociable selon le type de produit",
    "supplyAbility": "Approvisionnement stable en produits surgelés",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "frozen-onion": {
    "name": "Oignon surgelé",
    "description": "Oignon surgelé fourni dans des formats pratiques pour la restauration et l’usage industriel.",
    "details": "SanHe fournit de l’oignon surgelé en dés ou en tranches avec spécifications, emballages et logistique de chaîne du froid personnalisés.",
    "specifications": [
      "Formats en dés ou en tranches",
      "Découpes personnalisées disponibles",
      "Stockage surgelé",
      "Adapté à la transformation alimentaire"
    ],
    "packaging": "Sacs, cartons ou emballage personnalisé",
    "moq": "Négociable selon le type de produit",
    "supplyAbility": "Approvisionnement stable en produits surgelés",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "frozen-green-onion": {
    "name": "Oignon vert surgelé",
    "description": "Oignon vert haché et surgelé pour la restauration et les applications industrielles.",
    "details": "SanHe fournit de l’oignon vert surgelé avec découpe contrôlée, surgélation rapide, emballage et coordination de la chaîne du froid.",
    "specifications": [
      "Format haché",
      "Tailles de découpe personnalisées",
      "Surgélation rapide",
      "Stockage surgelé"
    ],
    "packaging": "Sacs, cartons ou emballage personnalisé",
    "moq": "Négociable selon le type de produit",
    "supplyAbility": "Approvisionnement stable en produits surgelés",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "frozen-mixed-vegetables": {
    "name": "Mélange de légumes surgelés",
    "description": "Mélanges de légumes surgelés pour les fabricants, supermarchés et distributeurs.",
    "details": "SanHe fournit des combinaisons de légumes, des tailles de découpe, des formats d’emballage et une logistique de chaîne du froid personnalisés.",
    "specifications": [
      "Plusieurs combinaisons de légumes",
      "Découpes personnalisées disponibles",
      "Stockage surgelé",
      "Adapté à la transformation alimentaire"
    ],
    "packaging": "Sacs, cartons ou emballage personnalisé",
    "moq": "Négociable selon le type de produit",
    "supplyAbility": "Approvisionnement stable en produits surgelés",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "frozen-fruits": {
    "name": "Fruits surgelés",
    "description": "Fruits surgelés pour la transformation alimentaire, la boulangerie, les boissons et la restauration.",
    "details": "SanHe coordonne la sélection des fruits, la surgélation rapide, l’emballage et la chaîne du froid pour l’exportation.",
    "specifications": [
      "Plusieurs types de fruits",
      "Entiers, en tranches ou en dés",
      "Surgélation rapide",
      "Emballage personnalisé"
    ],
    "packaging": "Sacs, cartons ou emballage personnalisé",
    "moq": "Négociable selon le type de produit",
    "supplyAbility": "Approvisionnement stable en produits surgelés",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "garlic-paste": {
    "name": "Pâte d’ail",
    "description": "Pâte d’ail prête à l’emploi pour les fabricants, la restauration et les clients en marque privée.",
    "details": "SanHe propose une production personnalisée de pâte d’ail, avec adaptation de la texture, de la formulation, de l’emballage et de la marque privée.",
    "specifications": [
      "Texture lisse ou grossière",
      "Formulation personnalisée",
      "Marque privée disponible",
      "Format prêt à l’emploi"
    ],
    "packaging": "Pots, sachets, seaux ou emballage personnalisé",
    "moq": "Négociable selon les spécifications",
    "supplyAbility": "Capacité de production personnalisée",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "ginger-paste": {
    "name": "Pâte de gingembre",
    "description": "Pâte de gingembre prête à l’emploi pour les applications industrielles, la vente au détail et la restauration.",
    "details": "SanHe fournit de la pâte de gingembre avec texture, formulation, emballage et options de marque privée personnalisés.",
    "specifications": [
      "Texture lisse ou grossière",
      "Formulation personnalisée",
      "Marque privée disponible",
      "Format prêt à l’emploi"
    ],
    "packaging": "Pots, sachets, seaux ou emballage personnalisé",
    "moq": "Négociable selon les spécifications",
    "supplyAbility": "Capacité de production personnalisée",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "minced-garlic": {
    "name": "Ail haché",
    "description": "Ail haché préparé pour la restauration, l’industrie et la vente au détail.",
    "details": "SanHe propose des tailles de particules, formulations, emballages et productions sous marque privée personnalisés.",
    "specifications": [
      "Plusieurs tailles de particules",
      "Formulation personnalisée",
      "Marque privée disponible",
      "Format prêt à l’emploi"
    ],
    "packaging": "Pots, sachets, seaux ou emballage personnalisé",
    "moq": "Négociable selon les spécifications",
    "supplyAbility": "Capacité de production personnalisée",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "minced-ginger": {
    "name": "Gingembre haché",
    "description": "Gingembre haché préparé pour la transformation industrielle et la restauration.",
    "details": "SanHe fournit du gingembre haché avec tailles de particules, formulations, emballages et options de marque privée personnalisés.",
    "specifications": [
      "Plusieurs tailles de particules",
      "Formulation personnalisée",
      "Marque privée disponible",
      "Format prêt à l’emploi"
    ],
    "packaging": "Pots, sachets, seaux ou emballage personnalisé",
    "moq": "Négociable selon les spécifications",
    "supplyAbility": "Capacité de production personnalisée",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "mixed-vegetables": {
    "name": "Mélange de légumes",
    "description": "Mélange de légumes préparé pour des applications pratiques en restauration et en vente au détail.",
    "details": "SanHe propose des combinaisons de légumes, tailles de découpe, options d’assaisonnement et formats d’emballage personnalisés.",
    "specifications": [
      "Combinaisons de légumes personnalisées",
      "Plusieurs tailles de découpe",
      "Options d’assaisonnement disponibles",
      "Marque privée disponible"
    ],
    "packaging": "Sacs, barquettes, sachets souples ou emballage personnalisé",
    "moq": "Négociable selon les spécifications",
    "supplyAbility": "Capacité de production personnalisée",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "stir-fry-vegetable-mix": {
    "name": "Mélange de légumes à sauter",
    "description": "Mélange pratique de légumes à sauter pour la vente au détail, la restauration et les programmes de marque privée.",
    "details": "SanHe fournit des combinaisons de légumes, tailles de portions, options d’assaisonnement et emballages personnalisés.",
    "specifications": [
      "Format prêt à cuisiner",
      "Combinaisons personnalisées",
      "Assaisonnement en option",
      "Marque privée disponible"
    ],
    "packaging": "Sacs, barquettes, sachets souples ou emballage personnalisé",
    "moq": "Négociable selon les spécifications",
    "supplyAbility": "Capacité de production personnalisée",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "soup-vegetable-mix": {
    "name": "Mélange de légumes pour soupe",
    "description": "Mélange de légumes préparé pour les soupes, ragoûts et repas pratiques.",
    "details": "SanHe fournit des combinaisons de légumes pour soupe, tailles de découpe, portions et emballages sous marque privée personnalisés.",
    "specifications": [
      "Format prêt à cuisiner",
      "Combinaisons personnalisées",
      "Plusieurs tailles de découpe",
      "Marque privée disponible"
    ],
    "packaging": "Sacs, barquettes, sachets souples ou emballage personnalisé",
    "moq": "Négociable selon les spécifications",
    "supplyAbility": "Capacité de production personnalisée",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "dumpling-filling": {
    "name": "Farce pour raviolis",
    "description": "Farce préparée pour les fabricants, la restauration et les programmes de marque privée.",
    "details": "SanHe propose des farces végétales personnalisées, l’ajustement des recettes, le contrôle de la granulométrie, l’emballage et la coordination export.",
    "specifications": [
      "Formulations à base de légumes",
      "Recettes personnalisées",
      "Granulométrie contrôlée",
      "Marque privée disponible"
    ],
    "packaging": "Sacs, sachets souples, seaux ou emballage personnalisé",
    "moq": "Négociable selon les spécifications",
    "supplyAbility": "Capacité de production personnalisée",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  },
  "seasoned-vegetable-mix": {
    "name": "Mélange de légumes assaisonné",
    "description": "Mélange de légumes assaisonné pour la vente au détail, la restauration et les programmes de marque privée.",
    "details": "SanHe propose des légumes, profils d’assaisonnement, portions et emballages prêts à l’exportation personnalisés.",
    "specifications": [
      "Profils d’assaisonnement personnalisés",
      "Plusieurs combinaisons de légumes",
      "Format prêt à l’emploi",
      "Marque privée disponible"
    ],
    "packaging": "Sacs, sachets souples, barquettes ou emballage personnalisé",
    "moq": "Négociable selon les spécifications",
    "supplyAbility": "Capacité de production personnalisée",
    "loadingCapacity": "Selon les spécifications d’emballage et le type de conteneur"
  }
};
const root = process.cwd();
const filePath = path.join(
  root, "src", "messages", "fr", "products.json"
);
const backupPath =
  `${filePath}.before-french-product-localization`;

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
  `French localization updated: ${Object.keys(translations).length} products`
);
