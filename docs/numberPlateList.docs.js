/**
 * @openapi
 * tags:
 *  name: NumberPlateList
 *  description: Endpoints for NumberPlateList
 *
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     NumberPlateList:
 *       type: object
 *       required:
 *         - id
 *         - shift_id
 *         - day_id
 *         - created_by
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the number plate list
 *           example: "41e0c702-f3fd-4044-8c7e-1ddbc5d49860"
 *         shift_id:
 *           type: integer
 *           description: Identifier for the shift
 *           example: 1
 *         day_id:
 *           type: string
 *           description: Identifier for the day
 *           example: "680d2ae5-b917-408f-9dfb-e95a6011db4c"
 *         created_by:
 *           type: string
 *           description: Identifier for the user who created the list
 *           example: "57f63902-06fb-4880-ab00-f03d51cc1bec"
 */

/**
 * @openapi
 * paths:
 *  /lists:
 *    post:
 *      tags:
 *        - NumberPlateList
 *      summary: Create new list
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: List created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NumberPlateList'
 *        '400':
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: integer
 *                    example: 400
 *                  message:
 *                    type: string
 *                    example: Bad Request
 *                  instance:
 *                    type: string
 *                    example: /lists
 *
 *    get:
 *      tags:
 *        - NumberPlateList
 *      summary: Get lists by date range and shift
 *      parameters:
 *        - in: query
 *          name: start_date
 *          required: true
 *          schema:
 *            type: string
 *            format: date
 *          description: Start date for the search range
 *        - in: query
 *          name: end_date
 *          required: true
 *          schema:
 *            type: string
 *            format: date
 *          description: End date for the search range
 *        - in: query
 *          name: shift
 *          required: true
 *          schema:
 *            type: integer
 *            enum: [1, 2, 3]
 *          description: Shift number (1, 2, or 3)
 *      responses:
 *        '200':
 *          description: Lists found successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/NumberPlateList'
 *
 *  /lists/current:
 *    get:
 *      tags:
 *        - NumberPlateList
 *      summary: Get current list
 *      description: Get the current active number plate list
 *      responses:
 *        '200':
 *          description: Current list found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NumberPlateList'
 *
 *  /lists/shift:
 *    get:
 *      tags:
 *        - NumberPlateList
 *      summary: Get lists by shift
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - shift
 *              properties:
 *                shift:
 *                  type: integer
 *                  enum: [1, 2, 3]
 *      responses:
 *        '200':
 *          description: Lists found for shift
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/NumberPlateList'
 *
 *  /lists/previous-list:
 *    get:
 *      tags:
 *        - NumberPlateList
 *      summary: Get previous list from current
 *      description: Get the list that was active before the current one
 *      responses:
 *        '200':
 *          description: Previous list found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  content:
 *                    oneOf:
 *                      - $ref: '#/components/schemas/NumberPlateList'
 *                      - type: string
 *                        example: "No list"
 *
 *  /lists/{id}:
 *    get:
 *      tags:
 *        - NumberPlateList
 *      summary: Get list by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: ID of the list to retrieve
 *      responses:
 *        '200':
 *          description: List found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NumberPlateList'
 *        '404':
 *          description: List not found
 *
 *    delete:
 *      tags:
 *        - NumberPlateList
 *      summary: Delete list by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: ID of the list to delete
 *      responses:
 *        '200':
 *          description: List deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  deletedList:
 *                    $ref: '#/components/schemas/NumberPlateList'
 *        '404':
 *          description: List not found
 */
