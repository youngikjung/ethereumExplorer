"use strict";

const express   = require('express')
const router    = express.Router();
const fetch     = require("node-fetch");
const util      = require('../utils/util');
const logger    = require('../utils/logger');

router.get('/viewBlockNumber', (req, res) => {
  logger.info('viewBlockNumber');
  res.render('ethereum/getBlockDB');
});

router.get('/viewTxNumber', (req, res) => {
  logger.info('viewTxNumber');
  res.render('ethereum/getTxDB');
});

router.get('/backGetBlock', (req, res) => {
  logger.info('backGetBlock');
  res.redirect('ethereum/getBlock');
});

router.get('/goAccount', (req, res) => {
  logger.info('goAccount');
  res.render('ethereum/account');
});

router.get('/transactions/:transactionsHash', (req, res) => {
    var transactionsHash = req.params.transactionsHash;
    fetch('http://10.10.30.165:3000/getBlock/' + transactionsHash)
    .then(util.checkStatus)
    .then(res => res.json())
    .then(json => {
      logger.info(transactionsHash + '의 검색');
      res.render('ethereum/transactions', {block:json.transactions})
    }).catch(err => logger.error(err));
});

router.get('/transactionInfo/:transactionHash', (req, res) => {
    var transactionHash  = req.params.transactionHash;
    fetch('http://10.10.30.165:3000/getTransaction/' + transactionHash)
    .then(util.checkStatus)
    .then(res => res.json())
    .then(json => {
      logger.info(transactionHash + '의 검색');
      res.render('ethereum/info', {block:json})
    }).catch(err => logger.error(err));
});

router.post('/searchBlockNumber', (req, res, next) => {
    var select = req.body.lstSubject;
    var blockNumber = req.body.search;

    if(select === 'address') {
        fetch('http://10.10.30.165:3000/getBalance/' + blockNumber)
        .then(util.checkStatus)
        .then(res => res.json())
        .then(json => {
          logger.info(select + '에서' + blockNumber + '의 검색');
          res.render('ethereum/getBalance', {block:json})
        }).catch(err => logger.error(err));
    }
    if(select === 'block') {
        fetch('http://10.10.30.165:3000/getBlock/' + blockNumber)
        .then(util.checkStatus)
        .then(res => res.json())
        .then(json => {
          logger.info(select + '에서' + blockNumber + '의 검색');
          res.render('ethereum/getBlock', {block:json})
        }).catch(err => logger.error(err));
    }
});

router.post('/getAccount', util.isLogin, (req, res) => {
    var passwd = req.body.passwd;
    fetch('http://10.10.30.165:3000/newAccount/' + passwd)
    .then(util.checkStatus)
    .then(res => res.json())
    .then(json => {
      logger.info(json + '을 불러옵니다');
      res.json(json);
    }).catch(err => logger.error(err));
});

router.get('/getBlockDB', (req, res) => {
  fetch('http://10.10.30.165:3000/getBlockDB')
  .then(util.checkStatus)
  .then(res => res.json())
  .then(json => {
    logger.info(json + '을 불러옵니다');
    res.json(json);
  }).catch(err => logger.error(err));
});

router.get('/getTxDB', (req, res) => {
  fetch('http://10.10.30.165:3000/getTxDB')
  .then(util.checkStatus)
  .then(res => res.json())
  .then(json => {
    logger.info(json + '을 불러옵니다');
    res.json(json);
  }).catch(err => logger.error(err));
});

router.get('/getBlockDBInfo', (req, res) => {
  fetch('http://10.10.30.165:3000/getDBblocksInfo')
  .then(util.checkStatus)
  .then(res => res.json())
  .then(json => {
    logger.info(json + '을 불러옵니다');
    res.json(json);
  }).catch(err => logger.error(err));
});

router.get('/getTxDBInfo', (req, res) => {
  fetch('http://10.10.30.165:3000/getDBtxsInfo')
  .then(util.checkStatus)
  .then(res => res.json())
  .then(json => {
    logger.info(json + '을 불러옵니다');
    res.json(json);
  }).catch(err => logger.error(err));
});

module.exports = router;
