package au.elec5619.mailstrom.services.interfaces;

import java.util.List;

import au.elec5619.mailstrom.models.Template;

public interface ITemplateService {
	Template getTemplateById(long id);
	List<Template> getTemplatesByUserId(long id);
	List<Template> getPublicTemplates();
	void addTemplate(Template template);
	void updateTemplate(Template template);
	void deleteTemplateById(long id);
}
