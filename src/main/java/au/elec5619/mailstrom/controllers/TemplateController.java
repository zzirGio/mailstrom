package au.elec5619.mailstrom.controllers;

import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import au.elec5619.mailstrom.exceptions.InternalServerErrorException;
import au.elec5619.mailstrom.exceptions.NotFoundException;
import au.elec5619.mailstrom.models.Template;
import au.elec5619.mailstrom.services.interfaces.ITemplateService;

@CrossOrigin
@RestController
@RequestMapping("/api/template")
public class TemplateController {
	private ITemplateService templateService;

	@Autowired
	public void setTemplateService(ITemplateService templateService) {
		this.templateService = templateService;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getTemplate(@PathVariable("id") long id) {
		Template template = this.templateService.getTemplateById(id);
		if (template == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		try {
			return new ResponseEntity<>(
					new ObjectMapper().writeValueAsString(template),
					HttpStatus.OK
					);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/private-list/{userId}", method = RequestMethod.GET)
	public ResponseEntity<?> getPrivateTemplates(@PathVariable("userId") long userId) {
		List<Template> templateList = this.templateService.getTemplatesByUserId(userId);
		ObjectMapper mapper = new ObjectMapper();
		try {
			String result = mapper.writeValueAsString(templateList);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/public-list/", method = RequestMethod.GET)
	public ResponseEntity<?> getPublicTemplates() {
		List<Template> templateList = this.templateService.getPublicTemplates();
		ObjectMapper mapper = new ObjectMapper();
		try {
			String result = mapper.writeValueAsString(templateList);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/create", method = RequestMethod.POST)
	public ResponseEntity<?> addTemplate(@RequestBody String templateJson) {
		ObjectMapper mapper = new ObjectMapper();
		Template template;
		try {
			template = mapper.readValue(templateJson, Template.class);
			this.templateService.addTemplate(template);
		} catch (Exception e) {
			throw new InternalServerErrorException("Unable to save template to database");
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateTemplate(@PathVariable("id") long id, @RequestBody String templateJson) {
		Template template = this.templateService.getTemplateById(id);
		if(template == null) {
			throw new NotFoundException("Template does not exist. Cannot be updated.");
		}
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			Template updatedTemplate = mapper.readValue(templateJson, Template.class);
			template.setTitle(updatedTemplate.getTitle());
			template.setContent(updatedTemplate.getContent());
			template.setIsPublic(updatedTemplate.getIsPublic());
			this.templateService.updateTemplate(template);
		} catch (Exception e) {
			throw new InternalServerErrorException();
		}
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.DELETE)                                                     
	public ResponseEntity<?> deleteTemplate(@PathVariable("id") long id) {
		this.templateService.deleteTemplateById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
