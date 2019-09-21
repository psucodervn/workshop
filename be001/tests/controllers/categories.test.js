import request from 'supertest';
import app from '../../src/app';
import models from '../../src/models';

const { Category } = models;

const sampleCategoryData = {
  name: 'Sample Category',
};

describe('Categories controller', () => {
  describe('#create', () => {
    it('creates a category', async () => {
      const response = await request(app).post('/categories').send(sampleCategoryData);
      expect(response.status).toBe(201); // http code 201 -> created
      expect(response.body.name).toEqual(sampleCategoryData.name);
    });
  });

  describe('#index', () => {
    it('shows list of categories', async () => {
      const response = await request(app).get('/categories').send();
      expect(response.statusCode).toBe(200); // http code 200 -> success
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('#show', () => {
    it('shows a category details', async () => {
      // replace mock with real data
      const sample = await Category.create(sampleCategoryData);
      const response = await request(app).get(`/categories/${sample.id}`).send();
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(sample.id);
      expect(response.body.name).toEqual(sample.name);
    });
  });

  describe('#update', () => {
    it('updates a category', async () => {
      // replace mock with real data
      const sample = await Category.create(sampleCategoryData);
      const response = await request(app).put(`/categories/${sample.id}`).send({
        name: 'Updated name',
      });
      expect(response.statusCode).toBe(204); // http code 204 -> no content
    });
  });

  describe('#destroy', () => {
    it('deletes a category', async () => {
      // replace mock with real data
      const sample = await Category.create(sampleCategoryData);
      const response = await request(app).delete(`/categories/${sample.id}`).send();
      expect(response.statusCode).toBe(204);
    });
  });
});
