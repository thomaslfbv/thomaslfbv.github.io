# Revue et refonte — 14 octobre 2026

## Périmètre

Relecture des trois pages HTML, de leurs styles et scripts, des ressources graphiques, des chemins de navigation et de la documentation du dépôt. Refonte visuelle de VAN ; corrections ciblées du hub et du portfolio, dont l’identité néon est conservée. Aucune publication, aucun commit ni push effectué.

## Problèmes corrigés

| Priorité | Constat initial | Correction |
| --- | --- | --- |
| Haute | VAN : image principale de plusieurs Mo, logo de 1,6 Mo ; portrait portfolio de 8 Mo. | WebP redimensionnés, variantes `srcset`/`sizes`, chargement différé hors premier écran, dimensions explicites ; originaux conservés. |
| Haute | Portfolio : cartes seulement cliquables à la souris, fenêtre masquée par opacité encore présente dans la navigation, aucun confinement/restauration du focus. | Liens clavier avec repli sans JavaScript, élément `dialog` natif, fermeture Échap, focus rendu au lien d’origine. |
| Haute | Portfolio : couleurs de fenêtre issues de variables inexistantes. | Réutilisation des variables définies ; fond opaque lisible dans les deux thèmes. |
| Moyenne | VAN : liens de navigation masqués sur mobile sans alternative ; règles CSS contradictoires. | Menu explicite avec état annoncé, fermeture Échap/clic extérieur/choix de lien, navigation présente sans JavaScript. |
| Moyenne | Hub : chemin absolu `/VAN/van.html` dépendant de la racine d’hébergement. | Chemin relatif compatible avec un dépôt publié en sous-dossier. |
| Moyenne | VAN : bouton de réservation dirigé vers l’accueil générique Yescapa. | Lien exact fourni par le propriétaire : annonce 102213. |
| Moyenne | Portfolio : guillemet supplémentaire dans un attribut HTML et espacements dans un lien. | HTML corrigé et cibles vérifiées. |
| Moyenne | VAN : interception globale des lettres « ia » et redirection inattendue. | Suppression ; lien explicite vers le hub dans le pied de page. |
| Moyenne | Hub/portfolio : faiblesse de la présentation sur petits écrans et accents clairs sur fond clair. | Grille du hub corrigée, en-tête portfolio compact à 320 px, accents assombris en thème clair. |
| Faible | Hub : langue déclarée anglaise, description absente, compteur de dépôts figé. | Langue française, description ajoutée, libellé durable. |
| Faible | Interactions essentiellement au survol, effets systématiques. | Focus visible et effet du hub également au clavier ; préférence de réduction des mouvements respectée. |

## Direction de VAN

Fond blanc cassé, vert forêt et sauge ; grande typographie système, hiérarchie éditoriale, vraie photo du véhicule en ouverture, navigation translucide avec fond de repli, galerie et section de réservation dédiées. Inspiration : rythme, sobriété et mise en avant du sujet des [pages produit Apple](https://www.apple.com/macbook-air/), sans reprendre leurs marques ni leurs visuels.

Les photos d’illustration `vw_t5_exterior.png` et `vw_t5_interior.png` ne représentent pas le même aménagement que les photos réelles. Elles ne sont pas utilisées dans la nouvelle page. Aucun équipement, prix, avis client ou disponibilité n’a été inventé.

## Choix techniques

HTML sémantique, CSS Grid/Flexbox, dimensions fluides `clamp`, unités de hauteur dynamique, `text-wrap`, `@supports` pour la transparence, `:focus-visible`, `prefers-reduced-motion`, WebP responsive et JavaScript différé. Aucun framework ni dépendance de production ajouté : le besoin est une vitrine statique et reste compatible GitHub Pages.

Les fenêtres reposent sur [`dialog`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) et les photos sur les [images responsive](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images). Les améliorations visuelles ont des replis ; les liens essentiels restent des liens HTML.

## Poids des ressources

Valeurs des fichiers, et non mesures de temps de chargement ou scores Lighthouse. Le navigateur choisit sa variante selon la largeur et la densité de l’écran.

| Ressource | Avant | Après |
| --- | ---: | ---: |
| Photo principale VAN | environ 4,2 Mo | 200 Ko à 640 px, 673 Ko à 1 200 px, 1,31 Mo à 1 800 px |
| Logo VAN | environ 1,6 Mo | 3,9 Ko à 96 px / 10,3 Ko à 192 px |
| Portrait portfolio | environ 8 Mo | 18,3 Ko |

La page VAN n’appelle plus Google Fonts : elle utilise la police du système et une police serif locale pour l’accent typographique. Le hub et le portfolio conservent leurs polices Google existantes avec une pile de repli.

## Vérifications réalisées

- Syntaxe des trois scripts validée avec `node --check`.
- Trois pages vérifiées par `scripts/check_site.py` : fichiers locaux, variantes d’images, ancres, identifiants, dimensions, titres principaux et isolation des liens externes.
- `git diff --check` sans erreur.
- Réponse HTTP 200 du serveur local pour VAN.
- VAN testé dans le navigateur intégré à 320, 390, 768 et 1 440 px : pas de débordement horizontal de page détecté. Inspection visuelle des mises en page mobile, tablette et ordinateur.
- Ouverture de galerie, photo suivante, fermeture Échap et retour du focus au lien d’origine vérifiés.
- Menu mobile : ouverture, fermeture Échap et état annoncé vérifiés. FAQ : ouverture vérifiée.
- Portfolio à 320 px : absence de débordement, ouverture d’un projet par Entrée, fermeture Échap, restauration du focus, bascule de thème et menu vérifiés.
- Hub à 320 px : absence de débordement et navigation vers VAN vérifiées.
- Aucun avertissement ni erreur relevé dans les journaux consultés du navigateur pour VAN.

## Limites et points éditoriaux

Pas de mesure Lighthouse, de simulation réseau lente, de validation exhaustive WCAG ni de matrice Chrome/Firefox/Safari indépendants. Le repli sans JavaScript et la réduction des mouvements ont été contrôlés dans le code, pas avec une session de navigateur dédiée. Ces vérifications ne constituent pas une certification d’accessibilité.

Le lien Yescapa fourni est intégré ; la récupération de l’annonce par l’outil web a expiré. Les prix, conditions, disponibilité et lieu de prise en charge restent donc à consulter sur Yescapa.

Le portfolio mentionne toujours « Bachelor IA (2ème année) — 2024-2027 » : contenu personnel à confirmer par son propriétaire, non modifié par supposition. Les originaux et illustrations inutilisées restent dans le dépôt pour préserver les ressources de travail ; ils ne sont pas chargés par les pages.
