const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticketController");

router.get("/", ticketController.getTickets);
router.get("/title", ticketController.getTicketsByTitle);
router.get("/time", ticketController.getTicketsByTimeRange);
router.get("/search", ticketController.getTicketsByQuery);


module.exports = router;
