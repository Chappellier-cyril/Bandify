const Member = require('./member');
const Department = require('./department');
const Region = require('./region');
const City = require('./city');
const MusicStyle = require('./musicStyle');
const Instrument = require('./instrument');
const Level = require('./level');
const Message = require('./message');
const Invitation = require('./invitation');

// 1,N
// A checker plus tard invitation / messages
Member.hasMany(Message, {
    foreignKey: 'receiver_id',
    otherKey: 'sender_id',
    as: 'messages'
});

// 1,N
Member.hasMany(Invitation, {
    foreignKey: 'user_id',
    as: 'invitations'
});

// 1,1
Message.belongsTo(Member, {
    foreignKey: 'sender_id',
    otherKey: 'receiver_id',
    as: 'member_message'
});

// 1,1
Invitation.belongsTo(Member, {
    foreignKey: 'user_id',
    as: 'member_invitation'
});
// 1,1
Member.belongsTo(City, {
    foreignKey: 'member_id',
    as: 'member_city'
});
// 1,1
City.belongsTo(Department, {
    foreignKey: 'city_id',
    as: 'department'
});
// 1,1
Department.belongsTo(Region, {
    foreignKey: 'department_id',
    as: 'region'
});

// N,N
Member.belongsToMany(Instrument, {
    through: 'user_has_instrument_level',
    foreignKey: 'member_id',
    otherKey: 'instrument_id',
    as: 'instruments',
});

// N,N
Instrument.belongsToMany(Member, {
    through: 'user_has_instrument_level',
    otherKey: 'member_id',
    foreignKey: 'instrument_id',
    as: 'instruments_member',
});

// N,N
Member.belongsToMany(Level, {
    through: 'user_has_instrument_level',
    otherKey: 'level_id',
    foreignKey: 'member_id',
    as: 'member_level',
});

// N,N
Level.belongsToMany(Member, {
    through: 'user_has_instrument_level',
    otherKey: 'member_id',
    foreignKey: 'level_id',
    as: 'level_member',
});

// N,N
Level.belongsToMany(Instrument, {
    through: 'user_has_instrument_level',
    otherKey: 'instrument_id',
    foreignKey: 'level_id',
    as: 'level_instrument',
});

// N,N
Instrument.belongsToMany(Level, {
    through: 'user_has_instrument_level',
    otherKey: 'level_id',
    foreignKey: 'instrument_id',
    as: 'instrument_level',
});



//N,N
MusicStyle.belongsToMany(Member, {
    through : 'appreciate_music_style',
    otherKey: 'member_id',
    foreignKey: 'music_style_id',
    as: 'music_style_member',
});

//N,N
Member.belongsToMany(MusicStyle, {
    through : 'appreciate_music_style',
    otherKey: 'music_style_id',
    foreignKey: 'member_id',
    as: 'member_music_style',
});

module.exports = { 
    Member,
    Department, 
    Region, 
    City, 
    MusicStyle, 
    Instrument, 
    Level, 
    Message, 
    Invitation
};
