const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.addRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await prisma.roles.create({
      data: {
        name,
      },
    });
    res.send(role);
  } catch (err) {
    res.send(err);
  }
};
