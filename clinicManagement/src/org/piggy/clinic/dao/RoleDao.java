package org.piggy.clinic.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.piggy.clinic.bo.BoRole;
import org.piggy.core.db.SqlGenerator;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.BO;
import org.piggy.core.utils.DBAccessUtils;
import org.springframework.stereotype.Repository;


@Repository("RoleDao")
public class RoleDao {
	
	public void addRole(BoRole role) throws BaseAppException {
		String sql = SqlGenerator.generateInsertSql(role);
		Map<String,Object> paraMap = role.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void updateRole(BoRole role) throws BaseAppException {
		String sql = SqlGenerator.generateUpdateSql(role, BoRole.s_c_roleId);
		Map<String,Object> paraMap = role.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void deleteRole(BoRole role) throws BaseAppException {
		String sql = SqlGenerator.generateDeleteSql(role, BoRole.s_c_roleId);
		Map<String,Object> paraMap = role.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	
	public List<BO> queryRole(BoRole role) throws BaseAppException {
		String sql = "SELECT * FROM role WHERE ROLE_ID=:ROLE_ID";
		Map<String,Object> paraMap = new HashMap<>();
		paraMap.put("ROLE_ID", role.getRoleId());
		List<BO> resultList = DBAccessUtils.getDbOperator().queryBOList(sql, paraMap, BoRole.class.getName());
		return resultList;
	}
}
