package au.elec5619.mailstrom.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;

import au.elec5619.mailstrom.exceptions.*;
import au.elec5619.mailstrom.models.*;
import au.elec5619.mailstrom.services.interfaces.IUserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
		
	@Autowired
	private IUserService userService;
	private ObjectMapper objectMapper;
	
	private final int MIN_PASSWORD_LENGTH = 8;
	
	public UserController() {
		this.objectMapper = new ObjectMapper();
	}
	
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") long id) {
        System.out.println("Fetching User with id " + id);
        User user = userService.getUserById(id);
        if (user == null) {
            System.out.println("User with id " + id + " not found");
            throw new NotFoundException("User does not exist");
        }
    	
    	String result = null;
		try {
			result = this.objectMapper.writeValueAsString(user);
		} catch (Exception e) {
			throw new InternalServerErrorException();
		}
		
		final HttpHeaders httpHeaders= new HttpHeaders();
	    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		
        return new ResponseEntity<>(result, httpHeaders, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody String userJson) {

        User user = userService.getUserById(id);
         
        if (user == null) {
            throw new NotFoundException("User does not exist");
        }
        
        try {
        	User currentUser = objectMapper.readValue(userJson, User.class);
        	user.setPassword(currentUser.getPassword());
        	userService.updateUser(user);      
		} catch (Exception e) {
			throw new InternalServerErrorException();
		}
		
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
        System.out.println("Fetching & Deleting User with id " + id);
 
        User user = userService.getUserById(id);
        if (user == null) {
            System.out.println("Unable to delete. User with id " + id + " not found");
            throw new NotFoundException("User does not exist");
        }
 
        try {
            userService.deleteUser(id);
        } catch (Exception e) {
    		throw new InternalServerErrorException();
    	}

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @RequestMapping(value="/authenticate", method=RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody String userJson) {
    	
    	String result = null;
    	User currentUser = null;
    	
    	try {
			currentUser = this.objectMapper.readValue(userJson, User.class);   
		} catch (Exception e) {
			throw new InternalServerErrorException();
		}
        	
    	if(currentUser.getUsername() == null || currentUser.getPassword() == null) {
    		throw new NotFoundException("Incorrect username or password");
    	}
    	
    	User user = this.userService.getUserByUserName(currentUser.getUsername());
    	
    	if(user == null || !user.getPassword().equals(currentUser.getPassword())) {
    		throw new NotFoundException("Incorrect username or password");
    	}
    	
    	try {
    		currentUser.setId(-1);
        	currentUser.setToken("fake-jwt-token");
        	currentUser.setPassword(null);
        	result = this.objectMapper.writeValueAsString(currentUser);        	
    	} catch (Exception e) {
    		throw new InternalServerErrorException();
    	}

		final HttpHeaders httpHeaders= new HttpHeaders();
	    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		
        return new ResponseEntity<>(result, httpHeaders, HttpStatus.OK);
    }
	
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody String userJson) throws Exception {
    	
    	User newUser;
    	try {
        	newUser = this.objectMapper.readValue(userJson, User.class);   
    	} catch (Exception e) {
    		throw new InternalServerErrorException();
    	}
        	
    	if(!isValidUserName(newUser.getUsername()) || !isValidPassword(newUser.getPassword())) {
    		throw new BadRequestException("Invalid username or password");
    	}
    	
    	if(this.userService.userExists(newUser.getUsername())) {
    		throw new ConflictException("User already exists");
    	}
    	try {        	
        	User user = new User();
        	user.setUsername(newUser.getUsername());
//        	user.setPassword(this.bCryptPasswordEncoder.encode(profile.getPassword()));  	
        	user.setPassword(newUser.getPassword());	

        	this.userService.addUser(user);
    	} catch (Exception e) {
    		throw new InternalServerErrorException();
    	}
    	
    	return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    private boolean isValidUserName(String userName) {
    	
    	String trimmed = StringUtils.strip(userName);
    	
    	if(StringUtils.isEmpty(trimmed)) {
    		return false;
    	}
    	
    	if(!StringUtils.isAlphanumeric(trimmed)) {
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