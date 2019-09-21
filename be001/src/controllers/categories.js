import models from '../models';
import { async } from 'rxjs/internal/scheduler/async';

const { Category, Product } = models;

export const index = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const show = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const category = await Category.findByPk(id);
    if (category) {
      res.json(category);
    } else {
      next(new Error('Category not found'));
    }
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({
      name,
    });
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    const [rowsUpdated] = await Category.update({
      name,
    }, {
      where: {
        id,
      },
    });
    if (rowsUpdated === 1) {
      res.status(204).end();
    } else {
      next(new Error('No category updated'));
    }
  } catch (err) {
    next(err);
  }
};

export const destroy = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const rowsDestroyed = await Category.destroy({
      where: {
        id,
      },
    });
    if (rowsDestroyed === 1) {
      res.status(204).end();
    } else {
      next(new Error('No category destroyed'));
    }
  } catch (err) {
    next(err);
  }
};

export const listProducts = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const products = await Product.findAll({
      where: {
        categoryId: id,
      },
      include: ['category'],
      attributes: { exclude: ['categoryId'] },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};
