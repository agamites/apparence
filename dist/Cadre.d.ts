import type { ReactNode } from 'react';
import { type Brique, type EntreeMenu } from './menu.ts';
/** Le portrait de Lovecraft : la Plateforme le sert à la racine du site, pour les deux briques. */
export declare const PORTRAIT = "/lovecraft.jpg";
export interface CadreProps {
    /** La brique qui affiche la page : ses liens peuvent naviguer sans rechargement. */
    brique: Brique;
    /** Prénom du joueur connecté (champ `nom` de /moi ou du JWT). */
    nom: string;
    /** Vrai pour les MJ et les administrateurs (champ `peut_inviter` de /moi) : montre l'entrée « Joueurs ». */
    peutInviter?: boolean;
    /** Les profils du joueur (champ `roles` de /moi ou du jeton) : certaines entrées leur sont réservées. */
    profils?: readonly string[];
    /** Chemin de la page affichée ; par défaut, celui de la barre d'adresse. Sert à souligner l'entrée active. */
    chemin?: string;
    /** Navigation sans rechargement dans sa propre brique (votre routeur). Sans elle, les liens rechargent la page. */
    naviguer?: (chemin: string) => void;
    /** Remplace la déconnexion par défaut (fermer la session puis retourner à l'accueil). */
    surDeconnexion?: () => void;
    /** Pour tester une entrée du menu avant de publier une version du paquet. */
    menu?: readonly EntreeMenu[];
    children: ReactNode;
}
/** L'en-tête avec le menu commun, le contenu de la page, puis le pied de page. */
export declare function Cadre(p: CadreProps): import("react").JSX.Element;
export declare function Pied(): import("react").JSX.Element;
