package org.piggy.clinic.bo;


import org.piggy.core.model.BO;

public class BoOperatorRoleRel extends BO {
	public static String s_c_operatorId = "OPERATOR_ID";
	public static String s_c_roleId = "ROLE_ID";
	
	
	
	private String s_c_tableName = "operator_role_rel";
	
	private long operatorId;
	private long roleId;
	
	public long getOperatorId() {
		return (long)valueMap.get(s_c_operatorId);
	}
	public void setOperatorId(long operatorId) {
		valueMap.put(s_c_operatorId, operatorId);
	}
	
	public long getRoleId() {
		return (long)valueMap.get(s_c_roleId);
	}
	public void setRoleId(long roleId) {
		valueMap.put(s_c_roleId, roleId);
	}
	
	@Override
	public String tableName() {
		return s_c_tableName;
	}
}
