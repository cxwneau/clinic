package org.piggy.clinic.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.piggy.clinic.bo.BoCustomer;
import org.piggy.core.db.SqlGenerator;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.BO;
import org.piggy.core.utils.DBAccessUtils;
import org.springframework.stereotype.Repository;


@Repository("CustomerDao")
public class CustomerDao {
	
	public void addCustomer(BoCustomer customer) throws BaseAppException {
		String sql = SqlGenerator.generateInsertSql(customer);
		Map<String,Object> paraMap = customer.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void updateCustomer(BoCustomer customer) throws BaseAppException {
		String sql = SqlGenerator.generateUpdateSql(customer, BoCustomer.s_c_custId);
		Map<String,Object> paraMap = customer.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void deleteCustomer(BoCustomer customer) throws BaseAppException {
		String sql = SqlGenerator.generateDeleteSql(customer, BoCustomer.s_c_custId);
		Map<String,Object> paraMap = customer.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	
	public List<BO> queryCustomer(BoCustomer customer) throws BaseAppException {
		String sql = "SELECT * FROM tcm_customer WHERE cust_id=:CUST_ID";
		Map<String,Object> paraMap = new HashMap<>();
		paraMap.put("CUST_ID", customer.getCustId());
		List<BO> resultList = DBAccessUtils.getDbOperator().queryBOList(sql, paraMap, BoCustomer.class.getName());
		return resultList;
	}
}
