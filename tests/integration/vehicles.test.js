const request = require('supertest');
const app = require('../../app');
const Vehicle = require('../../models/Vehicle');

describe('Vehicle API', () => {
  let testVehicle;

  beforeAll(async () => {
    // Crée un véhicule de test
    testVehicle = await Vehicle.create({
      make: 'Test',
      model: 'Model X',
      year: 2023,
      type: 'Test',
      pricePerDay: 99
    });
  });

  afterAll(async () => {
    // Nettoie la base après les tests
    await Vehicle.deleteMany({});
  });

  // TEST GET /vehicles
  it('GET /vehicles → Liste tous les véhicules', async () => {
    const res = await request(app)
      .get('/vehicles')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // TEST POST /vehicles
  it('POST /vehicles → Crée un nouveau véhicule', async () => {
    const newVehicle = {
      make: 'Honda',
      model: 'Civic',
      year: 2022,
      type: 'Sedan',
      pricePerDay: 45
    };

    const res = await request(app)
      .post('/vehicles')
      .send(newVehicle)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.make).toBe('Honda');
  });

  // TEST GET /vehicles/:id
  it('GET /vehicles/:id → Récupère un véhicule spécifique', async () => {
    const res = await request(app)
      .get(`/vehicles/${testVehicle._id}`)
      .expect(200);

    expect(res.body).toHaveProperty('make', 'Test');
  });

  // TEST DELETE /vehicles/:id
  it('DELETE /vehicles/:id → Supprime un véhicule', async () => {
    await request(app)
      .delete(`/vehicles/${testVehicle._id}`)
      .expect(200);
  });
});