const { Router } = require('express')

const UserController = require('./controller/userController')
const router = Router()

router.post('/user-create', UserController.createUser)

module.exports = router