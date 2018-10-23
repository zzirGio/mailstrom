package au.elec5619.mailstrom.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Sergio Mesina
 *
 */
@Entity 
@Table(name="User")
public class User {
	
	@Id
	@GeneratedValue
	@Column(name="Id")
	private long id;
	
	@Column(name="UserName")
	private String userName;
	
	@Column(name="Email")
	private String email;
	
	@Column(name="Password")
	private String password;
	
	private String token;
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return this.userName;
	}
	
	public void setUsername(String userName) {
		this.userName = userName;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	} 
	
	public String getToken() {
		return this.token;
	}
	
	public void setToken(String token) {
		this.token = token;
	} 
}
