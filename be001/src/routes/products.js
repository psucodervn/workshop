import { Router } from 'express';
import {
  index, show, create, update, destroy,
} from '../controllers/products';

const router = new Router();

/**
 * @swagger
 *
 * definitions:
 *  Product:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      price:
 *        type: number
 *      category:
 *        type: object
 *        schema:
 *          $ref: '#/definitions/Category'
 */

/**
 * @swagger
 *
 * definitions:
 *  ProductCreate:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      price:
 *        type: number
 *      categoryId:
 *        type: string
 */

/**
 * @swagger
 *
 * definitions:
 *  ProductUpdate:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      price:
 *        type: number
 *      categoryId:
 *        type: string
 */


/**
 * @swagger
 * /products:
 *   get:
 *     description: Returns products
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: books
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Product'
 */
router.get('/', index);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    description: Returns a single product
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
 *        description: product
 *        schema:
 *          $ref: '#/definitions/Product'
 */
router.get('/:id', show);

/**
 * @swagger
 * /products:
 *   post:
 *     description: Creates a product
 *     parameters:
 *      - name: product
 *        in:  body
 *        type: string
 *        schema:
 *          $ref: '#/definitions/ProductCreate'
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: book
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.post('/', create);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     description: Update a product
 *     parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: string
 *        required: true
 *      - name: product
 *        description: Product object
 *        in:  body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/ProductUpdate'
 *     produces:
 *      - application/json
 *     responses:
 *       204:
 *         description: the product was updated
 */
router.put('/:id', update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     description: Deletes a product
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
 *         description: the product was deleted
 */
router.delete('/:id', destroy);

export default router;
