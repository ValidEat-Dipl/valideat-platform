package at.htl.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class CostOrder {

    @Id
    private String name;

    public CostOrder() {
    }

    public CostOrder(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
