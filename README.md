# Flash RPG js-project

Un RPG 2D action jouable dans le navigateur, développé en **JavaScript vanilla et HTML5 Canvas** — sans moteur de jeu, sans framework, objectif fortifier mes bases en JS avant de passer à du React.

## Stack technique

- **HTML5 Canvas API** — pipeline de rendu (~60fps via `requestAnimationFrame`)
- **JavaScript ES6+ vanilla** — boucle de jeu, entités, collisions, IA
- **Bootstrap 5** — stylisation des overlays UI

## Fonctionnalités

- **Déplacement & combat** — mouvement aux touches directionnelles, attaques directionnelles avec visualisation de la hitbox et cooldown d'1s
- **IA ennemie** — poursuite par proximité et dégâts au contact
- **Détection de collisions** — Principe AABB des boxs rectangulaires
- **Système d'inventaire** — grille 3×3 (touche I), objets collectables, restauration de PV
- **HUD** — barres PV/XP en temps réel, stats du joueur, menu pause (Échap)
- **États de jeu** — Victoire / Game Over / Pause / Inventaire

## Structure du projet

```
rpg.html        # Point d'entrée (canvas 800×600)
rpg.js          # Boucle de jeu principale
entities.js     # Définitions joueur & ennemis
attack.js       # Logique de combat & dégâts
inventory.js    # UI inventaire & gestion des objets
hud.js          # HUD & overlays
src/            # Sprites & assets
```

## Lancer le projet

Ouvrir `rpg.html` dans un navigateur. Aucune étape de build requise.

## Contrôles

| Touche | Action |
|--------|--------|
| Touches directionnelles | Se déplacer |
| Espace | Attaquer |
| I | Ouvrir l'inventaire |
| Échap | Pause |
