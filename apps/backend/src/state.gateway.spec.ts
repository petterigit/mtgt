import { Test, TestingModule } from '@nestjs/testing';
import { StateGateway } from './state.gateway';

describe('StateGateway', () => {
  let gateway: StateGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateGateway],
    }).compile();

    gateway = module.get<StateGateway>(StateGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
