package org.piggy.clinic.manager;

import java.util.Date;
import java.util.List;

import org.piggy.clinic.bo.BoCustomer;
import org.piggy.clinic.dao.CustomerDao;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.BO;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Service;

@Service("CustomerManager")
public class CustomerManager {
	
	public void addCustomer(BoCustomer customer) throws BaseAppException {
		CustomerDao dao = SpringUtils.getBean(CustomerDao.class);
		customer.setOperTime(new Date());
		dao.addCustomer(customer);
	}
	
	public void updateCustomer(BoCustomer customer) throws BaseAppException {
		CustomerDao dao = SpringUtils.getBean(CustomerDao.class);
		customer.setOperTime(new Date());
		dao.updateCustomer(customer);
	}
	
	public void deleteCustomer(BoCustomer customer) throws BaseAppException {
		CustomerDao dao = SpringUtils.getBean(CustomerDao.class);
		dao.deleteCustomer(customer);
	}
	
	public BoCustomer queryCustomer (BoCustomer customer) throws BaseAppException {
		CustomerDao dao = SpringUtils.getBean(CustomerDao.class);
		List<BO> customerList = dao.queryCustomer(customer);
		if (customerList.size() > 0) {
			return (BoCustomer)customerList.get(0);
		}else{
			return null;
		}
	}
}
