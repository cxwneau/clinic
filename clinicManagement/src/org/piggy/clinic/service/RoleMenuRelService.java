package org.piggy.clinic.service;

import java.util.ArrayList;
import java.util.List;

import org.piggy.clinic.bo.BoRoleMenuRel;
import org.piggy.clinic.manager.RoleMenuRelManager;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.DynamicDict;
import org.piggy.core.services.BaseService;
import org.piggy.core.utils.BOHelper;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Controller;

@Controller("RoleMenuRelService")
public class RoleMenuRelService implements BaseService {

	@Override
	public DynamicDict doQueryService(DynamicDict dict) throws BaseAppException {
		return null;
	}

	@Override
	public DynamicDict doAtomService(DynamicDict dict) throws BaseAppException {
		if(dict.getServiceName().equals("MODIFY_ROLE_MENU_REL")){
			modifyRoleMenuRel(dict);
		}
		return dict;
	}

	private void modifyRoleMenuRel(DynamicDict dict) throws BaseAppException {
		//先删掉所有的
		RoleMenuRelManager manager = SpringUtils.getBean(RoleMenuRelManager.class);
		manager.deleteRoleMenuRelByRole(dict.getLong("ROLE_ID"));
		//再插入新的
		List<Object> list = BOHelper.boToListDto(dict, "RELS", BoRoleMenuRel.class);
		List<BoRoleMenuRel> newList = new ArrayList<BoRoleMenuRel>();
		for(Object obj : list){
			newList.add((BoRoleMenuRel)obj);
		}
		if(newList.size()>0){
			manager.addRoleMenuRelBatch(newList);
		}
		
	}
}
