package at.htl.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class FoodTicket {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate Date; // Eingabefeld ohne vorgelegte Werte im Frontend (mit Cache)

    @ManyToOne
    private Employee employee;

    private int costOrder;

    public FoodTicket() {}

    public FoodTicket(LocalDate date, Employee employee, int costOrder) {
        Date = date;
        this.employee = employee;
        this.costOrder = costOrder;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return Date;
    }

    public void setDate(LocalDate date) {
        Date = date;
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
