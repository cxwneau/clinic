package org.piggy.clinic.manager;

import java.util.List;

import org.piggy.clinic.bo.BoRole;
import org.piggy.clinic.dao.RoleDao;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.BO;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Service;

@Service("RoleManager")
public class RoleManager {
	
	public void addRole(BoRole role) throws BaseAppException {
		RoleDao dao = SpringUtils.getSpringBeanFactory().getBean(RoleDao.class);
		dao.addRole(role);
	}
	
	public void updateRole(BoRole role) throws BaseAppException {
		RoleDao dao = SpringUtils.getSpringBeanFactory().getBean(RoleDao.class);
		dao.updateRole(role);
	}
	
	public void deleteRole(BoRole role) throws BaseAppException {
		RoleDao dao = SpringUtils.getSpringBeanFactory().getBean(RoleDao.class);
		dao.deleteRole(role);
	}
	
	public BoRole queryRole (BoRole role) throws BaseAppException {
		RoleDao dao = SpringUtils.getSpringBeanFactory().getBean(RoleDao.class);
		List<BO> roleList = dao.queryRole(role);
		if (roleList.size() > 0) {
			return (BoRole)roleList.get(0);
		}else{
			return null;
		}
	}
}
