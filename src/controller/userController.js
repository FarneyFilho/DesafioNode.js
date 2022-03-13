const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  // Criação de usuario
  async createUser(request, response) {
    try {
      const { name, email, password } = request.body;

      const exists = await User.findOne({ where: { email } });

      if (exists) {
        return response
          .status(400)
          .json({ message: "Já existe usuario com este email" });
      }
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });
      response
        .status(200)
        .json({ message: "Usuario inserido com sucesso!", name, email });
    } catch (error) {
      response.status(500).json({ error });
    }
  },
};
