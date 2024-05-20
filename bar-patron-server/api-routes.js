// Dependencies
let router = require("express").Router();
var controller = require("./controller");

// Default API response
router.get("/", (req, res) => {
  console.log("Test GET hit");
  res.json({
    status: "API working",
    message: "Welcome to my world",
  });
});

// Table routes
router.route("/patrons").get(controller.index).post(controller.post);

router.route("/patrons/:id").get(controller.retrieve).put(controller.put).delete(controller.delete);

// Export API routes
module.exports = router;
