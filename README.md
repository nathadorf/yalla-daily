# Yalla Daily

Site statique d'apprentissage de l'hébreu et de l'anglais (niveau B1) à partir de l'actualité française et mondiale, de la géographie, de la culture générale et de la cuisine casher. Un accueil avec des tuiles colorées (Actu, Géographie, Culture G, Cuisine, Écouter & lire, Quiz, Mes mots, Progrès), une mission du jour, de l'XP, des badges. Les mots progressent de graine 🌱 à pousse 🌿 puis arbre 🌳 ; le quiz « Mes mots appris » les révise.

Aucune étape de build : HTML, CSS et JavaScript simples.

## Déployer sur Vercel

1. Importer ce dépôt dans Vercel (New Project).
2. Framework Preset : **Other**. Build Command et Output Directory : laisser vides.
3. Deploy. Chaque `git push` redéploie le site.

## Tester en local

```
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000.

## Ajouter une édition

Tout le contenu est dans `js/data.js`.

1. Copier le bloc de la dernière édition dans `EDITIONS` et le placer **en premier** du tableau.
2. Changer `id` (la date), `n`, `date`, puis `news` (avec `tag` : France, Europe, Monde, Économie, Science, Tech, Culture, Sport), `geo`, `culture`, `recipes`, `resources` et `quiz`.
3. Déclarer les nouveaux mots dans `WORDS` et les lister dans `words`.

Les anciens mots non acquis reviennent automatiquement dans le quiz des nouvelles éditions.

## Données et vie privée

La progression (XP, mots, badges) est enregistrée dans le navigateur (`localStorage`), sans compte ni serveur. Elle n'est pas partagée entre appareils : utiliser « Copier ma sauvegarde » et « Importer une sauvegarde » dans l'onglet Progrès.

Les boutons 🔊 utilisent les voix installées sur l'appareil. Si l'hébreu n'est pas disponible, le site le signale.
