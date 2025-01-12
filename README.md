# Projet Programmation Serveur S7 (Gestion des utilisateurs et des Associations)

## Description du projet

Ce projet offre une solution simple et performante afin de regrouper et automatiser la gestion des utilisateurs et des associations de manière centralisée.

L'application permet :

- **Côté Back-end** :
  - Gestion des utilisateurs : création, récupération, listing, mise à jour et suppression.
  - Gestion des associations : création, récupération, listing, mise à jour et suppression.

- **Côté Front-end** :
  - Authentification des utilisateurs via un formulaire de connexion.
  - Accès aux profils utilisateurs avec mise à jour des informations personnelles.
  - Consultation et modification des associations et des utilisateurs.
  - Recherches ciblées par ID ou par Nom.
  - Création, modification et suppression des utilisateurs et des associations.
  - Gestion des rôles des membres au sein des associations.

---

## Technologies utilisées

### Front-end
- **Framework** : [Angular](https://angular.io/)
- **Bibliothèques supplémentaires** :
  - Angular Forms pour les formulaires réactifs.
  - Angular Router pour la navigation.
  - HttpClient pour les requêtes API.
  - Angular Materials pour créer des UI modernes et responsives.

---

## Fonctionnalités principales

### Front-end
1. **Page de connexion** :
   - Authentification des utilisateurs avec un formulaire réactif.
   - Gestion des redirections pour les utilisateurs connectés.
   - Récupération de l'access Token
2. **Gestion des profils** :
   - Consultation et modification des informations personnelles.
3. **Listing** :
   - Affichage des utilisateurs et des associations.
4. **Consultation de fiches** :
   - Affichage d’informations détaillées sur un utilisateur (associations liées).
   - Affichage d’informations sur une association (membres avec leurs rôles, minutes).
5. **Recherches ciblées** :
   - Rechercher un utilisateur ou une association par son ID ou son Nom.
6. **Gestion** :
   - Création, modification et suppression d’utilisateurs et d’associations.
   - Modification des rôles au sein des associations.
   - Création et listing des minutes au sein des associations.

---
## Architecture Front-end

L'application suit une architecture modulaire organisée autour de modules principaux, chacun ayant des responsabilités spécifiques (authentification, gestion des utilisateurs, gestion des associations, etc.). La structure est conçue pour garantir la maintenabilité, la clarté et la réutilisabilité du code.    

![Architecture Front](./picture/architecture.jpeg)


- **Modules**:  Ils encapsulent des fonctionnalités spécifiques (par exemple, Auth Module pour la gestion de l'authentification).
- **Components**: Reliés aux templates via des métadonnées, ils gèrent la logique de l'interface utilisateur et la liaison de données.
- **Services**: Ils sont injectés dans les composants pour fournir des fonctionnalités communes et gérer les interactions avec l'API backend.
- **Data Binding**: Le schéma met en évidence les mécanismes de liaison :
      - **Property Binding**: Pour afficher les données dynamiques dans le DOM.    
      - **Event Binding**: Pour gérer les interactions utilisateur et propager les événements.


---

## Installation et configuration

### Back-end

1. Voir le fichier Readme de la partie Back 

2. Pour accéder à la documentation API : [http://localhost:3000/api](http://localhost:3000/api)

### Front-end

1. Cloner le dépôt :
   ```bash
   git clone https://gitlab2.istic.univ-rennes1.fr/aelanouar/projet-web-front
   cd projet-web-front
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Installer `Materials` :
    ```bash
    ng add @angular/material
    ```
4. Lancer l’application :
   ```bash
   ng serve
   ```
5. Accéder à l’application : [http://localhost:4200](http://localhost:4200)

6. Pour lancer les tests :   
   ```bash
   ng test
   ``` 
   Nous avons implémenté quelques tests pour certains composants.

---

## Choix de conception et implémentation

### Front-end
- Angular a été sélectionné pour ses outils performants tels que les formulaires réactifs et la gestion avancée des routes.
- Une architecture modulaire a été adoptée pour garantir la maintenabilité et l'évolutivité du code.
- HttpClient est utilisé pour simplifier et gérer les interactions avec le backend.
- Une garde d'authentification est mise en place pour sécuriser l'accès aux pages sans authentification.

---

## Auteur
- El Anouar Ayat Allah
- Eya Sammari

