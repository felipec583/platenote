/**
 * @openapi
 * tags:
 *   name: NumberPlate
 *   description: Endpoints for NumberPlate
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     NumberPlate:
 *       type: object
 *       required:
 *         - id
 *         - plateNumber
 *         - is_tenant
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the number plate
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         plateNumber:
 *           type: string
 *           description: The vehicle's registration number. Chilean format
 *           example: ABCD12
 *         is_tenant:
 *           type: boolean
 *           description: Indicates if the number plate belongs to a tenant
 *           example: true
 */

/**
 * @openapi
 * paths:
 *   /number-plate:
 *     get:
 *       tags:
 *         - NumberPlate
 *       summary: Get all number plates
 *       description: Returns a list of all number plates in the system
 *       responses:
 *         '200':
 *           description: A list of number plates
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/NumberPlate'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal Server Error"
 *                   error:
 *                     type: string
 *                     example: "An error occurred while fetching number plates"
 */

/**
 * @openapi
 * paths:
 *   /numberPlate/search:
 *     get:
 *       tags:
 *         - NumberPlate
 *       summary: Search for number plates by plate number
 *       description: Get a list of number plates matching the given platenumber
 *       parameters:
 *         - in: query
 *           name: query
 *           description: You can search with one letter or a full plate number
 *           required: false
 *           schema:
 *             type: string
 *             example: "ABC"
 *       responses:
 *         '200':
 *           description: A list of number plates matching the given platenumber
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "SJBR45"
 */

/**
 * @openapi
 * paths:
 *   /number-plate:
 *     put:
 *       tags:
 *         - NumberPlate
 *       summary: Change tenant status of a number plate
 *       description: Change the tenant status of a number plate
 *       requestBody:
 *         description: |
 *              You can change the tenant status with the id or the plate number
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   description: there are two ways to change the status
 *                   example: number_plate or id
 *                 id:
 *                   type: string
 *                   description: the id of the number plate or the plate number
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *             examples:
 *               UUID-example:
 *                 value:
 *                   id: "123e4567-e89b-12d3-a456-426614174000"
 *                   type: id
 *               number-plate-example:
 *                 value:
 *                   id: "ABC123"
 *                   type: number_plate
 *       responses:
 *         '200':
 *           description: Tenant status updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/NumberPlate'
 *         '404':
 *           description: Number plate not found
 *         '500':
 *           description: Internal server error
 *
 *   /number-plate/suggestion/search:
 *     get:
 *       tags:
 *         - NumberPlate
 *       summary: Get number plate suggestions
 *       description: Get suggestions for number plates based on a search query
 *       parameters:
 *         - in: query
 *           name: query
 *           description: Search query for number plate suggestions
 *           required: true
 *           schema:
 *             type: string
 *             example: "ABC"
 *       responses:
 *         '200':
 *           description: List of number plate suggestions
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "ABCD12"
 *         '500':
 *           description: Internal server error
 *
 *   /number-plate/{id}:
 *     get:
 *       tags:
 *         - NumberPlate
 *       summary: Get number plate by ID
 *       description: Get a specific number plate by its ID
 *       parameters:
 *         - in: path
 *           name: id
 *           description: ID of the number plate
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Number plate found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/NumberPlate'
 *         '404':
 *           description: Number plate not found
 *         '500':
 *           description: Internal server error
 */
