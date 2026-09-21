import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { StudentsController } from './students.controller.js';
import { StudentsService } from './students.service.js';

describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            findAll: vi.fn(),
            findOne: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
