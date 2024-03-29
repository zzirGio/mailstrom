package au.elec5619.mailstrom.controllers;

import java.util.Date;
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
import au.elec5619.mailstrom.services.interfaces.IMessageService;
import au.elec5619.mailstrom.services.interfaces.IUserService;

@RestController
@RequestMapping("/api/message")
public class MessageController {

	private IMessageService messageService;
	private IUserService userService;

	@Autowired
	public void setMessageService(IMessageService messageService) {
		this.messageService = messageService;
	}

	@Autowired
	public void setUserService(IUserService userService) {
		this.userService = userService;
	}

	public void validateScheduledTime(Message message) {
		if (message.getTimeToBeSent().getTime() < new Date().getTime()) {
			throw new BadRequestException("Cannot schedule message in the past.");
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getMessage(@PathVariable("id") long id) {
		Message message = this.messageService.getMessageById(id);
		if (message == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		try {
			return new ResponseEntity<>(
					new ObjectMapper().writeValueAsString(message),
					HttpStatus.OK
					);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> addMessage(@RequestBody String messageJson) {
		ObjectMapper mapper = new ObjectMapper();
    	Message message;
    	try {
			message = mapper.readValue(messageJson, Message.class);
			this.validateScheduledTime(message);
        	this.messageService.addMessage(message);
    	} catch (BadRequestException e) {
    		throw e;
		} catch (Exception e) {
    		throw new InternalServerErrorException("Unable to save message to database");
    	}
    	return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateMessage(
			@PathVariable("id") long id,
			@RequestBody String messageJson
			) {
		Message message = this.messageService.getMessageById(id);
		if (message == null) {
			throw new NotFoundException("Message does not exist. Cannot be updated.");
		}
		try {
			ObjectMapper mapper = new ObjectMapper();
			Message updatedMessage = mapper.readValue(messageJson, Message.class);
			message.setContact(updatedMessage.getContact());
			message.setContent(updatedMessage.getContent());
			message.setTimeToBeSent(updatedMessage.getTimeToBeSent());
			this.validateScheduledTime(message);
			this.messageService.updateMessage(message);
		} catch (BadRequestException e) {
    		throw e;
		} catch (Exception e) {
			throw new InternalServerErrorException("Unable to update message in database");
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteMessage(@PathVariable("id") long id) {
		this.messageService.deleteMessageById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/by-user/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserMessages(@PathVariable("id") long userId) {
    	List<Message> messages = this.messageService.getMessagesByUserId(userId);
    	ObjectMapper mapper = new ObjectMapper();
		try {
			String result = mapper.writeValueAsString(messages);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }

	@RequestMapping(value = "/by-username/{username}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserMessages(@PathVariable("username") String username) {
		User user = this.userService.getUserByUserName(username);
    	return this.getUserMessages(user.getId());
    }
}
