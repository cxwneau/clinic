package org.piggy.clinic.service;

import java.util.ArrayList;
import java.util.List;

import org.piggy.clinic.bo.BoOperatorRoleRel;
import org.piggy.clinic.manager.OperatorRoleRelManager;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.DynamicDict;
import org.piggy.core.services.BaseService;
import org.piggy.core.utils.BOHelper;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Controller;

@Controller("OperatorRoleRelService")
public class OperatorRoleRelService implements BaseService {

	@Override
	public DynamicDict doQueryService(DynamicDict dict) throws BaseAppException {
		return null;
	}

	@Override
	public DynamicDict doAtomService(DynamicDict dict) throws BaseAppException {
		if(dict.getServiceName().equals("MODIFY_OPERATOR_ROLE_REL")){
			modifyOperatorRoleRel(dict);
		}
		return dict;
	}

	private void modifyOperatorRoleRel(DynamicDict dict) throws BaseAppException {
		//先删除之前所有的
		OperatorRoleRelManager manager = SpringUtils.getSpringBeanFactory().getBean(OperatorRoleRelManager.class);
		manager.deleteOperatorRoleRelByRole(dict.getLong("OPERATOR_ID"));
		//再插入新的
		List<Object> list = BOHelper.boToListDto(dict, "RELS", BoOperatorRoleRel.class);
		List<BoOperatorRoleRel> newList = new ArrayList<BoOperatorRoleRel>();
		for(Object obj : list){
			newList.add((BoOperatorRoleRel)obj);
		}
		if(newList.size()>0){
			manager.addOperatorRoleRelBatch(newList);
		}
		
	}
}
