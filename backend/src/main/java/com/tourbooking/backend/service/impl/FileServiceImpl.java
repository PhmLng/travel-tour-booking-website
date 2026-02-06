package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileServiceImpl implements FileService {
    private final String UPLOAD_DIR = "uploads/";

    @Override
    public String storeFile(MultipartFile file) {

        try {
            // 1. Tạo thư mục nếu chưa có
            File folder = new File(UPLOAD_DIR);
            if (!folder.exists()) folder.mkdirs();

            // 2. Tạo tên file duy nhất (Tránh trùng ảnh)
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            // 3. Đường dẫn lưu file vật lý
            Path targetLocation = Paths.get(UPLOAD_DIR).toAbsolutePath().resolve(fileName);

            // 4. Copy file vào thư mục
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // 5. Trả về đường dẫn để FE dùng (chỉ là String thôi)
            return "/uploads/" + fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Không thể lưu file. Vui lòng thử lại!", ex);
        }
    }
}
