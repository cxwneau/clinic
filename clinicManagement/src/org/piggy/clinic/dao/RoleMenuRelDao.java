package org.piggy.clinic.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.piggy.clinic.bo.BoRoleMenuRel;
import org.piggy.core.db.SqlGenerator;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.utils.DBAccessUtils;
import org.springframework.stereotype.Repository;


@Repository("RoleMenuRelDao")
public class RoleMenuRelDao {
	
	public void addRoleMenuRel(BoRoleMenuRel roleMenuRel) throws BaseAppException {
		String sql = SqlGenerator.generateInsertSql(roleMenuRel);
		Map<String,Object> paraMap = roleMenuRel.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void addRoleMenuRelBatch(List<BoRoleMenuRel> list) throws BaseAppException {
		String sql = SqlGenerator.generateInsertSql(list.get(0));
		Map<String,Object> [] paraMap = SqlGenerator.generateParamBatch(list);
		DBAccessUtils.getDbOperator().batchUpdate(sql, paraMap);
	}
	public void deleteRoleMenuRel(BoRoleMenuRel role) throws BaseAppException {
		String sql = SqlGenerator.generateDeleteSql(role, BoRoleMenuRel.s_c_roleId);
		Map<String,Object> paraMap = role.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void deleteRoleMenuRelByRole(long roleId) throws BaseAppException {
		String sql = "delete from role_menu_rel where ROLE_ID=:ROLE_ID";
		Map<String,Object> paraMap = new HashMap<>();
		paraMap.put("ROLE_ID", roleId);
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
}
