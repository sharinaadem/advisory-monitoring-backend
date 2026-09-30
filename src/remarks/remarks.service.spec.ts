import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RemarksService } from './remarks.service.js';

describe('RemarksService', () => {
  let service: RemarksService;
  const prisma = {
    remark: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    student: {
      findUnique: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemarksService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get<RemarksService>(RemarksService);
  });

  it('lists student remarks oldest first', async () => {
    prisma.remark.findMany.mockResolvedValue([]);

    await service.findByStudent(7);

    expect(prisma.remark.findMany).toHaveBeenCalledWith({
      where: { studentId: 7 },
      orderBy: { createdAt: 'asc' },
    });
  });

  it('rejects creation for a missing student', async () => {
    prisma.student.findUnique.mockResolvedValue(null);

    await expect(
      service.create({ studentId: 7, content: 'Needs follow-up' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('updates an existing remark', async () => {
    prisma.remark.findUnique.mockResolvedValue({ id: 3 });
    prisma.remark.update.mockResolvedValue({ id: 3 });

    await service.update(3, { content: 'Updated' });

    expect(prisma.remark.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { content: 'Updated' },
    });
  });
});
