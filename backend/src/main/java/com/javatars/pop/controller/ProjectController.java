package com.javatars.pop.controller;

import com.javatars.pop.model.Project;
import com.javatars.pop.model.ProjectDto;
import com.javatars.pop.model.Receipt;
import com.javatars.pop.model.ReceiptDtoOut;
import com.javatars.pop.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getProjects(@RequestParam String email) {
        List<ProjectDto> projectDtos = projectService.getProjects(email)
                .stream().map(Project::toProjectDto).toList();
        return ResponseEntity.ok(projectDtos);
    }

    @GetMapping("/withoutTax")
    public ResponseEntity<List<ProjectDto>> getProjectsWithoutTaxCategory(@RequestParam String email) {
        List<ProjectDto> projectDtos = projectService.getProjectsWithoutTaxCategory(email)
                .stream().map(Project::toProjectDto).toList();
        return ResponseEntity.ok(projectDtos);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProject(@RequestParam String email, @PathVariable Long id) {
        Project project = projectService.getProject(email, id);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project.toProjectDto());
    }

    @GetMapping("/{id}/receipts")
    public ResponseEntity<List<ReceiptDtoOut>> getProjectReceipts(@RequestParam String email, @PathVariable Long id) {
        Project project = projectService.getProject(email, id);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project.getReceiptList().stream().map(Receipt::getDtoOut).toList());
    }

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(@RequestParam String email, @RequestParam String title) {
        Project project = projectService.createProject(email, title);
        URI uri = URI.create("api/projects/" + project.getId());
        return ResponseEntity.created(uri).body(project.toProjectDto());
    }
}
