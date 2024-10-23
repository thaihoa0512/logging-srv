const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT || "5555";
const app = express();


app.use(express.json())

app.get("/", (req, res) => {
    const logger = require('./logger')('home');
    logger.info('happy logging')
    logger.error("404 error"); //error method
    logger.debug("The is the 404 route.");
    res.json({ method: req.method, message: "Hello World", ...req.body });
});

app.get('/404', (req, res) => {
    const logger = require('./logger')('404');
    logger.error("404 error"); //error method
    logger.debug("The is the 404 route.");
    res.sendStatus(404);
})

app.get("/user", (req, res) => {
    try {
      throw new Error("Invalid user");
    } catch (error) {
      logger.error("Auth Error: invalid user");
      logger.debug("The is the user route.");
      res.status(500).send("Error!");
    }
  });

  app.post("/logs", (req, res) => {
    try {
      if (!req.body.service || !req.body.service.trim().length) {
        return res.status(422).json({
          message: 'Service is required!'
        })
      }
      if (!req.body.msg || !req.body.msg.trim().length) {
        return res.status(422).json({
          message: 'Message is required!'
        })
      }
      if (!req.body.key || !req.body.key.trim().length) {
        return res.status(422).json({
          message: 'key is required!'
        })
      }
      if (!req.body.level || !req.body.level.trim().length) {
        return res.status(422).json({
          message: 'level is required!'
        })
      }

        const logFile = req.body.service ||process.env.LOG_FILE ;
        const msg = req.body.msg ;
        const key = req.body.key ;
        const level = req.body.level ;
        const logger = require('./logger')(logFile);
        if(level=='info'){
          logger.info(key + '-' +msg);
        }else if(level=='error'){
          logger.error(key + '-' +msg);
        }
        res.json({ method: req.method, message: "Hello logs okay", ...req.body });
    } catch (error) {
      logger.error("logs Error: invalid logs");
      logger.debug("The is the logs route.");
      res.status(500).send("Error!");
    }
  });


app.listen(parseInt(PORT, 10), () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
