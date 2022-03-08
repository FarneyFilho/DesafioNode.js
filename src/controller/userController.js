const User = require('../models/user')

module.exports = {
    async createUser(req, res) {

        try {
            const { name, email } = req.body

            const user = await User.findOne({ where: { email } })

            if (user) {

                res.status(200).json({ message: "Já existe usuario com este email" })
            } else {
                await User.create({ name, email })

                res.status(200).json({ user })
            }

        } catch (error) {
            res.status(400).json({ error })
        }
    }
}