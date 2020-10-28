const {
  Customer,
  Owner,
  EContact,
  Bar,
  Message,
  Image,
  Menu,
  Party,
  Relationship,
  Thread,
  Parties_Customers,
  Customers_Bars,
} = require('../../server/db/models/dbindex.js');
const { Router } = require('express');
const { Op } = require('sequelize');
const eContactRouter = Router();

eContactRouter.get('/', (req, res) => {
  EContact.findAll()
  .then((eContacts) => {
    res.send(eContacts);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

  // 
module.exports = {
  eContactRouter,
};