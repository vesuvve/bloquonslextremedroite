# #Bloquonslextremedroite

Site public : https://bloquonslextremedroite.vercel.app/

Un outil gratuit de modération personnelle sur X : choisir une liste, la copier ou la télécharger, puis suivre un tutoriel illustré pour utiliser une extension tierce.

Initiative indépendante, non éditée par La France insoumise. Aucun compte n’est bloqué par ce site. La liste peut être modifiée librement par chaque visiteur ; elle ne constitue pas une caractérisation politique vérifiée de chaque compte.

## Fonctionnement

- HTML, CSS et JavaScript sans dépendances.
- Pas d’inscription, de connexion à X, de mot de passe, d’analytics ni d’appel réseau applicatif.
- Les ajouts et sélections restent dans la mémoire de l’onglet et ne sont pas enregistrés sur un serveur.
- Tous les comptes proposés sont cochés au chargement.
- Le TXT est destiné au copier-coller multiligne dans l’extension, pas à son import direct de fichier.

## Développement

```sh
python3 -m http.server 8000
```

Ouvrir `http://localhost:8000`. Modifier `index.html`, `styles.css` et `app.js`. Les captures et polices sont dans `assets/`.

Pour fabriquer un fichier autonome, sans changer le site source :

```sh
python3 scripts/build-standalone.py
```

Le fichier produit est `dist/index.html`. Pour exécuter les contrôles de logique : `node scripts/test-core.cjs`. Pour Vercel, utiliser la racine du dépôt, le preset **Other**, aucune commande de build et aucun dossier de sortie spécifique.

## Contribuer

Lire [CONTRIBUTING.md](CONTRIBUTING.md). Les pull requests sont bienvenues pour l’accessibilité, la lisibilité mobile, les corrections et l’actualisation du tutoriel. Aucun blocage de compte ne doit être déclenché pour tester une contribution sans accord explicite de la personne utilisant le compte X.

## État de validation

Les captures réelles fournies montrent la préparation, un traitement en cours et un profil bloqué sur X. L’étape Settings / Your Twitter account est documentée : vérifier l’identifiant reconnu automatiquement ou le saisir puis cliquer sur Save handle.

La recherche, les cases à cocher, l’ajout, la copie réelle et le téléchargement ont été vérifiés sur le site publié dans Chrome. Des contrôles de logique ont aussi été exécutés avec un DOM simulé. Ce n’est pas une recette indépendante complète de l’extension. Ne pas présenter le TXT comme importable directement en CSV/JSON. Le rendu et la copie doivent être contrôlés dans de vrais navigateurs lors des contributions.

## Licences et crédits

Le code original est sous [licence MIT](LICENSE). Cette licence ne couvre pas les captures d’écran, les visuels tiers ni les polices.

- Couleurs 2027 et choix de Public Sans : [charte LFI](https://lafranceinsoumise.fr/charte-graphique/).
- Visuel de la tortue : avatar public du compte [@TheTortueSagace](https://x.com/TheTortueSagace), observé le 27 octobre 2026. Il n’est pas présenté comme un logo officiel librement licencié. Sa réutilisation est distincte de la licence du code.
- Public Sans : SIL Open Font License, voir `assets/fonts/OFL.txt`.
- Captures de l’extension et de X : fournies par l’auteur du projet, recadrées et annotées ; interfaces et marques de leurs titulaires respectifs.

## Publication

Sources et contributions : https://github.com/vesuvve/bloquonslextremedroite

Le site est déployé sur Vercel. Le raccordement automatique à ce dépôt est une étape de configuration distincte.
