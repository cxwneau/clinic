package org.piggy.clinic.bo;

import java.util.Date;

import org.piggy.core.model.BO;

public class BoCustomer extends BO {
	public static String s_c_custId = "CUST_ID";
	public static String s_c_custNo = "CUST_NO";
	public static String s_c_custName = "CUST_NAME";
	public static String s_c_birthday = "BIRTHDAY";
	public static String s_c_sex = "SEX";
	public static String s_c_certificateType = "CERTIFICATE_TYPE";
	public static String s_c_certificate = "CERTIFICATE";
	public static String s_c_phonenumber = "PHONENUMBER";
	public static String s_c_custAddress = "CUST_ADDRESS";
	public static String s_c_otherContactinfo = "OTHER_CONTACTINFO";
	public static String s_c_opId = "OP_ID";
	public static String s_c_orgId = "ORG_ID";
	public static String s_c_operTime = "OPER_TIME";
	public static String s_c_icon = "ICON";
	
	
	
	private String s_c_tableName = "tcm_customer";
	
	private long custId;
	private long custNo;
	private String custName;
	private Date birthday;
	private long sex;
	private long certificateType;
	private String certificate;
	private String phonenumber;
	private String custAddress;
	private String otherContactinfo;
	private long opId;
	private long orgId;
	private Date operTime;
	private String icon;
	
	public long getCustId() {
		return (long)valueMap.get(s_c_custId);
	}
	public void setCustId(long custId) {
		valueMap.put(s_c_custId, custId);
	}

	public long getCustNo() {
		return (long)valueMap.get(s_c_custNo);
	}
	public void setCustNo(long custNo) {
		valueMap.put(s_c_custNo, custNo);
	}

	public String getCustName() {
		return (String)valueMap.get(s_c_custName);
	}
	public void setCustName(String custName) {
		valueMap.put(s_c_custName, custName);
	}

	public Date getBirthday() {
		return (Date)valueMap.get(s_c_birthday);
	}
	public void setBirthday(Date birthday) {
		valueMap.put(s_c_birthday, birthday);
	}

	public long getSex() {
		return (long)valueMap.get(s_c_sex);
	}
	public void setSex(long sex) {
		valueMap.put(s_c_sex, sex);
	}

	public long getCertificateType() {
		return (long)valueMap.get(s_c_certificateType);
	}
	public void setCertificateType(long certificateType) {
		valueMap.put(s_c_certificateType, certificateType);
	}
	
	public String getCertificate() {
		return (String)valueMap.get(s_c_certificate);
	}
	public void setCertificate(String certificate) {
		valueMap.put(s_c_certificate, certificate);
	}

	public String getPhonenumber() {
		return (String)valueMap.get(s_c_phonenumber);
	}
	public void setPhonenumber(String phonenumber) {
		valueMap.put(s_c_phonenumber, phonenumber);
	}

	public String getCustAddress() {
		return (String)valueMap.get(s_c_custAddress);
	}
	public void setCustAddress(String custAddress) {
		valueMap.put(s_c_custAddress, custAddress);
	}

	public String getOtherContactinfo() {
		return (String)valueMap.get(s_c_otherContactinfo);
	}
	public void setOtherContactinfo(String otherContactinfo) {
		valueMap.put(s_c_otherContactinfo, otherContactinfo);
	}

	public long getOpId() {
		return (long)valueMap.get(s_c_opId);
	}
	public void setOpId(long opId) {
		valueMap.put(s_c_opId, opId);
	}

	public long getOrgId() {
		return (long)valueMap.get(s_c_orgId);
	}
	public void setOrgId(long orgId) {
		valueMap.put(s_c_orgId, orgId);
	}

	public Date getOperTime() {
		return (Date)valueMap.get(s_c_operTime);
	}
	public void setOperTime(Date operTime) {
		valueMap.put(s_c_operTime, operTime);
	}

	public String getIcon() {
		return (String)valueMap.get(s_c_icon);
	}
	public void setIcon(String icon) {
		valueMap.put(s_c_icon, icon);
	}

	
	@Override
	public String tableName() {
		return s_c_tableName;
	}
}
