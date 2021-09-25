const router = require('express').Router();
const { User, Post } = require('../../models');

// Display all users
router.get('/', async(req, res) =>{
    try{
        const users = await User.findAll({ include: [{ model: Post }] });
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
});

// Display single user by id
router.get('/:id', async(req, res) =>{
    try{
        // ensure id exists
        const exists = await User.findByPk(req.params.id);
        if(!exists){
            res.status(400).json(`User at id ${req.params.id} does not exist`);
        }

        const user = await User.findByPk(
            req.params.id,
            {include: [{ model: Post }]}
        );
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})

// Create a new user
router.post('/', async(req, res) =>{
    try{
        const newUser = req.body;
        await User.create(newUser);

        res.status(200).json('Successfully created!');
    }catch(err){
        res.status(500).json(err);
    }
})

// Login
router.post('/login', async(req, res) =>{
    try{
        const user = await User.findOne({
            where: {username: req.body.username}
        })
        if(!user){
            res.status(400).json({msg:'Username does not exist'})
            return;
        }
        const passwordValid = user.checkPassword(req.body.password);
        if(!passwordValid){
            res.status(400).json({msg:'Password is incorrect'});
            return;
        }

        req.session.save(()=>{
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
            res.json(user);
        })

    }catch(err){
        res.status(500).json({msg:'login failed'}, err);
    }
})

router.post('/logout', (req, res) => {
    try{
        if (req.session.loggedIn) {
          // Remove the session variables
          req.session.destroy(() => {
            res.status(200).end();
          });
        } else {
          res.status(500).end();
        }
    }catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;