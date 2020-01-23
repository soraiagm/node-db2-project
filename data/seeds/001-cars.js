
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, VIN: '123456789', make: 'Jeep', model: 'Sahara', mileage: '1000'},
        {id: 2, VIN: '223456789', make: 'Chevrolet', model: 'Blazer', mileage: '2000'},
        {id: 3, VIN: '323456789', make: 'Porsche', model: 'Carrera', mileage: '3000'}
      ]);
    });
};
