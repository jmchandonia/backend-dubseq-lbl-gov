package gov.lbl.enigma.dubseq.model;

public class GeneView {

    private int posFrom;
    private int posTo;
    private char strand;
    private String name;
    private String locustTag;
    private String product;
    private double score;

    public GeneView(int posFrom, int posTo, char strand, String name, String locustTag, String product, double score) {
        this.posFrom = posFrom;
        this.posTo = posTo;
        this.strand = strand;
        this.name = name;
        this.locustTag = locustTag;
        this.product = product;
        this.score = score;
    }

    public int getPosFrom() {
        return posFrom;
    }

    public void setPosFrom(int posFrom) {
        this.posFrom = posFrom;
    }

    public int getPosTo() {
        return posTo;
    }

    public void setPosTo(int posTo) {
        this.posTo = posTo;
    }

    public char getStrand() {
        return strand;
    }

    public void setStrand(char strand) {
        this.strand = strand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocustTag() {
        return locustTag;
    }

    public void setLocustTag(String locustTag) {
        this.locustTag = locustTag;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
