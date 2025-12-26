const Team = require('./teamModel');
const TeamMember = require('./teamMemberModel')
const User = require('../users/userModel');



exports.createTeam = async (req, res, next) => {
    console.log("CREATE TEAM HIT");
    const { name } = req.body;
     
    const team = await Team.create({ name, owner:req.user.userId });
    await TeamMember.create({
        userId: req.user.userId,
        teamId: team._id,
        role: 'owner',
    });
     res.status(201).json(team);

}

exports.inviteMember = async (req, res, next) => {
    const { email } = req.body;
    const { teamId } = req.params;

    const user = await User.findOne({ email });
    if (!user) return next(new Error(404, 'user not found'));
    const exists = await TeamMember.findOne({ userId: user._id, teamId });
    if (exists) return next(new Error(400, 'User already in team'));

    const member = await TeamMember.create({
        userId: user._id,
        teamId,
        role: 'member'
    });
    res.status(201).json(member);
};


exports.getMembers = async (req, res) => {
    const { teamId } = req.params;

    const members = await TeamMember.find({ teamId }).populate('userId', 'name email').select('role userId');
    res.json(members);
};
