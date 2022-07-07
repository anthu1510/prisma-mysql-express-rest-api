const router = require("express").Router();
const hashPassword = require("password-hash");
const { generateAccessToken, generateRefreshToken } = require("../helpers/jwt");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const user = await prisma.user.findMany({
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
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
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
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
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
      id: user.id,
      roleId: user.role.id,
    };

    const result = {
      status: "success",
      token: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };

    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // const user = await prisma.role.create({
    //   data: {
    //     connect: {
    //       id: 1,
    //     },
    //     user: {
    //       create: {
    //         name,
    //         email,
    //         password,
    //       },
    //     },
    //   },
    // });
    const roleId = 2;
    const user = await prisma.user.create({
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
});

router.put("/", (req, res) => {
  res.send("put user");
});

router.delete("/", (req, res) => {
  res.send("delete user");
});

module.exports = router;
