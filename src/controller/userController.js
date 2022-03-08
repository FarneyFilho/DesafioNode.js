const User = require('../models/user')

module.exports = {
    async createUser(request, response) {

        try {
            const { name, email } = req.body

            const user = await User.findOne({ where: { email } })

            if (user) {

                response.status(200).json({ message: "Já existe usuario com este email" })
            } else {
                await User.create({ name, email })

                response.status(200).json({message: 'Usuario inserido com sucesso!', name, email })
            }

        } catch (error) {
            response.status(400).json({ error })
        }
    }
}