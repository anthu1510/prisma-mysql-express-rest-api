const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const roleData = [
  {
    name: "Admin",
  },
  {
    name: "Customer",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const role of roleData) {
    const roles = await prisma.roles.create({
      data: role,
    });
    console.log(`Created roles with id: ${roles.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
