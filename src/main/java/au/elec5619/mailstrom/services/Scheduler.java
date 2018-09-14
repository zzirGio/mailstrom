package au.elec5619.mailstrom.services;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;

import au.elec5619.mailstrom.models.Message;
import au.elec5619.mailstrom.services.interfaces.IMessageService;

@Component("scheduler")	
public class Scheduler {
	
	private IMessageService messageService;
	
	@Value("${telstra.key}")
    private String CLIENT_KEY;

    @Value("${telstra.secret}")
    private String CLIENT_SECRET;
    
    private String GRANT_TYPE = "client_credentials";

	@Autowired
	public void setMessageService(IMessageService messageService) {
		this.messageService = messageService;
	}
	
	public void sendMessage() {
		String authToken = getOAuth2Token();	

		Timestamp timestamp = new Timestamp(new Date().getTime());
		List<Message> messages = messageService.getMessagesByTimestamp(timestamp);
		
		System.out.println(String.format("Sending %d at %s", messages.size(), timestamp.toString()));
		
		sendMessage(authToken, "04XXXXXXXX", "Hello, this is a message from Mailstrom!!");
		/*		
		for(Message m : messages) {
			// send messages
			
			sendMessage(authToken, m.getContact().getPhoneNumber(), m.getContent());
			m.setIsSent(true);
		}
		 */
	}
	
	private String getOAuth2Token() {

        OkHttpClient client = new OkHttpClient();

        Headers headers = new Headers.Builder()
                .add("Content-Type", "application/x-www-form-urlencoded")
                .build();

        RequestBody formBody = new FormBody.Builder()
                .add("client_id", CLIENT_KEY)
                .add("client_secret", CLIENT_SECRET)
                .add("grant_type", GRANT_TYPE)
                .add("scope", "NSMS")
                .build();
        Request request = new Request.Builder()
                .url("https://tapi.telstra.com/v2/oauth/token")
                .headers(headers)
                .post(formBody)
                .build();

        ObjectMapper mapper = new ObjectMapper();

        try {
            Response response = client.newCall(request).execute();
            String responseJson = response.body().string();
            Map<String, String> map = mapper.readValue(responseJson, Map.class);

            return map.get("token_type") + " " + map.get("access_token");
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
	}
	
	private final MediaType MEDIA_TYPE = MediaType.parse("application/x-www-form-urlencoded; charset=utf-8");

    public void sendMessage(String authToken, String number, String content) {
        OkHttpClient client = new OkHttpClient();

        Headers headers = new Headers.Builder()
                .add("Accept", "application/json")
                .add("Content-Type", "application/x-www-form-urlencoded")
                .add("Authorization", authToken)
                .build();

        String json = "{\n" +
                "  \"to\":\""+number+"\",\n" +
                "  \"body\":\""+content+"\",\n" +
                "  \"validity\":\"60\",\n" +
                "  \"priority\":false,\n" +
                "  \"notifyURL\":\"https://jsonplaceholder.typicode.com/posts\"\n" +
                "}\n";

        RequestBody body = RequestBody.create(MEDIA_TYPE, json);
        Request request = new Request.Builder()
                .url("https://tapi.telstra.com/v2/messages/sms")
                .headers(headers)
                .post(body)
                .build();
        
        try {
            Response response = client.newCall(request).execute();
            System.out.println(response.body());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}