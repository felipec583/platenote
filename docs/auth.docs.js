/**
 * @openapi
 * tags:
 *  name: Auth
 * description: Endpoints for Authorization and Authentication
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 contactName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *                 roleId:
 *                   type: integer
 *                 enterpriseId:
 *                   type: integer
 *                 enterpriseName:
 *                   type: string
 *                 profileTypeEn:
 *                   type: string
 *                 profileTypeEs:
 *                   type: string
 *                 profileTypeId:
 *                   type: integer
 *                 originId:
 *                   type: integer
 *                   nullable: true
 *             examples:
 *               Example:
 *                 value:
 *                   id: 1
 *                   contactName: "Felipe"
 *                   email: "felipe@empresa.com"
 *                   accessToken: "jwt.token.here"
 *                   roleId: 2
 *                   enterpriseId: 10
 *                   enterpriseName: "Exportadora Brava"
 *                   profileTypeEn: "Exporter"
 *                   profileTypeEs: "Exportador"
 *                   profileTypeId: 1
 *                   originId: 123
 *       401:
 *         description: Invalid credentials
 */
