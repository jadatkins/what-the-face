import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create the message variable
  await prisma.variable.upsert({
    where: { key: "message" },
    update: { value: "PostgreSQL" },
    create: {
      key: "message",
      value: "PostgreSQL",
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });