package au.elec5619.mailstrom.exceptions;

/**
 * @author Sergio Mesina
 *
 */
public class BadRequestException extends RuntimeException {
	
	public BadRequestException(String message) {
		super(message);
	}
}
