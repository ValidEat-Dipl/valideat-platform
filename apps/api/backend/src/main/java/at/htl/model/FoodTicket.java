package at.htl.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class FoodTicket {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date; // Eingabefeld ohne vorgelegte Werte im Frontend (mit Cache)

    @ManyToOne
    private Employee employee;

    private int costOrder;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String conflict;

    public FoodTicket() {}

    public FoodTicket(LocalDate date, Employee employee, int costOrder) {
        this.date = date;
        this.employee = employee;
        this.costOrder = costOrder;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getConflict() {
        return conflict;
    }

    public void setConflict(String conflict) {
        this.conflict = conflict;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public int getCostOrder() {
        return costOrder;
    }

    public void setCostOrder(int costOrder) {
        this.costOrder = costOrder;
    }
}
