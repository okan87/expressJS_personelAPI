"use strict";
const router = require("express").Router()
const Personnel = require("../controllers/personnel.controller")
const permissions = require("../middlewares/permissions")


/**
 * @swagger
 * /personnels:
 *   get:
 *     summary: List Personnel
 *     tags: [Personnel]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personnel'
 */
router.get('/', permissions.isAdmin, Personnel.list);


/**
 * @swagger
 * /personnels:
 *   post:
 *     summary: Create Personnel
 *     tags: [Personnel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Personnel'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personnel'
 */
router.post('/', permissions.isAdmin, Personnel.create);

/**
 * @swagger
 * /personnels/{personnelId}:
 *   get:
 *     summary: Get Personnel
 *     tags: [Personnel]
 *     parameters:
 *       - in: path
 *         name: personnelId
 *         required: true
 *         schema:
 *           type: string
 *         description: Personnel ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personnel'
 *       404:
 *         description: Not Found
 */
router.get('/:personnelId', permissions.isAdminOrOwner, Personnel.read);


/**
 * @swagger
 * /personnels/{personnelId}:
 *   put:
 *     summary: Update Personnel
 *     tags: [Personnel]
 *     parameters:
 *       - in: path
 *         name: personnelId
 *         required: true
 *         schema:
 *           type: string
 *         description: Personnel ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Personnel'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personnel'
 *       404:
 *         description: Not Found
 */
router.put('/:personnelId', permissions.isAdminOrOwner, Personnel.update);


/**
 * @swagger
 * /personnels/{personnelId}:
 *   patch:
 *     summary: Partially update a personnel
 *     tags: [Personnel]
 *     parameters:
 *       - in: path
 *         name: personnelId
 *         required: true
 *         schema:
 *           type: string
 *         description: Personnel ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Personnel'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personnel'
 *       404:
 *         description: Not Found
 */
router.patch('/:personnelId', permissions.isAdminOrOwner, Personnel.update);


/**
 * @swagger
 * /personnels/{personnelId}:
 *   delete:
 *     summary: Delete Personnel
 *     tags: [Personnel]
 *     parameters:
 *       - in: path
 *         name: personnelId
 *         required: true
 *         schema:
 *           type: string
 *         description: Personnel ID
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not Found
 */
router.delete('/:personnelId', permissions.isAdminOrOwner, Personnel.delete);

module.exports = router