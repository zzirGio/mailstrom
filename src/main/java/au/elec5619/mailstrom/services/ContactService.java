package au.elec5619.mailstrom.services;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import au.elec5619.mailstrom.models.Contact;
import au.elec5619.mailstrom.services.interfaces.IContactService;

@Service
@Transactional
public class ContactService implements IContactService {
	
	private SessionFactory sessionFactory;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public Contact getContactById(long id) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		return (Contact) currentSession.get(Contact.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Contact> getContactsByUserId(long id) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		Query query = currentSession.createQuery(
				"FROM Contact WHERE UserId = :userId");
		query.setParameter(0, id);
		return query.list();
	}

	@Override
	public void addContact(Contact contact) {
		this.sessionFactory.getCurrentSession().save(contact);
	}

	@Override
	public void updateContact(Contact contact) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		currentSession.merge(contact);	
	}

	@Override
	public void deleteContactById(long id) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		final Contact contact = (Contact) currentSession.get(Contact.class, id);
		currentSession.delete(contact);
	}
	
}