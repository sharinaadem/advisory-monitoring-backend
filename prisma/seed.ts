import 'dotenv/config';
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

    console.log('Seeding subjects...');

    const programs = await prisma.program.findMany({
      where: {
        code: {
          in: programsData.map((program) => program.code),
        },
      },
    });
    const programIds = new Map(
      programs.map((program) => [program.code, program.id]),
    );

    const subjectsData = [
      {
        code: 'IT101',
        title: 'Intro to Computing',
        units: 3,
        status: 'MAJOR',
        yearlevel: 1,
        sem: 1,
        programId: programIds.get('BSIT')!,
      },
      {
        code: 'IT102',
        title: 'Computer Programming 1',
        units: 3,
        status: 'MINOR',
        yearlevel: 1,
        sem: 2,
        programId: programIds.get('BSIT')!,
      },
      {
        code: 'IT201',
        title: 'Data Structures',
        units: 3,
        status: 'PROFEL',
        yearlevel: 2,
        sem: 1,
        programId: programIds.get('BSCS')!,
      },
      {
        code: 'CS101',
        title: 'Discrete Mathematics',
        units: 3,
        status: 'GENEL',
        yearlevel: 1,
        sem: 2,
        programId: programIds.get('BSCS')!,
      },
    ];

    for (const subject of subjectsData) {
      await prisma.subject.upsert({
        where: {
          code: subject.code,
        },
        update: subject,
        create: subject,
      });
    }

    console.log('Seeding advisers...');

    const advisersData = [
      {
        id: 1,
        name: 'Prof. Ana Reyes',
        programId: programIds.get('BSIT')!,
      },
      {
        id: 2,
        name: 'Prof. Mark Villanueva',
        programId: programIds.get('BSCS')!,
      },
      {
        id: 3,
        name: 'Prof. Liza Cortes',
        programId: programIds.get('BSIS')!,
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

    console.log('Seeding students...');

    for (let index = 0; index < 20; index++) {
      const program = programs[index % programs.length];
      const studentId = `24-${String(index + 1).padStart(5, '0')}`;

      await prisma.student.upsert({
        where: { studentId },
        update: {
          programId: program.id,
        },
        create: {
          studentId,
          firstName: `Student${index + 1}`,
          lastName: 'Advisory',
          email: `student${index + 1}@example.edu`,
          programId: program.id,
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
