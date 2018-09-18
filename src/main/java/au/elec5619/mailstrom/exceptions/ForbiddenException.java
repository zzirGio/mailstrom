package au.elec5619.mailstrom.exceptions;

public class ForbiddenException extends RuntimeException {
	
	public ForbiddenException(String message) {
		super(message);
	}
}