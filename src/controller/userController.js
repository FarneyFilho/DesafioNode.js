const { request } = require('express')
const req = require('express/lib/request')
const { update } = require('../models/user')
const User = require('../models/user')

module.exports = {
    //Criação de usuario
    async createUser(request, response) {

        try {
            const { name, email } = request.body

            const user = await User.findOne({ where: { email } })

            if (user) {
                response.status(401).json({ message: "Já existe usuario com este email" })
            } else {
                const user = await User.create({ name, email })
                response.status(200).json({ message: 'Usuario inserido com sucesso!', name, email })
            }
        } catch (error) {
            response.status(400).json({ error })
        }
    },
    //Atualização de usuário
    async updateUser(request, response) {

        try {
            const { id } = request.params
            const { name, email } = request.body
            const user = await User.findOne({ where: { id } })

            if (!user) {
                response.status(401).json({ message: "Nenhum usuario encontrado" })
            } else {
                const user = await User.update({ name, email }, { where: { id } })
                response.status(200).json({ user })
            }

        } catch (error) {
            response.status(400).json({ error })
        }
    },
    //Lista de usuários cadastrados
    async listUsers(request, response) {

        try {
            const users = await User.findAll()

            if (!users) {
                request.status(401).json({ message: 'Não existe usuario cadastrado' })
            }
            response.status(200).json({ users })
        } catch (error) {
            response.status(400).json({ error })

        }

    },
    //Delete de usuário
    async deleteUser(request, response) {
        const { id } = request.params

        const user = await User.findOne({ where: { id } })

        if (!user) {
            response.status(401).json({ message: 'Usuário não encontrado' })
        } else {
            await User.destroy({ where: { id } })
            response.status(200).json({ ok: true })
        }
    }
}
