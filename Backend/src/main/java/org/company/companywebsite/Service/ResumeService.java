package org.company.companywebsite.Service;


import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Service
public class ResumeService {

    private final Path uploadDir = Paths.get("uploads/pdfs/");
    Path uploadPath = Paths.get(System.getProperty("user.dir")).resolve(uploadDir);
    public String uploadResume(MultipartFile file) throws IOException {
        if (file.isEmpty() || !Objects.requireNonNull(file.getOriginalFilename()).endsWith(".pdf")) {
            return "Please upload a PDF file";
        }

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String fileName = Paths.get(file.getOriginalFilename()).getFileName().toString();
        Path destination = uploadPath.resolve(fileName);
        file.transferTo(destination.toFile());
        return destination.toString();
    }


    public Resource getResumePdf(String fileName) throws IOException {
        Path filePath = uploadPath.resolve(fileName).normalize();

        if (!Files.exists(filePath)) {
            throw new IOException("File not found: " + fileName);
        }

        UrlResource resource;
        try {
            resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                throw new IOException("File not found: " + fileName);
            }
        } catch (MalformedURLException e) {
            throw new IOException("Malformed file path", e);
        }
        return resource;
    }
}
