// La session commune, côté navigateur, pour les deux briques.
// La Plateforme dépose deux cookies HttpOnly sur tout le domaine (contrat, section 5) :
// - agamites_session : un JWT Ed25519 de 15 minutes, que chaque brique vérifie côté serveur ;
// - agamites_maintien : un jeton opaque de 30 jours, que seule la Plateforme sait lire.
// Seule la Plateforme renouvelle le JWT : quand un appel répond 401, on passe par /moi, puis on recommence.

export const API_PLATEFORME = '/api/plateforme/v1';

export interface Moi {
  id: string;
  nom: string;
  email: string;
  roles: string[];
  doit_changer_mot_de_passe: boolean;
  peut_inviter: boolean;
}

/** Le joueur connecté, ou null s'il ne l'est pas. Renouvelle le jeton au passage. */
export async function moi(): Promise<Moi | null> {
  const reponse = await fetch(`${API_PLATEFORME}/moi`, { credentials: 'same-origin' });
  if (reponse.status === 401) return null;
  if (!reponse.ok) throw new Error(`La Plateforme ne répond pas (${reponse.status}).`);
  return (await reponse.json()) as Moi;
}

/** Renvoie vers l'écran de connexion de la Plateforme (ou celui du premier mot de passe). */
export function allerALaConnexion(): never {
  window.location.assign('/');
  throw new Error('Connexion nécessaire');
}

/**
 * fetch avec la session commune : en cas de 401, renouvelle le jeton auprès de la Plateforme et recommence une fois.
 * Si la session est vraiment terminée, renvoie vers la connexion.
 */
export async function appelAvecSession(entree: RequestInfo | URL, options: RequestInit = {}): Promise<Response> {
  const essai = () => fetch(entree, { credentials: 'same-origin', ...options });
  const premiere = await essai();
  if (premiere.status !== 401) return premiere;
  const joueur = await moi().catch(() => null);
  if (!joueur || joueur.doit_changer_mot_de_passe) allerALaConnexion();
  return essai();
}

/** Ferme la session sur tout le site, puis retourne à l'écran de connexion. */
export async function deconnecter(): Promise<void> {
  await fetch(`${API_PLATEFORME}/deconnexion`, { method: 'POST', credentials: 'same-origin' }).catch(() => undefined);
  window.location.assign('/');
}
