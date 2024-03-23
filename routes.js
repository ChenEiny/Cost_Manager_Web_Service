// Chen Einy:209533785
// Adir Mintz:316579549


/* requires*/
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const schemas = require('./schema');
const generateRandomId = require('./utils')
const User = schemas.User;
const Cost = schemas.Cost;



router.get('/', (req, res) => {
    res.send('Welcome to Cost Manager REStful Web Services');
});

/* add cost function to add new items into the collection*/
router.post('/addcost', async (req, res) => {
    const { user_id, year, month, day, description, category, sum } = req.body;
    try {
      const newCost = new Cost({
        user_id,
        year,
        month,
        day,
        id: generateRandomId(),
        description,
        category,
        sum,
      });

      /* find existing user*/
      const existingUser = await User.findOne({ id: user_id });
      if (!existingUser) {
          return res.status(404).json({ error: 'User not found' });
      }
      

      const validationError = newCost.validateSync();
      if (validationError) {
        const errorMessages = Object.values(validationError.errors).map(error => error.message);
        return res.status(400).json({ errors: errorMessages });
      }

      /* save new cost into the collection*/
      const savedCost = await newCost.save();
      res.status(201).json(savedCost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add the cost item' });
    }
  });
  

  /* request to get a specific items in the collection*/
router.get('/report', async (req, res) => {
    let { user_id, year, month } = req.query;
    
    user_id = parseInt(user_id)
    year = parseInt(year)
    month = parseInt(month)

    /* check for existence of user*/
    const existingUser = await User.findOne({ id: user_id });
      if (!existingUser) {
          return res.status(404).json({ error: 'User not found' });
      }

    try {
      const costs = await Cost.find({ user_id, year, month });
  
      const report = {
        food: [],
        health: [],
        housing: [],
        sport: [],
        education: [],
        transportation: [],
        other: []
      };
  
      costs.forEach(cost => {
        const { category } = cost;
        if (report.hasOwnProperty(category)) {
          report[category].push({
            day: cost.day,
            description: cost.description,
            sum: cost.sum
          });
        } else {
          report.other.push({
            day: cost.day,
            description: cost.description,
            sum: cost.sum
          });
        }
      });
  
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate the cost report' });
    }
  });
  
  

  /* data of developers*/
router.get('/about', (req, res) => {
    const developers = [
      { firstname: 'Chen', lastname: 'Einy', id: 209533785, email: 'Einy47@gmail.com ' },
      { firstname: 'Adir', lastname: 'Mintz', id: 316579549, email: 'Adirmintz@gmail.com' },
    ];
  
    res.json(developers);
  });

  module.exports = router;
