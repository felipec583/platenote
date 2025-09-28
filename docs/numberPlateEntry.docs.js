/**
 * @openapi
 * tags:
 *  name: NumberPlateEntry
 *  description: Endpoints for managing number plate entries
 *
 * components:
 *   schemas:
 *     NumberPlateEntry:
 *       type: object
 *       properties:
 *         number_plate:
 *           type: string
 *           description: The vehicle's number plate
 *         has_left:
 *           type: boolean
 *           description: Indicates if the vehicle has left
 *         is_registered:
 *           type: boolean
 *           description: Indicates if the number plate is registered
 *         userId:
 *           type: string
 *           description: ID of the user who created the entry
 *
 * /api/number-plate:
 *   post:
 *     tags: [NumberPlateEntry]
 *     summary: Create a new number plate entry
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number_plate
 *             properties:
 *               number_plate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Number plate entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NumberPlateEntry'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags: [NumberPlateEntry]
 *     summary: Delete a number plate entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numberPlate
 *             properties:
 *               numberPlate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Number plate entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NumberPlateEntry'
 *       404:
 *         description: Number plate entry not found
 *       500:
 *         description: Internal server error
 *
 * /api/number-plate/left:
 *   patch:
 *     tags: [NumberPlateEntry]
 *     summary: Update the has_left status of a number plate entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numberPlate
 *             properties:
 *               numberPlate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Has left status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numberPlate:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Number plate entry not found
 *       500:
 *         description: Internal server error
 *
 * /api/number-plate/registration:
 *   patch:
 *     tags: [NumberPlateEntry]
 *     summary: Update the registration status of a number plate entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numberPlate
 *             properties:
 *               numberPlate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numberPlate:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Number plate entry not found
 *       500:
 *         description: Internal server error
 *
 * /api/number-plate/plate:
 *   put:
 *     tags: [NumberPlateEntry]
 *     summary: Update a number plate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentNumberPlate
 *               - newNumberPlate
 *             properties:
 *               currentNumberPlate:
 *                 type: string
 *               newNumberPlate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Number plate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newNumberPlate:
 *                   type: string
 *       404:
 *         description: Number plate entry not found
 *       500:
 *         description: Internal server error
 */
