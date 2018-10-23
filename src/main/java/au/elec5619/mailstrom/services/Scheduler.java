package au.elec5619.mailstrom.services;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import au.elec5619.mailstrom.models.Message;
import au.elec5619.mailstrom.services.interfaces.IMessageService;
import au.elec5619.mailstrom.services.interfaces.ITelstraApiService;

@Component("scheduler")	
public class Scheduler {
	
	private IMessageService messageService;
	private ITelstraApiService telstraService;

	@Autowired
	public void setMessageService(IMessageService messageService) {
		this.messageService = messageService;
	}
	
	@Autowired
	public void setTelstraService(ITelstraApiService telstraService) {
		this.telstraService = telstraService;
	}
	
	public void sendMessage() {
		Timestamp timestamp = new Timestamp(new Date().getTime());
		List<Message> messages = messageService.getMessagesToBeSent(timestamp);
		
		System.out.println(String.format("Sending %d at %s", messages.size(), timestamp.toString()));

		for(Message m : messages) {
			// send messages
			this.telstraService.sendMessage(m.getContact().getPhoneNumber(), m.getContent());
			messageService.setMessageSent(m, true);
		}
	}
}