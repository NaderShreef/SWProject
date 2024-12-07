import { Test, TestingModule } from '@nestjs/testing';
import { ModulesService } from '../modules.service';
import { NotFoundException } from '@nestjs/common';

describe('ModulesService', () => {
  let service: ModulesService;
  let mockModuleModel: any;

  beforeEach(async () => {
    mockModuleModel = {
      create: jest.fn(),
      findOne: jest.fn(),
      updateOne: jest.fn(),
      find: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModulesService,
        { provide: 'ModuleModel', useValue: mockModuleModel },
      ],
    }).compile();

    service = module.get<ModulesService>(ModulesService);
  });

  it('should create a module', async () => {
    const moduleData = { moduleId: '123', title: 'Test Module' };
    mockModuleModel.create.mockResolvedValue(moduleData);

    const result = await service.create(moduleData);
    expect(result).toEqual(moduleData);
    expect(mockModuleModel.create).toHaveBeenCalledWith(moduleData);
  });

  it('should throw NotFoundException if module is not found', async () => {
    mockModuleModel.findOne.mockResolvedValue(null);

    await expect(service.findById('invalidId')).rejects.toThrow(NotFoundException);
  });
});
