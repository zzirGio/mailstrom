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
	
	@Column(name="Name")
	private String name;
	
	public long getId() {
		return this.id;
	}
	
	public String getName() {
		return this.name;
	}
	
}
