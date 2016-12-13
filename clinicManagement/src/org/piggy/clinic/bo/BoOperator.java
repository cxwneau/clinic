package org.piggy.clinic.bo;

import java.util.Date;

import org.piggy.core.model.BO;

public class BoOperator extends BO {
	public static String s_c_operatorId = "OPERATOR_ID";
	public static String s_c_operatorName = "OPERATOR_NAME";
	public static String s_c_phone = "PHONE";
	public static String s_c_email = "EMAIL";
	public static String s_c_loginName = "LOGIN_NAME";
	public static String s_c_password = "PASSWORD";
	public static String s_c_status = "STATUS";
	public static String s_c_statusTime = "STATUS_TIME";
	public static String s_c_opId = "OP_ID";
	public static String s_c_expireDate = "EXPIRE_DATE";
	public static String s_c_comment = "COMMENT";
	
	
	
	private String s_c_tableName = "operator";
	
	private long operatorId;
	private String operatorName;
	private String phone;
	private String email;
	private String loginName;
	private String password;
	private String status;
	private Date statusTime;
	private String opId;
	private Date expireDate;
	private String comment;
	
	
	
	public long getOperatorId() {
		return (long)valueMap.get(s_c_operatorId);
	}
	public void setOperatorId(long operatorId) {
		valueMap.put(s_c_operatorId, operatorId);
	}

	public String getOperatorName() {
		return (String)valueMap.get(s_c_operatorName);
	}
	public void setOperatorName(String operatorName) {
		valueMap.put(s_c_operatorName, operatorName);
	}

	public String getPhone() {
		return (String)valueMap.get(s_c_phone);
	}
	public void setPhone(String phone) {
		valueMap.put(s_c_phone, phone);
	}

	public String getEmail() {
		return (String)valueMap.get(s_c_email);
	}
	public void setEmail(String email) {
		valueMap.put(s_c_email, email);
	}

	public String getLoginName() {
		return (String)valueMap.get(s_c_loginName);
	}
	public void setLoginName(String loginName) {
		valueMap.put(s_c_loginName, loginName);
	}

	public String getPassword() {
		return (String)valueMap.get(s_c_password);
	}
	public void setPassword(String password) {
		valueMap.put(s_c_password, password);
	}

	public String getStatus() {
		return (String)valueMap.get(s_c_status);
	}
	public void setStatus(String status) {
		valueMap.put(s_c_status, status);
	}

	public Date getStatusTime() {
		return (Date)valueMap.get(s_c_statusTime);
	}
	public void setStatusTime(Date statusTime) {
		valueMap.put(s_c_statusTime, statusTime);
	}

	public long getOpId() {
		return (long)valueMap.get(s_c_opId);
	}
	public void setOpId(long opId) {
		valueMap.put(s_c_opId, opId);
	}

	public Date getExpireDate() {
		return (Date)valueMap.get(s_c_expireDate);
	}
	public void setExpireDate(Date expireDate) {
		valueMap.put(s_c_expireDate, expireDate);
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
