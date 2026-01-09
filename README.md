# 👥 Évaluation Vue.js/TypeScript - Gestion d'utilisateurs

> **Durée : 20 minutes** | **IA autorisée** ✅

## 🎯 Objectif du projet

Développer une **application de gestion d'utilisateurs** permettant de :

- Consulter la liste des utilisateurs (actuellement : 10 premiers seulement)
- Créer de nouveaux utilisateurs (formulaire de base fourni)
- Implémenter la pagination et la recherche
- Implémenter la fonctionnalité d'édition d'utilisateurs
- Mettre en place une gestion d'erreurs robuste
- Ajouter la fonctionnalité de suppression (qui retourne toujours une erreur)
- Créer des tests E2E avec Cypress et Cucumber

Le projet utilise une architecture moderne avec **Vue 3**, **TypeScript**, **Vue Router**, **SCSS** et l'API Composition.

**Plus vous développez de fonctionnalités, plus il vous sera facile de démontrer la maîtrise de vos compétences.**

---

## 🛠️ Configuration pré-installée

Le projet est déjà configuré avec :

- ✅ **Vue 3** + TypeScript + Composition API
- ✅ **Vue Router** pour la navigation
- ✅ **SCSS** avec charte graphique complète (variables, utilitaires, composants BEM)
- ✅ **Service HTTP** personnalisé (méthodes GET et POST)
- ✅ **Type User de base**
- ✅ **Composant UsersList** (affichage des 10 premiers utilisateurs)
- ✅ **Page de création** avec formulaire simple (sans gestion d'erreur)
- ✅ **ESLint + Prettier** pour la qualité du code
- ✅ **Cypress** pour les tests E2E (à configurer avec Cucumber)

---

## 🚀 Démarrage

```bash
# 1. Installation des dépendances
npm install

# 2. Copier et renommer .env
cp .env.example .env

# 3. Lancement du serveur de développement
npm run dev

# 4. Ouvrir dans le navigateur
# L'application sera disponible sur http://localhost:5173
```

---

## 📋 Tâches à réaliser

### � **Partie 1 : Formulaire et gestion d'erreurs** _(~6 min)_

**Objectif :** Améliorer le formulaire de création, ajouter le fornulaire d'édition en évitant au maximum la duplication de code et implémenter la gestion d'erreurs

#### À implémenter :

1. **Page d'édition d'utilisateur:**
   - Créer la page `EditUserPage.vue` pour permettre la modification d'un utilisateur
   - Charger les données de l'utilisateur
   - Ajouter la route dans le router

2. **Gestion d'erreurs globale dans le service HTTP:**
   - Intercepter les erreurs HTTP (422, 403, 404, etc.)
   - Parser les erreurs de validation (format `{errors: {field: [messages]}}`)
   - Créer des messages d'erreur clairs pour l'utilisateur
   - Logger les erreurs en développement

3. **Affichage des erreurs dans les formulaires:**
   - Afficher les erreurs de validation sous chaque champ
   - Afficher un message de succès après création

**Endpoints API à utiliser :**

```typescript
POST / api / users
PUT / api / users / { id }
```

---

### 🔍 **Partie 2 : Pagination et Recherche** _(~7 min)_

**Objectif :** Améliorer la liste des utilisateurs avec pagination et recherche

#### À implémenter :

1. **Pagination:**
   - Ajouter les contrôles de pagination en bas du tableau
   - Boutons "Précédent" / "Suivant"
   - Afficher : "Page X sur Y" et "Total : Z utilisateurs"
   - Utiliser l'endpoint `GET /api/users?page=X`

2. **Recherche:**
   - Champ de recherche au-dessus du tableau
   - Recherche sur nom, prénom ou email
   - Bouton "Rechercher" ou recherche en temps réel (debounce recommandé)
   - Utiliser l'endpoint `GET /api/users?search=terme`
   - Afficher un message si aucun résultat

3. **Combiner recherche et pagination:**
   - Permettre de paginer les résultats de recherche
   - Réinitialiser à la page 1 lors d'une nouvelle recherche

---

### �️ **Partie 3 : Fonctionnalité de suppression** _(~4 min)_

**Objectif :** Implémenter la suppression d'utilisateurs avec gestion d'erreur

#### À implémenter :

1. **Bouton de suppression:**
   - Ajouter un bouton "Supprimer" dans le tableau
   - Confirmation avant suppression (confirm ou modal)
   - Afficher un loader pendant l'opération
   - L'endpoint `DELETE /api/users/:id` retourne **toujours une erreur 403**

2. **Gestion d'erreur de suppression:**
   - L'API retourne le code `DELETE_NOT_ALLOWED`
   - Afficher un message d'erreur explicite à l'utilisateur
   - Expliquer pourquoi la suppression n'est pas possible

**Code d'erreur retourné par l'API :**

```typescript
DELETE_NOT_ALLOWED → "La suppression d'utilisateurs n'est pas autorisée"
```

---

### 🧪 **Partie 4 : Tests E2E avec Cypress** _(~3 min)_

**Objectif :** Mettre en place des tests end-to-end

#### À implémenter :

1. **Scénarios de test à créer** :

```gherkin
# cypress/e2e/users.feature

Feature: Gestion des utilisateurs

  Scenario: Afficher la liste des utilisateurs
    Given je suis sur la page d'accueil
    Then je devrais voir la liste des utilisateurs
    And je devrais voir au moins 1 utilisateur

  Scenario: Créer un utilisateur
    Given je suis sur la page d'accueil
    When je clique sur "Ajouter un utilisateur"
    And je remplis le formulaire avec des données valides
    And je soumets le formulaire
    Then je devrais voir un message de succès
    And je devrais être redirigé vers la liste

  Scenario: Modifier un utilisateur
    Given je suis sur la page d'accueil
    When je clique sur le bouton modifier du premier utilisateur
    And je modifie l'email
    And je soumets le formulaire
    Then je devrais voir un message de succès

  Scenario: Gérer l'erreur de suppression
    Given je suis sur la page d'accueil
    When je clique sur le bouton supprimer du premier utilisateur
    And je confirme la suppression
    Then je devrais voir un message d'erreur
    And l'utilisateur devrait toujours être visible
```

**Commandes à utiliser :**

```bash
# Lancer les tests
npm run build
npm run test:e2e
```

---

## 🏗️ Architecture du projet

```

📦 assessment-DI2/
├── 📁 src/
│ ├── 📁 assets/styles/
│ │ ├── variables.scss # ✅ Variables de la charte graphique
│ │ ├── base.scss # ✅ Reset et styles de base
│ │ ├── components.scss # ✅ Composants réutilisables (BEM)
│ │ ├── utilities.scss # ✅ Classes utilitaires (spacing, flex, grid)
│ │ └── main.scss # ✅ Import principal
│ ├── 📁 components/
│ │ └── UsersList.vue # ✅ Liste simple (10 premiers utilisateurs)
│ ├── 📁 pages/
│ │ ├── HomePage.vue # ✅ Page d'accueil
│ │ ├── CreateUserView.vue # ✅ Création simple (sans validation)
│ │ └── EditUserPage.vue # ❌ À créer
│ ├── 📁 services/
│ │ ├── http.service.ts # 🔄 Client HTTP (GET, POST uniquement)
│ │ └── user.service.ts # 🔄 Service minimal (2 méthodes)
│ ├── 📁 types/
│ │ └── api.ts # 🔄 Type User uniquement
│ ├── 📁 router/
│ │ └── index.ts # 🔄 2 routes configurées
│ ├── App.vue # ✅ Composant racine
│ └── main.ts # ✅ Point d'entrée
├── 📁 cypress/
│ ├── 📁 e2e/ # ❌ Tests à créer
│ │ └── users.feature # ❌ Scénarios Cucumber
│ ├── 📁 support/
│ │ └── step_definitions/ # ❌ Steps Cucumber à créer
│ └── cypress.config.ts # ✅ Cypress installé

```

**Légende :** ✅ Fourni | ❌ À créer | 🔄 À compléter

---

## 🌐 API Documentation

### 📍 Base URL

```

https://assessment.api.barouth.fr/di2

```

### 📚 Documentation complète

👉 **[Documentation interactive](https://assessment.api.barouth.fr/di2)**

### 🛍️ Endpoints principaux

#### Utilisateurs

```typescript
// Liste tous les utilisateurs (avec pagination)
GET /api/users
GET /api/users?page=1&perPage=10
Response: {
  data: User[],
  meta: {
    perPage: 10,
    currentPage: 1,
    firstPage: 1,
    isEmpty: false,
    total: 50,
    hasTotal: true,
    lastPage: 5,
    hasMorePages: true,
    hasPages: true
  }
}

// Recherche d'utilisateurs
GET /api/users?search=john
Response: {
  data: User[],
  meta: {
    perPage: 10,
    currentPage: 1,
    firstPage: 1,
    isEmpty: false,
    total: 50,
    hasTotal: true,
    lastPage: 5,
    hasMorePages: true,
    hasPages: true
  }
}

// Utilisateur spécifique
GET /api/users/:id
Response: User

// Créer un utilisateur
POST /api/users
Body: {
  firstName: string,    // min 2, max 100 caractères
  lastName: string,     // min 2, max 100 caractères
  email: string,        // format email valide, unique
  age: number,          // entre 18 et 120
  isActive?: boolean    // optionnel, défaut: true
}
Response: User

// Mettre à jour un utilisateur
PUT /api/users/:id
Body: {
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  isActive: boolean     // obligatoire en PUT
}
Response: User

// Supprimer un utilisateur (⚠️ Toujours interdit)
DELETE /api/users/:id
Response: 403 {
  error: "DELETE_NOT_ALLOWED",
  message: "La suppression d'utilisateurs n'est pas autorisée"
}
```

---

## 📊 Validation des données

### Règles de validation

| Champ       | Règles                                     |
| ----------- | ------------------------------------------ |
| `firstName` | Min 2 caractères, max 100                  |
| `lastName`  | Min 2 caractères, max 100                  |
| `email`     | Format email valide, unique dans la base   |
| `age`       | Nombre entre 18 et 120                     |
| `isActive`  | Boolean (optionnel en POST, requis en PUT) |

### Format des erreurs de validation

```typescript
// Code HTTP 422
{
  "errors": {
    "email": ["L'email est déjà utilisé"],
    "age": ["L'âge doit être supérieur à 18 ans"]
  }
}
```

---

## 🎨 Charte graphique et styles

### Variables SCSS disponibles

```scss
// Couleurs principales
--color-primary: #2563eb --color-success: #10b981 --color-error: #ef4444 --color-warning: #f59e0b
  // Espacement
  --spacing-xs: 0.25rem --spacing-sm: 0.5rem --spacing-md: 0.75rem --spacing-lg: 1rem
  --spacing-xl: 1.5rem --spacing-2xl: 2rem;
```

### Classes utilitaires disponibles

```scss
// Marges et paddings
.mt-lg, .mb-xl, .p-md, .px-lg, .py-2xl

// Flexbox
.flex, .flex--between, .flex--center, .flex--items-center

// Grid
.grid, .grid--cols-2, .grid--cols-3

// Texte
.text--center, .text--bold, .text--secondary
```

### Composants stylisés disponibles

```scss
.card, .btn, .form__group, .table, .badge, .loading
```

---

## ✅ Checklist finale

### Fourni dans le projet

- [x] Affichage des 10 premiers utilisateurs dans un tableau
- [x] Formulaire de création simple (sans gestion d'erreur)
- [x] Service HTTP de base (GET, POST)
- [x] Styles SCSS avec charte graphique complète (BEM)
- [x] Classes utilitaires pour l'espacement, flex, grid
- [x] Composants stylisés (boutons, formulaires, tables, badges)

### À implémenter (évaluation)

- [ ] **Partie 1:** Gestion d'erreurs globale
- [ ] **Partie 1:** Page d'édition avec réutilisation du code
- [ ] **Partie 2:** Pagination complète (navigation, sélection)
- [ ] **Partie 2:** Recherche textuelle (avec ou sans debounce)
- [ ] **Partie 3:** Bouton et logique de suppression
- [ ] **Partie 3:** Gestion erreur DELETE_NOT_ALLOWED
- [ ] **Partie 4:** Tests E2E pour les 4 scénarios principaux

### Bonus (optionnel)

- [ ] Composant de formulaire réutilisable
- [ ] Système de toast/notification global
- [ ] Debounce sur la recherche
- [ ] Loading skeletons pour le tableau
- [ ] Composant de pagination réutilisable
- [ ] Filtres supplémentaires (actif/inactif)

---

## 🔧 Commandes utiles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run preview          # Prévisualiser le build

# Qualité du code
npm run lint             # Linter ESLint
npm run format           # Formatter avec Prettier
npm run type-check       # Vérification TypeScript

# Tests
npm run test:e2e         # Tests E2E (production)
npm run test:e2e:dev     # Tests E2E (développement)
```

---

## 💡 Conseils

1. **Commencez par la pagination** - C'est la fonctionnalité la plus impactante
2. **Gérez les erreurs progressivement** - Testez d'abord avec l'endpoint de suppression
3. **Réutilisez les composants**
4. **Utilisez les classes utilitaires SCSS** - Gain de temps considérable
5. **Testez avec l'API réelle** - Pas besoin de mock
6. **Les tests Cucumber peuvent être simples** - Focus sur les scénarios clés

---

## 🆘 Problèmes courants

### L'API ne répond pas

- Vérifiez votre connexion internet
- L'URL de base est : `https://assessment.api.barouth.fr/di2`

### Erreur CORS

- L'API est configurée pour accepter toutes les origines
- Vérifiez que vous utilisez bien `https://`

### Rate Limiting

- Limite : 100 requêtes / 15 minutes par IP
- Si dépassée, attendez quelques minutes

### Erreurs TypeScript

- Vérifiez que tous les types sont correctement importés
- Utilisez `npm run type-check` pour diagnostiquer

---

**🚀 Bon développement et bonne chance !**
