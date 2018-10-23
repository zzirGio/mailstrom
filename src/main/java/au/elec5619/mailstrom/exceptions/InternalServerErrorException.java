package au.elec5619.mailstrom.exceptions;

/**
 * @author Sergio Mesina
 *
 */
public class InternalServerErrorException extends RuntimeException {

	public InternalServerErrorException() {
		super("Oops! Something went wrong. Please try again later.");
	}
	
	public InternalServerErrorException(String message) {
		super(message);
	}
}
