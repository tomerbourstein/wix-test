/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: The tickets managing API
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the article
 *         creationTime:
 *           type: integer
 *           description: creation time of the ticket
 *         title:
 *           type: string
 *           description: The title of your ticket
 *         content:
 *           type: string
 *           description: The content of your ticket
 *         userEmail:
 *           type: string
 *           description: The email of your user
 *         labels:
 *           type: string
 *           description: labels used
 *       example:
 *         id: 0
 *         creatioTime: 1
 *         title: The New Turing Omnibus
 *         content: In the begining there was nothing, but everything nonetheless.
 *         useEmail: example@email.com
 *         labels: guildlines
 */

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Returns the list of all tickets
 *     tags: [Ticket]
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageNumber
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The list of the tickets
 */

/**
 * @swagger
 * /tickets/title:
 *   get:
 *     summary: Returns an ticket by its title
 *     tags: [Ticket]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The ticket title
 *       404:
 *         description: The ticket was not found
 */

/**
 * @swagger
 * /tickets/time:
 *   get:
 *     summary: Returns a ticket by its creationTime according to a query of "to" and "from"
 *     tags: [Ticket]
 *     parameters:
 *       - in: query
 *         name: to
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: from
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The tickets list is arranged by time
 *       404:
 *         description: The tickets was not found
 */

/**
 * @swagger
 * /tickets/search:
 *   get:
 *     summary: Returns a ticket by search query
 *     tags: [Ticket]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The tickets list is arranged by query
 *       404:
 *         description: The tickets was not found
 */
