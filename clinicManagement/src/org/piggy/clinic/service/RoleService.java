package org.piggy.clinic.service;

import org.piggy.clinic.bo.BoRole;
import org.piggy.clinic.manager.RoleManager;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.DynamicDict;
import org.piggy.core.services.BaseService;
import org.piggy.core.utils.BOHelper;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Controller;

@Controller("RoleService")
public class RoleService implements BaseService {

	@Override
	public DynamicDict doQueryService(DynamicDict dict) throws BaseAppException {
		return null;
	}

	@Override
	public DynamicDict doAtomService(DynamicDict dict) throws BaseAppException {
		if(dict.getServiceName().equals("ADD_ROLE")){
			addRole(dict);
		}
		if(dict.getServiceName().equals("MODIFY_ROLE")){
			modifyRole(dict);
		}
		if(dict.getServiceName().equals("DELETE_ROLE")){
			deleteRole(dict);
		}
		return dict;
	}

	private void deleteRole(DynamicDict dict) throws BaseAppException {
		RoleManager manager = SpringUtils.getSpringBeanFactory().getBean(RoleManager.class);
		BoRole role = (BoRole)BOHelper.boToDto(dict, BoRole.class);
		manager.deleteRole(role);
		
	}

	private void modifyRole(DynamicDict dict) throws BaseAppException {
		RoleManager manager = SpringUtils.getSpringBeanFactory().getBean(RoleManager.class);
		BoRole role = (BoRole)BOHelper.boToDto(dict, BoRole.class);
		manager.updateRole(role);
	}

	private void addRole(DynamicDict dict) throws BaseAppException {
		RoleManager manager = SpringUtils.getSpringBeanFactory().getBean(RoleManager.class);
		BoRole role = (BoRole)BOHelper.boToDto(dict, BoRole.class);
		manager.addRole(role);
	}
}
