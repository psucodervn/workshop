import { Router } from 'express';
import {
  index, show, create, update, destroy, listProducts,
} from '../controllers/categories';

const router = new Router();

/**
 * @swagger
 *
 * definitions:
 *  Category:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     description: Returns categories
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: categories
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Category'
 */
router.get('/', index);

/**
 * @swagger
 * /categories/{id}:
 *  get:
 *    description: Returns a single category
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *    produces:
 *     - application/json
 *    responses:
 *      200:
 *        description: category
 *        schema:
 *          $ref: '#/definitions/Category'
 */
router.get('/:id', show);

/**
 * @swagger
 * /categories:
 *   post:
 *     description: Creates a category
 *     parameters:
 *      - name: category
 *        in:  body
 *        type: string
 *        schema:
 *          $ref: '#/definitions/Category'
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: category
 *         schema:
 *           $ref: '#/definitions/Category'
 */
router.post('/', create);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     description: Update a category
 *     parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: string
 *        required: true
 *      - name: product
 *        description: Category object
 *        in:  body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/Category'
 *     produces:
 *      - application/json
 *     responses:
 *       204:
 *         description: the category was updated
 */
router.put('/:id', update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     description: Deletes a category
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     produces:
 *      - application/json
 *     responses:
 *       204:
 *         description: the category was deleted
 */
router.delete('/:id', destroy);

/**
 * @swagger
 * /categories/{id}/products:
 *   get:
 *     description: Returns products in category
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: products
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Product'
 */
router.get('/:id/products', listProducts);

export default router;
