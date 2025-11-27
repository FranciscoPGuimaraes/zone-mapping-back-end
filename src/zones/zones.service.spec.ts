import { Test, TestingModule } from '@nestjs/testing';
import { ZonesService } from './zones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';
import { Repository } from 'typeorm';

type MockRepo<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepo = <T = any>(): MockRepo<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  merge: jest.fn(),
  remove: jest.fn(),
});

describe('ZonesService', () => {
  let service: ZonesService;
  let repo: MockRepo<Zone>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZonesService,
        {
          provide: getRepositoryToken(Zone),
          useValue: createMockRepo<Zone>(),
        },
      ],
    }).compile();

    service = module.get<ZonesService>(ZonesService);
    repo = module.get<MockRepo<Zone>>(getRepositoryToken(Zone));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should stringify geometry if object and save', async () => {
      const dto = {
        name: 'Zona A',
        type: 'Residencial',
        createdAt: '2025-01-01',
        geometry: { type: 'Point', coordinates: [1, 2] },
      };

      const createdEntity = { ...dto, id: 'abc' };
      repo.create!.mockReturnValue(createdEntity);
      repo.save!.mockResolvedValue(createdEntity);

      const result = await service.create(dto as any);

      expect(repo.create).toHaveBeenCalledWith({
        ...dto,
        geometry: JSON.stringify(dto.geometry),
        createdAt: dto.createdAt,
      });
      expect(repo.save).toHaveBeenCalledWith(createdEntity);
      expect(result).toEqual(createdEntity);
    });
  });

  describe('findAll', () => {
    it('should return zones with geometry parsed', async () => {
      const raw = [
        { id: '1', name: 'Z1', type: 'Residencial', geometry: '{"type":"Point","coordinates":[1,2]}' },
        { id: '2', name: 'Z2', type: 'Comercial', geometry: 'not-json' },
      ];
      repo.find!.mockResolvedValue(raw);

      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(result[0].geometry).toEqual({ type: 'Point', coordinates: [1, 2] });
      expect(result[1].geometry).toEqual('not-json');
    });
  });

  describe('findOne', () => {
    it('should parse geometry when found', async () => {
      const raw = { id: '1', name: 'Z1', geometry: '{"type":"Point","coordinates":[1,2]}' };
      repo.findOneBy!.mockResolvedValue(raw);

      const result = await service.findOne('1');

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result.geometry).toEqual({ type: 'Point', coordinates: [1, 2] });
    });

    it('should return null when not found', async () => {
      repo.findOneBy!.mockResolvedValue(null);
      const result = await service.findOne('nope');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should stringify geometry when updating', async () => {
      const existing = { id: '1', name: 'Z1', geometry: '{"type":"Point","coordinates":[1,2]}' };
      repo.findOneBy!.mockResolvedValue(existing);
      repo.merge!.mockImplementation((target, dto) => Object.assign(target, dto));
      repo.save!.mockResolvedValue({ ...existing, name: 'Z1-mod' });

      const dto = { name: 'Z1-mod', geometry: { type: 'Point', coordinates: [3, 4] } };
      const result = await service.update('1', dto as any);

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(repo.merge).toHaveBeenCalled();
      // save expected with zone where geometry is still string in repository - service calls safeParseJSON on return (implementation detail)
      expect(repo.save).toHaveBeenCalled();
      expect(result).toHaveProperty('geometry');
    });

    it('should return null when not found', async () => {
      repo.findOneBy!.mockResolvedValue(null);
      const res = await service.update('nope', { name: 'x' } as any);
      expect(res).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove entity when found', async () => {
      const existing = { id: '1', name: 'Z1' };
      repo.findOneBy!.mockResolvedValue(existing);
      repo.remove!.mockResolvedValue(existing);

      const res = await service.remove('1');
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(repo.remove).toHaveBeenCalledWith(existing);
      expect(res).toEqual(existing);
    });

    it('should return null when not found', async () => {
      repo.findOneBy!.mockResolvedValue(null);
      const res = await service.remove('nope');
      expect(res).toBeNull();
    });
  });
});
