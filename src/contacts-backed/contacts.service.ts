import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacts } from './models/contacts.entity';
import { Repository } from 'typeorm';
import { addContactsDto } from './dto/add-contacts.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private readonly contactsRepository: Repository<Contacts>,
  ) {}

  async createContact(
    addContactDto: addContactsDto,
  ): Promise<Record<string, unknown>> {
    try {
      const contact = new Contacts();

      const isDuplicate = await this.isContactDuplicate(addContactDto);

      if (isDuplicate) {
        return {
          code: 400,
          message: 'Contact with the same name or phone number already exists',
          data: null,
        };
      }

      contact.name = addContactDto.name;
      contact.email = addContactDto.email;
      contact.contact = addContactDto.contact;

      const ContactDetails = await this.contactsRepository.save(contact);

      return {
        code: 200,
        message: 'Done',
        data: ContactDetails,
      };
    } catch (err) {
      console.log(err);
      if (err.code === '23505') { // Postgres error code for duplicate key violation
        throw new ConflictException({
          code: 409,
          message: 'Contact with this phone number already exists',
        });
      } else {
        throw new InternalServerErrorException({
          code: 500,
          message: 'Internal server error',
        });
      }
    }
  }

  async searchContact(contactDto: addContactsDto):Promise<Record<string, unknown>> {
 // Check if any selection conditions are provided
 
        const existingContact = await this.contactsRepository.findOne({
          where: [
            { name: contactDto.name },
            { contact: contactDto.contact },
          ],
        });
        
    if (existingContact) {
      return {
        code: 200,
        message: 'Contact found',
        data: existingContact, // You can return the existing contact data here if needed
      };
    } else {
      return {
        code: 404,
        message: 'Contact not found',
        data: null,
      };
    }
  }
    

  async getAllContacts(): Promise<Contacts[]> {
    try {
      const contacts = await this.contactsRepository.find();
      return contacts;
    } catch (error) {
      // Handle any errors here, e.g., log the error or throw an exception
      throw new Error('Failed to retrieve contacts');
    }
  }

  async searchDeleteContact(contactDto) {

    
    const existingContact = await this.contactsRepository.findOne({
      where: [
        { name: contactDto.name },
        { contact: contactDto.contact },
      ],
    });
    if (existingContact) {
      // Contact found, delete it
      await this.contactsRepository.remove(existingContact);
      return {
        code: 200,
        message: 'Contact found and deleted',
        data: existingContact,
      };
    } else {
      return {
        code: 404,
        message: 'Contact not found',
        data: null,
      };
    }
  }

  async updateContact(contactId: number, contactUpdateDto: any): Promise<Record<string, unknown>> {
    try {
      // Find the contact by its ID
      const existingContact = await this.contactsRepository.findOne({where: {id: contactId} });

      if (!existingContact) {
        throw new NotFoundException('Contact not found');
      }

      // Update the contact's properties
      if (contactUpdateDto.name) {
        existingContact.name = contactUpdateDto.name;
      }

      if (contactUpdateDto.emailAddress) {
        existingContact.email = contactUpdateDto.email;
      }

      if (contactUpdateDto.contact) {
        existingContact.contact = contactUpdateDto.contact;
      }

      // Save the updated contact
      const updatedContact = await this.contactsRepository.save(existingContact);
      return {
        code: 200,
        message: 'Contact updated',
        data: updatedContact,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          code: 404,
          message: 'Contact NOT found',
        }
      } 
      else {
        throw new InternalServerErrorException({
          code: 500,
          message: "Internal server error",
        })
      }
    }
  }


  async deleteContactById(contactId: number): Promise<Record<string, unknown>>{
    try {
      // Find the contact by its ID
      const existingContact = await this.contactsRepository.findOne({where: {id: contactId} });
      if (!existingContact) {
        throw new NotFoundException('Contact not found');
      }

      // Delete the contact
      const deletedContact = await this.contactsRepository.remove(existingContact);
      return {
        code: 200,
        message: 'Contact found and deleted',
        data: deletedContact,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          code: 404,
          message: 'Contact NOT found',
        }
      } 
      else {
        throw new InternalServerErrorException({
          code: 500,
          message: "Internal server error",
        })
      }
    }
  }

  async isContactDuplicate(addContactDto): Promise<boolean> {
    const existingContact = await this.contactsRepository.findOne({
      where: [
        { name: addContactDto.name },
        { contact: addContactDto.contact },
      ],
    });
    return !!existingContact; // Returns true if a duplicate contact is found, otherwise false
  }
}

