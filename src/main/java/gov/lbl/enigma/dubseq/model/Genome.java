package gov.lbl.enigma.dubseq.model;

public class Genome {

    private Integer genome_id;
    private String name;

    public Genome () {};

    public Genome(Integer genome_id, String name) {
        this.genome_id = genome_id;
        this.name = name;
    }

    public Integer getGenome_id() {
        return genome_id;
    }

    public void setGenome_id(Integer genome_id) {
        this.genome_id = genome_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Genome{" +
                "genome_id=" + genome_id +
                ", name='" + name + '\'' +
                '}';
    }
}
