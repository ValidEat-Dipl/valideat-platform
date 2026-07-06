package at.htl.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

@Entity
public class AdminDocumentationEntry {

    @Id
    private Long id;

    @ManyToOne
    private Employee employee;

    private LocalDateTime dateCheck;

    private LocalDateTime dateConfirmation;

    @ManyToOne
    private Employee admin;

    public AdminDocumentationEntry() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public LocalDateTime getDateCheck() {
        return dateCheck;
    }

    public void setDateCheck(LocalDateTime dateCheck) {
        this.dateCheck = dateCheck;
    }

    public LocalDateTime getDateConfirmation() {
        return dateConfirmation;
    }

    public void setDateConfirmation(LocalDateTime dateConfirmation) {
        this.dateConfirmation = dateConfirmation;
    }

    public Employee getAdmin() {
        return admin;
    }

    public void setAdmin(Employee admin) {
        this.admin = admin;
    }
}
