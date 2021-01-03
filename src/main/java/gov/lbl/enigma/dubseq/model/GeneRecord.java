package gov.lbl.enigma.dubseq.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GeneRecord {

    private String gene;
    private String organism;
    private String description;
    private double avg_fitness;

    public GeneRecord(@JsonProperty("gene") String gene,
                      @JsonProperty("organism") String organism,
                      @JsonProperty("description") String description,
                      @JsonProperty("avg_fitness") double avg_fitness) {
        this.gene = gene;
        this.organism = organism;
        this.description = description;
        this.avg_fitness = avg_fitness;
    }

    public String getGene() {
        return gene;
    }

    public void setGene(String gene) {
        this.gene = gene;
    }

    public String getOrganism() {
        return organism;
    }

    public void setOrganism(String organism) {
        this.organism = organism;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAvg_fitness() {
        return avg_fitness;
    }

    public void setAvg_fitness(double avg_fitness) {
        this.avg_fitness = avg_fitness;
    }

    @Override
    public String toString() {
        return "GeneRecord{" +
                "gene='" + gene + '\'' +
                ", organism='" + organism + '\'' +
                ", description='" + description + '\'' +
                ", avg_fitness=" + avg_fitness +
                '}';
    }
}
