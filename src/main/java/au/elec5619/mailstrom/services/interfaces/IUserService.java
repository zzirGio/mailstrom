package au.elec5619.mailstrom.services.interfaces;

import java.util.List;

import au.elec5619.mailstrom.models.User;;

public interface IUserService {
	
	User getUserById(long id);
	
	User getUserByUserName(String userName);
		
	List<User> getUsers();
	
	void addUser(User user);
	
	void updateUser(User user);
	
	void deleteUser(long id);
	
	boolean userExists(String userName);
	
	boolean userExists(String userName, String email);
	
	boolean emailExists(String email);
}
