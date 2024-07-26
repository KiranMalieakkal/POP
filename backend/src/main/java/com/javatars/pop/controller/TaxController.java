package com.javatars.pop.controller;

import com.javatars.pop.model.Project;
import com.javatars.pop.model.ProjectDto;
import com.javatars.pop.model.TaxCategory;
import com.javatars.pop.model.TaxCategoryDto;
import com.javatars.pop.service.ProjectService;
import com.javatars.pop.service.TaxService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/taxes")
public class TaxController {

    private final ProjectService projectService;
    private final TaxService taxService;

    public TaxController(ProjectService projectService, TaxService taxService) {
        this.projectService = projectService;
        this.taxService = taxService;
    }

    @GetMapping
    public ResponseEntity<List<TaxCategoryDto>> getTaxCategories () {
        List<TaxCategoryDto> taxCategoriesDtos = taxService.getTaxCategories()
                .stream().map(TaxCategory::toTaxCategoryDto).toList();
        return ResponseEntity.ok(taxCategoriesDtos);
    }

    @PostMapping("/{id}")
    public ResponseEntity<TaxCategoryDto> addProjectToTaxCategory (
            @RequestParam String email,  @PathVariable Long id, @RequestParam Long projectId) {
        TaxCategoryDto taxCategoryDto = taxService.addProjectToTaxCategory(id, email, projectId).toTaxCategoryDto();
        return ResponseEntity.ok(taxCategoryDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ProjectDto>> getTaxCategoryProjects (
            @RequestParam String email,  @PathVariable Long id) {
        List<ProjectDto> projectDtos = taxService.getTaxCategoryProjects(id, email)
                .stream().map(Project::toProjectDto).toList();
        return ResponseEntity.ok(projectDtos);
    }

    @GetMapping("/user")
    public ResponseEntity<List<TaxCategoryDto>> getTaxCategoryProjects (@RequestParam  String email) {
        List<TaxCategoryDto> taxCategoriesDtos = taxService.getTaxCategories(email)
                .stream().map(TaxCategory::toTaxCategoryDto).toList();
        return ResponseEntity.ok(taxCategoriesDtos);
    }


}
