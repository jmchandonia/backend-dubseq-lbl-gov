package gov.lbl.enigma.dubseq.model;

public class Gene {

    private Integer gene_id;
    private Integer genome_id;
    private Integer gene_index;
    private String name;
    private String locus_tag;
    private String gene_type;
    private String contig_id;
    private Integer pos_from;
    private Integer pos_to;
    private Character strand;
    private String product;
    private String note;
    private String description;

    public Gene(){};

    public Gene(Integer gene_id, Integer genome_id, Integer gene_index, String name, String locus_tag, String gene_type, String contig_id, Integer pos_from, Integer pos_to, Character strand, String product, String note, String description) {
        this.gene_id = gene_id;
        this.genome_id = genome_id;
        this.gene_index = gene_index;
        this.name = name;
        this.locus_tag = locus_tag;
        this.gene_type = gene_type;
        this.contig_id = contig_id;
        this.pos_from = pos_from;
        this.pos_to = pos_to;
        this.strand = strand;
        this.product = product;
        this.note = note;
        this.description = description;
    }

    public Integer getGene_id() {
        return gene_id;
    }

    public void setGene_id(Integer gene_id) {
        this.gene_id = gene_id;
    }

    public Integer getGenome_id() {
        return genome_id;
    }

    public void setGenome_id(Integer genome_id) {
        this.genome_id = genome_id;
    }

    public Integer getGene_index() {
        return gene_index;
    }

    public void setGene_index(Integer gene_index) {
        this.gene_index = gene_index;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocus_tag() {
        return locus_tag;
    }

    public void setLocus_tag(String locus_tag) {
        this.locus_tag = locus_tag;
    }

    public String getGene_type() {
        return gene_type;
    }

    public void setGene_type(String gene_type) {
        this.gene_type = gene_type;
    }

    public String getContig_id() {
        return contig_id;
    }

    public void setContig_id(String contig_id) {
        this.contig_id = contig_id;
    }

    public Integer getPos_from() {
        return pos_from;
    }

    public void setPos_from(Integer pos_from) {
        this.pos_from = pos_from;
    }

    public Integer getPos_to() {
        return pos_to;
    }

    public void setPos_to(Integer pos_to) {
        this.pos_to = pos_to;
    }

    public Character getStrand() {
        return strand;
    }

    public void setStrand(Character strand) {
        this.strand = strand;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Gene{" +
                "gene_id=" + gene_id +
                ", genome_id=" + genome_id +
                ", gene_index=" + gene_index +
                ", name='" + name + '\'' +
                ", locus_tag='" + locus_tag + '\'' +
                ", gene_type='" + gene_type + '\'' +
                ", contig_id='" + contig_id + '\'' +
                ", pos_from=" + pos_from +
                ", pos_to=" + pos_to +
                ", strand=" + strand +
                ", product='" + product + '\'' +
                ", note='" + note + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
