const { Router } = require('express')
const User = require('./models/user')

const router = Router()

router.post('/', async(req, res) => {

    const {name, email} = req.body

    const user = await User.create({name, email})

    res.json({user})
})

module.exports = router