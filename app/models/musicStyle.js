const CoreModel = require('./CoreModel');

class MusicStyle extends CoreModel {
  music_name;
 
  constructor(music_style) {
      super(music_style.id);
      this.music_name = music_style.music_name;
  }
};

module.exports = MusicStyle;