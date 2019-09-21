import request from 'supertest';
import app from '../../src/app';
import models from '../../src/models';

const { Product } = models;

const sampleProductData = {
  name: 'Sample Product',
  description: 'A sample product for testing',
  price: 9999,
};

describe('Products controller', () => {
  describe('#create', () => {
    it('creates a product', async () => {
      const response = await request(app).post('/products').send(sampleProductData);
      expect(response.status).toBe(201);
      expect(response.body.name).toEqual(sampleProductData.name);
      expect(response.body.description).toEqual(sampleProductData.description);
      expect(response.body.price).toEqual(sampleProductData.price);
    });
  });

  describe('#index', () => {
    it('shows list of products', async () => {
      const response = await request(app).get('/products').send();
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('#show', () => {
    it('shows a product details', async () => {
      const sample = await Product.create(sampleProductData);
      const response = await request(app).get(`/products/${sample.id}`).send();
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(sample.id);
      expect(response.body.name).toEqual(sample.name);
      expect(response.body.description).toEqual(sample.description);
      expect(response.body.price).toEqual(sample.price);
      // we are expecting our api result to have this new field
      expect(response.body).toHaveProperty('category');
    });
  });

  describe('#update', () => {
    it('updates a product', async () => {
      const sample = await Product.create(sampleProductData);
      const response = await request(app).put(`/products/${sample.id}`).send({
        name: 'Updated name',
      });
      expect(response.statusCode).toBe(204);
    });
  });

  describe('#destroy', () => {
    it('deletes a product', async () => {
      const sample = await Product.create(sampleProductData);
      const sampleId = sample.id;
      const response = await request(app).delete(`/products/${sampleId}`).send();
      expect(response.statusCode).toBe(204);
    });
  });
});
