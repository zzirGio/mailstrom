package au.elec5619.mailstrom.services;

import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import au.elec5619.mailstrom.models.Message;
import au.elec5619.mailstrom.services.interfaces.IMessageService;

@Service
@Transactional
public class MessageService implements IMessageService {
	
	private SessionFactory sessionFactory;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public Message getMessageById(long id) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		return (Message) currentSession.get(Message.class, id);
	}

	@Override
	public void addMessage(Message message) {
		this.sessionFactory.getCurrentSession().save(message);
	}

	@Override
	public void deleteMessageById(long id) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		final Message message = (Message) currentSession.get(Message.class, id); 
		currentSession.delete(message);
	}

	@Override
	public void updateMessage(Message message) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		currentSession.merge(message);
	}
}
