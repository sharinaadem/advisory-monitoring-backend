import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service.js';
import { AdvisersService } from './advisers.service.js';

describe('AdvisersService', () => {
  let service: AdvisersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdvisersService,
        {
          provide: PrismaService,
          useValue: {
            adviser: {
              findMany: vi.fn(),
              findUnique: vi.fn(),
              create: vi.fn(),
              update: vi.fn(),
              delete: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AdvisersService>(AdvisersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
