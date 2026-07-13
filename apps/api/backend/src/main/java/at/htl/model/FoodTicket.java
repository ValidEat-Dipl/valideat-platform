package at.htl.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class FoodTicket {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    private LocalDate useDate;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "matching_ticket_id", nullable = true)
    private FoodTicket matchingTicket;

   @ManyToOne
    private Tier tier;

   @ManyToOne
    private CostOrder costOrder; // Eingabefeld ohne vorgelegte Werte im Frontend (mit Cache)

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private TicketType ticketType;

    @ManyToOne
    private Restaurant restaurant;

    @ManyToOne
    private Employee admin;

    private LocalDate checkDate;

    @ManyToOne
    private ChangeLog changeLog;


    public FoodTicket() {}

    public FoodTicket(Employee employee, LocalDate useDate, FoodTicket matchingTicket, Tier tier, CostOrder costOrder, Status status, TicketType ticketType, Restaurant restaurant, Employee admin, LocalDate checkDate, ChangeLog changeLog) {
        this.employee = employee;
        this.useDate = useDate;
        this.matchingTicket = matchingTicket;
        this.tier = tier;
        this.costOrder = costOrder;
        this.status = status;
        this.ticketType = ticketType;
        this.restaurant = restaurant;
        this.admin = admin;
        this.checkDate = checkDate;
        this.changeLog = changeLog;
    }

    public FoodTicket(Employee employee, LocalDate useDate, Tier tier, CostOrder costOrder, Status status, Restaurant restaurant) {
        this.employee = employee;
        this.useDate = useDate;
        this.tier = tier;
        this.costOrder = costOrder;
        this.status = status;
        this.restaurant = restaurant;
    }

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

    public LocalDate getUseDate() {
        return useDate;
    }

    public void setUseDate(LocalDate useDate) {
        this.useDate = useDate;
    }

    public Tier getTier() {
        return tier;
    }

    public void setTier(Tier tier) {
        this.tier = tier;
    }

    public CostOrder getCostOrder() {
        return costOrder;
    }

    public void setCostOrder(CostOrder costOrder) {
        this.costOrder = costOrder;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Employee getAdmin() {
        return admin;
    }

    public void setAdmin(Employee admin) {
        this.admin = admin;
    }

    public LocalDate getCheckDate() {
        return checkDate;
    }

    public void setCheckDate(LocalDate checkDate) {
        this.checkDate = checkDate;
    }

    public ChangeLog getChangeLog() {
        return changeLog;
    }

    public void setChangeLog(ChangeLog changeLog) {
        this.changeLog = changeLog;
    }

    public FoodTicket getMatchingTicket() {
        return matchingTicket;
    }

    public void setMatchingTicket(FoodTicket matchingTicket) {
        this.matchingTicket = matchingTicket;
    }

    public TicketType getTicketType() {
        return ticketType;
    }

    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }
}
