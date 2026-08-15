package at.htl.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

@Entity
public class ChangeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private LocalDate changeDate;

    @ManyToOne
    @JsonIgnore
    private FoodTicket foodTicket;

    @ManyToOne
    @JsonIgnore
    private Employee employee;

    @ManyToOne
    @JoinColumn(nullable = true, name = "tenant_id")
    private Tenant tenant;

    public ChangeLog() {
    }

    public ChangeLog(String description, LocalDate changeDate, FoodTicket foodTicket, Employee employee, Tenant tenant) {
        this.description = description;
        this.changeDate = changeDate;
        this.foodTicket = foodTicket;
        this.employee = employee;
        this.tenant = tenant;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FoodTicket getFoodTicket() {
        return foodTicket;
    }

    public void setFoodTicket(FoodTicket foodTicket) {
        this.foodTicket = foodTicket;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public LocalDate getChangeDate() {
        return changeDate;
    }

    public void setChangeDate(LocalDate changeDate) {
        this.changeDate = changeDate;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }
}
