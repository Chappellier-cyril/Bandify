const CoreModel = require('./CoreModel');

class Invitation extends CoreModel {
  response;
  pending;
  request_user_id;
  response_user_id;
 
  constructor(invitation) {
      super(invitation.id);
      this.response = invitation.response;
      this.pending = invitation.pending;
      this.request_user_id = invitation.request_user_id;
      this.response_user_id = invitation.response_user_id;
  }
};

module.exports = Invitation;