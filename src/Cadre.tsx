import type { MouseEvent, ReactNode } from 'react';
import { type Brique, type EntreeMenu, MENU, entreeActive } from './menu.ts';
import { deconnecter } from './session.ts';

/** Le portrait de Lovecraft : la Plateforme le sert à la racine du site, pour les deux briques. */
export const PORTRAIT = '/lovecraft.jpg';

export interface CadreProps {
  /** La brique qui affiche la page : ses liens peuvent naviguer sans rechargement. */
  brique: Brique;
  /** Prénom du joueur connecté (champ `nom` de /moi ou du JWT). */
  nom: string;
  /** Vrai pour les MJ et les administrateurs (champ `peut_inviter` de /moi) : montre l'entrée « Joueurs ». */
  peutInviter?: boolean;
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
export function Cadre(p: CadreProps) {
  const menu = p.menu ?? MENU;
  const chemin = p.chemin ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  const active = entreeActive(chemin, menu);

  const suivre = (cible: string, brique: Brique) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!p.naviguer || brique !== p.brique || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    p.naviguer(cible);
  };

  return (
    <>
      <header className="entete">
        <a className="marque" href="/" onClick={suivre('/', 'plateforme')}>
          <img className="portrait" src={PORTRAIT} alt="" width={32} height={39} />
          <span>Agamites</span>
        </a>
        <nav className="menu" aria-label="Menu principal">
          {menu
            .filter((e) => !e.reservee_inviteurs || p.peutInviter)
            .map((e) =>
              e.disponible ? (
                <a key={e.cle} href={e.chemin} aria-current={active?.cle === e.cle ? 'page' : undefined} onClick={suivre(e.chemin, e.brique)}>
                  {e.texte}
                </a>
              ) : (
                <span key={e.cle} className="bientot" title="Bientôt">
                  {e.texte}
                </span>
              ),
            )}
        </nav>
        <div className="compte">
          <a
            className="compte-lien"
            href="/compte"
            title="Mon compte"
            aria-current={chemin === '/compte' ? 'page' : undefined}
            onClick={suivre('/compte', 'plateforme')}
          >
            <span className="initiale" aria-hidden="true">
              {p.nom.slice(0, 1).toUpperCase()}
            </span>
            <span>{p.nom}</span>
          </a>
          <button type="button" className="lien-bouton" onClick={p.surDeconnexion ?? (() => void deconnecter())}>
            Se déconnecter
          </button>
        </div>
      </header>
      <main className="page">{p.children}</main>
      <Pied />
    </>
  );
}

export function Pied() {
  return (
    <footer className="pied">
      <span>
        <img className="portrait" src={PORTRAIT} alt="" width={26} height={32} />
        Agamites · dédié à H. P. Lovecraft
      </span>
      <span>Accès sur invitation</span>
    </footer>
  );
}
