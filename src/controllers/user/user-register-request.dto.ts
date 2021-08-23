import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class UserRegisterRequestDto {
  @ApiProperty()
  @Expose()
  userName: string;

  @ApiProperty()
  @Expose()
  password: string;
}
