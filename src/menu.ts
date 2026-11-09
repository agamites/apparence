// Le menu commun d'Agamites, le même dans les deux briques.
// Chaque entrée dit à quelle brique elle appartient : un lien vers l'autre brique recharge la page,
// un lien dans sa propre brique peut naviguer sans rechargement (voir Cadre, propriété `naviguer`).
// Une entrée pas encore construite reste visible, grisée, avec l'infobulle « Bientôt » :
// quand un écran arrive, on passe `disponible` à true et on publie une nouvelle version du paquet.

export type Brique = 'plateforme' | 'regles';

export interface EntreeMenu {
  /** Identifiant stable, utilisé pour désigner l'entrée active. */
  cle: string;
  texte: string;
  chemin: string;
  brique: Brique;
  disponible: boolean;
  /** Entrée montrée seulement à ceux qui peuvent inviter (MJ et administrateurs). */
  reservee_inviteurs?: boolean;
}

export const MENU: readonly EntreeMenu[] = [
  { cle: 'accueil', texte: 'Accueil', chemin: '/', brique: 'plateforme', disponible: true },
  { cle: 'personnages', texte: 'Personnages', chemin: '/regles/personnages', brique: 'regles', disponible: false },
  { cle: 'magie', texte: 'Magie', chemin: '/regles/magie', brique: 'regles', disponible: false },
  { cle: 'objets', texte: 'Objets', chemin: '/regles/objets', brique: 'regles', disponible: false },
  { cle: 'bestiaire', texte: 'Bestiaire', chemin: '/regles/bestiaire', brique: 'regles', disponible: false },
  { cle: 'mondes', texte: 'Mondes et PNJ', chemin: '/mondes', brique: 'plateforme', disponible: false },
  { cle: 'campagnes', texte: 'Campagnes', chemin: '/campagnes', brique: 'plateforme', disponible: false },
  {
    cle: 'joueurs',
    texte: 'Joueurs',
    chemin: '/joueurs',
    brique: 'plateforme',
    disponible: true,
    reservee_inviteurs: true,
  },
];

/** L'entrée qui correspond à un chemin de page (la plus longue qui en est le début). */
export function entreeActive(chemin: string, menu: readonly EntreeMenu[] = MENU): EntreeMenu | undefined {
  return [...menu]
    .filter((e) => (e.chemin === '/' ? chemin === '/' : chemin === e.chemin || chemin.startsWith(e.chemin + '/')))
    .sort((a, b) => b.chemin.length - a.chemin.length)[0];
}
