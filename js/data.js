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
    he_ribit: { lang: "he", t: "ריבית", tr: "ribit", fr: "taux d’intérêt" },
    he_bchirot: { lang: "he", t: "בחירות", tr: "bkhirot", fr: "élections" },
    he_agam: { lang: "he", t: "אגם", tr: "agam", fr: "lac" },
    he_beitsa: { lang: "he", t: "ביצה", tr: "beitsa", fr: "œuf" },
    he_agvaniya: { lang: "he", t: "עגבנייה", tr: "agvaniya", fr: "tomate" },
    he_shum: { lang: "he", t: "שום", tr: "shum", fr: "ail" },
    he_pras: { lang: "he", t: "פרס", tr: "pras", fr: "prix, récompense" },
    he_tseadim: { lang: "he", t: "צעדים", tr: "tse’adim", fr: "pas (marche)" },
    he_machvat: { lang: "he", t: "מחבת", tr: "makhvat", fr: "poêle" },
    en_interest_rate: { lang: "en", t: "interest rate", tr: "", fr: "taux d’intérêt" },
    en_award: { lang: "en", t: "award", tr: "", fr: "prix, récompense" },
    en_freshwater: { lang: "en", t: "freshwater", tr: "", fr: "d’eau douce" },
    en_simmer: { lang: "en", t: "simmer", tr: "", fr: "mijoter" },
    en_ripe: { lang: "en", t: "ripe", tr: "", fr: "mûr" }
  },

  EDITIONS: [
    {
      id: "2026-10-22",
      n: 1,
      date: "22 octobre 2026",

      news: [
        {
          tag: "Économie",
          source: "The Times of Israel, 21-22 oct. 2026",
          url: "https://www.timesofisrael.com/latest/",
          he: "השבוע בנק ישראל השאיר את הריבית ללא שינוי, כמה ימים לפני הבחירות. הנגיד ירון ביקש מהממשלה הבאה להקטין את החוב ולעודד צמיחה.",
          en: "This week, the Bank of Israel left the interest rate unchanged, a few days before the election. Governor Yaron asked the next government to reduce the debt and encourage growth.",
          fr: "Cette semaine, la Banque d’Israël a laissé son taux d’intérêt inchangé, à quelques jours des élections. Le gouverneur Yaron a demandé au prochain gouvernement de réduire la dette et de soutenir la croissance."
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
          tag: "Santé",
          source: "Ynet, relayé par The Times of Israel, 22 oct. 2026",
          url: "https://www.timesofisrael.com/newsfeed/",
          he: "לפי דיווח באתר ynet, גם 3,000 צעדים ביום קשורים להאטה בשינויים במוח שקשורים למחלת האלצהיימר.",
          en: "According to a report on Ynet, even 3,000 steps a day are linked to slower brain changes related to Alzheimer’s disease.",
          fr: "Selon un article de Ynet, même 3 000 pas par jour sont associés à un ralentissement des changements cérébraux liés à la maladie d’Alzheimer. (Étude sur le cerveau, pas sur le poids : marcher reste une très bonne habitude dans les deux cas.)"
        }
      ],

      geo: {
        place: "Lac de Tibériade (Kinneret)",
        lat: 32.82,
        lon: 35.59,
        he: "הכנרת היא אגם המים המתוקים הגדול ביותר בישראל. היא נמצאת כ־210 מטר מתחת לפני הים.",
        en: "The Sea of Galilee, called the Kinneret in Hebrew, is Israel’s largest freshwater lake. It lies about 210 meters below sea level.",
        fr: "Le lac de Tibériade (Kinneret en hébreu) est le plus grand lac d’eau douce d’Israël. Il se trouve à environ 210 mètres sous le niveau de la mer."
      },

      culture: [
        {
          title: "Une langue revenue à la vie",
          he: "במשך כמעט אלפיים שנה העברית הייתה בעיקר שפת כתיבה ותפילה. בסוף המאה ה־19 אליעזר בן־יהודה עזר להחיות אותה כשפה מדוברת.",
          en: "For almost 2,000 years, Hebrew was mostly a language of writing and prayer. In the late 19th century, Eliezer Ben-Yehuda helped bring it back as a spoken language.",
          fr: "Pendant presque 2 000 ans, l’hébreu a surtout été une langue écrite et de prière. À la fin du XIXe siècle, Eliezer Ben-Yehuda a contribué à la faire revivre comme langue parlée."
        },
        {
          title: "D’où vient « yalla » ?",
          he: "המילה ״יאללה״ הגיעה לעברית מהערבית, והיא אומרת ״קדימה!״ או ״בוא נלך!״.",
          en: "The word “yalla” came into Hebrew from Arabic. It means “come on!” or “let’s go!”",
          fr: "Le mot « yalla » est entré en hébreu depuis l’arabe. Il signifie « allez ! » ou « on y va ! »."
        }
      ],

      recipe: {
        title: "שקשוקה · Shakshuka classique",
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

      /* Texte mixte : {id|français|forme hébraïque éventuelle}. L’affichage dépend du stade du mot. */
      mixed: [
        "Quelques jours avant les {he_bchirot|élections}, la banque centrale a laissé le {he_ribit|taux d’intérêt} inchangé.",
        "La banque a laissé l’{en_interest_rate|taux d’intérêt} inchangé.",
        "Pour la shakshuka, on cuit des {he_agvaniya|tomates|עגבניות} avec de l’{he_shum|ail} dans une {he_machvat|poêle}, puis on ajoute les {he_beitsa|œufs|ביצים}.",
        "Laisse la sauce {en_simmer|mijoter} doucement, avec des tomates bien {en_ripe|mûres}.",
        "Le Kinneret est un {he_agam|lac} {en_freshwater|d’eau douce} dans le nord d’Israël.",
        "La Cour pénale internationale a reçu un {he_pras|prix} européen, un {en_award|prix} pour les droits humains.",
        "Même 3 000 {he_tseadim|pas} par jour comptent, selon un article de Ynet."
      ],

      words: [
        "he_ribit", "he_bchirot", "he_agam", "he_beitsa", "he_agvaniya", "he_shum", "he_pras", "he_tseadim", "he_machvat",
        "en_interest_rate", "en_award", "en_freshwater", "en_simmer", "en_ripe"
      ],

      resources: [
        { kind: "🎧", title: "Hebrew Time (זמן עברית)", url: "https://hebrewtime.squarespace.com/", note: "Podcast hebdomadaire pour niveau intermédiaire : sujets de la vie réelle, hébreu parlé clair." },
        { kind: "🎧", title: "Piece of Hebrew Podcast", url: "https://www.pieceofhebrew.com", note: "Hébreu naturel, niveau intermédiaire et avancé, avec transcriptions. Le podcast mentionne un ebook gratuit bilingue français-hébreu." },
        { kind: "🎧", title: "Yalla: Learning Hebrew with Steph", url: "https://www.hebrew-with-steph.com", note: "Épisodes de 15 à 20 minutes sur la culture, la vie quotidienne et l’actualité, niveau intermédiaire." },
        { kind: "🎧", title: "Ulpan Integraliah", url: "https://castbox.fm/channel/6240334", note: "Dialogues et histoires du quotidien, plusieurs niveaux." },
        { kind: "🎧", title: "BBC Learning English : 6 Minute English", url: "https://www.bbc.co.uk/learningenglish", note: "Pour l’anglais : discussions de 6 minutes sur l’actualité et la culture, avec vocabulaire et transcription." },
        { kind: "🎬", title: "Vidéos de la shakshuka en hébreu (recherche YouTube)", url: "https://www.youtube.com/results?search_query=%D7%A9%D7%A7%D7%A9%D7%95%D7%A7%D7%94+%D7%9E%D7%AA%D7%9B%D7%95%D7%9F", note: "Une recherche, pas une vidéo choisie : prends-en une courte et active les sous-titres." },
        { kind: "📖", title: "La recette originale en hébreu (N12)", url: "https://www.mako.co.il/news-tip12/Recipe-cffbe8b77823831006.htm", note: "À lire après avoir cuisiné : tu reconnaîtras les mots du jour." },
        { kind: "📖", title: "The Times of Israel", url: "https://www.timesofisrael.com/", note: "L’actualité d’Israël en anglais, source des brèves de cette édition." }
      ],

      quiz: [
        { prompt: "Qui a décerné le prix Sakharov évoqué dans les brèves ?", options: ["L’Union européenne", "L’ONU", "La Banque d’Israël", "La FIFA"], answer: 0, explain: "C’est le prix Sakharov de l’Union européenne pour les droits humains." },
        { prompt: "Qu’a fait la Banque d’Israël avec son taux d’intérêt ?", options: ["Elle l’a augmenté", "Elle l’a laissé inchangé", "Elle l’a baissé", "Elle l’a supprimé"], answer: 1, explain: "Le taux est resté inchangé, quelques jours avant les élections." },
        { prompt: "À quelle altitude se trouve le Kinneret ?", options: ["Environ 210 m sous le niveau de la mer", "Environ 430 m sous le niveau de la mer", "Au niveau de la mer", "Environ 210 m au-dessus de la mer"], answer: 0, explain: "Le Kinneret est à environ 210 m sous le niveau de la mer." },
        { prompt: "Qui a aidé à faire revivre l’hébreu comme langue parlée ?", options: ["Eliezer Ben-Yehuda", "Moïse Maïmonide", "Theodor Herzl", "David Ben Gourion"], answer: 0, explain: "Eliezer Ben-Yehuda, à la fin du XIXe siècle." },
        { prompt: "Dans la shakshuka, quand ajoute-t-on les œufs ?", options: ["Directement dans la sauce bouillante, sans couvrir", "Dans une poêle froide", "Après avoir passé la sauce au four", "Cuits durs, à la fin"], answer: 0, explain: "On les ajoute directement dans la sauce bouillante, sans couvrir." }
      ]
    }
  ]
};
