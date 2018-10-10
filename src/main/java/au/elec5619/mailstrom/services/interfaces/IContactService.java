package au.elec5619.mailstrom.services.interfaces;

import java.sql.Timestamp;
import java.util.List;

import au.elec5619.mailstrom.models.Contact;
import au.elec5619.mailstrom.models.Message;

public interface IContactService {
	
	Contact getContactById(long id);
	List<Contact> getContactsByUserId(long id);
	void addContact(Contact contact);
	void updateContact(Contact contact);
	void deleteContactById(long id);
}
