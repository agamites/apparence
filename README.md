# @agamites/apparence

La charte « Grimoire » et les éléments d'écran communs aux deux briques d'Agamites : la Plateforme (Emmanuel) et la brique Règles (Albert).
Pour le joueur, c'est un seul site : même en-tête, même menu, mêmes couleurs, mêmes boutons. On change ici, et les deux briques suivent (contrat, section 2.1).

## Installer

```
npm install -D https://codeload.github.com/agamites/apparence/tar.gz/aafb0e0ed136e4b4406b31fdd3feadeda3ffbbd0
```

Le dépôt est public : aucune clé ni aucun `git` ne sont nécessaires, ni en local ni dans une image Docker. L'adresse désigne une version précise (le numéro du commit). Pour passer à une version plus récente, on remplace ce numéro par celui du dernier commit de `main`, indiqué en tête de [l'historique](https://github.com/agamites/apparence/commits/main).

## Utiliser

```tsx
import '@agamites/apparence/charte.css';
import { Cadre, Carte, Champ, Message, appelAvecSession, moi } from '@agamites/apparence';

const joueur = await moi(); // null si personne n'est connecté
if (!joueur || joueur.doit_changer_mot_de_passe) window.location.assign('/');

<Cadre
  brique="regles"
  nom={joueur.nom}
  peutInviter={joueur.peut_inviter}
  profils={joueur.roles}
  naviguer={(chemin) => routeur.aller(chemin)}
>
  <Carte titre="Mes personnages">…</Carte>
</Cadre>;
```

| Élément | Rôle                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| `Cadre` | en-tête (portrait, « Agamites », menu commun, initiale et prénom, « Se déconnecter »), contenu, pied de page |

Depuis la 1.3.0, passez `profils={joueur.roles}` au `Cadre` : l'entrée « Mondes et PNJ » n'est montrée qu'aux MJ, et « Campagnes » est ouverte.
| `Carte`, `Vide` | bloc sur vélin avec son titre ; texte d'un bloc encore vide (on le dit, on ne le cache pas) |
| `Champ` | libellé au-dessus, aide et erreur en dessous, reliées au contrôle pour les lecteurs d'écran |
| `Message` | bandeau `reussite` (vert), `alerte` (ambre : signalé) ou `erreur` (rouge : refusé) |
| `moi()` | le joueur connecté, ou `null` |
| `appelAvecSession()` | `fetch` qui, sur un 401, renouvelle le jeton auprès de la Plateforme et recommence une fois |
| `deconnecter()` | ferme la session sur tout le site |
| `MENU` | le menu commun, avec la brique propriétaire de chaque entrée |

Les classes CSS (`.bouton`, `.bouton-secondaire`, `.lien-bouton`, `.formulaire`, `.colonnes`, `.pile`…) sont décrites dans [CHARTE.md](https://github.com/agamites/plateforme/blob/main/CHARTE.md) (dépôt `plateforme`).

## Les réglages communs du code

Les consignes communes (`contrats/CONSIGNES.md`, section 3) demandent les mêmes outils dans les deux briques. Leurs réglages vivent ici :

| Outil        | Rôle                                                                                             | Dans la brique                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **Prettier** | met le code en forme (120 colonnes, guillemets simples, virgules finales)                        | `.prettierrc.json` contenant `"@agamites/apparence/prettier"`                                            |
| **ESLint**   | signale les erreurs probables (TypeScript, règles des hooks React, `===`, variables inutilisées) | `eslint.config.mjs` : `import agamites from '@agamites/apparence/eslint'; export default [...agamites];` |
| **Vitest**   | lance les tests                                                                                  | `vitest run`                                                                                             |

Le paquet apporte ESLint, Prettier et leurs extensions : rien d'autre à installer. Pour changer une règle pour les deux briques, on la change ici.

## Le menu

Chaque entrée appartient à une brique. Un lien vers l'autre brique recharge la page ; un lien dans sa propre brique passe par `naviguer` (sans rechargement). Une entrée pas encore construite reste visible, grisée, avec « Bientôt ».

**Quand un de tes écrans est prêt**, passe son entrée à `disponible: true` dans [`src/menu.ts`](src/menu.ts), propose la modification, puis publie une nouvelle version (voir plus bas). D'ici là, pour essayer chez toi : `<Cadre menu={…}>`.

Les chemins de la brique Règles sont sous `/regles/` : `/regles/personnages`, `/regles/magie`, `/regles/objets`, `/regles/bestiaire`.

## Le portrait

`Cadre` affiche `/lovecraft.jpg`, que la Plateforme sert à la racine du site : rien à faire en production. En développement local, copie `node_modules/@agamites/apparence/ressources/lovecraft.jpg` dans le dossier `public/` de ta brique.

## Publier une version

```
npm run verifier                     # construit dist/ et lance les tests
npm version minor --no-git-tag-version   # ou patch : met à jour le numéro de version
git add -A && git commit -m "…" && git push
```

Le dossier `dist/` est versionné : c'est lui qu'installent les deux briques. Chaque brique passe ensuite à la nouvelle version en changeant le numéro de commit dans son `package.json`.
