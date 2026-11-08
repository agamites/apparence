import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MENU, entreeActive } from "./menu.js";
import { deconnecter } from "./session.js";
/** Le portrait de Lovecraft : la Plateforme le sert à la racine du site, pour les deux briques. */
export const PORTRAIT = '/lovecraft.jpg';
/** L'en-tête avec le menu commun, le contenu de la page, puis le pied de page. */
export function Cadre(p) {
    const menu = p.menu ?? MENU;
    const chemin = p.chemin ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
    const active = entreeActive(chemin, menu);
    const suivre = (cible, brique) => (e) => {
        if (!p.naviguer || brique !== p.brique || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0)
            return;
        e.preventDefault();
        p.naviguer(cible);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "entete", children: [_jsxs("a", { className: "marque", href: "/", onClick: suivre('/', 'plateforme'), children: [_jsx("img", { className: "portrait", src: PORTRAIT, alt: "", width: 32, height: 39 }), _jsx("span", { children: "Agamites" })] }), _jsx("nav", { className: "menu", "aria-label": "Menu principal", children: menu
                            .filter((e) => !e.reservee_inviteurs || p.peutInviter)
                            .map((e) => e.disponible ? (_jsx("a", { href: e.chemin, "aria-current": active?.cle === e.cle ? 'page' : undefined, onClick: suivre(e.chemin, e.brique), children: e.texte }, e.cle)) : (_jsx("span", { className: "bientot", title: "Bient\u00F4t", children: e.texte }, e.cle))) }), _jsxs("div", { className: "compte", children: [_jsxs("a", { className: "compte-lien", href: "/compte", title: "Mon compte", "aria-current": chemin === '/compte' ? 'page' : undefined, onClick: suivre('/compte', 'plateforme'), children: [_jsx("span", { className: "initiale", "aria-hidden": "true", children: p.nom.slice(0, 1).toUpperCase() }), _jsx("span", { children: p.nom })] }), _jsx("button", { type: "button", className: "lien-bouton", onClick: p.surDeconnexion ?? (() => void deconnecter()), children: "Se d\u00E9connecter" })] })] }), _jsx("main", { className: "page", children: p.children }), _jsx(Pied, {})] }));
}
export function Pied() {
    return (_jsxs("footer", { className: "pied", children: [_jsxs("span", { children: [_jsx("img", { className: "portrait", src: PORTRAIT, alt: "", width: 26, height: 32 }), "Agamites \u00B7 d\u00E9di\u00E9 \u00E0 H. P. Lovecraft"] }), _jsx("span", { children: "Acc\u00E8s sur invitation" })] }));
}
