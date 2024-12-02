package com.ssafy.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileStorageUtil {

    private final String uploadPath = System.getProperty("user.dir") + "/uploads/review-images/";

//  파일 저장
    public String saveFile(MultipartFile file) throws IOException {
        // 디렉토리 생성
        File directory = new File(uploadPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 파일명 생성
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

        // 저장
        String fullPath = uploadPath + uniqueFileName;
        file.transferTo(new File(fullPath));
        return "/uploads/review-images/" + uniqueFileName;
    }

//  파일 삭제
    public void deleteFile(String filePath) {
        File file = new File(System.getProperty("user.dir") + filePath);
        if (file.exists()) {
            file.delete();
        }
    }
}
