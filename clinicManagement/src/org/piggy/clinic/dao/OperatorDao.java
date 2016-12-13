package org.piggy.clinic.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.piggy.clinic.bo.BoOperator;
import org.piggy.core.db.SqlGenerator;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.BO;
import org.piggy.core.utils.DBAccessUtils;
import org.springframework.stereotype.Repository;


@Repository("OperatorDao")
public class OperatorDao {
	
	public void addOperator(BoOperator operator) throws BaseAppException {
		String sql = SqlGenerator.generateInsertSql(operator);
		Map<String,Object> paraMap = operator.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void updateOperator(BoOperator operator) throws BaseAppException {
		String sql = SqlGenerator.generateUpdateSql(operator, BoOperator.s_c_operatorId);
		Map<String,Object> paraMap = operator.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void deleteOperator(BoOperator operator) throws BaseAppException {
		String sql = SqlGenerator.generateDeleteSql(operator, BoOperator.s_c_operatorId);
		Map<String,Object> paraMap = operator.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	
	public List<BO> queryOperator(BoOperator operator) throws BaseAppException {
		String sql = "SELECT * FROM operator WHERE LOGIN_NAME=:LOGIN_NAME and PASSWORD=:PASSWORD";
		Map<String,Object> paraMap = new HashMap<>();
		paraMap.put("LOGIN_NAME", operator.getLoginName());
		paraMap.put("PASSWORD", operator.getPassword());
		List<BO> resultList = DBAccessUtils.getDbOperator().queryBOList(sql, paraMap, BoOperator.class.getName());
		return resultList;
	}
	
}
