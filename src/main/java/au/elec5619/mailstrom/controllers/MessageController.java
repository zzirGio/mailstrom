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

import au.elec5619.mailstrom.models.*;
import au.elec5619.mailstrom.services.interfaces.IMessageService;

@RestController
@RequestMapping("/api/message")
public class MessageController {

	private IMessageService messageService;

	@Autowired
	public void setMessageService(IMessageService messageService) {
		this.messageService = messageService;
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
		return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateMessage(@PathVariable("id") long id, @RequestBody String messageJson) {
		Message message = this.messageService.getMessageById(id);
		this.messageService.updateMessage(message);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteMessage(@PathVariable("id") long id) {
		this.messageService.deleteMessageById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}