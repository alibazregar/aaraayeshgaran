const express = require("express");
const router = express.Router();
const CompletedCart = require("../../models/completedCart");
const Comment = require("../../models/comment");
// Define an endpoint to get CompletedCarts with pagination, sorting, and querying
router.get("/completed-carts", async (req, res) => {
  try {
    const { user, status, sort, page, perPage } = req.query;

    const query = {};

    if (user) {
      query.user = user;
    }

    if (status) {
      query.status = status;
    }

    const sortOption = sort === "asc" ? "orderDate" : "-orderDate";

    const pageNum = parseInt(page) || 1;
    const itemsPerPage = parseInt(perPage) || 10;
    const skip = (pageNum - 1) * itemsPerPage;

    const totalItems = await CompletedCart.countDocuments(query);

    const userCompletedCarts = await CompletedCart.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(itemsPerPage)
      .exec();

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      currentPage: pageNum,
      completedCarts: userCompletedCarts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/completed-carts/:cartId/update-status", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const { newStatus } = req.body;

    if (!newStatus) {
      return res
        .status(400)
        .json({ error: "Missing newStatus in request body" });
    }

    const updatedCart = await CompletedCart.findByIdAndUpdate(
      cartId,
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: "CompletedCart not found" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/completed-carts/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;

    const completedCart = await CompletedCart.findById(cartId)
      .populate("products.product") // Replace with desired fields
      .populate("packages.package"); // Replace with desired fields

    if (!completedCart) {
      return res.status(404).json({ error: "CompletedCart not found" });
    }

    res.status(200).json(completedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put('/comments/:commentId/status', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { status } = req.body;

    if (!['valid', 'notValid', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { status },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/comments', async (req, res) => {
  try {
    // Parse and validate query parameters
    const { userId, startDate, endDate, page, pageSize } = req.query;

    const filters = {};
    if (userId) filters.user = userId;
    if (startDate) filters.createdAt = { $gte: new Date(startDate) };
    if (endDate) filters.createdAt = { ...filters.createdAt, $lte: new Date(endDate) };

    // Calculate skip and limit for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Query the comments
    const comments = await Comment.find(filters)
      .populate('user') // Populate the user field with user details
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order for most recent first

    // Return the results as JSON
    res.status(200).json({ message: 'Comments retrieved successfully', result: comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error', result: null });
  }
});
module.exports = router;
