package au.elec5619.mailstrom.models;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name="Message")
public class Message implements Serializable {

	@Id
	@GeneratedValue
	@Column(name="Id")
	private long id;
	
	@Column(name="UserId", nullable=false)
	private long userId;

	@ManyToOne()
	@JoinColumn(name="ContactId")
	private Contact contact;

	@Column(name="Content", nullable=false)
	private String content;

	@Column(name="TimeCreated", insertable=false)
	private Timestamp timeCreated;

	@Column(name="TimeToBeSent", nullable=false)
	private Timestamp timeToBeSent;

	@Column(name="IsSent", nullable=false, columnDefinition="TINYINT(1)")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean isSent;

	public long getId() {
		return this.id;
	}

	public long getUserId() {
		return this.userId;
	}
	
	public Contact getContact() {
		return this.contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public String getContent() {
		return this.content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getTimeCreated() {
		return this.timeCreated;
	}
	
	public Timestamp getTimeToBeSent() {
		return this.timeToBeSent;
	}
	
	public void setTimeToBeSent(Timestamp timestamp) {
		this.timeToBeSent = timestamp;
	}
	
	public boolean getIsSent() {
		return this.isSent;
	}
	
	public void setIsSent(boolean isSent) {
		this.isSent = isSent;
	}
}
