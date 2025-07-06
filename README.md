# Vehicle Rental API

Microservice pour la gestion de véhicules (Propelize)

## Stack Technique
- **Backend** : Node.js + Express
- **Base de données** : MongoDB (Docker)
- **Tests** : Jest + Supertest

## Installation
```bash
# Avec Docker (recommandé)
docker-compose up --build

# Manuellement
npm install
npm start
```

## Endpoints

### `GET /vehicles`
Liste tous les véhicules

**Exemple de réponse :**
```json
[
  {
    "_id": "65a1b...",
    "make": "Toyota",
    "model": "Corolla",
    "year": 2022,
    "type": "Sedan",
    "pricePerDay": 50
  }
]
```

### `POST /vehicles`
Ajoute un véhicule

**Body requis :**
```json
{
  "make": "Honda",
  "model": "Civic",
  "year": 2023,
  "type": "Sedan",
  "pricePerDay": 45
}
```

## Tests
```bash
npm test          # Lance les tests
npm run test:coverage  # Rapport de couverture
```

## Licence
MIT