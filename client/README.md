# 📚 Plateforme d'apprentissage interactive

Une application React avec éditeur de code intégré (Monaco Editor), gestion des utilisateurs et suivi de progression des leçons/exercices. Conçue pour une expérience pédagogique fluide.

## 🚀 Fonctionnalités

- ✅ Connexion utilisateur via JWT
- 📘 Visualisation de cours, chapitres et leçons
- 🧠 Exercices avec éditeur de code (Monaco)
- 📊 Suivi de l’avancement (Terminé / En cours)
- 🌙 Mode clair / sombre (contextuel)

## 🧪 Stack technique

- **Frontend** : React 18 + TypeScript + React Router 7
- **Éditeur** : @monaco-editor/react
- **Authentification** : JWT (via `jwt-decode`)
- **State global** : Context API (User & Theme)
- **Build Tool** : Vite
- **Linting** : ESLint + TypeScript ESLint

## 🛠 Installation

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev
