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

  /* ---------- état et sauvegarde (navigateur uniquement) ---------- */
  const fresh = () => ({ xp: 0, streak: 0, lastDay: null, words: {}, done: {}, badges: {}, places: {}, lang: "both", translit: false, edition: null });
  let S = fresh();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) S = Object.assign(fresh(), JSON.parse(raw));
  } catch (e) { /* stockage indisponible : on continue sans sauvegarde */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  let view = "today";
  let quiz = null;
  const currentEdition = () => EDITIONS.find((e) => e.id === S.edition) || EDITIONS[0];

  /* ---------- notifications ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("on"), 2300);
  }

  /* ---------- niveaux, XP, série, badges ---------- */
  const level = () => {
    let i = 0;
    LEVELS.forEach((l, k) => { if (S.xp >= l[0]) i = k; });
    const nxt = LEVELS[i + 1];
    return { i, name: LEVELS[i][1], cur: LEVELS[i][0], next: nxt ? nxt[0] : null };
  };
  const stageCount = (s) => Object.values(S.words).filter((w) => w.stage === s).length;
  const doneAny = (p) => Object.keys(S.done).some((k) => k.startsWith(p));
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
        setTimeout(() => toast(`${b.icon} Badge : ${b.name}`), 1300);
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
  function addXP(n) {
    const before = level().i;
    S.xp += n;
    touchStreak();
    const after = level().i;
    checkBadges();
    save();
    renderHeader();
    toast(after > before ? `Nouveau niveau : ${LEVELS[after][1]}` : `+${n} XP`);
  }
  function award(key, n) {
    if (S.done[key]) return false;
    S.done[key] = 1;
    addXP(n);
    return true;
  }

  /* ---------- cycle de vie des mots : 0 graine, 1 pousse, 2 arbre ---------- */
  function ensureWords(ed) {
    ed.words.forEach((id) => { if (WORDS[id] && !S.words[id]) S.words[id] = { stage: 0, since: dayKey() }; });
    save();
  }
  function bump(id, d) {
    const w = S.words[id] || (S.words[id] = { stage: 0, since: dayKey() });
    const n = Math.max(0, Math.min(2, w.stage + d));
    if (n !== w.stage) {
      w.stage = n;
      if (n === 2) setTimeout(() => toast("🌳 Mot acquis : " + WORDS[id].t), 900);
    }
    save();
    checkBadges();
    renderHeader();
  }
  const stageOf = (id) => (S.words[id] ? S.words[id].stage : 0);

  function wordSpan(id, fr, over) {
    const w = WORDS[id];
    if (!w) return esc(fr);
    const st = stageOf(id);
    const target = over || w.t;
    const tgt = `<span class="tw" lang="${w.lang}" dir="${dirOf(w.lang)}">${esc(target)}</span>`;
    if (st === 0) return `<span class="w w0">${esc(fr)} <span class="par">(${tgt})</span></span>`;
    const tr = st === 1 && w.tr ? `<small class="trs">${esc(w.tr)}</small>` : "";
    return `<button type="button" class="w w${st}" data-act="peek" data-fr="${esc(fr)}">${tgt}${tr}</button>`;
  }
  function mix(tpl) {
    return tpl.replace(/\{(\w+)\|([^|}]+)(?:\|([^}]+))?\}/g, (_, id, fr, over) => wordSpan(id, fr, over));
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
  function trio(o) {
    const he = `<p class="tx he" lang="he" dir="rtl">${esc(o.he)} ${sayBtn(o.he, "he")}</p>`;
    const en = `<p class="tx en" lang="en">${esc(o.en)} ${sayBtn(o.en, "en")}</p>`;
    const fr = `<details class="fr"><summary>Traduction</summary><p lang="fr">${esc(o.fr)}</p></details>`;
    return (S.lang !== "en" ? he : "") + (S.lang !== "he" ? en : "") + fr;
  }
  const doneBtn = (key, xp, label = "J’ai lu", extra = "") =>
    S.done[key]
      ? `<p class="ok">✓ Fait</p>`
      : `<button type="button" class="btn" data-act="done" data-key="${esc(key)}" data-xp="${xp}" ${extra}>${label} · +${xp} XP</button>`;
  const sec = (id, fr, he, body) =>
    `<section class="blk" id="${id}"><div class="hd"><h3>${fr}</h3><span class="hh" lang="he" dir="rtl">${he}</span></div>${body}</section>`;
  const list = (arr, l) => `<ul class="ing" lang="${l}" dir="${dirOf(l)}">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const olist = (arr, l) => `<ol class="stp" lang="${l}" dir="${dirOf(l)}">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`;

  /* ---------- en-tête ---------- */
  function renderHeader() {
    const lv = level();
    const pct = lv.next ? Math.min(100, Math.round(((S.xp - lv.cur) / (lv.next - lv.cur)) * 100)) : 100;
    const tab = (v, label) => `<button type="button" role="tab" aria-selected="${view === v}" class="tab${view === v ? " on" : ""}" data-act="tab" data-v="${v}">${label}</button>`;
    $("#hdr").innerHTML = `
      <div class="brand">
        <span class="logo" aria-hidden="true">🌳</span>
        <div><h1>Yalla Daily</h1><p lang="he" dir="rtl">יאללה, בואי נלמד</p></div>
      </div>
      <div class="stats">
        <div class="stat"><b>${S.xp}</b><span>XP</span></div>
        <div class="stat"><b>${S.streak} 🔥</b><span>jours de suite</span></div>
        <div class="stat"><b>${stageCount(2)} 🌳</b><span>mots acquis</span></div>
      </div>
      <div class="lvl"><span>${esc(lv.name)}</span><div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>
      <nav class="tabs" role="tablist">${tab("today", "Aujourd’hui")}${tab("words", "Mes mots")}${tab("progress", "Progrès")}</nav>`;
  }

  /* ---------- vue « Aujourd’hui » ---------- */
  function viewToday() {
    const ed = currentEdition();
    ensureWords(ed);
    const seg = (v, label, l) => `<button type="button" class="seg${S.lang === v ? " on" : ""}" data-act="lang" data-v="${v}" ${l ? `lang="${l}"` : ""}>${label}</button>`;
    const sel = EDITIONS.length > 1
      ? `<label class="edsel">Édition <select data-act="edition">${EDITIONS.map((e) => `<option value="${e.id}"${e.id === ed.id ? " selected" : ""}>n°${e.n} · ${e.date}</option>`).join("")}</select></label>`
      : "";

    const news = ed.news.map((n) =>
      `<article class="news"><p class="meta"><b>${esc(n.tag)}</b> · <a href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.source)}</a></p>${trio(n)}</article>`
    ).join("");

    const g = ed.geo;
    const map = `https://www.openstreetmap.org/?mlat=${g.lat}&mlon=${g.lon}#map=10/${g.lat}/${g.lon}`;
    const geo = `<h4>${esc(g.place)}</h4>${trio(g)}<p><a href="${map}" target="_blank" rel="noopener">Voir sur la carte</a></p>` +
      doneBtn(`geo:${ed.id}`, 5, "J’ai découvert ce lieu", `data-place="${esc(g.place)}"`);

    const culture = ed.culture.map((c) => `<article class="news"><h4>${esc(c.title)}</h4>${trio(c)}</article>`).join("") + doneBtn(`culture:${ed.id}`, 5);

    const r = ed.recipe;
    const recipe = `
      <h4 lang="he" dir="rtl" class="rt">${esc(r.title)}</h4>
      <p class="meta"><b>Casher</b> · ${esc(r.kosher)}</p>
      <div class="two">
        <div><h5>Ingrédients</h5>${S.lang !== "en" ? list(r.ingredients.he, "he") : ""}${S.lang !== "he" ? list(r.ingredients.en, "en") : ""}
          <details class="fr"><summary>Traduction</summary>${list(r.ingredients.fr, "fr")}</details></div>
        <div><h5>Préparation ${sayBtn(r.steps.he.join(" "), "he")}</h5>${S.lang !== "en" ? olist(r.steps.he, "he") : ""}${S.lang !== "he" ? olist(r.steps.en, "en") : ""}
          <details class="fr"><summary>Traduction</summary>${olist(r.steps.fr, "fr")}</details></div>
      </div>
      <p class="tip">${esc(r.tip)}</p>
      <p class="meta"><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.source)}</a></p>` +
      doneBtn(`cooked:${ed.id}`, 15, "J’ai cuisiné cette recette");

    const mixed = `<p class="legend"><span class="w w0">🌱 mot traduit</span> <span class="w w1">🌿 touche pour la traduction</span> <span class="w w2">🌳 plus d’aide</span></p>` +
      ed.mixed.map((m) => `<p class="mix">${mix(m)}</p>`).join("") +
      `<p class="meta">Les mots que tu réussis au quiz passent d’un stade au suivant, et reviennent dans les prochaines éditions.</p>`;

    const resources = `<ul class="res">${ed.resources.map((x, i) =>
      `<li><span class="k" aria-hidden="true">${x.kind}</span><div><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title)}</a><p>${esc(x.note)}</p>${doneBtn(`res:${ed.id}:${i}`, 5, x.kind === "🎧" ? "J’ai écouté" : x.kind === "🎬" ? "J’ai regardé" : "J’ai lu")}</div></li>`
    ).join("")}</ul>`;

    return `
      <div class="edhead">
        <div><h2>Édition n°${ed.n}</h2><p class="date">${esc(ed.date)}</p></div>
        ${sel}
      </div>
      <div class="langsw" role="group" aria-label="Langue d’étude">
        <span>Je pratique</span>${seg("he", "עברית", "he")}${seg("en", "English", "en")}${seg("both", "Les deux")}
      </div>
      ${sec("news", "Actualité", "חדשות", news)}
      ${sec("mixed", "Texte mixte", "מעורב", mixed)}
      ${sec("geo", "Géographie", "גיאוגרפיה", geo)}
      ${sec("culture", "Culture générale", "תרבות", culture)}
      ${sec("recipe", "Cuisine", "מתכון", recipe)}
      ${sec("res", "À écouter, à regarder, à lire", "משאבים", resources)}
      ${sec("quiz", "Quiz du jour", "חידון", `<div id="quizbox"></div>`)}
      <footer class="foot">
        <p>Brèves tirées d’articles du jour (liens ci-dessus). Les voix 🔊 sont celles de ton appareil : correctes, pas parfaites. Ta progression est enregistrée dans ce navigateur uniquement.</p>
      </footer>`;
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
  function buildQuiz() {
    const ed = currentEdition();
    const review = [];
    EDITIONS.forEach((e) => { if (e.id !== ed.id) e.words.forEach((id) => { if (S.words[id] && S.words[id].stage < 2) review.push(id); }); });
    const rp = shuffle(review).slice(0, 2);
    const own = shuffle(ed.words.filter((id) => WORDS[id] && !rp.includes(id)));
    const wq = [...rp, ...own].slice(0, 5).map(wordQ);
    const sq = ed.quiz.map((q, i) => ({
      id: "s" + i, prompt: esc(q.prompt), explain: q.explain,
      options: q.options.map((o, k) => ({ label: o, lang: "fr", ok: k === q.answer }))
    }));
    return [...wq, ...sq];
  }
  function renderQuiz() {
    const box = $("#quizbox");
    if (!box) return;
    const ed = currentEdition();
    if (!quiz) {
      box.innerHTML = `<p>${Math.min(5, ed.words.length)} questions sur les mots, ${ed.quiz.length} sur l’édition. Un mot réussi monte d’un stade, un mot raté redescend.</p><button type="button" class="btn" data-act="qstart">Lancer le quiz</button>`;
      return;
    }
    if (quiz.i >= quiz.qs.length) {
      const total = quiz.qs.length;
      award(`quizdone:${ed.id}`, 20);
      if (quiz.score === total) award(`perfect:${ed.id}`, 30);
      box.innerHTML = `<p class="qscore">${quiz.score} / ${total}</p><p>${quiz.score === total ? "Sans faute !" : "Les mots ratés redescendent d’un stade et reviendront bientôt."}</p><button type="button" class="btn" data-act="qstart">Rejouer</button>`;
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
    if (ok) { quiz.score++; award(`q:${ed.id}:${q.id}`, 10); }
    if (q.wid) bump(q.wid, ok ? 1 : -1);
    $("#qfb").innerHTML = `<p class="fb ${ok ? "yes" : "no"}">${ok ? "Bravo." : "Pas tout à fait."} ${esc(q.explain)}</p><button type="button" class="btn" data-act="qnext">${quiz.i + 1 < quiz.qs.length ? "Question suivante" : "Voir le score"}</button>`;
  }

  /* ---------- vue « Mes mots » ---------- */
  function viewWords() {
    const ids = Object.keys(S.words).filter((id) => WORDS[id]);
    if (!ids.length) return `<p class="empty">Ton carnet est vide. Ouvre l’édition du jour : les mots y arrivent tout seuls.</p>`;
    const groups = [
      [0, "🌱 Graines", "Tu viens de les rencontrer."],
      [1, "🌿 Pousses", "Tu commences à les reconnaître."],
      [2, "🌳 Arbres", "Plus aucune aide : ils sont à toi."]
    ];
    const card = (id) => {
      const w = WORDS[id], st = S.words[id].stage;
      const fr = st === 0 ? `<span class="wfr">${esc(w.fr)}</span>` : `<details class="fr"><summary>Voir</summary><p>${esc(w.fr)}</p></details>`;
      return `<li class="wc"><span class="tw big" lang="${w.lang}" dir="${dirOf(w.lang)}">${esc(w.t)}</span>${S.translit && w.tr ? `<small class="trs">${esc(w.tr)}</small>` : ""}<span class="wl">${w.lang === "he" ? "hébreu" : "anglais"}</span>${sayBtn(w.t, w.lang)}${fr}</li>`;
    };
    return `
      <div class="edhead"><div><h2>Mes mots</h2><p class="date">${ids.length} mots dans le carnet</p></div>
      <label class="edsel"><input type="checkbox" data-act="translit" ${S.translit ? "checked" : ""}> Translittération</label></div>
      ${groups.map(([s, title, sub]) => {
        const g = ids.filter((id) => S.words[id].stage === s);
        return `<section class="blk"><div class="hd"><h3>${title}</h3><span class="cnt">${g.length}</span></div><p class="meta">${sub}</p>${g.length ? `<ul class="wlist">${g.map(card).join("")}</ul>` : `<p class="empty">Aucun mot pour l’instant.</p>`}</section>`;
      }).join("")}`;
  }

  /* ---------- vue « Progrès » ---------- */
  function viewProgress() {
    const lv = level();
    const nextTxt = lv.next ? `Encore ${lv.next - S.xp} XP pour « ${LEVELS[lv.i + 1][1]} ».` : "Niveau maximum atteint.";
    const badges = BADGES.map((b) => `<li class="bd${S.badges[b.id] ? " on" : ""}"><span aria-hidden="true">${b.icon}</span><b>${b.name}</b><small>${b.desc}</small></li>`).join("");
    const places = Object.keys(S.places);
    return `
      <div class="edhead"><div><h2>Progrès</h2><p class="date">${esc(lv.name)} · ${S.xp} XP</p></div></div>
      <p class="meta">${nextTxt}</p>
      <section class="blk"><div class="hd"><h3>Badges</h3></div><ul class="bds">${badges}</ul></section>
      <section class="blk"><div class="hd"><h3>Carnet de voyage</h3><span class="cnt">${places.length}</span></div>
        ${places.length ? `<ul class="plc">${places.map((p) => `<li>📍 ${esc(p)}</li>`).join("")}</ul>` : `<p class="empty">Aucun lieu découvert. Chaque édition en ajoute un.</p>`}</section>
      <section class="blk"><div class="hd"><h3>Sauvegarde</h3></div>
        <p class="meta">Ta progression vit dans ce navigateur. Pour la déplacer sur un autre appareil, exporte-la puis importe-la là-bas.</p>
        <div class="row"><button type="button" class="btn alt" data-act="export">Copier ma sauvegarde</button><button type="button" class="btn alt" data-act="import">Importer une sauvegarde</button><button type="button" class="btn alt danger" data-act="reset">Tout effacer</button></div>
      </section>`;
  }

  /* ---------- rendu et événements ---------- */
  function render() {
    renderHeader();
    $("#main").innerHTML = view === "today" ? viewToday() : view === "words" ? viewWords() : viewProgress();
    if (view === "today") renderQuiz();
  }

  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("[data-act]");
    if (!el || el.tagName === "SELECT" || el.type === "checkbox") return;
    const act = el.dataset.act;
    if (act === "tab") { view = el.dataset.v; window.scrollTo(0, 0); render(); }
    else if (act === "lang") { S.lang = el.dataset.v; save(); render(); }
    else if (act === "say") say(el.dataset.t, el.dataset.l);
    else if (act === "peek") el.classList.toggle("open");
    else if (act === "done") {
      if (el.dataset.place) { S.places[el.dataset.place] = dayKey(); }
      award(el.dataset.key, +el.dataset.xp);
      render();
    }
    else if (act === "qstart") { quiz = { qs: buildQuiz(), i: 0, score: 0 }; renderQuiz(); }
    else if (act === "qans") answer(el);
    else if (act === "qnext") { quiz.i++; renderQuiz(); }
    else if (act === "export") {
      const data = JSON.stringify(S);
      (navigator.clipboard ? navigator.clipboard.writeText(data) : Promise.reject())
        .then(() => toast("Sauvegarde copiée"))
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
    $("#app").innerHTML = `<header id="hdr" class="top"></header><main id="main"></main>`;
    touchStreakOnLoadGuard();
    render();
  });
  /* La série ne bouge qu’avec une action qui rapporte des XP ; on ne remet rien à zéro ici. */
  function touchStreakOnLoadGuard() {
    const y = dayKey(new Date(Date.now() - 864e5));
    if (S.lastDay && S.lastDay !== dayKey() && S.lastDay !== y) { S.streak = 0; save(); }
  }
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = () => {};
})();
