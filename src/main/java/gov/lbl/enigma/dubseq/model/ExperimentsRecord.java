package gov.lbl.enigma.dubseq.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExperimentsRecord {

    private String condition;
    private String division;
    private int experiments;
    private String organisms;
    private String description;

    public ExperimentsRecord(@JsonProperty("condition") String condition,
                             @JsonProperty("division") String division,
                             @JsonProperty("experiments") int experiments,
                             @JsonProperty("organisms") String organisms,
                             @JsonProperty("description") String description) {
        this.condition = condition;
        this.division = division;
        this.experiments = experiments;
        this.organisms = organisms;
        this.description = description;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public int getExperiments() {
        return experiments;
    }

    public void setExperiments(int experiments) {
        this.experiments = experiments;
    }

    public String getOrganisms() {
        return organisms;
    }

    public void setOrganisms(String organisms) {
        this.organisms = organisms;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "ExperimentsRecord{" +
                "condition='" + condition + '\'' +
                ", division='" + division + '\'' +
                ", experiments=" + experiments +
                ", organisms='" + organisms + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
