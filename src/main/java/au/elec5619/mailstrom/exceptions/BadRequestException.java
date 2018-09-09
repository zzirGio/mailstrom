package au.elec5619.mailstrom.exceptions;

public class BadRequestException extends RuntimeException {
	
	public BadRequestException(String message) {
		super(message);
	}
}
