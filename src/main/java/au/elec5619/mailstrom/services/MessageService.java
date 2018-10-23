package au.elec5619.mailstrom.services;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

import org.hibernate.Query;
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

	@SuppressWarnings("unchecked")
	@Override
	public List<Message> getMessagesByUserId(long id) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		Query query = currentSession.createQuery(
				"FROM Message WHERE UserId = :id"
				);
		query.setParameter("id", id);
		return query.list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Message> getMessagesByTimestamp(Timestamp timestamp) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		Query query = currentSession.createQuery(
				"FROM Message WHERE TimeToBeSent = :timestamp"
				);
		query.setParameter("timestamp", timestamp);
		return query.list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Message> getMessagesToBeSent(Timestamp timestamp) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		
		
	    Calendar cal = Calendar.getInstance();
	    cal.setTimeInMillis(timestamp.getTime());
	 
	    // subtract 30 seconds
	    cal.add(Calendar.SECOND, -30);
	    Timestamp start = new Timestamp(cal.getTime().getTime());
		
		Query query = currentSession.createQuery(
				"FROM Message WHERE TimeToBeSent >= :start AND TimeToBeSent <= :end AND IsSent = 0"
				);
		query.setParameter("start", start);
		query.setParameter("end", timestamp);
		return query.list();
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
	
	@Override
	public void setMessageSent(Message message, boolean isSent) {
		message.setIsSent(isSent);
		this.updateMessage(message);
	}
}
