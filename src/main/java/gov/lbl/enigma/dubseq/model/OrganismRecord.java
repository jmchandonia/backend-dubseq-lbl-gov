package gov.lbl.enigma.dubseq.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OrganismRecord {


    private String organism;
    private String division;
    private int experiments;
    private String info;
    private String updatedAnnotations;


    public OrganismRecord(@JsonProperty("organism") String organism,
                          @JsonProperty("division") String division,
                          @JsonProperty("experiment") int experiments,
                          @JsonProperty("info") String info,
                          @JsonProperty("updatedAnnotations") String updatedAnnotations) {
        this.organism = organism;
        this.division = division;
        this.experiments = experiments;
        this.info = info;
        this.updatedAnnotations = updatedAnnotations;
    }

    public String getOrganism() {
        return organism;
    }

    public void setOrganism(String organism) {
        this.organism = organism;
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

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getUpdatedAnnotations() {
        return updatedAnnotations;
    }

    public void setUpdatedAnnotations(String updatedAnnotations) {
        this.updatedAnnotations = updatedAnnotations;
    }

    @Override
    public String toString() {
        return "OrganismRecord{" +
                "organism='" + organism + '\'' +
                ", division='" + division + '\'' +
                ", experiments=" + experiments +
                ", info='" + info + '\'' +
                ", updatedAnnotations='" + updatedAnnotations + '\'' +
                '}';
    }
}
