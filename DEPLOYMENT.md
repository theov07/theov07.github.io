# Guide de déploiement - Site Web Professionnel

## Changements effectués (Version 2)

### 1. Avatar optimisé et fixé
- Image optimisée : 5MB → 10KB (réduction de 99%)
- Dimensions adaptées pour le web : 364x400px
- Format JPEG optimisé pour chargement rapide
- Chemin corrigé : `/images/avatar.jpg`

### 2. Navigation restructurée
Menu principal avec 4 sections distinctes :
- **Home** : Page d'accueil sobre
- **Education** : Parcours académique et compétences
- **Experience** : Expériences professionnelles
- **Projects** : Projets techniques uniquement
- ❌ Supprimé : CV et Sitemap

### 3. Pages séparées et organisées
- **education.md** : Formation, coursework, compétences techniques
- **experience.md** : Expériences professionnelles détaillées
- **projects.md** : Projets techniques (pas d'éducation mélangée)
- **about.md** : Page d'accueil sobre avec 4 cartes de navigation

### 4. Bio corrigée - Étudiant
**Avant :** "Quantitative Researcher"  
**Après :** "MSc Financial Engineering Student @ Dauphine-PSL | Aspiring Quantitative Researcher"

**Important :** Reflet exact de votre situation actuelle (étudiant visant à devenir quant researcher)

### 5. Page d'accueil sobre et professionnelle
- Header épuré : Nom + "Aspiring Quantitative Researcher"
- 4 cartes de navigation cliquables
- Section contact minimale
- ❌ Plus de contenu en bas (expérience/éducation déplacés)

### 6. Couleurs - Tout en noir
- Thème "Contrast" maintenu (fond blanc pur)
- **Tous les titres en noir** (h1, h2, h3, etc.)
- **Tout le texte en noir** (!important pour forcer)
- Plus de problème de visibilité

### 7. Suppression des emojis
- Zéro emoji sur tout le site
- Style 100% professionnel pour recruteurs

## Déploiement sur GitHub Pages

### Commandes Git

```bash
cd /Users/theoverdelhan/Documents/AUTRES/theov07.github.io

# Ajouter tous les changements
git add .

# Créer un commit
git commit -m "Professional redesign: separate pages, optimized avatar, black text only"

# Pousser vers GitHub
git push origin master
```

### Vérification

Après le push, votre site sera mis à jour sur :
`https://theov07.github.io`

Le déploiement prend généralement 1-3 minutes.

## Fichiers modifiés

### Configuration
- `_config.yml` : Bio corrigée + avatar optimisé
- `_data/navigation.yml` : Menu restructuré (Education, Experience, Projects)

### Pages
- `_pages/about.md` : Page d'accueil sobre (4 cartes + contact)
- `_pages/education.md` : **NOUVELLE** - Formation académique
- `_pages/experience.md` : **NOUVELLE** - Expériences pro
- `_pages/projects.md` : Projets techniques uniquement

### Styles
- `_sass/_custom.scss` : Tout en noir avec !important

### Images
- `images/avatar.jpg` : **NOUVELLE** - Avatar optimisé (10KB)

## Structure du site

```
Homepage (/)
├── Education (/education/)
│   ├── Dauphine - MSc Financial Engineering
│   ├── EPF - Computer Science & AI
│   ├── Academic Projects
│   └── Skills
│
├── Experience (/experience/)
│   ├── MYR - Quantitative Researcher
│   ├── La Valériane - Quantitative Developer
│   ├── MASSEEO - Entrepreneur
│   └── Professional Goal
│
├── Projects (/projects/)
│   ├── Trading Systems
│   ├── Derivatives Pricing
│   ├── Machine Learning
│   └── Infrastructure
│
└── Portfolio (/portfolio/)
    └── Detailed case studies
```

## Résultat

Votre site professionnel avec :
- ✅ Navigation claire et séparée
- ✅ Avatar optimisé et fonctionnel
- ✅ Bio correcte (étudiant, pas encore quant researcher)
- ✅ Titres visibles (tout en noir)
- ✅ Page d'accueil sobre et épurée
- ✅ Sections bien distinctes
- ✅ 0 emoji - 100% professionnel
- ✅ Thème blanc pur

