const express = require('express');
const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/car-dealer.db3'
  },
  useNullAsDefault: true
});

const router = express.Router();

router.post('/', (req, res) => {
    const carData = req.body;
    console.log('carData', carData)

    db('cars')
        .insert(carData, "id")
        .then(ids => {
            const id = ids[0];

        return db("cars")
                .select('id', 'VIN', 'make', 'model', 'mileage')
                .where({ id })
                .first()
                .then(car => {
                    res.status(201).json(car);
                })  
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'Error adding the car'})
        })
    });

router.get('/', (req, res) => {
  db('cars')
    .select('*')
    .from('cars')
    .then(cars => {
        res.json(cars); 
  })
    .catch (error => {
        res.status(500).json({ message: 'Failed to retrieve cars' });
  });
});

router.get('/:id', (req, res) => {
  db
        .select('*')
        .from('cars')
        .where({ id: req.params.id })
        .first() 
        .then(car => {
            res.status(200).json(car);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'Error getting the car'})
        })
});


module.exports = router;