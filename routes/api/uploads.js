const upload = require('../../config/storage');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const express = require('express');
const router = express.Router();

//post avatar
router.post('/', auth, upload.single('img'), async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (user) {
      await user.update({
        avatar: { url: req.file.path, id: req.file.filename },
      });

      return res.json(user);
    }
    user.save();

    return res.json(req.file.path);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
