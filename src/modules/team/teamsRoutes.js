const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');
const requireTeamRole = require('../../middleware/roleMiddleware');
const teamController = require('./teamController');


router.post('/', auth, teamController.createTeam);

router.post('/:teamId/invite', auth, requireTeamRole(['admin']), teamController.inviteMember);

router.get('/:teamId/members', auth, requireTeamRole(['admin', 'member']), teamController.getMembers);

module.exports = router;