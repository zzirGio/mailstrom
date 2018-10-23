package au.elec5619.mailstrom.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Sergio Mesina
 *
 */
@ResponseStatus(code = HttpStatus.CONFLICT)
public class ConflictException extends RuntimeException {
	
	public ConflictException(String message) {
		super(message);
	}
}
