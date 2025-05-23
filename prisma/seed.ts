import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const mentorNames = [
  "Anna", "Bence", "Csilla", "Dániel", "Emese", "Ferenc", "Gábor", "Hajnalka",
  "István", "Júlia", "Krisztián", "Lilla", "Márk", "Nóra", "Olivér", "Petra",
  "Róbert", "Szilvia", "Tamás", "Zsófia"
]

async function main() {
  const adminPassword = await bcrypt.hash("Admin123", 10)

  await prisma.user.upsert({
    where: { email: 'admin@dogschool.hu' },
    update: {},
    create: {
      email: "admin@dogschool.hu",
      password: adminPassword,
      name: "Admin",
      role: "ADMIN",
      status: "ACTIVE"
    }
  })

  for (const name of mentorNames) {
    const email = `${name.toLowerCase()}@dogschool.hu`
    const mentorPassword = await bcrypt.hash(`${name}123`, 10)

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: mentorPassword,
        name,
        role: "MENTOR",
        status: "ACTIVE"
      }
    })
  }
}

main()
  .then(() => {
    console.log("Seed completed")
  })
  .catch((e) => {
    console.error("Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });