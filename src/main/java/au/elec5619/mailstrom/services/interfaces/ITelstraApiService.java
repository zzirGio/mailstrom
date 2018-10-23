package au.elec5619.mailstrom.services.interfaces;

/**
 * @author Sergio Mesina
 *
 * Interface for TelstraApiService
 */
public interface ITelstraApiService {
	void sendMessage(String number, String content);
}
