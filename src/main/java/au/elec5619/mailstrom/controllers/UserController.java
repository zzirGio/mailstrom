package au.elec5619.mailstrom.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import au.elec5619.mailstrom.models.*;
import au.elec5619.mailstrom.services.interfaces.IUserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	private final int MIN_PASSWORD_LENGTH = 8;
	
	private IUserService userService;
	
	@Autowired
    public void setUserService(IUserService userService) {
        this.userService = userService;
    }
	
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") long id) {
        System.out.println("Fetching User with id " + id);
        User user = userService.getUserById(id);
        if (user == null) {
            System.out.println("User with id " + id + " not found");
            return new ResponseEntity<UserProfile>(HttpStatus.NOT_FOUND);
        }
        
        UserProfile profile = new UserProfile();
        profile.setId(user.getId());
    	profile.setUsername(user.getUserName());
    	
    	String result = null;
		try {
			result = new ObjectMapper().writeValueAsString(profile);
		} catch (Exception e) {
			new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody String userJson) {
        System.out.println("Updating User " + id);
        String result = null;
        User currentUser = userService.getUserById(id);
         
        if (currentUser==null) {
            System.out.println("User with id " + id + " not found");
            return new ResponseEntity<UserProfile>(HttpStatus.NOT_FOUND);
        }
        
        try {
        	UserProfile profile = new ObjectMapper().readValue(userJson, UserProfile.class);
        	currentUser.setPasswordHash(profile.getPassword());
        	userService.updateUser(currentUser);      
                	
			result = new ObjectMapper().writeValueAsString(profile);
		} catch (Exception e) {
			new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
        System.out.println("Fetching & Deleting User with id " + id);
 
        User user = userService.getUserById(id);
        if (user == null) {
            System.out.println("Unable to delete. User with id " + id + " not found");
            return new ResponseEntity<UserProfile>(HttpStatus.NOT_FOUND);
        }
 
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @RequestMapping(value="/authenticate", method=RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody String userJson) {
    	UserProfile profile = null;
    	String result = null;
    	ObjectMapper mapper = new ObjectMapper();
    	try {
        	profile = mapper.readValue(userJson, UserProfile.class);   	
        	
        	if(profile.getUsername() == null || profile.getPassword() == null) {
        		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        	}
        	
        	User user = this.userService.getUserByUserName(profile.getUsername());
        	
        	if(user == null || !user.getPasswordHash().equals(profile.getPassword())) {
        		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        	}
        	
        	profile.setToken("fake-jwt-token");
        	profile.setPassword(null);
        	result = mapper.writeValueAsString(profile);        	
    	} catch (Exception e) {
    		new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}

    	return new ResponseEntity<String>(result, HttpStatus.OK);
    }
	
    @RequestMapping(value="/register", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> register(@RequestBody String userJson) {
    	
    	try {
        	UserProfile profile = new ObjectMapper().readValue(userJson, UserProfile.class);   	
        	
        	if(!isValidUserName(profile.getUsername()) || !isValidPassword(profile.getPassword())) {
        		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        	}
        	
        	User user = new User();
        	user.setUserName(profile.getUsername());
//        	user.setPasswordHash(this.bCryptPasswordEncoder.encode(profile.getPassword()));  	
        	user.setPasswordHash(profile.getPassword());	
        	
        	List<User> users = this.userService.getUsers();
        	
        	if(users.stream().anyMatch(u -> u.getUserName().equals(profile.getUsername()))) {
        		return new ResponseEntity<>(HttpStatus.CONFLICT);
        	}

        	this.userService.addUser(user);
    	} catch (Exception e) {
    		new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    	
    	return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    private boolean isValidUserName(String userName) {
    	
    	String trimmed = StringUtils.strip(userName);
    	
    	if(StringUtils.isEmpty(trimmed)) {
    		return false;
    	}
    	
    	if(userName.length() != trimmed.length()) { // has trailing white space
    		return false;
    	}
    	
    	return true;
    }
    
    private boolean isValidPassword(String password) {
    	
    	if(StringUtils.isEmpty(password)) {
    		return false;
    	}
    	
    	if(password.length() < MIN_PASSWORD_LENGTH) {
    		return false;
    	}
    	
    	return true;
    }
}