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
router.route("/route1").get(controller.index1).post(controller.post1);

router
  .route("/route2")
  .get(controller.index2)
  .post(controller.post2)
  .delete(controller.delete2);

// Export API routes
module.exports = router;
