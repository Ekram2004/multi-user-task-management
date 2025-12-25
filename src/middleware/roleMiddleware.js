const teamMember = require('../modules/team/teamMemberModel');
const ApiError = require('../utils/ApiError');


const requiredRole = (roles = []) => {
    return async (req, res, next) => {
        const teamId = req.params;
        const userId = req.user.userId;
        
        const memberShip = await teamMember.findOne(teamId, userId);
        if (!memberShip) {
            return next(new ApiError(403, ' not a team member'));;
        }
        if (!roles.includes(memberShip.role)) {
            return next(new ApiError(403, "Insufficient permissions"));
        }
        next();
    };
        
};

module.exports = requiredRole;
