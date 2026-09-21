import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { AdvisersController } from './advisers.controller.js';
import { AdvisersService } from './advisers.service.js';

describe('AdvisersController', () => {
  let controller: AdvisersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvisersController],
      providers: [
        {
          provide: AdvisersService,
          useValue: {
            findAll: vi.fn(),
            findOne: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AdvisersController>(AdvisersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
