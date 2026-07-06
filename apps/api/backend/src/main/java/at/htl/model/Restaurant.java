package at.htl.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Restaurant {

    @Id
    private Long id;

    private String address;

    private String name;

    @ManyToOne
    private Meal menu;

    public Restaurant() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Meal getMenu() {
        return menu;
    }

    public void setMenu(Meal menu) {
        this.menu = menu;
    }
}
