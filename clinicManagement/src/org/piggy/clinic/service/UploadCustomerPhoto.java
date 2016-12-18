package org.piggy.clinic.service;

import java.io.File;
import java.io.PrintWriter;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.piggy.core.common.Common;
import org.piggy.core.common.StaticParamUtil;
import org.piggy.core.services.BaseUploadService;
import org.springframework.stereotype.Service;

@Service("UploadCustomerPhoto")
public class UploadCustomerPhoto implements BaseUploadService {
	@SuppressWarnings("unchecked")
	public void doUpload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		List<FileItem> items = upload.parseRequest(request);
		String returnPath = "";
		for (FileItem item : items) {
			if (!item.isFormField()) {
				String filePath = (String) StaticParamUtil.getStaticParam(Common.UPLOAD_PATH, "LOCAL_PATH");
				System.out.println("path-->"+filePath);
				File dir = new File(request.getServletContext().getRealPath(File.separator) + filePath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String fileEnd = item.getFieldName().substring(item.getFieldName().lastIndexOf(".") + 1).toLowerCase();
				String uuid = UUID.randomUUID().toString();
				StringBuffer sbRealPath = new StringBuffer();
				sbRealPath.append(dir).append(File.separator).append(uuid).append(".").append(fileEnd);
				File file = new File(sbRealPath.toString());

				item.write(file);

				returnPath = filePath + uuid + "." + fileEnd;
			}
		}
		PrintWriter pw = response.getWriter();
		JSONObject ret = new JSONObject();
		ret.put("success", "true");
		ret.put("returnPath", returnPath);
		pw.print(ret.toString());
		pw.close();
	}
}
