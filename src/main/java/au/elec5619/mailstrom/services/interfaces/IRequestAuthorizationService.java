package au.elec5619.mailstrom.services.interfaces;

import javax.servlet.http.HttpServletRequest;

public interface IRequestAuthorizationService {
	String isRequestAuthorized(HttpServletRequest request);
}
