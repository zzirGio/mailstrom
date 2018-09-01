package au.elec5619.mailstrom.services.interfaces;

import au.elec5619.mailstrom.models.Message;

public interface IMessageService {
	
	Message getMessageById(long id);
	void addMessage(Message message);
	void updateMessage(Message message);
	void deleteMessageById(long id);
}
