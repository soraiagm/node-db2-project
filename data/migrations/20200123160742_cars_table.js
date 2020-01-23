
exports.up = function(knex) {
    
    return knex.schema.createTable('cars', table => {
      
        table.increments();
        
        table.integer('VIN');

        table.string('make', 255).index();

        table.string('model').index();

        table.integer('mileage');

        table.timestamps(true, true); // adds created_at and updated_at columns
    });
};

// undo the changes from the up function (rollback)
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
