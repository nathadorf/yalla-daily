(() => {
  "use strict";
  const { WORDS, EDITIONS, LEVELS, BADGES } = window.YD;
  const KEY = "yalla-daily-v1";

  /* ---------- utilitaires ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const dayKey = (d = new Date()) => d.toLocaleDateString("sv-SE");
  const shuffle = (a) => {
    a = [...a];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const dirOf = (l) => (l === "he" ? "rtl" : "ltr");
  const goTop = () => { try { window.scrollTo(0, 0); } catch (e) {} };

  /* ---------- état et sauvegarde (navigateur uniquement) ---------- */
  const fresh = () => ({
    xp: 0, streak: 0, lastDay: null, words: {}, done: {}, badges: {}, places: {},
    lang: "both", translit: false, edition: null,
    mission: { day: null, news: false, discover: false, quiz: false }
  });
  let S = fresh();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) S = Object.assign(fresh(), JSON.parse(raw));
  } catch (e) { /* stockage indisponible : on continue sans sauvegarde */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  let view = "home";
  let quiz = null;
  let qmode = "ed"; // "ed" = quiz de l’édition, "words" = révision de mes mots
  let tagFilter = "all";
  const currentEdition = () => EDITIONS.find((e) => e.id === S.edition) || EDITIONS[0];

  /* ---------- notifications ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("on"), 2400);
  }

  /* ---------- niveaux, XP, série, badges, mission ---------- */
  const level = () => {
    let i = 0;
    LEVELS.forEach((l, k) => { if (S.xp >= l[0]) i = k; });
    const nxt = LEVELS[i + 1];
    return { i, name: LEVELS[i][1], cur: LEVELS[i][0], next: nxt ? nxt[0] : null };
  };
  const stageCount = (s) => Object.keys(S.words).filter((id) => WORDS[id] && S.words[id].stage === s).length;
  const doneAny = (p) => Object.keys(S.done).some((k) => k.startsWith(p));
  const cnt = (prefix) => Object.keys(S.done).filter((k) => k.startsWith(prefix)).length;
  const CHECKS = {
    first: () => doneAny("quizdone:"),
    streak3: () => S.streak >= 3,
    sprouts: () => stageCount(1) + stageCount(2) >= 5,
    trees: () => stageCount(2) >= 5,
    chef: () => doneAny("cooked:"),
    globe: () => Object.keys(S.places).length >= 3,
    perfect: () => doneAny("perfect:")
  };
  function checkBadges() {
    BADGES.forEach((b) => {
      if (!S.badges[b.id] && CHECKS[b.id] && CHECKS[b.id]()) {
        S.badges[b.id] = dayKey();
        setTimeout(() => toast(`${b.icon} Badge : ${b.name}`), 1400);
      }
    });
  }
  function touchStreak() {
    const today = dayKey();
    if (S.lastDay === today) return;
    const y = dayKey(new Date(Date.now() - 864e5));
    S.streak = S.lastDay === y ? S.streak + 1 : 1;
    S.lastDay = today;
  }
  function addXP(n, msg) {
    const before = level().i;
    S.xp += n;
    touchStreak();
    const after = level().i;
    checkBadges();
    save();
    renderTop();
    toast(after > before ? `🎉 Nouveau niveau : ${LEVELS[after][1]}` : msg || `+${n} XP ✨`);
  }
  const missionKind = (key) =>
    key.startsWith("news:") ? "news" : /^(geo|culture|cooked):/.test(key) ? "discover" : /^(quizdone|wquizdone):/.test(key) ? "quiz" : null;
  const missionNow = () => (S.mission.day === dayKey() ? S.mission : { news: false, discover: false, quiz: false });
  function award(key, n) {
    if (S.done[key]) return false;
    S.done[key] = 1;
    const k = missionKind(key);
    const d = dayKey();
    if (k) {
      if (S.mission.day !== d) S.mission = { day: d, news: false, discover: false, quiz: false };
      S.mission[k] = true;
    }
    addXP(n);
    const m = missionNow();
    if (m.news && m.discover && m.quiz && !S.done["mission:" + d]) {
      S.done["mission:" + d] = 1;
      setTimeout(() => addXP(10, "🎀 Mission du jour accomplie : +10 XP"), 900);
    }
    return true;
  }

  /* ---------- cycle de vie des mots : 0 graine, 1 pousse, 2 arbre ---------- */
  function ensureWords(ed) {
    ed.words.forEach((id) => { if (WORDS[id] && !S.words[id]) S.words[id] = { stage: 0, since: dayKey() }; });
    save();
  }
  const stageOf = (id) => (S.words[id] ? S.words[id].stage : 0);
  function bump(id, d) {
    const w = S.words[id] || (S.words[id] = { stage: 0, since: dayKey() });
    const n = Math.max(0, Math.min(2, w.stage + d));
    if (n !== w.stage) {
      w.stage = n;
      if (n === 2) setTimeout(() => toast("🌳 Mot acquis : " + WORDS[id].t), 900);
    }
    save();
    checkBadges();
    renderTop();
  }

  /* ---------- lecture à voix haute (voix de l’appareil) ---------- */
  function say(text, lang) {
    if (!("speechSynthesis" in window)) return toast("Lecture vocale indisponible sur cet appareil");
    const code = lang === "he" ? "he" : "en";
    const voices = speechSynthesis.getVoices();
    if (voices.length && !voices.some((v) => v.lang.toLowerCase().startsWith(code))) {
      toast(lang === "he" ? "Pas de voix hébraïque installée sur cet appareil" : "Pas de voix anglaise installée sur cet appareil");
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "he" ? "he-IL" : "en-US";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  }
  const sayBtn = (t, l) => `<button type="button" class="say" data-act="say" data-l="${l}" data-t="${esc(t)}" aria-label="Écouter">🔊</button>`;

  /* ---------- briques d’affichage ---------- */
  const TAGS = {
    France: ["🇫🇷", "pink"], Europe: ["🇪🇺", "sky"], Monde: ["🌍", "lilac"], "Économie": ["💶", "butter"],
    Science: ["🔬", "mint"], Tech: ["🤖", "peach"], Culture: ["🎭", "rose"], Sport: ["⚽", "green"]
  };
  const tagInfo = (t) => TAGS[t] || ["✨", "pink"];

  function trio(o) {
    const he = `<p class="tx he" lang="he" dir="rtl">${esc(o.he)} ${sayBtn(o.he, "he")}</p>`;
    const en = `<p class="tx en" lang="en">${esc(o.en)} ${sayBtn(o.en, "en")}</p>`;
    const fr = `<details class="fr"><summary>🇫🇷 Traduction</summary><p lang="fr">${esc(o.fr)}</p></details>`;
    return (S.lang !== "en" ? he : "") + (S.lang !== "he" ? en : "") + fr;
  }
  const doneBtn = (key, xp, label = "J’ai lu", extra = "") =>
    S.done[key]
      ? `<p class="ok">💗 Fait</p>`
      : `<button type="button" class="btn" data-act="done" data-key="${esc(key)}" data-xp="${xp}" ${extra}>${label} · +${xp} XP</button>`;
  const list = (arr, l) => `<ul class="ing" lang="${l}" dir="${dirOf(l)}">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const olist = (arr, l) => `<ol class="stp" lang="${l}" dir="${dirOf(l)}">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`;

  function langsw() {
    const seg = (v, label, l) => `<button type="button" class="seg${S.lang === v ? " on" : ""}" data-act="lang" data-v="${v}" ${l ? `lang="${l}"` : ""}>${label}</button>`;
    return `<div class="langsw" role="group" aria-label="Langue d’étude"><span>Je pratique</span>${seg("he", "עברית", "he")}${seg("en", "English", "en")}${seg("both", "Les deux")}</div>`;
  }
  function screen(emoji, title, heb, color, body, withLang = true) {
    return `<div class="screen c-${color}">
      <button type="button" class="back" data-act="go" data-v="home">← Accueil</button>
      <h2>${emoji} ${title}</h2><p class="heb" lang="he" dir="rtl">${heb}</p>
      ${withLang ? langsw() : ""}${body}</div>`;
  }

  /* ---------- haut de page et navigation ---------- */
  function renderTop() {
    $("#top").innerHTML = `
      <div class="brand"><span aria-hidden="true">🌸</span> Yalla Daily</div>
      <div class="pills"><span class="pill" title="Points d’expérience">⭐ ${S.xp}</span><span class="pill" title="Jours de suite">🔥 ${S.streak}</span><span class="pill" title="Mots acquis">🌳 ${stageCount(2)}</span></div>`;
  }
  function renderNav() {
    const it = (v, e, l) => `<button type="button" class="nv${view === v ? " on" : ""}" data-act="go" data-v="${v}" aria-label="${l}"><span aria-hidden="true">${e}</span><small>${l}</small></button>`;
    $("#nav").innerHTML = it("home", "🏠", "Accueil") + it("quiz", "🎯", "Quiz") + it("words", "🌱", "Mes mots") + it("progress", "🏆", "Progrès");
  }

  /* ---------- accueil ---------- */
  function vHome() {
    const ed = currentEdition();
    ensureWords(ed);
    const lv = level();
    const pct = lv.next ? Math.min(100, Math.round(((S.xp - lv.cur) / (lv.next - lv.cur)) * 100)) : 100;
    const m = missionNow();
    const mi = (ok, t) => `<li class="${ok ? "ok" : ""}"><span aria-hidden="true">${ok ? "💗" : "🤍"}</span> ${t}</li>`;
    const sel = EDITIONS.length > 1
      ? `<label class="edsel">Édition <select data-act="edition">${EDITIONS.map((e) => `<option value="${e.id}"${e.id === ed.id ? " selected" : ""}>n°${e.n} · ${e.date}</option>`).join("")}</select></label>` : "";
    const tile = (v, e, label, heb, color, sub) =>
      `<button type="button" class="tile c-${color}" data-act="go" data-v="${v}"><span class="em" aria-hidden="true">${e}</span><b>${label}</b><span class="he" lang="he" dir="rtl">${heb}</span><small>${sub}</small></button>`;
    const nWords = Object.keys(S.words).filter((id) => WORDS[id]).length;
    return `
      <section class="hello">
        <p class="hi">Salut toi ! 🌸</p>
        <h2>Yalla, on y va ?</h2>
        <p class="heb" lang="he" dir="rtl">יאללה, מתחילים?</p>
        <p class="date">Édition n°${ed.n} · ${esc(ed.date)}</p>
        ${sel}
        <div class="lvl"><span>${esc(lv.name)}</span><div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>
      </section>
      <section class="mission">
        <h3>🎀 Ta mission du jour</h3>
        <ul>${mi(m.news, "Lire une brève d’actu")}${mi(m.discover, "Découvrir un lieu, un fait ou une recette")}${mi(m.quiz, "Faire un quiz")}</ul>
        <p class="meta">Les trois réussies : +10 XP bonus.</p>
      </section>
      <div class="tiles">
        ${tile("news", "📰", "Actu", "חדשות", "pink", `${cnt(`news:${ed.id}:`)}/${ed.news.length} lues`)}
        ${tile("geo", "🗺️", "Géographie", "גיאוגרפיה", "mint", `${cnt(`geo:${ed.id}:`)}/${ed.geo.length} lieux`)}
        ${tile("culture", "💡", "Culture G", "תרבות", "lilac", `${cnt(`culture:${ed.id}:`)}/${ed.culture.length} faits`)}
        ${tile("recipes", "🍳", "Cuisine", "מתכון", "peach", `${cnt(`cooked:${ed.id}:`)}/${ed.recipes.length} testées`)}
        ${tile("res", "🎧", "Écouter & lire", "משאבים", "sky", `${ed.resources.length} idées`)}
        ${tile("quiz", "🎯", "Quiz", "חידון", "butter", "du jour ou sur tes mots")}
        ${tile("words", "🌱", "Mes mots", "המילים שלי", "green", `${nWords} mots`)}
        ${tile("progress", "🏆", "Progrès", "התקדמות", "rose", `${Object.keys(S.badges).length}/${BADGES.length} badges`)}
      </div>
      <p class="foot">Ta progression est enregistrée dans ce navigateur. Les voix 🔊 sont celles de ton appareil.</p>`;
  }

  /* ---------- rubriques ---------- */
  function vNews() {
    const ed = currentEdition();
    const tags = [...new Set(ed.news.map((n) => n.tag))];
    const chip = (v, label) => `<button type="button" class="chip${tagFilter === v ? " on" : ""}" data-act="tag" data-v="${esc(v)}">${label}</button>`;
    const chips = `<div class="chips" role="group" aria-label="Rubriques">${chip("all", "✨ Tout")}${tags.map((t) => chip(t, `${tagInfo(t)[0]} ${t}`)).join("")}</div>`;
    const cards = ed.news.map((n, i) => [n, i]).filter(([n]) => tagFilter === "all" || n.tag === tagFilter).map(([n, i]) => `
      <article class="card c-${tagInfo(n.tag)[1]}">
        <p class="meta"><span class="tagpill">${tagInfo(n.tag)[0]} ${esc(n.tag)}</span> <a href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.source)}</a></p>
        ${trio(n)}${doneBtn(`news:${ed.id}:${i}`, 3)}
      </article>`).join("");
    return screen("📰", "Actu", "חדשות", "pink", `<p class="lead">${ed.news.length} brèves : choisis ta rubrique, lis ce qui te donne envie.</p>${chips}${cards}`);
  }
  function vGeo() {
    const ed = currentEdition();
    const cards = ed.geo.map((g, i) => {
      const map = `https://www.openstreetmap.org/?mlat=${g.lat}&mlon=${g.lon}#map=${g.z || 8}/${g.lat}/${g.lon}`;
      return `<article class="card c-mint"><h4>📍 ${esc(g.place)}</h4>${trio(g)}<p><a href="${map}" target="_blank" rel="noopener">Voir sur la carte</a></p>${doneBtn(`geo:${ed.id}:${i}`, 5, "J’ai découvert ce lieu", `data-place="${esc(g.place)}"`)}</article>`;
    }).join("");
    return screen("🗺️", "Géographie", "גיאוגרפיה", "mint", `<p class="lead">Chaque lieu découvert s’ajoute à ton carnet de voyage.</p>${cards}`);
  }
  function vCulture() {
    const ed = currentEdition();
    const cards = ed.culture.map((c, i) => `<article class="card c-lilac"><h4>💡 ${esc(c.title)}</h4>${trio(c)}${doneBtn(`culture:${ed.id}:${i}`, 3)}</article>`).join("");
    return screen("💡", "Culture G", "תרבות", "lilac", `<p class="lead">Des petits faits à glisser dans une conversation.</p>${cards}`);
  }
  function vRecipes() {
    const ed = currentEdition();
    const cards = ed.recipes.map((r, i) => `
      <details class="card rec c-peach"${i === 0 ? " open" : ""}>
        <summary><span class="rt" lang="he" dir="rtl">${esc(r.title.he)}</span> · ${esc(r.title.fr)}</summary>
        <p class="meta"><b>Casher</b> · ${esc(r.kosher)}</p>
        <div class="two">
          <div><h5>Ingrédients</h5>${S.lang !== "en" ? list(r.ingredients.he, "he") : ""}${S.lang !== "he" ? list(r.ingredients.en, "en") : ""}
            <details class="fr"><summary>🇫🇷 Traduction</summary>${list(r.ingredients.fr, "fr")}</details></div>
          <div><h5>Préparation ${sayBtn(r.steps.he.join(" "), "he")}</h5>${S.lang !== "en" ? olist(r.steps.he, "he") : ""}${S.lang !== "he" ? olist(r.steps.en, "en") : ""}
            <details class="fr"><summary>🇫🇷 Traduction</summary>${olist(r.steps.fr, "fr")}</details></div>
        </div>
        <p class="tip">${esc(r.tip)}</p>
        <p class="meta"><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.source)}</a></p>
        ${doneBtn(`cooked:${ed.id}:${i}`, 15, "J’ai cuisiné cette recette")}
      </details>`).join("");
    return screen("🍳", "Cuisine", "מתכון", "peach", `<p class="lead">Cuisine casher, en hébreu et en anglais. Touche une recette pour l’ouvrir.</p>${cards}`);
  }
  function vRes() {
    const ed = currentEdition();
    const cards = ed.resources.map((x, i) => `
      <article class="card c-sky res">
        <span class="k" aria-hidden="true">${x.kind}</span>
        <div><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title)}</a><p>${esc(x.note)}</p>
        ${doneBtn(`res:${ed.id}:${i}`, 5, x.kind === "🎧" ? "J’ai écouté" : x.kind === "🎬" ? "J’ai regardé" : "J’ai lu")}</div>
      </article>`).join("");
    return screen("🎧", "Écouter & lire", "משאבים", "sky", `<p class="lead">Des vraies ressources pour t’immerger : podcasts, vidéos et lectures.</p>${cards}`, false);
  }

  /* ---------- quiz ---------- */
  function wordQ(id) {
    const w = WORDS[id];
    const reverse = stageOf(id) >= 2;
    const key = reverse ? "t" : "fr";
    const pool = shuffle(Object.keys(WORDS).filter((k) => k !== id && WORDS[k].lang === w.lang));
    const seen = new Set([w[key]]);
    const ds = [];
    for (const k of pool) {
      if (!seen.has(WORDS[k][key])) { seen.add(WORDS[k][key]); ds.push(k); }
      if (ds.length === 3) break;
    }
    const opts = shuffle([id, ...ds]).map((k) => ({ label: WORDS[k][key], lang: reverse ? w.lang : "fr", ok: k === id }));
    const prompt = reverse
      ? `Comment dit-on « ${esc(w.fr)} » en ${w.lang === "he" ? "hébreu" : "anglais"} ?`
      : `Que signifie « <span class="tw" lang="${w.lang}" dir="${dirOf(w.lang)}">${esc(w.t)}</span> » ?`;
    return { id: "w:" + id, wid: id, prompt, options: opts, explain: `${w.t} = ${w.fr}` };
  }
  const myWordIds = () => Object.keys(S.words).filter((id) => WORDS[id]);
  function buildQuiz() {
    if (qmode === "words") {
      // les mots les moins acquis d’abord, au hasard à stade égal
      return shuffle(myWordIds()).sort((a, b) => stageOf(a) - stageOf(b)).slice(0, 8).map(wordQ);
    }
    const ed = currentEdition();
    const review = [];
    EDITIONS.forEach((e) => { if (e.id !== ed.id) e.words.forEach((id) => { if (S.words[id] && S.words[id].stage < 2) review.push(id); }); });
    const rp = shuffle(review).slice(0, 2);
    const own = shuffle(ed.words.filter((id) => WORDS[id] && !rp.includes(id)));
    const wq = [...rp, ...own].slice(0, 4).map(wordQ);
    const sq = shuffle(ed.quiz.map((q, i) => ({
      id: "s" + i, prompt: esc(q.prompt), explain: q.explain,
      options: q.options.map((o, k) => ({ label: o, lang: "fr", ok: k === q.answer }))
    }))).slice(0, 6);
    return [...wq, ...sq];
  }
  function renderQuiz() {
    const box = $("#quizbox");
    if (!box) return;
    const ed = currentEdition();
    if (!quiz) {
      if (qmode === "words") {
        const n = myWordIds().length;
        box.innerHTML = n < 4
          ? `<p>Ton carnet est encore petit (${n} mot${n > 1 ? "s" : ""}). Ouvre une rubrique de l’édition du jour : les mots arrivent tout seuls.</p>`
          : `<p>8 questions sur les mots de ton carnet, en commençant par ceux qui ont le plus besoin de révision. Un mot réussi monte d’un stade 🌱→🌿→🌳, un mot raté redescend.</p><button type="button" class="btn" data-act="qstart">Lancer la révision</button>`;
      } else {
        box.innerHTML = `<p>10 questions : 4 sur les mots, 6 sur l’actu, la géo, la culture et la cuisine du jour. Elles changent à chaque partie.</p><button type="button" class="btn" data-act="qstart">Lancer le quiz du jour</button>`;
      }
      return;
    }
    if (quiz.i >= quiz.qs.length) {
      const total = quiz.qs.length;
      if (quiz.mode === "words") award(`wquizdone:${dayKey()}`, 10);
      else {
        award(`quizdone:${ed.id}`, 20);
        if (quiz.score === total) award(`perfect:${ed.id}`, 30);
      }
      box.innerHTML = `<p class="qscore">${quiz.score} / ${total} ${quiz.score === total ? "🎉" : "💪"}</p><p>${quiz.score === total ? "Sans faute !" : "Les mots ratés redescendent d’un stade et reviendront bientôt."}</p><button type="button" class="btn" data-act="qstart">Rejouer</button>`;
      return;
    }
    const q = quiz.qs[quiz.i];
    box.innerHTML = `
      <p class="qn">Question ${quiz.i + 1} sur ${quiz.qs.length}</p>
      <p class="qp">${q.prompt}</p>
      <div class="opts">${q.options.map((o, k) => `<button type="button" class="opt" data-act="qans" data-k="${k}" lang="${o.lang}" dir="${dirOf(o.lang)}">${esc(o.label)}</button>`).join("")}</div>
      <div id="qfb" aria-live="polite"></div>`;
  }
  function answer(btn) {
    const ed = currentEdition();
    const q = quiz.qs[quiz.i];
    const k = +btn.dataset.k;
    const ok = q.options[k].ok;
    document.querySelectorAll("#quizbox .opt").forEach((b, i) => {
      b.disabled = true;
      if (q.options[i].ok) b.classList.add("good");
      else if (i === k) b.classList.add("bad");
    });
    if (ok) {
      quiz.score++;
      if (quiz.mode === "words") award(`wq:${dayKey()}:${q.id}`, 5);
      else award(`q:${ed.id}:${q.id}`, 10);
    }
    if (q.wid) bump(q.wid, ok ? 1 : -1);
    $("#qfb").innerHTML = `<p class="fb ${ok ? "yes" : "no"}">${ok ? "Bravo ! 💗" : "Pas tout à fait."} ${esc(q.explain)}</p><button type="button" class="btn" data-act="qnext">${quiz.i + 1 < quiz.qs.length ? "Question suivante" : "Voir le score"}</button>`;
  }
  function vQuiz() {
    const mode = (v, e, t, sub) => `<button type="button" class="mode c-${v === "ed" ? "butter" : "green"}${qmode === v ? " on" : ""}" data-act="qmode" data-v="${v}"><span aria-hidden="true">${e}</span><b>${t}</b><small>${sub}</small></button>`;
    return screen("🎯", "Quiz", "חידון", "butter",
      `<div class="modes">${mode("ed", "🎯", "Quiz du jour", "actu, géo, culture, cuisine")}${mode("words", "🌱", "Mes mots appris", `${myWordIds().length} mots dans le carnet`)}</div><div id="quizbox" class="quizbox"></div>`, false);
  }

  /* ---------- mes mots ---------- */
  function vWords() {
    const ids = myWordIds();
    const groups = [
      [0, "🌱 Graines", "Tu viens de les rencontrer."],
      [1, "🌿 Pousses", "Tu commences à les reconnaître. Touche « Voir » pour la traduction."],
      [2, "🌳 Arbres", "Plus aucune aide : ils sont à toi."]
    ];
    const card = (id) => {
      const w = WORDS[id], st = S.words[id].stage;
      const fr = st === 0 ? `<span class="wfr">${esc(w.fr)}</span>` : `<details class="fr"><summary>Voir</summary><p>${esc(w.fr)}</p></details>`;
      return `<li class="wc"><span class="tw big" lang="${w.lang}" dir="${dirOf(w.lang)}">${esc(w.t)}</span>${S.translit && w.tr ? `<small class="trs">${esc(w.tr)}</small>` : ""}<span class="wl">${w.lang === "he" ? "🇮🇱" : "🇬🇧"}</span>${sayBtn(w.t, w.lang)}${fr}</li>`;
    };
    const body = ids.length
      ? `<div class="row"><button type="button" class="btn" data-act="review">🎯 Réviser mes mots</button>
         <label class="edsel"><input type="checkbox" data-act="translit" ${S.translit ? "checked" : ""}> Translittération</label></div>` +
        groups.map(([s, title, sub]) => {
          const g = ids.filter((id) => S.words[id].stage === s);
          return `<section class="grp"><h3>${title} <span class="cnt">${g.length}</span></h3><p class="meta">${sub}</p>${g.length ? `<ul class="wlist">${g.map(card).join("")}</ul>` : `<p class="empty">Aucun mot pour l’instant.</p>`}</section>`;
        }).join("")
      : `<p class="empty">Ton carnet est vide. Ouvre une rubrique de l’édition du jour : les mots arrivent tout seuls.</p>`;
    return screen("🌱", "Mes mots", "המילים שלי", "green", body, false);
  }

  /* ---------- progrès ---------- */
  function vProgress() {
    const lv = level();
    const nextTxt = lv.next ? `Encore ${lv.next - S.xp} XP pour « ${LEVELS[lv.i + 1][1]} ».` : "Niveau maximum atteint.";
    const badges = BADGES.map((b) => `<li class="bd${S.badges[b.id] ? " on" : ""}"><span aria-hidden="true">${b.icon}</span><b>${b.name}</b><small>${b.desc}</small></li>`).join("");
    const places = Object.keys(S.places);
    const body = `
      <p class="lead">${esc(lv.name)} · ${S.xp} XP. ${nextTxt}</p>
      <section class="grp"><h3>🏅 Badges</h3><ul class="bds">${badges}</ul></section>
      <section class="grp"><h3>📍 Carnet de voyage <span class="cnt">${places.length}</span></h3>
        ${places.length ? `<ul class="plc">${places.map((p) => `<li>📍 ${esc(p)}</li>`).join("")}</ul>` : `<p class="empty">Aucun lieu découvert. Va dans Géographie !</p>`}</section>
      <section class="grp"><h3>💾 Sauvegarde</h3>
        <p class="meta">Ta progression vit dans ce navigateur. Pour la déplacer sur un autre appareil, copie-la puis importe-la là-bas.</p>
        <div class="row"><button type="button" class="btn alt" data-act="export">Copier ma sauvegarde</button><button type="button" class="btn alt" data-act="import">Importer</button><button type="button" class="btn alt danger" data-act="reset">Tout effacer</button></div>
      </section>`;
    return screen("🏆", "Progrès", "התקדמות", "rose", body, false);
  }

  /* ---------- rendu et événements ---------- */
  const VIEWS = { home: vHome, news: vNews, geo: vGeo, culture: vCulture, recipes: vRecipes, res: vRes, quiz: vQuiz, words: vWords, progress: vProgress };
  function render() {
    renderTop();
    renderNav();
    $("#main").innerHTML = (VIEWS[view] || vHome)();
    if (view === "quiz") renderQuiz();
  }

  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("[data-act]");
    if (!el || el.tagName === "SELECT" || el.type === "checkbox") return;
    const act = el.dataset.act;
    if (act === "go") { view = el.dataset.v; if (view !== "quiz") quiz = null; goTop(); render(); }
    else if (act === "lang") { S.lang = el.dataset.v; save(); render(); }
    else if (act === "tag") { tagFilter = el.dataset.v; render(); }
    else if (act === "say") say(el.dataset.t, el.dataset.l);
    else if (act === "done") {
      if (el.dataset.place) S.places[el.dataset.place] = dayKey();
      award(el.dataset.key, +el.dataset.xp);
      render();
    }
    else if (act === "qmode") { qmode = el.dataset.v; quiz = null; render(); }
    else if (act === "review") { qmode = "words"; view = "quiz"; quiz = { mode: "words", qs: buildQuiz(), i: 0, score: 0 }; goTop(); render(); }
    else if (act === "qstart") { quiz = { mode: qmode, qs: buildQuiz(), i: 0, score: 0 }; renderQuiz(); }
    else if (act === "qans") answer(el);
    else if (act === "qnext") { quiz.i++; renderQuiz(); }
    else if (act === "export") {
      const data = JSON.stringify(S);
      (navigator.clipboard ? navigator.clipboard.writeText(data) : Promise.reject())
        .then(() => toast("Sauvegarde copiée 💾"))
        .catch(() => window.prompt("Copie cette sauvegarde :", data));
    }
    else if (act === "import") {
      const raw = window.prompt("Colle ici ta sauvegarde :");
      if (!raw) return;
      try { S = Object.assign(fresh(), JSON.parse(raw)); save(); toast("Sauvegarde importée"); render(); }
      catch (e) { toast("Sauvegarde illisible"); }
    }
    else if (act === "reset") {
      if (window.confirm("Effacer toute ta progression sur cet appareil ?")) { S = fresh(); save(); quiz = null; render(); }
    }
  });
  document.addEventListener("change", (ev) => {
    const el = ev.target.closest("[data-act]");
    if (!el) return;
    if (el.dataset.act === "edition") { S.edition = el.value; quiz = null; save(); render(); }
    else if (el.dataset.act === "translit") { S.translit = el.checked; save(); render(); }
  });

  document.addEventListener("DOMContentLoaded", () => {
    $("#app").innerHTML = `<header id="top" class="top"></header><main id="main" class="page"></main><nav id="nav" class="nav" aria-label="Navigation"></nav>`;
    // la série retombe à zéro si on a raté un jour
    const y = dayKey(new Date(Date.now() - 864e5));
    if (S.lastDay && S.lastDay !== dayKey() && S.lastDay !== y && S.streak) { S.streak = 0; save(); }
    render();
  });
})();
