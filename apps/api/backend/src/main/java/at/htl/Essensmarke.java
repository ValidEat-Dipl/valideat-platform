package at.htl;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Essensmarke {

    @Id
    private Long id;

    private LocalDate datum;

    private int kostenstelle; // Eingabefeld ohne vorgelegte Werte im Frontend (mit Cache)

    @ManyToOne
    private Mitarbeiter mitarbeiter;


    public Essensmarke() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDatum() {
        return datum;
    }

    public void setDatum(LocalDate datum) {
        this.datum = datum;
    }

    public int getKostenstelle() {
        return kostenstelle;
    }

    public void setKostenstelle(int kostenstelle) {
        this.kostenstelle = kostenstelle;
    }

    public Mitarbeiter getMitarbeiter() {
        return mitarbeiter;
    }

    public void setMitarbeiter(Mitarbeiter mitarbeiter) {
        this.mitarbeiter = mitarbeiter;
    }
}
