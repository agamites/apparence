import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
/** Un bandeau d'état : réussite (vert), alerte (ambre, « signalé ») ou erreur (rouge, « refusé »). */
export function Message(p) {
    return (_jsx("p", { className: `message message-${p.type}`, role: p.type === 'erreur' ? 'alert' : 'status', children: p.children }));
}
/**
 * Un champ de formulaire : libellé au-dessus, aide et erreur en dessous.
 * `children` est le contrôle lui-même (input, select, textarea) ; l'aide et l'erreur lui sont reliées pour les lecteurs d'écran.
 */
export function Champ(p) {
    const id = useId();
    const aideId = p.aide ? `${id}-aide` : undefined;
    const erreurId = p.erreur ? `${id}-erreur` : undefined;
    const decrit = [aideId, erreurId].filter(Boolean).join(' ') || undefined;
    return (_jsxs("div", { className: "champ", children: [_jsx("label", { htmlFor: id, children: p.libelle }), p.children({ id, 'aria-describedby': decrit, ...(p.erreur ? { 'aria-invalid': true } : {}) }), p.aide && (_jsx("span", { className: "aide", id: aideId, children: p.aide })), p.erreur && (_jsx("span", { className: "erreur-champ", id: erreurId, children: p.erreur }))] }));
}
/** Un bloc sur fond de vélin, avec son titre en petites capitales. */
export function Carte(p) {
    return (_jsxs("section", { className: "carte", children: [p.titre && _jsx("h2", { className: "carte-titre", children: p.titre }), p.children] }));
}
/** Ce qu'un bloc affiche quand il n'a encore rien à montrer : on le dit, on ne le cache pas. */
export function Vide(p) {
    return _jsx("p", { className: "vide", children: p.children });
}
