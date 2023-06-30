import { Exclude, Expose } from 'class-transformer/types/decorators';
import { IsString } from 'class-validator';

@Exclude()
export class UserDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  avatar?: string;
}
