package au.elec5619.mailstrom.services.interfaces;

import java.util.List;

import au.elec5619.mailstrom.models.Message;

public interface IMessageService {
	
	Message getMessageById(long id);
	List<Message> getMessagesByUserId(long id);
	
	void addMessage(Message message);
	void updateMessage(Message message);
	void deleteMessageById(long id);
}
