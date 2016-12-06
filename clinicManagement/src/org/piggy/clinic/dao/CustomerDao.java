package org.piggy.clinic.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.piggy.clinic.bo.BoCustomer;
import org.piggy.core.db.DbExecutor;
import org.piggy.core.db.SqlGenerator;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.utils.SpringUtil;
import org.springframework.stereotype.Repository;


@Repository("CustomerDao")
public class CustomerDao {
	
	public void addCustomer(BoCustomer customer) throws BaseAppException {
		String sql = SqlGenerator.generateInsertSql(customer);
		Map<String,Object> paraMap = customer.valueMap;
		SpringUtil.getSpringBeanFactory().getBean(DbExecutor.class).executeUpdate(sql, paraMap);
	}
	public void updateCustomer(BoCustomer customer) throws BaseAppException {
		String sql = SqlGenerator.generateUpdateSql(customer, BoCustomer.s_c_custId);
		Map<String,Object> paraMap = customer.valueMap;
		SpringUtil.getSpringBeanFactory().getBean(DbExecutor.class).executeUpdate(sql, paraMap);
	}
	public void deleteCustomer(BoCustomer customer) throws BaseAppException {
		String sql = SqlGenerator.generateDeleteSql(customer, BoCustomer.s_c_custId);
		Map<String,Object> paraMap = customer.valueMap;
		SpringUtil.getSpringBeanFactory().getBean(DbExecutor.class).executeUpdate(sql, paraMap);
	}
	
	public List<BoCustomer> queryCustomer(BoCustomer customer) throws BaseAppException {
		List<BoCustomer> resultList = new ArrayList<BoCustomer>();
		String sql = "SELECT * FROM tcm_customer WHERE cust_id=:CUST_ID";
		Map<String,Object> paraMap = new HashMap<>();
		paraMap.put("CUST_ID", customer.getCustId());
		SpringUtil.getSpringBeanFactory().getBean(DbExecutor.class).executeQueryList(sql, paraMap, BoCustomer.class,resultList);
		return resultList;
	}
}
