const asyncHandler = require("express-async-handler");
const tickets = require("../data.json");
const { responseToViewModel } = require("../transformers/responses");
const sortedTickets = tickets.sort((a, b) => a.creationTime - b.creationTime);

const MESSAGES = {
  NOT_FOUND: { message: "Not found" },
  BAD_REQUEST: { message: "Bad request" },
};

const getTickets = asyncHandler(async (req, res) => {
  const { pageSize = 5, pageNumber = 0 } = req.query;
  const startingTicketNumber = pageNumber * pageSize;
  const result = sortedTickets.slice(
    startingTicketNumber,
    startingTicketNumber + pageSize
  );
  res.status(200).json(responseToViewModel(result));
});

const getTicketsByTitle = asyncHandler(async (req, res) => {
  const { title } = req.query;
  if (!title) {
    res.status(400).json(MESSAGES.BAD_REQUEST);
    return;
  }

  const regex = new RegExp(title, "i");
  const result = tickets.filter((ticket) => regex.test(ticket.title));
  if (!result) {
    res.status(404).json(MESSAGES.NOT_FOUND);
    return;
  }
  res.status(200).json(responseToViewModel(result));
});

const getTicketsByTimeRange = asyncHandler(async (req, res) => {
  const { to, from } = req.query;
  if (!to && !from) {
    res.status(400).json(MESSAGES.BAD_REQUEST);
    return;
  }
  if (to && !Number.isInteger(Number(to))) {
    res.status(400).json(MESSAGES.BAD_REQUEST);
    return;
  }
  if (from && !Number.isInteger(Number(from))) {
    res.status(400).json(MESSAGES.BAD_REQUEST);
    return;
  }
  const result = tickets.filter((ticket) => {
    return (
      (to ? ticket.creationTime <= Number(to) : true) &&
      (from ? ticket.creationTime >= Number(from) : true)
    );
  });
  if (!result) {
    res.status(404).json(MESSAGES.NOT_FOUND);
    return;
  }
  res.status(200).json(responseToViewModel(result));
});

const getTicketsByQuery = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    res.status(400).json(MESSAGES.BAD_REQUEST);
    return;
  }

  const regex = new RegExp(query, "i");
  const result = tickets.filter(
    (ticket) =>
      regex.test(ticket.title) ||
      regex.test(ticket.content) ||
      regex.test(ticket.userEmail)
  );
  if (!result) {
    res.status(404).json(MESSAGES.NOT_FOUND);
    return;
  }
  res.status(200).json(responseToViewModel(result));
});

module.exports = {
  getTickets,
  getTicketsByTitle,
  getTicketsByTimeRange,
  getTicketsByQuery,
};
