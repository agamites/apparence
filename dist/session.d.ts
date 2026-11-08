export declare const API_PLATEFORME = "/api/plateforme/v1";
export interface Moi {
    id: string;
    nom: string;
    email: string;
    roles: string[];
    doit_changer_mot_de_passe: boolean;
    peut_inviter: boolean;
}
/** Le joueur connecté, ou null s'il ne l'est pas. Renouvelle le jeton au passage. */
export declare function moi(): Promise<Moi | null>;
/** Renvoie vers l'écran de connexion de la Plateforme (ou celui du premier mot de passe). */
export declare function allerALaConnexion(): never;
/**
 * fetch avec la session commune : en cas de 401, renouvelle le jeton auprès de la Plateforme et recommence une fois.
 * Si la session est vraiment terminée, renvoie vers la connexion.
 */
export declare function appelAvecSession(entree: RequestInfo | URL, options?: RequestInit): Promise<Response>;
/** Ferme la session sur tout le site, puis retourne à l'écran de connexion. */
export declare function deconnecter(): Promise<void>;
