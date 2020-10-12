const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');
const upload = require('../../config/storage');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar', 'email']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findById(req.user.id).select('-password');
    const {
      alias,
      company,
      location,
      website,
      bio,
      skills,
      status,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      alias: user.email.split('@')[0],
      company,
      location,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      status,
    };

    // Build social object and add to profileFields
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value && value.length > 0)
        socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate('user', ['name', 'avatar']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    GET api/profile/:alias
// @desc     Get profile by alias
// @access   Public
router.get('/:alias', async ({ params: { alias } }, res) => {
  try {
    const profile = await Profile.findOne({
      alias: alias,
    }).populate('user', ['name', 'avatar', 'email']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});
// @route    GET api/profile/:alias/liked
// @desc     Get liked posts by alias
// @access   Public
router.get('/:alias/liked', async ({ params: { alias } }, res) => {
  try {
    const profile = await Profile.findOne({
      alias: alias,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    const post_liked = await Post.find({ _id: profile.liked }).populate(
      'user',
      ['name', 'avatar', 'email']
    );

    return res.json(post_liked);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});
// @route    GET api/profile/:alias/following
// @desc     Get profiles followed by alias
// @access   Public
router.get('/:alias/following', async ({ params: { alias } }, res) => {
  try {
    const profile = await Profile.findOne({
      alias: alias,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    const profile_following = await Profile.find({
      user: profile.following,
    }).populate('user', ['name', 'avatar', 'email']);

    return res.json(profile_following);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});
// @route    GET api/profile/:alias/following
// @desc     Get profiles followed by alias
// @access   Public
router.get('/:alias/followers', async ({ params: { alias } }, res) => {
  try {
    const profile = await Profile.findOne({
      alias: alias,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    const profile_followers = await Profile.find({
      user: profile.followers,
    }).populate('user', ['name', 'avatar', 'email']);

    return res.json(profile_followers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/follow/userid
// @desc     Follow user profile
// @access   Private
router.put('/follow/:id', auth, async (req, res) => {
  try {
    const profile_follower = await Profile.findOne({ user: req.params.id });
    const profile_following = await Profile.findOne({ user: req.user.id });

    if (req.params.id === req.user.id) {
      return res.status(400).json({ msg: 'Cannot follow yourself' });
    }

    if (
      profile_follower.followers.filter(
        (follower) => follower._id.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'User already followed' });
    }

    profile_follower.followers.unshift(req.user.id);
    profile_following.following.unshift(req.params.id);

    await profile_follower.save();
    await profile_following.save();
    return res.json(profile_follower.followers);
  } catch (err) {
    console.error.apply(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/unfollow/userid
// @desc     unfollow user profile
// @access   Private

router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    const profile_follower = await Profile.findOne({ user: req.params.id });
    const profile_following = await Profile.findOne({ user: req.user.id });

    if (
      profile_follower.followers.filter(
        (follower) => follower._id.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: 'User not yet followed' });
    }

    const removeIndex = profile_follower.followers
      .map((follower) => follower._id.toString())
      .indexOf(req.user.id);

    profile_follower.followers.splice(removeIndex, 1);

    const removeIndex_ = profile_following.following
      .map((following) => following._id.toString())
      .indexOf(req.params.id);

    profile_following.followers.splice(removeIndex_, 1);

    await profile_follower.save();
    await profile_following.save();
    return res.json(profile_follower.followers);
  } catch (err) {
    console.error.apply(err.message);
    res.status(500).send('Server Error');
  }
});

//post avatar
router.post('/image', auth, upload.single('img'), async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');

    if (user) {
      await user.update({
        avatar: { url: req.file.path, id: req.file.filename },
      });
      user.save();
    }
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar', 'email']);

    if (profile === null) {
      const profileFields = {
        user: req.user.id,
        alias: user.email.split('@')[0],
        company: '',
        location: '',
        website:
          website && website !== ''
            ? normalize(website, { forceHttps: true })
            : '',
        bio: '',
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map((skill) => ' ' + skill.trim()),
        status: '',
      };

      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      profile.save();
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
