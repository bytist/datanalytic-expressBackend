const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const FirstCollection = require('../../models/FirstCollection');

// @route    POST api/courses/add
// @desc     Create a post
// @access   Private
router.post('/', async (req, res) => {
	try {
		const { clientId, courseName } = req.body;

		if (
			!clientId ||
			!courseName ||
			!clientId.length ||
			!courseName.length ||
			typeof clientId !== 'string' ||
			typeof courseName !== 'string'
		)
			return res.status(403).send('You have sent invalid data');

		const newCourse = new FirstCollection(req.body);

		await newCourse.save();

		res.send('ok');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/courses/get
// @desc     Get courses by clientId / courseName
// @access   Private
router.post('/get', auth, async (req, res) => {
	try {
		const filterData = req.body;

		let queryOption = {};

		for (const key in filterData) {
			if (filterData[key]) {
				if (typeof filterData[key] === 'string') {
					if (key === 'clientId') queryOption.clientId = filterData.clientId;
					else {
						const queryString = filterData[key];
						queryOption[key] = { $regex: queryString, $options: 'i' };
					}
				} else {
					queryOption[key] = filterData[key];
				}
			}
		}

		const courses = await FirstCollection.find(queryOption);

		if (!courses.length)
			return res.status(404).send('There`s no matching data');

		res.json({ message: 'Success', courses });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/courses/health
// @desc     Check API health
// @access   Public
router.get('/health', async (req, res) => {
	try {
		res.send('good');
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

module.exports = router;
