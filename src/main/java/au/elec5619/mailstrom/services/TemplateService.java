package au.elec5619.mailstrom.services;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import au.elec5619.mailstrom.models.Template;
import au.elec5619.mailstrom.services.interfaces.ITemplateService;

@Service
@Transactional
public class TemplateService implements ITemplateService {
	
	private SessionFactory sessionFactory;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public Template getTemplateById(long id) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		return (Template) currentSession.get(Template.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Template> getTemplatesByUserId(long userId) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		Query query = currentSession.createQuery(
				"FROM Template WHERE UserId = :userId AND IsPublic = False");
		query.setParameter("userId", userId);
		return query.list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Template> getPublicTemplates() {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		Query query = currentSession.createQuery(
				"FROM Template WHERE IsPublic = True");
		return query.list();
	}
	
	@Override
	public void addTemplate(Template template) {
		this.sessionFactory.getCurrentSession().save(template);
	}

	@Override
	public void updateTemplate(Template template) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		currentSession.merge(template);	
	}

	@Override
	public void deleteTemplateById(long id) {
		final Session currentSession = this.sessionFactory.getCurrentSession();
		final Template template = (Template) currentSession.get(Template.class, id);
		currentSession.delete(template);
	}
	
}
