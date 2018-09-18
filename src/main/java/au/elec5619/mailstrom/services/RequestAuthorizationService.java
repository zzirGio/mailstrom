package au.elec5619.mailstrom.services;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import au.elec5619.mailstrom.security.TokenHelper;
import au.elec5619.mailstrom.services.interfaces.IRequestAuthorizationService;
import au.elec5619.mailstrom.services.interfaces.IUserService;

@Service
public class RequestAuthorizationService implements IRequestAuthorizationService {

	@Autowired
	private IUserService userService;
	
	@Autowired
	TokenHelper tokenHelper;

	@Value("${jwt.header}")
	private String AUTH_HEADER;
	
	private String getToken(HttpServletRequest request) {
		String authHeader = request.getHeader(AUTH_HEADER);
		
		if(authHeader != null && authHeader.startsWith("Bearer ")) {
			return authHeader.substring(7);
		}
		
		return null;
	}	
	
	@Override
	public String isRequestAuthorized(HttpServletRequest request) {
		
		String error = null;
		String authToken = getToken(request);
		
		if(authToken != null) {
			String username = tokenHelper.getUsernameFromToken(authToken);
			if(username == null || userService.loadUserDetailsByUsername(username) == null) {
				error = "Username from token can't be found in DB.";
			}
		} else {
			error = "Authentication failed - no Bearer token provided.";
		}
		
		if(error != null) {
			System.out.println(error);
		}

		return error;
	}
}
