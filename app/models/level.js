const CoreModel = require('./CoreModel');

class Level extends CoreModel {
  level_name;
 
  constructor(level) {
      super(level.id);
      this.level_name = level.level_name;
  }
};

module.exports = Level;