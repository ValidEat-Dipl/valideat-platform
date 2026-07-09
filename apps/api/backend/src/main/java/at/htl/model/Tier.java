package at.htl.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Tier {

    @Id
    private String name;

    private double discount;

    public Tier() {
    }

    public Tier(String name, double discount) {
        this.name = name;
        this.discount = discount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
