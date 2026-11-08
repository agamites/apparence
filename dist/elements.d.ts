import { type ReactNode } from 'react';
/** Un bandeau d'état : réussite (vert), alerte (ambre, « signalé ») ou erreur (rouge, « refusé »). */
export declare function Message(p: {
    type: 'reussite' | 'alerte' | 'erreur';
    children: ReactNode;
}): import("react").JSX.Element;
/**
 * Un champ de formulaire : libellé au-dessus, aide et erreur en dessous.
 * `children` est le contrôle lui-même (input, select, textarea) ; l'aide et l'erreur lui sont reliées pour les lecteurs d'écran.
 */
export declare function Champ(p: {
    libelle: string;
    aide?: ReactNode;
    erreur?: ReactNode;
    children: (attributs: {
        id: string;
        'aria-describedby'?: string;
        'aria-invalid'?: true;
    }) => ReactNode;
}): import("react").JSX.Element;
/** Un bloc sur fond de vélin, avec son titre en petites capitales. */
export declare function Carte(p: {
    titre?: string;
    children: ReactNode;
}): import("react").JSX.Element;
/** Ce qu'un bloc affiche quand il n'a encore rien à montrer : on le dit, on ne le cache pas. */
export declare function Vide(p: {
    children: ReactNode;
}): import("react").JSX.Element;
