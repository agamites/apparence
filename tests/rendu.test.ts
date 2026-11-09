// Le cadre se rend côté serveur sans erreur, avec le bon menu selon le joueur et la page.
import assert from 'node:assert/strict';
import { test } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Cadre, MENU, entreeActive } from '../dist/index.js';

const rendre = (props: Record<string, unknown>) =>
  renderToStaticMarkup(createElement(Cadre, { brique: 'regles', nom: 'albert', ...props } as never, 'contenu'));

test("l'entrée active est la plus précise", () => {
  assert.equal(entreeActive('/')?.cle, 'accueil');
  assert.equal(entreeActive('/regles/magie/sorts/42')?.cle, 'magie');
  assert.equal(entreeActive('/inconnu'), undefined);
});

test('« Joueurs » seulement pour ceux qui peuvent inviter', () => {
  assert.doesNotMatch(rendre({}), /Joueurs/);
  assert.match(rendre({ peutInviter: true }), /href="\/joueurs"/);
});

test('une entrée pas encore construite est grisée, sans lien', () => {
  const html = rendre({ chemin: '/' });
  assert.match(html, /<span class="bientot" title="Bientôt">Bestiaire<\/span>/);
  assert.match(html, /<a href="\/" aria-current="page">Accueil<\/a>/);
});

test('une entrée rendue disponible devient un lien, souligné sur sa page', () => {
  const menu = MENU.map((e) => (e.cle === 'magie' ? { ...e, disponible: true } : e));
  const html = rendre({ menu, chemin: '/regles/magie' });
  assert.match(html, /<a href="\/regles\/magie" aria-current="page">Magie<\/a>/);
  assert.match(html, />A<\/span><span>albert<\/span>/);
});

test('le prénom mène à « Mon compte »', () => {
  assert.match(
    rendre({ chemin: '/compte' }),
    /<a class="compte-lien" href="\/compte" title="Mon compte" aria-current="page">/,
  );
});

test('« Mondes et PNJ » et « Campagnes » pour tous', () => {
  assert.match(rendre({}), /href="\/mondes"/);
  assert.match(rendre({}), /href="\/campagnes"/);
});
