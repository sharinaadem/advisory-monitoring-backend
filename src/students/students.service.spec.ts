import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { StudentsService } from './students.service.js';

describe('StudentsService', () => {
  let service: StudentsService;
  const prisma = {
    student: {
      findUnique: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('includes remarks ordered by creation date in student details', async () => {
    const findUnique = vi.fn().mockResolvedValue({ id: 4, remarks: [] });
    prisma.student.findUnique = findUnique;

    await service.findOne(4);

    expect(findUnique).toHaveBeenCalledWith({
      where: { id: 4 },
      include: {
        program: true,
        remarks: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  });
});
