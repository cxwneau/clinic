package org.piggy.clinic.service;

import org.piggy.clinic.bo.BoOperator;
import org.piggy.clinic.manager.OperatorManager;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.DynamicDict;
import org.piggy.core.services.BaseService;
import org.piggy.core.utils.BOHelper;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Controller;

@Controller("OperatorService")
public class OperatorService implements BaseService {

	@Override
	public DynamicDict doQueryService(DynamicDict dict) throws BaseAppException {
		return null;
	}

	@Override
	public DynamicDict doAtomService(DynamicDict dict) throws BaseAppException {
		if(dict.getServiceName().equals("ADD_OPERATOR")){
			addOperator(dict);
		}
		if(dict.getServiceName().equals("MODIFY_OPERATOR")){
			modifyOperator(dict);
		}
		if(dict.getServiceName().equals("DELETE_OPERATOR")){
			deleteOperator(dict);
		}
		if(dict.getServiceName().equals("VALIDATE_LOGIN")){
			validateLogin(dict);
		}
		return dict;
	}
	private void validateLogin(DynamicDict dict) throws BaseAppException {
		OperatorManager manager = SpringUtils.getSpringBeanFactory().getBean(OperatorManager.class);
		BoOperator operator = (BoOperator)BOHelper.boToDto(dict, BoOperator.class);
		BoOperator ret = manager.queryOperator(operator);
		if(ret != null){
			dict.set("OPERATOR_ID", ret.getOperatorId());
			dict.set("LOGIN_NAME", ret.getLoginName());
			dict.set("RETURN_CODE", "SUCCESS");
		}else{
			dict.set("RETURN_CODE", "WRONG_PASSWORD");
		}
	}
	private void deleteOperator(DynamicDict dict) throws BaseAppException {
		OperatorManager manager = SpringUtils.getSpringBeanFactory().getBean(OperatorManager.class);
		BoOperator operator = (BoOperator)BOHelper.boToDto(dict, BoOperator.class);
		manager.deleteOperator(operator);
		
	}

	private void modifyOperator(DynamicDict dict) throws BaseAppException {
		OperatorManager manager = SpringUtils.getSpringBeanFactory().getBean(OperatorManager.class);
		BoOperator operator = (BoOperator)BOHelper.boToDto(dict, BoOperator.class);
		manager.updateOperator(operator);
	}

	private void addOperator(DynamicDict dict) throws BaseAppException {
		OperatorManager manager = SpringUtils.getSpringBeanFactory().getBean(OperatorManager.class);
		BoOperator operator = (BoOperator)BOHelper.boToDto(dict, BoOperator.class);
		manager.addOperator(operator);
	}
}
