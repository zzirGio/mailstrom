package au.elec5619.mailstrom.controllers;

import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;

import au.elec5619.mailstrom.exceptions.*;
import au.elec5619.mailstrom.models.*;
import au.elec5619.mailstrom.security.TokenHelper;
import au.elec5619.mailstrom.services.interfaces.IRequestAuthorizationService;
import au.elec5619.mailstrom.services.interfaces.IUserService;

/**
 * @author Sergio Mesina
 *
 * Contains methods which handle User API requests from the client.
 *
 */
@RestController
@RequestMapping("/api/user")
public class UserController {
		
	@Autowired
	private IUserService userService;
	@Autowired
	private IRequestAuthorizationService requestAuthorizationService;
	
	@Autowired
	TokenHelper tokenHelper;
	
	private ObjectMapper objectMapper;
	private PasswordEncoder passwordEncoder;
	private final int MIN_PASSWORD_LENGTH = 8;
	
	public UserController() {
		this.objectMapper = new ObjectMapper();
		this.passwordEncoder = new BCryptPasswordEncoder();
	}
	
    /**
     * @param id - User ID
     * @param request - HttpServletRequest object to ensure request is Authorized
     * @return User data as json
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") long id, HttpServletRequest request) {
    	
    	String error = requestAuthorizationService.isRequestAuthorized(request);
    	
    	if(error != null) {
    		System.out.println(error);
    		throw new ForbiddenException(error);
    	}
    	
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
    
    /**
     * @param id - User ID
     * @param userJson - Data to update the current user.
     * @param request - HttpServletRequest object to ensure request is Authorized
     * @return HTTP Status Code
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody String userJson, HttpServletRequest request) {

    	String error = requestAuthorizationService.isRequestAuthorized(request);
    	
    	if(error != null) {
    		System.out.println(error);
    		throw new ForbiddenException(error);
    	}
    	
        User user = userService.getUserById(id);
         
        if (user == null) {
            throw new NotFoundException("User does not exist");
        }
        
        Map currentUser = null;
        try {
        	currentUser = this.objectMapper.readValue(userJson, Map.class);
        } catch (Exception e) {
        	throw new InternalServerErrorException();
        }
        
        try {
        	if(!user.getEmail().equals((String)currentUser.get("email")) && this.userService.emailExists((String)currentUser.get("email"))) {
        		throw new ConflictException("Email already exists");
        	}
        	user.setEmail((String)currentUser.get("email"));
        	if((Boolean)currentUser.get("newPasswordChecked")) {
        		user.setPassword(this.passwordEncoder.encode((String)currentUser.get("password")));
        	} else {
        		if(!this.passwordEncoder.matches((String)currentUser.get("password"), user.getPassword())) {
        			throw new ConflictException("Incorrect Password");
        		}
        	}
        	
        	userService.updateUser(user);      
		} catch(ConflictException e) {
			throw e;
    	} catch (Exception e) {
			throw new InternalServerErrorException();
		}
		
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    /**
     * @param id - User ID
     * @param request - HttpServletRequest object to ensure request is Authorized
     * @return HTTP Status Code
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") long id, HttpServletRequest request) {

    	String error = requestAuthorizationService.isRequestAuthorized(request);
    	
    	if(error != null) {
    		System.out.println(error);
    		throw new ForbiddenException(error);
    	}
    	
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
    
    /**
     * @param userJson - contains username, email and new password
     * @return HTTP Status
     */
    @RequestMapping(value = "/resetpassword", method=RequestMethod.POST)
    public ResponseEntity<?> resetPassword(@RequestBody String userJson) {
    	
    	User currentUser = null;
    	
    	try {
			currentUser = this.objectMapper.readValue(userJson, User.class);   
		} catch (Exception e) {
			throw new InternalServerErrorException();
		}
    	
    	if(currentUser.getUsername() == null || currentUser.getEmail() == null) {
    		throw new BadRequestException("Invalid username or email");
    	}
    	
    	User user = this.userService.getUserByUserName(currentUser.getUsername());
        
        if (user == null || !user.getEmail().equals(currentUser.getEmail())) {
            throw new NotFoundException("User does not exist");
        }
        
        try {
        	user.setPassword(this.passwordEncoder.encode(currentUser.getPassword()));
        	userService.updateUser(user);      
		} catch (Exception e) {
			throw new InternalServerErrorException();
		}
		
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    /**
     * @param userJson - contains username and password used to authenticate user
     * @return User data including a JWT token
     */
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
    	
    	if(user == null || !this.passwordEncoder.matches(currentUser.getPassword(), user.getPassword())) {
    		throw new NotFoundException("Incorrect username or password");
    	}
    	
    	try {
    		String jwt = tokenHelper.generateToken(user.getUsername());
    		user.setToken(jwt);
    		user.setPassword("");
        	result = this.objectMapper.writeValueAsString(user);        	
    	} catch (Exception e) {
    		throw new InternalServerErrorException();
    	}

		final HttpHeaders httpHeaders= new HttpHeaders();
	    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		
        return new ResponseEntity<>(result, httpHeaders, HttpStatus.OK);
    }
	
    /**
     * @param userJson - contains username, email, and password used to create a new User record
     * @return HTTP Status
     * @throws Exception
     */
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody String userJson) throws Exception {
    	
    	User newUser;
    	try {
        	newUser = this.objectMapper.readValue(userJson, User.class);   
    	} catch (Exception e) {
    		throw new InternalServerErrorException();
    	}
        	
    	if(!isValidUserName(newUser.getUsername()) ||
			!isValidPassword(newUser.getPassword()) ||
			!isValidEmail(newUser.getEmail())) {
    		throw new BadRequestException("Invalid username, email or password");
    	}
    	
    	if(this.userService.userExists(newUser.getUsername(), newUser.getEmail())) {
    		throw new ConflictException("User already exists");
    	}
    	
    	try {        	
        	User user = new User();
        	user.setUsername(newUser.getUsername());
        	user.setEmail(newUser.getEmail());
        	user.setPassword(this.passwordEncoder.encode(newUser.getPassword()));

        	this.userService.addUser(user);
    	} catch (Exception e) {
    		throw new InternalServerErrorException();
    	}
    	
    	return new ResponseEntity<>(HttpStatus.CREATED);
    }
    
    /**
     * @param userName - String to represent the user's username
     * @return - true if username is valid
     */
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
    
    /**
     * @param password - String used to represent user's password
     * @return - true if password is valid
     */
    private boolean isValidPassword(String password) {
    	
    	if(StringUtils.isEmpty(password)) {
    		return false;
    	}
    	
    	if(password.length() < MIN_PASSWORD_LENGTH) {
    		return false;
    	}
    	
    	return true;
    }
    
    /**
     * @param email - String used to represent user's email
     * @return - true if password is valid 
     */
    private boolean isValidEmail(String email) {
    	String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."+ 
                "[a-zA-Z0-9_+&*-]+)*@" + 
                "(?:[a-zA-Z0-9-]+\\.)+[a-z" + 
                "A-Z]{2,7}$"; 
                  
		Pattern pat = Pattern.compile(emailRegex); 
		if (email == null) {
			return false; 
		}
		
		return pat.matcher(email).matches(); 
    }
}