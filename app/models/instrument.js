const CoreModel = require('./CoreModel');

class Instrument extends CoreModel {
  instrument_name;
 
  constructor(instrument) {
      super(instrument.id);
      this.instrument_name = instrument.instrument_name;
  }
};

module.exports = Instrument;