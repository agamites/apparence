import { type ReactNode, useId } from 'react';

/** Un bandeau d'état : réussite (vert), alerte (ambre, « signalé ») ou erreur (rouge, « refusé »). */
export function Message(p: { type: 'reussite' | 'alerte' | 'erreur'; children: ReactNode }) {
  return (
    <p className={`message message-${p.type}`} role={p.type === 'erreur' ? 'alert' : 'status'}>
      {p.children}
    </p>
  );
}

/**
 * Un champ de formulaire : libellé au-dessus, aide et erreur en dessous.
 * `children` est le contrôle lui-même (input, select, textarea) ; l'aide et l'erreur lui sont reliées pour les lecteurs d'écran.
 */
export function Champ(p: { libelle: string; aide?: ReactNode; erreur?: ReactNode; children: (attributs: { id: string; 'aria-describedby'?: string; 'aria-invalid'?: true }) => ReactNode }) {
  const id = useId();
  const aideId = p.aide ? `${id}-aide` : undefined;
  const erreurId = p.erreur ? `${id}-erreur` : undefined;
  const decrit = [aideId, erreurId].filter(Boolean).join(' ') || undefined;
  return (
    <div className="champ">
      <label htmlFor={id}>{p.libelle}</label>
      {p.children({ id, 'aria-describedby': decrit, ...(p.erreur ? { 'aria-invalid': true as const } : {}) })}
      {p.aide && (
        <span className="aide" id={aideId}>
          {p.aide}
        </span>
      )}
      {p.erreur && (
        <span className="erreur-champ" id={erreurId}>
          {p.erreur}
        </span>
      )}
    </div>
  );
}

/** Un bloc sur fond de vélin, avec son titre en petites capitales. */
export function Carte(p: { titre?: string; children: ReactNode }) {
  return (
    <section className="carte">
      {p.titre && <h2 className="carte-titre">{p.titre}</h2>}
      {p.children}
    </section>
  );
}

/** Ce qu'un bloc affiche quand il n'a encore rien à montrer : on le dit, on ne le cache pas. */
export function Vide(p: { children: ReactNode }) {
  return <p className="vide">{p.children}</p>;
}
