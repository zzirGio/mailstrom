package au.elec5619.mailstrom.services;

import java.sql.Timestamp;
<<<<<<< HEAD
import java.util.Calendar;
=======
import java.util.Date;
>>>>>>> Throw error when setting message schedule time in the past
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import au.elec5619.mailstrom.exceptions.BadRequestException;
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
	
	public void validateScheduledTime(Message message) {
		if (message.getTimeToBeSent().getTime() < new Date().getTime()) {
			throw new BadRequestException("Cannot schedule message in the past.");
		}
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
				"FROM Message WHERE TimeToBeSent >= :start AND TimeToBeSent <= :end"
				);
		query.setParameter("start", start);
		query.setParameter("end", timestamp);
		return query.list();
	}

	@Override
	public void addMessage(Message message) {
		this.validateScheduledTime(message);
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
		this.validateScheduledTime(message);
		final Session currentSession = this.sessionFactory.getCurrentSession();
		currentSession.merge(message);
	}
}
