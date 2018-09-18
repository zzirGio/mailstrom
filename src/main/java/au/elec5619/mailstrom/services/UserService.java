package au.elec5619.mailstrom.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import au.elec5619.mailstrom.services.interfaces.IUserService;
import au.elec5619.mailstrom.exceptions.NotFoundException;
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
		  .filter(u -> u.getUsername().equals(userName))
		  .findFirst()
		  .orElse(null);
	}
	
	@Override
	public boolean userExists(String userName) {
		List<User> users = this.getUsers();
		
		return users.stream().anyMatch(u -> u.getUsername().equals(userName));
	}
	
	@Override
	public boolean userExists(String userName, String email) {
		List<User> users = this.getUsers();
		
		return users.stream().anyMatch(u -> u.getUsername().equals(userName) || u.getEmail().equals(email));
	}
	
	@Override
	public boolean emailExists(String email) {
		List<User> users = this.getUsers();
		
		return users.stream().anyMatch(u -> u.getEmail().equals(email));
	}
	
	
	public UserDetails loadUserDetailsByUsername(String username) {
		User user = this.getUserByUserName(username);
		
		if(user == null) {
			throw new NotFoundException("No user found with username: " + username);
		}
		
		boolean enabled = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;
		
		return new org.springframework.security.core.userdetails.User(
				user.getUsername(), user.getPassword(), enabled, accountNonExpired, 
				credentialsNonExpired, accountNonLocked, getAuthorities(Arrays.asList("ROLE_USER")));
	}
	
	private static List<GrantedAuthority> getAuthorities(List<String> roles) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		for(String role : roles) {
			authorities.add(new SimpleGrantedAuthority(role));
		}
		
		return authorities;
	}
}
