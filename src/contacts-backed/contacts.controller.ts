import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { addContactsDto } from './dto/add-contacts.dto';
import { Contacts } from './models/contacts.entity';

@Controller()
export class ContactsController {
  constructor(
    private readonly contactService: ContactsService
  ) { }

  @Post('/contacts')
  async addContact(
    @Body() addContactsDto: addContactsDto,
  ): Promise<Record<string, unknown>> {
    return await this.contactService.createContact(addContactsDto);
  }

  @Get('/contacts')
  async getallContact(): Promise<Contacts[]>
  {
    return await this.contactService.getAllContacts();
  }

  @Post('contacts/search')
  async searchContact(@Body() contactDto: any) { 
    if (contactDto) {
      // const search = {
      //   name: contactDto.name,
      //   contact: contactDto.contact,
      // };
      return this.contactService.searchContact(contactDto);
    } else {
      // Handle the case where no search criteria are provided
      return {
        code: 400,
        message: 'Invalid request. Please provide the data to search',
        data: null,
      };
    }
  }

  @Post('contacts/delete')
  async searchAndDeleteContact(@Body() contactDto: addContactsDto) {
    if (contactDto) {
      return this.contactService.searchDeleteContact(contactDto);
    } else {
      return {
        code: 400,
        message: 'Invalid request body. Please provide details to delete.',
        data: null,

      };
    }
  }

  @Patch('contacts/:id')
  async updateContact(@Param('id') contactId: number, @Body() contactUpdateDto: addContactsDto) {
    try {
      return  await this.contactService.updateContact(contactId, contactUpdateDto);
    } catch (error) {
      return {
        code: 500,
        message: 'Internal server error',
        data: null,
      };
    }
  }

  @Delete('contacts/:id')
  async deleteContactById(@Param('id') contactId: number) {
    try {
     return await this.contactService.deleteContactById(contactId);
    } catch (error) {
      return {
        code: 500,
        message: 'Internal server error'
      };
    }
  }


}
