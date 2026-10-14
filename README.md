# GITHUB_PAGES

Trois pages statiques, sans installation ni compilation pour les consulter :

- `index.html` : hub personnel.
- `VAN/van.html` : MELT’n GO, location de van aménagé.
- `Portofolio/index.html` : portfolio de Thomas Lefebvre.

## Prévisualiser en local

Depuis ce dossier :

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Ouvrir [VAN](http://127.0.0.1:8000/VAN/van.html), le [hub](http://127.0.0.1:8000/) ou le [portfolio](http://127.0.0.1:8000/Portofolio/index.html). Arrêter le serveur avec `Ctrl+C`. Si un serveur occupe déjà ce port, utiliser un autre numéro et adapter les liens.

Les chemins relatifs sont compatibles avec un domaine GitHub Pages ou un sous-dossier de projet. Les fichiers HTML peuvent également être ouverts directement ; un serveur local reste préférable pour la vérification.

## Maintenance

- Le contenu de VAN est dans `VAN/van.html`, les styles dans `VAN/style.css`, les interactions dans `VAN/script.js`.
- L’annonce de réservation est `https://www.yescapa.fr/campers/102213`.
- Les photos originales sont conservées. Les versions livrées au navigateur sont dans `VAN/assets/`, `assets/` et `Portofolio/avatar-240.webp`.
- Pour régénérer les images : `python3 scripts/optimize_images.py` (Pillow requis uniquement pour cette opération).
- Pour vérifier les références locales : `python3 scripts/check_site.py` (bibliothèque standard Python).
- Pour vérifier le JavaScript : `node --check script.js`, `node --check VAN/script.js`, `node --check Portofolio/script.js`.

La galerie VAN utilise les flèches gauche/droite, ses boutons et Échap. Les photos restent accessibles par leurs liens sans JavaScript ; les questions/réponses utilisent les éléments HTML natifs `details` et `summary`.

Aucun déploiement automatique n’a été ajouté. Examiner les modifications puis effectuer manuellement le commit et le push souhaités.

Voir `REVUE_CODE.md` pour le bilan de la revue et les limites de vérification.
