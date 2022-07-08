const { PrismaClient } = require("@prisma/client");
const hashPassword = require("password-hash");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  newTokens,
} = require("../helpers/jwt");

const prisma = new PrismaClient();

exports.getUsersAll = async (req, res) => {
  try {
    const user = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        role: {
          select: {
            name: true,
            status: true,
          },
        },
      },
    });
    res.json(user);
  } catch (err) {
    res.send(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) return res.sendStatus(403);

    const isVerified = hashPassword.verify(password, user.password);

    if (!isVerified) return res.sendStatus(403);

    const payload = {
      user: {
        id: user.id,
        roleId: user.role.id,
      },
    };

    const token = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const result = {
      status: "success",
      token,
      refreshToken,
    };

    req.session.refreshToken = [refreshToken];

    res.json(result);
  } catch (err) {
    res.send(err);
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    const user = await prisma.users.create({
      data: {
        roleId,
        name,
        email,
        password: hashPassword.generate(password),
      },
    });

    res.json(user);
  } catch (err) {
    res.send(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    const user = await prisma.users.create({
      data: {
        roleId,
        name,
        email,
        password: hashPassword.generate(password),
      },
    });

    res.json(user);
  } catch (err) {
    res.send(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    const user = await prisma.users.create({
      data: {
        roleId,
        name,
        email,
        password: hashPassword.generate(password),
      },
    });

    res.json(user);
  } catch (err) {
    res.send(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        roleId: true,
        name: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(user);
  } catch (err) {
    res.send(err);
  }
};

exports.getNewTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    //return res.send(req.session.refreshToken[0]);
    if (!req.session.refreshToken.includes(refreshToken))
      return res.sendStatus(403);
    const verified = newTokens(token);
    res.send(verified);
  } catch (err) {
    res.send(err);
  }
};

exports.logOut = async (req, res) => {
  try {
    req.session.destroy();
    const result = {
      status: "success",
    };
    res.json(result);
  } catch (err) {
    res.send(err);
  }
};
