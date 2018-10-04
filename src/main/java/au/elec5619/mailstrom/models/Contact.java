package au.elec5619.mailstrom.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Contact")
public class Contact implements Serializable {
	
	@Id
	@GeneratedValue
	@Column(name="Id")
	private long id;
	
	@Column(name="UserId", nullable=false)
	private long userId;
	
	@Column(name="Name")
	private String name;
	
	@Column(name="PhoneNumber")
	private String phoneNumber;
	
	public long getId() {
		return this.id;
	}
	
	public long getUserId() {
		return this.userId;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getPhoneNumber() {
		return this.phoneNumber;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
}
