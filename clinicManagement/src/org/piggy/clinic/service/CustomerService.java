package org.piggy.clinic.service;

import org.piggy.clinic.bo.BoCustomer;
import org.piggy.clinic.manager.CustomerManager;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.DynamicDict;
import org.piggy.core.services.BaseService;
import org.piggy.core.utils.BOHelper;
import org.piggy.core.utils.SpringUtil;
import org.springframework.stereotype.Controller;

@Controller("CustomerService")
public class CustomerService implements BaseService {

	@Override
	public DynamicDict doQueryService(DynamicDict dict) throws BaseAppException {
		return null;
	}

	@Override
	public DynamicDict doAtomService(DynamicDict dict) throws BaseAppException {
		if(dict.getServiceName().equals("ADD_CUSTOMER")){
			addCustomer(dict);
		}
		if(dict.getServiceName().equals("MODIFY_CUSTOMER")){
			modifyCustomer(dict);
		}
		if(dict.getServiceName().equals("DELETE_CUSTOMER")){
			deleteCustomer(dict);
		}
		return dict;
	}

	private void deleteCustomer(DynamicDict dict) throws BaseAppException {
		CustomerManager manager = SpringUtil.getSpringBeanFactory().getBean(CustomerManager.class);
		BoCustomer customer = (BoCustomer)BOHelper.boToDto(dict, BoCustomer.class);
		manager.deleteCustomer(customer);
		
	}

	private void modifyCustomer(DynamicDict dict) throws BaseAppException {
		CustomerManager manager = SpringUtil.getSpringBeanFactory().getBean(CustomerManager.class);
		BoCustomer customer = (BoCustomer)BOHelper.boToDto(dict, BoCustomer.class);
		manager.updateCustomer(customer);
	}

	private void addCustomer(DynamicDict dict) throws BaseAppException {
		CustomerManager manager = SpringUtil.getSpringBeanFactory().getBean(CustomerManager.class);
		BoCustomer customer = (BoCustomer)BOHelper.boToDto(dict, BoCustomer.class);
		manager.addCustomer(customer);
	}
}
