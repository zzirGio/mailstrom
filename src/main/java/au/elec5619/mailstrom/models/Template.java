package au.elec5619.mailstrom.models;

import javax.persistence.*;

import org.hibernate.annotations.Type;

import java.io.Serializable;


@Entity
@Table(name="Template")
public class Template implements Serializable{

	@Id
	@GeneratedValue
	@Column(name="Id")
	private long id;
	
	@Column(name="UserId", nullable = false)
	private long userId;
	
	@Column(name="Title", nullable=false)
	private String title;
	
	@Column(name="Content", nullable=false)
	private String content;
	
	@Column(name="IsPublic", nullable=false, columnDefinition="TINYINT(1)")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean isPublic;
	
	public long getId() {
		return this.id;
	}
	
	public long getUserId() {
		return this.userId;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public String getContent() {
		return this.content;
	}
	
	public boolean getIsPublic() {
		return this.isPublic;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public void setIsPublic(boolean isPublic) {
		this.isPublic = isPublic;
	}
}
