const CoreModel = require('./CoreModel');

class Region extends CoreModel {
  region_name;
  department_id;
  code;
 
  constructor(region) {
      super(region.id);
      this.region_name = region.region_name;
      this.code = region.code;
      this.department_id = region.department_id;
    
  }
};

module.exports = Region;