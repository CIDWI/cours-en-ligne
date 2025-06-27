## 📚 API Cours en Ligne – Installation & Démarrage
Ce projet est une API Node.js (TypeScript) destinée à la gestion d'une plateforme de cours en ligne.

---
## ⚙️ Prérequis
Node.js installé (v18+ recommandé)

Docker Desktop installé et lancé

npm installé (fourni avec Node.js)

## 🚀 Étapes d'installation

---
## 1. Installer les dépendances
aller sur le dossier Server puis éxecuter cette commande
```bash
   cd server
   npm install
```
---
## 2. Démarrer les services Docker
Allumer docker puis éxecuter cette commande dans le dossier "server"
```bash
   cd server
   docker compose up -d
```
---
## 3. Créer le jeu d'éssaie
éxecuter cette commande dans le dossier server pour créer le jeu d'éssaie
```bash
  cd server
  npx ts-node src/test.ts
```
---
## ✅ BONUS

### 🔐 Identifiants phpMyAdmin

Une interface **phpMyAdmin** est disponible pour visualiser et manipuler la base de données.

- 📍 **URL** : [http://localhost:8080](http://localhost:8080)
- 👤 **Login** : `root`
- 🔑 **Mot de passe** : `root`

> 💡 **Remarque** : Assure-toi que le port `8080` est libre sur ta machine.
---
## 🔐 Identifiants de Connexion – API Cours en Ligne

Voici les identifiants disponibles pour se connecter à l'API :

### 👤 Utilisateur simple
- **Login** : `user1`
- **Mot de passe** : `azerty`

### 🛠️ Administrateur
- **Login** : `admin`
- **Mot de passe** : `azerty`

> ℹ️ Ces identifiants sont destinés à des fins de test uniquement. Pensez à les modifier en production.
---
# 📘 Documentation de l'API – Swagger

Ce document présente la **documentation complète de l'API Cours en Ligne**, générée automatiquement à l'aide de **Swagger**.

Il décrit l'ensemble des routes disponibles, les paramètres attendus, les réponses possibles ainsi que les éventuels codes d'erreur retournés par l'API.

Swagger facilite la compréhension et l’utilisation de l’API pour les développeurs front-end, les testeurs, ou toute personne souhaitant interagir avec la plateforme via des requêtes HTTP.

---
### google drive pour le téléchargement du swagger (.yaml)
https://drive.google.com/file/d/1IKyW82k8sU7jGP1ZM3AhB1Xwojq-6LqC/view?usp=sharing

