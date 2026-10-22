/* Yalla Daily : contenu et règles du jeu.
   Pour ajouter une édition : copier le dernier bloc de EDITIONS, le placer EN PREMIER du tableau,
   changer id / n / date / textes, et déclarer les nouveaux mots dans WORDS. */
window.YD = {
  LEVELS: [
    [0, "Touriste à Ben Gourion"],
    [100, "Habituée du shouk"],
    [300, "Cheffe de Tel Aviv"],
    [600, "Guide du Néguev"],
    [1000, "Sabra d’honneur"]
  ],

  BADGES: [
    { id: "first", icon: "🥚", name: "Première édition", desc: "Terminer un quiz" },
    { id: "streak3", icon: "🔥", name: "3 jours de suite", desc: "Série de 3 jours" },
    { id: "sprouts", icon: "🌿", name: "Cinq pousses", desc: "5 mots au stade pousse ou arbre" },
    { id: "trees", icon: "🌳", name: "Cinq arbres", desc: "5 mots sans aucune aide" },
    { id: "chef", icon: "🍳", name: "Première recette", desc: "Cuisiner une recette de l’édition" },
    { id: "globe", icon: "🗺️", name: "Globe-trotteuse", desc: "Découvrir 3 lieux" },
    { id: "perfect", icon: "💯", name: "Sans faute", desc: "Quiz parfait" }
  ],

  /* Mots : lang = he | en. t = mot cible, tr = translittération, fr = traduction. */
  WORDS: {
    he_hafgana: { lang: "he", t: "הפגנה", tr: "haf’gana", fr: "manifestation" },
    he_yoker: { lang: "he", t: "יוקר המחיה", tr: "yoker ha-mikhya", fr: "coût de la vie" },
    he_hatsbaa: { lang: "he", t: "הצבעה", tr: "hatsba’a", fr: "vote" },
    he_pras: { lang: "he", t: "פרס", tr: "pras", fr: "prix, récompense" },
    he_iriya: { lang: "he", t: "עירייה", tr: "iriya", fr: "mairie, hôtel de ville" },
    he_srefa: { lang: "he", t: "שריפה", tr: "srefa", fr: "incendie" },
    he_hatsafa: { lang: "he", t: "הצפה", tr: "hatsafa", fr: "inondation" },
    he_ribit: { lang: "he", t: "ריבית", tr: "ribit", fr: "taux d’intérêt" },
    he_pesel: { lang: "he", t: "פסל", tr: "pesel", fr: "statue" },
    he_beitsa: { lang: "he", t: "ביצה", tr: "beitsa", fr: "œuf" },
    he_agvaniya: { lang: "he", t: "עגבנייה", tr: "agvaniya", fr: "tomate" },
    he_shum: { lang: "he", t: "שום", tr: "shum", fr: "ail" },
    he_machvat: { lang: "he", t: "מחבת", tr: "makhvat", fr: "poêle" },
    en_protest: { lang: "en", t: "protest", tr: "", fr: "manifestation" },
    en_cost_of_living: { lang: "en", t: "cost of living", tr: "", fr: "coût de la vie" },
    en_ban: { lang: "en", t: "to ban", tr: "", fr: "interdire" },
    en_award: { lang: "en", t: "award", tr: "", fr: "prix, récompense" },
    en_flood: { lang: "en", t: "flood", tr: "", fr: "inondation" },
    en_ceasefire: { lang: "en", t: "ceasefire", tr: "", fr: "cessez-le-feu" },
    en_sample: { lang: "en", t: "sample", tr: "", fr: "échantillon" },
    en_vote: { lang: "en", t: "to vote", tr: "", fr: "voter" },
    en_simmer: { lang: "en", t: "simmer", tr: "", fr: "mijoter" },
    en_ripe: { lang: "en", t: "ripe", tr: "", fr: "mûr" }
  },

  EDITIONS: [
    {
      id: "2026-10-22",
      n: 1,
      date: "22 octobre 2026",

      /* Brèves tirées de pages de titres (Euronews, PSG, Times of Israel) : faits au niveau du titre. */
      news: [
        {
          tag: "France",
          source: "Euronews, 17-19 oct. 2026",
          url: "https://www.euronews.com/news/europe/france",
          he: "בצרפת יצאו כ־550 אלף איש להפגנות נגד יוקר המחיה. חלק מההפגנות הפכו לאלימות, ובניין העירייה של לימוז׳ ניזוק קשות בשריפה. הנשיא מקרון הבטיח שהאחראים ייתנו את הדין.",
          en: "Around 550,000 people joined protests against the cost of living across France. Some turned violent, and the town hall in Limoges was badly damaged by fire. President Macron promised that those responsible would be held to account.",
          fr: "Environ 550 000 personnes ont manifesté en France contre le coût de la vie. Certains rassemblements ont dégénéré, et l’hôtel de ville de Limoges a été gravement endommagé par un incendie. Emmanuel Macron a promis que les responsables rendraient des comptes."
        },
        {
          tag: "France",
          source: "Euronews, 20-21 oct. 2026",
          url: "https://www.euronews.com/news/europe/france",
          he: "אחרי המהומות הטילה משטרת פריז עוצר לילי. בינתיים האיגודים המקצועיים בצרפת קראו לפעולה חדשה ב־5 בנובמבר, אחרי פגישה מאכזבת.",
          en: "After the unrest, Paris police imposed an overnight curfew. Meanwhile, French unions called for new action on 5 November after a disappointing meeting.",
          fr: "Après les troubles, la police de Paris a instauré un couvre-feu nocturne. Les syndicats appellent à la mobilisation le 5 novembre, après une réunion décevante."
        },
        {
          tag: "Économie",
          source: "Euronews, 21 oct. 2026",
          url: "https://www.euronews.com/business",
          he: "הריבית על אג״ח ממשלתיות בצרפת ל־10 שנים עלתה מעל 5% לראשונה מאז 2002.",
          en: "France’s 10-year government borrowing rate rose above 5% for the first time since 2002.",
          fr: "Le taux d’emprunt de l’État français à 10 ans a dépassé 5 % pour la première fois depuis 2002."
        },
        {
          tag: "Sport",
          source: "PSG.fr, 17 oct. 2026",
          url: "https://www.psg.fr/en/content/results-from-matchday-7-of-ligue-1-2026-2027-rc-strasbourg-alsace-paris-saint-germain",
          he: "ביום שבת, 17 באוקטובר, פריז סן־ז׳רמן ניצחה את סטרסבורג 3–1 באצטדיון המנאו.",
          en: "On Saturday 17 October, Paris Saint-Germain beat RC Strasbourg 3–1 at the Stade de la Meinau.",
          fr: "Samedi 17 octobre, le Paris Saint-Germain s’est imposé 3-1 à Strasbourg, au stade de la Meinau."
        },
        {
          tag: "Europe",
          source: "Euronews, 19 oct. 2026",
          url: "https://www.euronews.com/news/europe/france",
          he: "באיטליה נעצרו יותר מ־200 איש במילאנו ביום השני של עימותים נגד יוקר המחיה.",
          en: "In Italy, more than 200 people were arrested in Milan on the second day of clashes over the cost of living.",
          fr: "En Italie, plus de 200 personnes ont été arrêtées à Milan lors d’une deuxième journée d’affrontements liés au coût de la vie."
        },
        {
          tag: "Europe",
          source: "Euronews, 19 oct. 2026",
          url: "https://www.euronews.com/news/europe/france",
          he: "גשמי זלעפות גרמו להצפות קטלניות במזרח ספרד, ולפחות שני אנשים מתו.",
          en: "Torrential rain caused deadly floods in eastern Spain, with at least two deaths reported.",
          fr: "Des pluies torrentielles ont provoqué des inondations meurtrières dans l’est de l’Espagne, avec au moins deux morts (bilan du 19 octobre)."
        },
        {
          tag: "Monde",
          source: "Euronews, 21 oct. 2026",
          url: "https://www.euronews.com/news/international",
          he: "בקנדה כשלושה מכל ארבעה מצביעים באלברטה דחו התחלה של דרך להיפרדות, ניצחון לראש הממשלה קרני שרוצה לשמור על אחדות המדינה.",
          en: "In Canada, about three in four voters in Alberta rejected starting a path toward separation, a win for Prime Minister Carney, who wants to keep the country united.",
          fr: "Au Canada, environ trois électeurs sur quatre en Alberta ont rejeté l’idée d’engager un processus vers la séparation : une victoire pour le Premier ministre Carney, qui veut préserver l’unité du pays."
        },
        {
          tag: "Monde",
          source: "Euronews, 21 oct. 2026",
          url: "https://www.euronews.com/news/international",
          he: "הקרמלין רמז שהוא פתוח לשיחות שלום חדשות עם אוקראינה. הנשיא זלנסקי תמך בהקפאת קו החזית כצעד ראשון לקראת הפסקת אש.",
          en: "The Kremlin signaled that it is open to new peace talks with Ukraine. President Zelenskyy said he supports freezing the front line as a first step toward a ceasefire.",
          fr: "Le Kremlin s’est dit ouvert à de nouvelles discussions de paix avec l’Ukraine. Le président Zelensky a soutenu un gel de la ligne de front comme première étape vers un cessez-le-feu."
        },
        {
          tag: "Monde",
          source: "The Times of Israel, 22 oct. 2026",
          url: "https://www.timesofisrael.com/latest/features/",
          he: "בית הדין הפלילי הבינלאומי זכה בפרס סחרוב של האיחוד האירופי לזכויות אדם. בית הדין נמצא תחת סנקציות אמריקאיות, ואירופה הבטיחה לתמוך בעצמאותו.",
          en: "The International Criminal Court has won the European Union’s Sakharov Prize for human rights. The court is under American sanctions, and Europe has promised to support its independence.",
          fr: "La Cour pénale internationale a reçu le prix Sakharov de l’Union européenne pour les droits humains. La Cour fait l’objet de sanctions américaines, et l’Europe a promis de soutenir son indépendance."
        },
        {
          tag: "Science",
          source: "Euronews, 21 oct. 2026",
          url: "https://www.euronews.com/news/international",
          he: "האו״ם הזהיר שאל ניניו עלול להיות החזק ביותר שנרשם.",
          en: "The United Nations warned that El Niño could become the strongest on record.",
          fr: "L’ONU a averti qu’El Niño pourrait être le plus fort jamais enregistré."
        },
        {
          tag: "Science",
          source: "Euronews Next, 20 oct. 2026",
          url: "https://www.euronews.com/next",
          he: "יפן שיגרה טיל H3 מטאנגשימה עם משימה להחזרת דגימות מפובוס, ירח של מאדים.",
          en: "Japan launched an H3 rocket from Tanegashima carrying a mission to bring back samples from Phobos, a moon of Mars.",
          fr: "Le Japon a lancé, avec une fusée H3 depuis Tanegashima, une mission pour rapporter des échantillons de Phobos, une lune de Mars."
        },
        {
          tag: "Science",
          source: "Euronews Culture, 20 oct. 2026",
          url: "https://www.euronews.com/culture",
          he: "זוהו שרידי ניאנדרטלים בני כ־46 אלף שנה במערת אבונץ בנווארה שבספרד.",
          en: "Neanderthal remains about 46,000 years old have been identified in Abauntz cave, in Navarre, Spain.",
          fr: "Des restes de Néandertaliens vieux d’environ 46 000 ans ont été identifiés dans la grotte d’Abauntz, en Navarre (Espagne)."
        },
        {
          tag: "Tech",
          source: "Euronews Next, 18 oct. 2026",
          url: "https://www.euronews.com/next",
          he: "ערוץ יורונייוז נסע במונית ללא נהג בזגרב, בשירות שלדבריו הוא שירות הרובוטקסי הראשון באירופה.",
          en: "Euronews rode a driverless taxi in Zagreb, which it describes as Europe’s first robotaxi service.",
          fr: "Euronews a testé un taxi sans conducteur à Zagreb, présenté comme le premier service de robotaxi en Europe."
        },
        {
          tag: "Économie",
          source: "Euronews, 22 oct. 2026",
          url: "https://www.euronews.com/business",
          he: "הבנק הבריטי ברקליס מתכנן לקצץ 5,000 משרות ולהשתמש יותר בבינה מלאכותית כדי להיות יעיל יותר.",
          en: "The British bank Barclays plans to cut 5,000 jobs as it turns to artificial intelligence to improve efficiency.",
          fr: "La banque britannique Barclays prévoit de supprimer 5 000 postes en misant sur l’intelligence artificielle pour gagner en efficacité."
        },
        {
          tag: "Culture",
          source: "Euronews Culture, 20 oct. 2026",
          url: "https://www.euronews.com/culture",
          he: "קטעים מפסל של רעמסס השני נמצאו באדמה של חקלאי מצרי.",
          en: "Fragments of a statue of Ramses II were found on an Egyptian farmer’s land.",
          fr: "Des fragments d’une statue de Ramsès II ont été retrouvés sur le terrain d’un agriculteur égyptien."
        }
      ],

      geo: [
        {
          place: "Alberta (Canada)", lat: 53.55, lon: -113.49, z: 4,
          he: "אלברטה היא פרובינציה במערב קנדה. הבירה שלה היא אדמונטון, והעיר הגדולה ביותר היא קלגרי.",
          en: "Alberta is a province in western Canada. Its capital is Edmonton, and its largest city is Calgary. The Rocky Mountains lie in its west.",
          fr: "L’Alberta est une province de l’Ouest canadien. Sa capitale est Edmonton et sa plus grande ville est Calgary. Les Rocheuses se trouvent dans sa partie ouest."
        },
        {
          place: "Strasbourg (France)", lat: 48.58, lon: 7.75, z: 10,
          he: "שטרסבורג נמצאת ליד נהר הריין, על הגבול עם גרמניה. בעיר נמצא המושב הרשמי של הפרלמנט האירופי.",
          en: "Strasbourg is near the Rhine, on the border with Germany. It is the official seat of the European Parliament.",
          fr: "Strasbourg se trouve près du Rhin, à la frontière avec l’Allemagne. C’est le siège officiel du Parlement européen."
        },
        {
          place: "Navarre (Espagne)", lat: 42.82, lon: -1.64, z: 8,
          he: "נווארה היא חבל בצפון ספרד, למרגלות הפירנאים. בירתה היא פמפלונה, המפורסמת בפסטיבל סן פרמין.",
          en: "Navarre is a region in northern Spain, at the foot of the Pyrenees. Its capital is Pamplona, famous for the San Fermín festival.",
          fr: "La Navarre est une région du nord de l’Espagne, au pied des Pyrénées. Sa capitale est Pampelune, célèbre pour la fête de San Fermín."
        },
        {
          place: "Limoges (France)", lat: 45.83, lon: 1.26, z: 9,
          he: "לימוז׳ היא עיר במרכז־מערב צרפת, ומפורסמת בפורצלן שלה.",
          en: "Limoges is a city in west-central France, famous for its porcelain.",
          fr: "Limoges est une ville du centre-ouest de la France, célèbre pour sa porcelaine."
        }
      ],

      culture: [
        {
          title: "Le Louvre : du palais au musée",
          he: "הלובר היה בעבר ארמון מלכים. הוא נפתח לציבור כמוזיאון בשנת 1793, בימי המהפכה הצרפתית.",
          en: "The Louvre used to be a royal palace. It opened to the public as a museum in 1793, during the French Revolution.",
          fr: "Le Louvre a d’abord été un palais royal. Il a ouvert au public comme musée en 1793, pendant la Révolution française."
        },
        {
          title: "Qui était Sakharov ?",
          he: "אנדריי סחרוב היה פיזיקאי סובייטי ומתנגד למשטר. הוא קיבל את פרס נובל לשלום בשנת 1975, והפרלמנט האירופי יצר את פרס סחרוב ב־1988.",
          en: "Andrei Sakharov was a Soviet physicist and a dissident. He received the Nobel Peace Prize in 1975, and the European Parliament created the Sakharov Prize in 1988.",
          fr: "Andreï Sakharov était un physicien soviétique et un dissident. Il a reçu le prix Nobel de la paix en 1975, et le Parlement européen a créé le prix Sakharov en 1988."
        },
        {
          title: "Pompéi sous les cendres",
          he: "העיר הרומית פומפיי נקברה מתחת לאפר בהתפרצות הר וזוב בשנת 79 לספירה.",
          en: "The Roman city of Pompeii was buried under ash by the eruption of Mount Vesuvius in AD 79.",
          fr: "La cité romaine de Pompéi a été ensevelie sous les cendres par l’éruption du Vésuve en l’an 79."
        },
        {
          title: "Ramsès II, un très long règne",
          he: "רעמסס השני היה פרעה במצרים העתיקה. הוא שלט כ־66 שנה, בערך בין 1279 ל־1213 לפני הספירה.",
          en: "Ramses II was a pharaoh of ancient Egypt. He ruled for about 66 years, roughly from 1279 to 1213 BC.",
          fr: "Ramsès II était un pharaon de l’Égypte antique. Il a régné environ 66 ans, à peu près de 1279 à 1213 avant notre ère."
        },
        {
          title: "Qu’est-ce qu’El Niño ?",
          he: "אל ניניו הוא תופעת אקלים באוקיינוס השקט: המים בפני השטח מתחממים, וזה משנה את מזג האוויר בעולם. הוא חוזר כל שנתיים עד שבע שנים בערך.",
          en: "El Niño is a climate pattern in the Pacific Ocean: surface waters warm up, which changes weather around the world. It returns roughly every two to seven years.",
          fr: "El Niño est un phénomène climatique du Pacifique : les eaux de surface se réchauffent, ce qui modifie le temps dans le monde entier. Il revient environ tous les deux à sept ans."
        },
        {
          title: "D’où vient « yalla » ?",
          he: "המילה ״יאללה״ הגיעה לעברית מהערבית, והיא אומרת ״קדימה!״ או ״בוא נלך!״.",
          en: "The word “yalla” came into Hebrew from Arabic. It means “come on!” or “let’s go!”",
          fr: "Le mot « yalla » est entré en hébreu depuis l’arabe. Il signifie « allez ! » ou « on y va ! »."
        }
      ],

      recipes: [
        {
          title: { he: "שקשוקה", fr: "Shakshuka classique" },
          kosher: "Parvé (indiqué par la source). Vérifie les œufs comme d’habitude.",
          source: "Recette d’Eyal Shani, N12",
          url: "https://www.mako.co.il/news-tip12/Recipe-cffbe8b77823831006.htm",
          ingredients: {
            he: ["עגבניות טובות וטריות, עדיף כמה סוגים", "3 שיני שום פרוסות", "פלפל ירוק חריף", "שמן זית", "ביצים"],
            en: ["good fresh tomatoes, ideally several kinds", "3 cloves of garlic, sliced", "green hot pepper", "olive oil", "eggs"],
            fr: ["de bonnes tomates fraîches, idéalement de plusieurs sortes", "3 gousses d’ail en lamelles", "piment vert", "huile d’olive", "œufs"]
          },
          steps: {
            he: [
              "חולטים את העגבניות במים רותחים ומקלפים אותן.",
              "מבשלים כמה דקות עם שום, פלפל חריף ושמן זית.",
              "מוסיפים את הביצים ישר לרוטב הרותח, בלי לכסות.",
              "מגישים חם, ישר מהמחבת."
            ],
            en: [
              "Briefly blanch the tomatoes in boiling water, then peel them.",
              "Cook for a few minutes with the garlic, hot pepper and olive oil.",
              "Add the eggs straight into the boiling sauce, without covering.",
              "Serve hot, straight from the pan."
            ],
            fr: [
              "Ébouillanter brièvement les tomates, puis les peler.",
              "Cuire quelques minutes avec l’ail, le piment et l’huile d’olive.",
              "Ajouter les œufs directement dans la sauce bouillante, sans couvrir.",
              "Servir chaud, directement dans la poêle."
            ]
          },
          tip: "Côté minceur : mesure l’huile à la cuillère et remplace une partie du pain par une grande salade."
        },
        {
          title: { he: "סלט ישראלי", fr: "Salade israélienne à l’avocat et à la menthe" },
          kosher: "Parvé (indiqué par la source). Recette prévue pour 12 portions d’accompagnement : divise les quantités.",
          source: "Recette de Tori Avey",
          url: "https://toriavey.com/israeli-salad/",
          ingredients: {
            he: ["כ־700 גרם מלפפונים פרסיים, חתוכים לקוביות קטנות", "פלפל אדום אחד, בקוביות קטנות", "פלפל צהוב אחד, בקוביות קטנות", "כ־30 גרם נענע טרייה, קצוצה", "אבוקדו אחד, בקוביות", "2 עגבניות, בקוביות קטנות", "3 כפות שמן זית כתית מעולה", "רבע כוס מיץ לימון סחוט (או יותר, לפי הטעם)", "¾ כפית מלח (או יותר, לפי הטעם)"],
            en: ["1½ lb Persian cucumbers, diced small", "1 red bell pepper, diced small", "1 yellow bell pepper, diced small", "1 oz fresh mint, chopped", "1 avocado, diced", "2 tomatoes, diced small", "3 tbsp extra virgin olive oil", "¼ cup fresh lemon juice (or more to taste)", "¾ tsp salt (or more to taste)"],
            fr: ["environ 700 g de concombres persans en petits dés", "1 poivron rouge en petits dés", "1 poivron jaune en petits dés", "environ 30 g de menthe fraîche ciselée", "1 avocat en dés", "2 tomates en petits dés", "3 c. à soupe d’huile d’olive extra vierge", "60 ml de jus de citron frais (ou plus selon le goût)", "¾ c. à café de sel (ou plus selon le goût)"]
          },
          steps: {
            he: [
              "מערבבים את כל הירקות בקערה.",
              "מוסיפים שמן זית, מיץ לימון ומלח, ומערבבים בעדינות.",
              "טועמים, ומוסיפים עוד לימון או מלח לפי הטעם.",
              "מגישים קר או בטמפרטורת החדר."
            ],
            en: [
              "Combine all the vegetables in a bowl.",
              "Add the olive oil, lemon juice and salt, then stir gently.",
              "Taste, and add more lemon juice or salt if you like.",
              "Serve chilled or at room temperature."
            ],
            fr: [
              "Mélanger tous les légumes dans un saladier.",
              "Ajouter l’huile d’olive, le jus de citron et le sel, puis mélanger délicatement.",
              "Goûter et ajouter du citron ou du sel selon l’envie.",
              "Servir frais ou à température ambiante."
            ]
          },
          tip: "Conseil de l’auteure : ajoute l’avocat et la menthe juste avant de servir pour qu’ils restent frais. Une très bonne salade pour accompagner la shakshuka."
        }
      ],

      words: [
        "he_hafgana", "he_yoker", "he_hatsbaa", "he_pras", "he_iriya", "he_srefa", "he_hatsafa", "he_ribit", "he_pesel",
        "he_beitsa", "he_agvaniya", "he_shum", "he_machvat",
        "en_protest", "en_cost_of_living", "en_ban", "en_award", "en_flood", "en_ceasefire", "en_sample", "en_vote",
        "en_simmer", "en_ripe"
      ],

      resources: [
        { kind: "🎧", title: "Hebrew Time (זמן עברית)", url: "https://hebrewtime.squarespace.com/", note: "Podcast hebdomadaire pour niveau intermédiaire : sujets de la vie réelle, hébreu parlé clair." },
        { kind: "🎧", title: "Piece of Hebrew Podcast", url: "https://www.pieceofhebrew.com", note: "Hébreu naturel, niveau intermédiaire et avancé, avec transcriptions. Le podcast mentionne un ebook gratuit bilingue français-hébreu." },
        { kind: "🎧", title: "Yalla: Learning Hebrew with Steph", url: "https://www.hebrew-with-steph.com", note: "Épisodes de 15 à 20 minutes sur la culture, la vie quotidienne et l’actualité, niveau intermédiaire." },
        { kind: "🎧", title: "Ulpan Integraliah", url: "https://castbox.fm/channel/6240334", note: "Dialogues et histoires du quotidien, plusieurs niveaux." },
        { kind: "🎧", title: "BBC Learning English : 6 Minute English", url: "https://www.bbc.co.uk/learningenglish", note: "Pour l’anglais : discussions de 6 minutes sur l’actualité et la culture, avec vocabulaire et transcription." },
        { kind: "📖", title: "BBC Learning English : l’actualité en anglais simplifié", url: "https://www.bbc.co.uk/learningenglish/english/features/learning-english-from-the-news_2026", note: "Les grandes nouvelles du monde racontées pour les apprenants." },
        { kind: "📖", title: "Euronews", url: "https://www.euronews.com/news/europe/france", note: "L’actualité européenne et mondiale en plusieurs langues, source de la plupart des brèves du jour." },
        { kind: "🎬", title: "Vidéos de la shakshuka en hébreu (recherche YouTube)", url: "https://www.youtube.com/results?search_query=%D7%A9%D7%A7%D7%A9%D7%95%D7%A7%D7%94+%D7%9E%D7%AA%D7%9B%D7%95%D7%9F", note: "Une recherche, pas une vidéo choisie : prends-en une courte et active les sous-titres." },
        { kind: "📖", title: "La recette de shakshuka en hébreu (N12)", url: "https://www.mako.co.il/news-tip12/Recipe-cffbe8b77823831006.htm", note: "À lire après avoir cuisiné : tu reconnaîtras les mots du jour." }
      ],

      quiz: [
        { prompt: "Environ combien de personnes ont manifesté en France contre le coût de la vie ?", options: ["Environ 550 000", "Environ 5 000", "Environ 50 000", "Environ 5 millions"], answer: 0, explain: "Environ 550 000 personnes, selon Euronews." },
        { prompt: "Dans quelle ville l’hôtel de ville a-t-il été gravement endommagé par un incendie ?", options: ["Limoges", "Lyon", "Marseille", "Bordeaux"], answer: 0, explain: "C’est l’hôtel de ville de Limoges." },
        { prompt: "Le taux d’emprunt de la France à 10 ans a dépassé quel seuil ?", options: ["5 %", "1 %", "10 %", "15 %"], answer: 0, explain: "Il a dépassé 5 % pour la première fois depuis 2002." },
        { prompt: "Quel est le score du match Strasbourg – PSG du 17 octobre ?", options: ["1-3 (victoire du PSG)", "1-1", "0-2", "2-2"], answer: 0, explain: "Le PSG s’est imposé 3-1 à la Meinau." },
        { prompt: "Quelle part des électeurs de l’Alberta a rejeté la voie vers la séparation ?", options: ["Environ trois sur quatre", "Environ un sur quatre", "Exactement la moitié", "Presque tous"], answer: 0, explain: "Environ trois électeurs sur quatre, selon Euronews." },
        { prompt: "Quelle est la capitale de l’Alberta ?", options: ["Edmonton", "Calgary", "Ottawa", "Vancouver"], answer: 0, explain: "Edmonton est la capitale ; Calgary est la plus grande ville." },
        { prompt: "Quel organe européen a son siège officiel à Strasbourg ?", options: ["Le Parlement européen", "La Commission européenne", "La Banque centrale européenne", "L’OTAN"], answer: 0, explain: "Le siège officiel du Parlement européen est à Strasbourg." },
        { prompt: "Quelle est la capitale de la Navarre ?", options: ["Pampelune", "Séville", "Valence", "Bilbao"], answer: 0, explain: "Pampelune, célèbre pour la fête de San Fermín." },
        { prompt: "Phobos est…", options: ["Une lune de Mars", "Une lune de Jupiter", "Une étoile", "Une comète"], answer: 0, explain: "Phobos est l’une des deux lunes de Mars." },
        { prompt: "Combien de postes Barclays prévoit-il de supprimer ?", options: ["5 000", "500", "50 000", "15 000"], answer: 0, explain: "5 000 postes, en misant sur l’intelligence artificielle." },
        { prompt: "Tous les combien de temps revient environ El Niño ?", options: ["Tous les 2 à 7 ans", "Chaque année", "Tous les 20 ans", "Tous les 50 ans"], answer: 0, explain: "Environ tous les deux à sept ans." },
        { prompt: "En quelle année le Louvre a-t-il ouvert au public comme musée ?", options: ["1793", "1643", "1889", "1900"], answer: 0, explain: "En 1793, pendant la Révolution française." },
        { prompt: "En quelle année Andreï Sakharov a-t-il reçu le prix Nobel de la paix ?", options: ["1975", "1945", "1989", "2003"], answer: 0, explain: "Il l’a reçu en 1975." },
        { prompt: "En quelle année l’éruption du Vésuve a-t-elle enseveli Pompéi ?", options: ["79", "476", "1066", "1492"], answer: 0, explain: "En l’an 79." },
        { prompt: "Combien de temps a duré environ le règne de Ramsès II ?", options: ["Environ 66 ans", "Environ 6 ans", "Environ 20 ans", "Environ 120 ans"], answer: 0, explain: "Environ 66 ans." },
        { prompt: "D’où vient le mot « yalla » ?", options: ["De l’arabe", "Du grec", "Du latin", "Du russe"], answer: 0, explain: "Il est entré en hébreu depuis l’arabe." },
        { prompt: "Dans la shakshuka, quand ajoute-t-on les œufs ?", options: ["Directement dans la sauce bouillante, sans couvrir", "Dans une poêle froide", "Après avoir passé la sauce au four", "Cuits durs, à la fin"], answer: 0, explain: "On les ajoute directement dans la sauce bouillante, sans couvrir." },
        { prompt: "Quand ajoute-t-on l’avocat et la menthe dans la salade israélienne ?", options: ["Juste avant de servir", "Dès le début, la veille", "Jamais", "Après la cuisson"], answer: 0, explain: "Juste avant de servir, pour qu’ils restent frais." }
      ]
    }
  ]
};
