package au.elec5619.mailstrom.exceptions;

/**
 * @author Sergio Mesina
 *
 */
public class ForbiddenException extends RuntimeException {
	
	public ForbiddenException(String message) {
		super(message);
	}
}