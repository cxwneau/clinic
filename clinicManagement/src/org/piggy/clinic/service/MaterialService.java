package org.piggy.clinic.service;

import org.piggy.clinic.bo.BoMaterial;
import org.piggy.clinic.manager.MaterialManager;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.DynamicDict;
import org.piggy.core.services.BaseService;
import org.piggy.core.utils.BOHelper;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Controller;

@Controller("MaterialService")
public class MaterialService implements BaseService {

	@Override
	public DynamicDict doQueryService(DynamicDict dict) throws BaseAppException {
		return null;
	}

	@Override
	public DynamicDict doAtomService(DynamicDict dict) throws BaseAppException {
		if(dict.getServiceName().equals("ADD_MATERIAL")){
			addMaterial(dict);
		}
		if(dict.getServiceName().equals("MODIFY_MATERIAL")){
			modifyMaterial(dict);
		}
		if(dict.getServiceName().equals("DELETE_MATERIAL")){
			deleteMaterial(dict);
		}
		return dict;
	}

	private void deleteMaterial(DynamicDict dict) throws BaseAppException {
		MaterialManager manager = SpringUtils.getBean(MaterialManager.class);
		BoMaterial material = (BoMaterial)BOHelper.boToDto(dict, BoMaterial.class);
		manager.delete(material);
		
	}

	private void modifyMaterial(DynamicDict dict) throws BaseAppException {
		MaterialManager manager = SpringUtils.getBean(MaterialManager.class);
		BoMaterial material = (BoMaterial)BOHelper.boToDto(dict, BoMaterial.class);
		manager.update(material);
	}

	private void addMaterial(DynamicDict dict) throws BaseAppException {
		MaterialManager manager = SpringUtils.getBean(MaterialManager.class);
		BoMaterial material = (BoMaterial)BOHelper.boToDto(dict, BoMaterial.class);
		manager.add(material);
	}
}
