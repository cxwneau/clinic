package org.piggy.clinic.bo;

import java.util.Date;

import org.piggy.core.model.BO;

public class BoMaterial extends BO {
	public static String s_c_materialId = "MATERIAL_ID";
	public static String s_c_materialNo = "MATERIAL_NO";
	public static String s_c_model = "MODEL";
	public static String s_c_resType = "RES_TYPE";
	public static String s_c_materialPrice = "MATERIAL_PRICE";
	public static String s_c_number = "NUMBER";
	public static String s_c_materialStatus = "MATERIAL_STATUS";
	public static String s_c_materialImg = "MATERIAL_IMG";
	public static String s_c_materialType = "MATERIAL_TYPE";
	public static String s_c_serialNo = "SERIAL_NO";
	public static String s_c_opId = "OP_ID";
	public static String s_c_orgId = "ORG_ID";
	public static String s_c_operTime = "OPER_TIME";
	
	
	
	private String s_c_tableName = "TRM_MATERIAL";
	
	private long materialId;
	private String materialNo;
	private String model;
	private String resType;
	private long materialPrice;
	private long number;
	private long materialStatus;
	private String materialImg;
	private String materialType;
	private String serialNo;
	private long opId;
	private long orgId;
	private Date operTime;
	
	public long getMaterialId() {
		return (long)valueMap.get(s_c_materialId);
	}
	public void setMaterialId(long materialId) {
		valueMap.put(s_c_materialId, materialId);
	}

	public String getMaterialNo() {
		return (String)valueMap.get(s_c_materialNo);
	}
	public void setMaterialNo(String materialNo) {
		valueMap.put(s_c_materialNo, materialNo);
	}

	public String getModel() {
		return (String)valueMap.get(s_c_model);
	}
	public void setModel(String model) {
		valueMap.put(s_c_model, model);
	}

	public String getResType() {
		return (String)valueMap.get(s_c_resType);
	}
	public void setResType(String resType) {
		valueMap.put(s_c_resType, resType);
	}

	public long getMaterialPrice() {
		return (long)valueMap.get(s_c_materialPrice);
	}
	public void setMaterialPrice(long materialPrice) {
		valueMap.put(s_c_materialPrice, materialPrice);
	}

	public long getNumber() {
		return (long)valueMap.get(s_c_number);
	}
	public void setNumber(long number) {
		valueMap.put(s_c_number, number);
	}

	public long getMaterialStatus() {
		return (long)valueMap.get(s_c_materialStatus);
	}
	public void setMaterialStatus(long materialStatus) {
		valueMap.put(s_c_materialStatus, materialStatus);
	}

	public String getMaterialImg() {
		return (String)valueMap.get(s_c_materialImg);
	}
	public void setMaterialImg(String materialImg) {
		valueMap.put(s_c_materialImg, materialImg);
	}

	public String getMaterialType() {
		return (String)valueMap.get(s_c_materialType);
	}
	public void setMaterialType(String materialType) {
		valueMap.put(s_c_materialType, materialType);
	}

	public String getSerialNo() {
		return (String)valueMap.get(s_c_serialNo);
	}
	public void setSerialNo(String serialNo) {
		valueMap.put(s_c_serialNo, serialNo);
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
	
	@Override
	public String tableName() {
		return s_c_tableName;
	}
}
