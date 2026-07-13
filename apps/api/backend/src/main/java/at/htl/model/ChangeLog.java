package at.htl.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.LinkedList;
import java.util.List;

@Entity
public class ChangeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @OneToMany(mappedBy = "changeLog")
    @JsonIgnore
    private List<FoodTicket> foodTicket = new LinkedList<>();

    @OneToMany(mappedBy = "changeLog")
    @JsonIgnore
    private List<Employee> employee = new LinkedList<>();

    public ChangeLog() {
    }

    public ChangeLog(String description, List<FoodTicket> foodTicket, List<Employee> employee) {
        this.description = description;
        this.foodTicket = foodTicket;
        this.employee = employee;
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

    public List<FoodTicket> getFoodTicket() {
        return foodTicket;
    }

    public void setFoodTicket(List<FoodTicket> foodTicket) {
        this.foodTicket = foodTicket;
    }

    public List<Employee> getEmployee() {
        return employee;
    }

    public void setEmployee(List<Employee> employee) {
        this.employee = employee;
    }
}
