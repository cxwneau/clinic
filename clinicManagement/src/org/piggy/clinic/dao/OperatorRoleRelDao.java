package org.piggy.clinic.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.piggy.clinic.bo.BoOperatorRoleRel;
import org.piggy.core.db.SqlGenerator;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.utils.DBAccessUtils;
import org.springframework.stereotype.Repository;


@Repository("OperatorRoleRelDao")
public class OperatorRoleRelDao {
	
	public void addOperatorRoleRel(BoOperatorRoleRel OperatorRoleRel) throws BaseAppException {
		String sql = SqlGenerator.generateInsertSql(OperatorRoleRel);
		Map<String,Object> paraMap = OperatorRoleRel.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void addOperatorRoleRelBatch(List<BoOperatorRoleRel> list) throws BaseAppException {
		String sql = SqlGenerator.generateInsertSql(list.get(0));
		Map<String,Object> [] paraMap = SqlGenerator.generateParamBatch(list);
		DBAccessUtils.getDbOperator().batchUpdate(sql, paraMap);
	}
	public void deleteOperatorRoleRel(BoOperatorRoleRel role) throws BaseAppException {
		String sql = SqlGenerator.generateDeleteSql(role, BoOperatorRoleRel.s_c_operatorId);
		Map<String,Object> paraMap = role.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void deleteOperatorRoleRelByRole(long opeartorId) throws BaseAppException {
		String sql = "delete from operator_role_rel where OPERATOR_ID=:OPERATOR_ID";
		Map<String,Object> paraMap = new HashMap<>();
		paraMap.put("OPERATOR_ID", opeartorId);
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
}
