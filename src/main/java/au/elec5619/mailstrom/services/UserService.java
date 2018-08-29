package au.elec5619.mailstrom.services;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import au.elec5619.mailstrom.services.interfaces.IUserService;
import au.elec5619.mailstrom.models.User;

@Service
@Transactional
public class UserService implements IUserService {
	
	private SessionFactory sessionFactory;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public User getUserById(long id) {
		Session currentSession = this.sessionFactory.getCurrentSession();
		User user = (User) currentSession.get(User.class, id);
		return user;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User> getUsers() {
		return this.sessionFactory.getCurrentSession().createQuery("FROM User").list();
	}

	@Override
	public void addUser(User user) {
		this.sessionFactory.getCurrentSession().save(user);
	}

	@Override
	public void updateUser(User user) {
		Session currentSession = this.sessionFactory.getCurrentSession();
		currentSession.merge(user);
	}

	@Override
	public void deleteUser(long id) {
		Session currentSession = this.sessionFactory.getCurrentSession();
		User user = (User) currentSession.get(User.class, id);
		currentSession.delete(user);
	}

	@Override
	public User getUserByUserName(String userName) {
		List<User> users = this.sessionFactory.getCurrentSession().createQuery("FROM User").list();
		
		return users.stream()
		  .filter(u -> u.getUserName().equals(userName))
		  .findFirst()
		  .orElse(null);
		
	}

}
