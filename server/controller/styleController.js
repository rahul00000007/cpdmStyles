const mongoose = require("mongoose");
const Styles = mongoose.model("Styles");
const logModule = require("../startup/logging");

const logger = logModule.logger;

const getAllStyleDetails = async (req, res) => {
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
};

const postStyle = async (req, res) => {
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
};

const getStyleByName = async (req, res) => {
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
};

const deleteStyles = async (req, res) => {
  try {
    const style = await Styles.findOne({
      styleName: req.params.styleName,
      styleOrder: req.params.styleOrder,
    });
    console.log(style.length);
    style.isDeleted = true;
    await style.delete();
    res.json({
      data: req.params.styleName,
      message: "Style Deleted Successfully",
    });
    logger.info(
      "Style Details deleted with style name and styleOrder " +
        req.params.styleName +
        req.params.styleOrder
    );
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

const deleteStyle = (req, res) => {
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
        }
      }
    );
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

module.exports = {
  getAllStyleDetails: getAllStyleDetails,
  postStyle: postStyle,
  getStyleByName: getStyleByName,
  deleteStyle: deleteStyle,
};
