"use strict";

// [LOAD PACKAGES]
const mongoose = require("mongoose");
const logger   = require('./controller/utils/logger');

// [DB SETTING]
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/ethereumDB', { useUnifiedTopology: true });
const db = mongoose.connection;

db.once("open", function(){
  logger.info("DB connected");
});

db.on("error", function(err){
  logger.error("DB ERROR : ", err);
});
