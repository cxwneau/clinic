package org.piggy.clinic.bo;


import org.piggy.core.model.BO;

public class BoRole extends BO {
	public static String s_c_roleId = "ROLE_ID";
	public static String s_c_roleName = "ROLE_NAME";
	public static String s_c_comment = "COMMENT";
	
	
	
	private String s_c_tableName = "role";
	
	private long roleId;
	private String roleName;
	private String comment;
	
	public long getRoleId() {
		return (long)valueMap.get(s_c_roleId);
	}
	public void setRoleId(long roleId) {
		valueMap.put(s_c_roleId, roleId);
	}

	public String getRoleName() {
		return (String)valueMap.get(s_c_roleName);
	}
	public void setRoleName(String roleName) {
		valueMap.put(s_c_roleName, roleName);
	}

	public String getComment() {
		return (String)valueMap.get(s_c_comment);
	}
	public void setComment(String comment) {
		valueMap.put(s_c_comment, comment);
	}

	@Override
	public String tableName() {
		return s_c_tableName;
	}
}
