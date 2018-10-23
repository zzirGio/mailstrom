package au.elec5619.mailstrom.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import au.elec5619.mailstrom.services.interfaces.ITelstraApiService;
import okhttp3.FormBody;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * @author Sergio Mesina
 *
 *	Wrapper class for Telstra API calls
 */
@Service
public class TelstraApiService implements ITelstraApiService {

	@Value("${telstra.key}")
    private String CLIENT_KEY;

    @Value("${telstra.secret}")
    private String CLIENT_SECRET;
    
    private String GRANT_TYPE = "client_credentials";
    
    private final MediaType MEDIA_TYPE = MediaType.parse("application/x-www-form-urlencoded; charset=utf-8");

    private OkHttpClient client;
    
    public TelstraApiService() {
    	this.client = new OkHttpClient();
    }
	
	@Override
	public void sendMessage(String number, String content) {
		String authToken = this.getOAuth2Token();
		
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
                "  \"notifyURL\":\"\"\n" +
                "}\n";

        RequestBody body = RequestBody.create(MEDIA_TYPE, json);
        Request request = new Request.Builder()
                .url("https://tapi.telstra.com/v2/messages/sms")
                .headers(headers)
                .post(body)
                .build();
        
        try {
            Response response = client.newCall(request).execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	private String getOAuth2Token() {
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
}
