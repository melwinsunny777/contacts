import {IsBoolean, IsString } from 'class-validator';

export class addContactsDto {

  @IsString()
  name?: string;
 
  @IsString()
  email: string;

  @IsString()
  contact: string;

  @IsBoolean()
  active: boolean;
}
