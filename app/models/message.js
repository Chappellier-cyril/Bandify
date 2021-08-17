const CoreModel = require('./CoreModel');

class Message extends CoreModel {
  content;
  status;
  sender_id;
  reicever_id;
 
  constructor(message) {
      super(message.id);
      this.content = message.content;
      this.status = message.status;
      this.sender_id = message.sender_id;
      this.reicever_id = message.reicever_id;
  }
};


module.exports = Message;