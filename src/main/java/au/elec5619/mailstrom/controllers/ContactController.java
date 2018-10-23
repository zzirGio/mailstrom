package au.elec5619.mailstrom.controllers;

import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import au.elec5619.mailstrom.exceptions.BadRequestException;
import au.elec5619.mailstrom.exceptions.InternalServerErrorException;
import au.elec5619.mailstrom.exceptions.NotFoundException;
import au.elec5619.mailstrom.models.*;
import au.elec5619.mailstrom.services.interfaces.IContactService;
import au.elec5619.mailstrom.services.interfaces.IMessageService;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

	private IContactService contactService;
	private IMessageService messageService;

	@Autowired
	public void setContactService(IContactService contactService, IMessageService messageService) {
		this.contactService = contactService;
		this.messageService = messageService;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getContact(@PathVariable("id") long id) {
		Contact contact = this.contactService.getContactById(id);
		if (contact == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		try {
			return new ResponseEntity<>(
					new ObjectMapper().writeValueAsString(contact),
					HttpStatus.OK
					);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/list/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getContactsList(@PathVariable("id") long id) {
		List<Contact> contactList = this.contactService.getContactsByUserId(id);
		ObjectMapper mapper = new ObjectMapper();
		try {
			String result = mapper.writeValueAsString(contactList);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/create", method = RequestMethod.POST)
	public ResponseEntity<?> addContact(@RequestBody String contactJson) {
		ObjectMapper mapper = new ObjectMapper();
		Contact contact;
		try {
			contact = mapper.readValue(contactJson, Contact.class);
		} catch (Exception e) {
			throw new InternalServerErrorException("Unable to save contact to database");
		}
		
		try {
			validateContact(contact);
		} catch (Exception e) {
			throw new BadRequestException(e.getMessage());
		}
		
		try {
			this.contactService.addContact(contact);
		} catch (Exception e) {
			throw new InternalServerErrorException("Unable to save contact to database");
		}
		
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateContact(@PathVariable("id") long id, @RequestBody String contactJson) {
		Contact contact = this.contactService.getContactById(id);
		if(contact == null) {
			throw new NotFoundException("Contact does not exist. Cannot be updated.");
		}
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			Contact updatedContact = mapper.readValue(contactJson, Contact.class);
			contact.setName(updatedContact.getName());
			contact.setPhoneNumber(updatedContact.getPhoneNumber());
			this.contactService.updateContact(contact);
		} catch (Exception e) {
			throw new InternalServerErrorException();
		}
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.DELETE)                                                     
	public ResponseEntity<?> deleteContact(@PathVariable("id") long id) {
		Contact contact = this.contactService.getContactById(id);
		List<Message> messages = this.messageService.getMessagesByUserId(contact.getUserId());
		for (Message message : messages) {
			if (message.getContact().getId() == id) {
				throw new BadRequestException("Contact cannot be deleted due to scheduled messages.");
			}
		}
		
		this.contactService.deleteContactById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	private boolean validateContact(Contact contact) {	
		if(contact.getName() == null || contact.getName().matches("^$") ) {
			throw new BadRequestException("Name field empty.");
		}
		
		if (!contact.getPhoneNumber().matches("^04[0-9]{8}$")) {
			throw new BadRequestException("Phone number wrong format.");
		}
		
		return true;
	}
}
