import { Test, TestingModule } from '@nestjs/testing';
import IKanbanRepository from '../../repositories/kanban/kanban.repository.contract';
import { KanbanService } from '../children.service';
import { createMock } from '@golevelup/ts-jest';
import { CreateKanbanDTO } from '../../dtos/kanban/createKanban.dto';
import { EKanbanType } from '../../utils/ETypes';
import { Kanban } from '../../entities/children.entity';
import { UpdateKanbanDTO } from '../../dtos/kanban/updateKanban.dto';

const props: CreateKanbanDTO = {
  process: "E041",
  product: "AZ9000-000074H",
  sequenceQr: 1358698,
  type: EKanbanType.TYPE_ACG
};

const updateProps: UpdateKanbanDTO = {
  process: "E030",
  type: EKanbanType.TYPE_2W,
  sequenceQr: 1363831
};

const createdKanban = new Kanban(props);

const KanbanRepositoryMock = createMock<IKanbanRepository>();

describe('KanbanService', () => {
  let service: KanbanService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KanbanService,
        {
          useValue: KanbanRepositoryMock,
          provide: 'IKanbanRepository'
        },
      ],
    }).compile()

    service = module.get<KanbanService>(KanbanService);
  })

  describe('Create kanban', () => {
    it('should be able to create a kanban', async () => {
      jest.spyOn(KanbanRepositoryMock, 'findBySequenceQr').mockResolvedValueOnce(undefined);
      jest.spyOn(KanbanRepositoryMock, 'create').mockResolvedValueOnce(createdKanban);

      const response = await service.create(props);

      expect(response.process).toEqual(props.process);
      expect(response.product).toEqual(props.product);
      expect(response.sequenceQr).toEqual(props.sequenceQr);
      expect(response.type).toEqual(props.type);
    });

    it('should not be able to create a kanban with the same sequence qr', async () => {
      jest.spyOn(KanbanRepositoryMock, 'findBySequenceQr').mockResolvedValueOnce(createdKanban);

      let error: any;

      try {
        await service.create(props);
      } catch (exception) {
        error = exception;
      }

      expect(error.status).toBe(409);
      expect(error.response).toBe(`Já existe um kanban com o número de sequência informado: ${props.sequenceQr}!`);
    });
  });

  describe('Delete kanban', () => {
    it('should be able to delete kanban', async () => {
      jest.spyOn(KanbanRepositoryMock, 'findById').mockResolvedValueOnce(createdKanban);
      jest.spyOn(KanbanRepositoryMock, 'delete').mockResolvedValueOnce(createdKanban);

      const id = createdKanban.id;

      const response = await service.delete(id);

      expect(response.process).toEqual(createdKanban.process);
      expect(response.product).toEqual(createdKanban.product);
      expect(response.sequenceQr).toEqual(createdKanban.sequenceQr);
      expect(response.type).toEqual(createdKanban.type);
    });
  });

  describe('List kanban', () => {
    it('should be able to list kanban by id', async () => { });
  });

  describe('Update kanban', () => {
    it('should be able to update kanban', async () => {
      jest.spyOn(KanbanRepositoryMock, 'findById').mockResolvedValueOnce(createdKanban);
      jest.spyOn(KanbanRepositoryMock, 'findBySequenceQr').mockResolvedValueOnce(undefined);
      jest.spyOn(KanbanRepositoryMock, 'update').mockResolvedValueOnce(Object.assign({ ...createdKanban, ...updateProps }));

      const id = createdKanban.id;

      const response = await service.update(id, updateProps);

      expect(response.process).toEqual(updateProps.process);
      expect(response.type).toEqual(updateProps.type);
    });
  });
})
