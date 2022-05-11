const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Styles = mongoose.model("Styles");
const logModule = require("../startup/logging");
const logger = logModule.logger;
router.get("/", async function (req, res) {
  try {
    const styles = await Styles.find({
      isDeleted: false,
    });
    res.json({
      data: styles,
      message: "All styles data",
    });
    logger.info("Style Details Requested");
  } catch (err) {
    logger.error("Styles Details Fetching Error " + err.name);
    res.json({
      message: err,
    });
  }
});
router.post("/newStyle", async function (req, res) {
  try {
    const { styleName, styleOrder } = req.body;

    if (!styleName || !styleOrder) {
      return res.json({
        message: "Fields should not be empty",
      });
    } else {
      const style = new Styles({
        styleName: req.body.styleName,
        styleOrder: req.body.styleOrder,
      });

      await style.save().then((response) => {
        console.log("saved");
        return res.json({
          data: style,
          message: "New style added",
        });
      });

      logger.info(`Style Details Added  ${style}`);
    }
  } catch (err) {
    logger.error("Style details not added" + err.name);
    res.json({
      message: err,
    });
  }
});
router.get("/style/:styleName", async function (req, res) {
  const styleName = req.params.styleName;
  try {
    const styles = await Styles.find({
      styleName: styleName,
    });
    if (styles.length == 0) {
      res.json({
        message: "No styles found",
      });
      logger.error("Styles details not exsits for StyleName " + styleName);
    } else {
      res.json({
        data: styles,
        message: "styles found",
      });
      logger.info("Style Details fetched for style name " + styleName);
    }
  } catch (err) {
    res.json({
      message: err,
    });
    logger.error("Style details not fetched" + err.name);
  }
});
router.delete("/deleteStyle/:styleName/:styleOrder", async function (req, res) {
  const query = {
    styleName: req.params.styleName,
    styleOrder: req.params.styleOrder,
  };
  try {
    Styles.findOneAndDelete(query, { useFindAndModify: false }).then(
      (result) => {
        console.log(result);
        if (result) {
          res.json({
            data: req.params.styleName,
            message: "Style Deleted Successfully",
          });
          logger.info(
            "Style Details deleted with style name and styleOrder " +
              req.params.styleName +
              req.params.styleOrder
          );
        } else {
          res.json({
            data: req.params.styleName,
            message: "Style Not Found",
          });
        }
      }
    );
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});
module.exports = router;
