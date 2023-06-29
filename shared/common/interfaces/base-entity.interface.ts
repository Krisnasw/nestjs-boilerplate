import { AbstractDto } from '../dto/abstract.dto';

export interface BaseEntityInterface {
  toDto(): AbstractDto;

  toMock(): object;
}
