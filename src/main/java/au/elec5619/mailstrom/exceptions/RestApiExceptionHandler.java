package au.elec5619.mailstrom.exceptions;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestApiExceptionHandler extends ResponseEntityExceptionHandler { 
	
	private ObjectMapper mapper;
	
	public RestApiExceptionHandler() {
        super();
        mapper = new ObjectMapper();
    }
	
    @ExceptionHandler({ NotFoundException.class })
    protected ResponseEntity<String> handleNotFound(final RuntimeException ex, final WebRequest request)
    		throws JsonGenerationException, JsonMappingException, IOException {
    	
    	final ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, ex.getLocalizedMessage(), ex.getMessage());
    	return new ResponseEntity<>(this.mapper.writeValueAsString(apiError),
    			new HttpHeaders(), apiError.getStatus());
    }
	
    @ExceptionHandler({ BadRequestException.class })
    protected ResponseEntity<String> handleBadRequest(final RuntimeException ex, final WebRequest request)
    		throws JsonGenerationException, JsonMappingException, IOException {
    	
    	final HttpHeaders httpHeaders = new HttpHeaders();
	    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
	    
    	final ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), ex.getMessage());
    	return new ResponseEntity<>(this.mapper.writeValueAsString(apiError), httpHeaders, apiError.getStatus());
    }

    @ExceptionHandler({ ConflictException.class })
    protected ResponseEntity<String> handleConflict(final RuntimeException ex, final WebRequest request)
    		throws JsonGenerationException, JsonMappingException, IOException {
    	
    	final HttpHeaders httpHeaders= new HttpHeaders();
	    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    	
    	final ApiError apiError = new ApiError(HttpStatus.CONFLICT, ex.getLocalizedMessage(), ex.getMessage());
    	return new ResponseEntity<>(this.mapper.writeValueAsString(apiError), httpHeaders, apiError.getStatus());  	
    }

    @ExceptionHandler({ InternalServerErrorException.class })
    public ResponseEntity<String> handleInternalServerError(final Exception ex, final WebRequest request)
    		throws JsonGenerationException, JsonMappingException, IOException {
    	
    	final HttpHeaders httpHeaders= new HttpHeaders();
	    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    	
    	final ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex.getLocalizedMessage(), "error occurred");
    	return new ResponseEntity<>(this.mapper.writeValueAsString(apiError), httpHeaders, apiError.getStatus());
    }
}
