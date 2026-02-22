# Guide de déploiement - Site Web Professionnel

## Changements effectués

### 1. Design épuré et professionnel
- Page d'accueil redessinée avec 4 sections cliquables (grid responsive)
- Suppression de tous les emojis pour un style professionnel
- Thème "Contrast" : fond blanc pur pour un look moderne et propre

### 2. Avatar fixé
- Correction du chemin de l'avatar : `/images/IMG_8782.PNG`

### 3. Navigation améliorée
- **Professional Profile** : CV complet
- **Experience** : Expériences professionnelles
- **Projects** : Systèmes de trading et recherche
- **Portfolio** : Études de cas détaillées

### 4. Style professionnel
- Suppression des emojis
- Design minimaliste adapté aux recruteurs en quant research
- Code propre et bien structuré

## Déploiement sur GitHub Pages

### Option 1 : Via Terminal

```bash
cd /Users/theoverdelhan/Documents/AUTRES/theov07.github.io

# Ajouter tous les changements
git add .

# Créer un commit
git commit -m "Redesign: Professional homepage with clean navigation and white theme"

# Pousser vers GitHub
git push origin main
```

### Option 2 : Via VS Code

1. Ouvrir l'onglet "Source Control" (icône branch sur la gauche)
2. Cliquer sur "+" pour stager tous les fichiers
3. Écrire un message de commit : "Redesign: Professional homepage"
4. Cliquer sur "Commit"
5. Cliquer sur "Sync Changes" ou "Push"

## Vérification

Après le push, votre site sera automatiquement mis à jour sur :
`https://theov07.github.io`

Le déploiement prend généralement 1-3 minutes.

## Fichiers modifiés

- `_config.yml` : Thème "contrast" + avatar fixé
- `_pages/about.md` : Nouvelle page d'accueil épurée
- `_sass/_custom.scss` : Styles professionnels
- `assets/css/main.scss` : Import des styles custom

## Design Features

### Page d'accueil
- Header épuré avec nom, titre, et tagline
- 4 cartes de navigation avec effet hover
- Section contact avec liens essentiels
- Expérience et éducation en bas de page

### Couleurs (Thème Contrast)
- Fond principal : Blanc pur (#ffffff)
- Texte : Noir (#000000)
- Bordures : Gris clair (#e0e0e0)
- Hover : Ombres subtiles

### Responsive
- Grid adaptatif pour mobile
- Cartes en colonne unique sur petit écran
