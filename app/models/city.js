const CoreModel = require('./CoreModel');

class City extends CoreModel {
  city_name;
  zipcode;
  region_id;
 
  constructor(city) {
      super(city.id);
      this.city_name = city.city_name;
      this.zipcode = city.zipcode;
      this.region_id = city.region_id;
  }
};

module.exports = City;