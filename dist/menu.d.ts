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
export declare const MENU: readonly EntreeMenu[];
/** L'entrée qui correspond à un chemin de page (la plus longue qui en est le début). */
export declare function entreeActive(chemin: string, menu?: readonly EntreeMenu[]): EntreeMenu | undefined;
