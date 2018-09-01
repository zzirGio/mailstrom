package au.elec5619.mailstrom.models;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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

	@ManyToOne()
	@JoinColumn(name="UserId")
	private User user;

	@ManyToOne()
	@JoinColumn(name="ContactId")
	private Contact contact;

	@Column(name="Content", nullable=false)
	private String content;

	@Column(name="TimeCreated", nullable=false)
	private Timestamp timeCreated;

	@Column(name="TimeToBeSent")
	private Timestamp timeToBeSent;

	@Column(name="IsSent", nullable=false, columnDefinition="TINYINT(1)")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean isSent;

	public long getId() {
		return this.id;
	}

	public User getUser() {
		return this.user;
	}

	public String getContent() {
		return this.content;
	}

	public Timestamp getTimeCreated() {
		return this.timeCreated;
	}
}
