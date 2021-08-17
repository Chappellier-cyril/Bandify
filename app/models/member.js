const CoreModel = require('./CoreModel');

class Member extends CoreModel {
    lastname;
    firstname;
    birthdate;
    email;
    user_password;
    user_description;
    profil_image;
   

    constructor(member) {
        super(member.id);
        this.lastname = member.lastname;
        this.firstname = member.firstname;
        this.birthdate = member.birthdate;
        this.email = member.email;
        this.user_password = member.user_password;
        this.user_description = member.user_description;
        this.profil_image = member.profil_image;
    }
}

// const user1 = new User({
//     id: 1,
//     lastName: 'Constructor',
//     firstName: 'Jean-Michel',
//     email: 'jeanmichel_constructor@gmail.com',
//     password: 'zhbgvzhkbvhkzbh'
// });

module.exports = Member;
// module.exports = user1;