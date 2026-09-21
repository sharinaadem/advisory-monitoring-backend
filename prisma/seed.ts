import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured');
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  const prisma = new PrismaClient({ adapter });

  try {
    const programsData = [
      {
        code: 'BSIT',
        name: 'BS Information Technology',
      },
      {
        code: 'BSCS',
        name: 'BS Computer Science',
      },
      {
        code: 'BSIS',
        name: 'BS Information Systems',
      },
    ];

    console.log('Seeding programs...');

    for (const program of programsData) {
      await prisma.program.upsert({
        where: {
          code: program.code,
        },
        update: {},
        create: program,
      });
    }

    console.log('Seeding advisers...');

    const advisersData = [
      {
        id: 1,
        name: 'Prof. Ana Reyes',
        programId: 1,
      },
      {
        id: 2,
        name: 'Prof. Mark Villanueva',
        programId: 2,
      },
      {
        id: 3,
        name: 'Prof. Liza Cortes',
        programId: 3,
      },
    ];

    for (const adviser of advisersData) {
      await prisma.adviser.upsert({
        where: {
          id: adviser.id,
        },
        update: {
          name: adviser.name,
          programId: adviser.programId,
        },
        create: adviser,
      });
    }

    const programs = await prisma.program.findMany();

    console.log('Seeding students...');

    for (let index = 0; index < 20; index++) {
      const randomProgram =
        programs[Math.floor(Math.random() * programs.length)];

      await prisma.student.create({
        data: {
          studentId: `24-${faker.string.numeric(5)}`,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          programId: randomProgram.id,
        },
      });
    }

    console.log('Seeding completed successfully.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
