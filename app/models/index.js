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
Member.hasMany(Message, {
    foreignKey: 'receiver_id',
    otherKey: 'sender_id',
    as: 'messages'
});
// 1,1
Message.belongsTo(Member, {
    foreignKey: 'sender_id',
    otherKey: 'receiver_id',
    as: 'member'
});
// 1,N
Member.hasMany(Invitation, {
    foreignKey: 'user_id',
    as: 'invitations'
});
// 1,1
Invitation.belongsTo(Member, {
    foreignKey: 'user_id',
    as: 'member'
});
// 1,1
Member.belongsTo(City, {
    foreignKey: 'city_id',
    as: 'member'
});
// 1,1
City.belongsTo(Department, {
    foreignKey: 'department_id',
    as: 'department'
});
// 1,1
Department.belongsTo(Region, {
    foreignKey: 'region_id',
    as: 'region'
});

// N,N
Member.belongsToMany(Instrument, {
    through: 'user_has_instrument_level',
    as: 'instruments',
    otherKey: 'member_id',
    foreignKey: 'instrument_id',
});

// N,N
Member.belongsToMany(Level, {
    through: 'user_has_instrument_level',
    as: 'levels',
    otherKey: 'member_id',
    foreignKey: 'user_id',
});

// N,N
Instrument.belongsToMany(Member, {
    through: 'user_has_instrument_level',
    as: 'members',
    otherKey: 'instrument_id',
    foreignKey: 'member_id',
});

// N,N
Instrument.belongsToMany(Level, {
    through: 'user_has_instrument_level',
    as: 'levels',
    otherKey: 'level_id',
    foreignKey: 'instrument_id',
});

// N,N
Level.belongsToMany(Instrument, {
    through: 'user_has_instrument_level',
    as: 'instruments',
    otherKey: 'instrument_id',
    foreignKey: 'level_id',
});

// N,N
Level.belongsToMany(Member, {
    through: 'user_has_instrument_level',
    as: 'members',
    otherKey: 'level_id',
    foreignKey: 'member_id',
});

//N,N
MusicStyle.belongsToMany(Member, {
    through : 'appreciate_music_style',
    as: 'musics',
    otherKey: 'member_id',
    foreignKey: 'music_style_id',
});

//N,N
Member.belongsToMany(MusicStyle, {
    through : 'appreciate_music_style',
    as: 'musicstyle',
    otherKey: 'music_style_id',
    foreignKey: 'member_id',
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
