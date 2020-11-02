package gov.lbl.enigma.dubseq.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GScoreBaseRecord {

    private int GeneIndex;
    private int coveringFragmentCount;
    private String name;
    private String locusTag;
    private String geneType;
    private String contigId;
    private  int posFrom;
    private  int posTo;
    private  char strand;
    private  String product;
    private  String note;
    private  String description;
    private  String barcodes;

    public GScoreBaseRecord(@JsonProperty("gene_index") int GeneIndex,
                            @JsonProperty("covering_fragment_count") int coveringFragmentCount,
                            @JsonProperty("name") String name,
                            @JsonProperty("locus_tag") String locusTag,
                            @JsonProperty("gene_type") String geneType,
                            @JsonProperty("contig_id") String contigId,
                            @JsonProperty("pos_from") int posFrom,
                            @JsonProperty("pos_to") int posTo,
                            @JsonProperty("strand") char strand,
                            @JsonProperty("product") String product,
                            @JsonProperty("note") String note,
                            @JsonProperty("description") String description,
                            @JsonProperty("barcodes") String barcodes) {
        this.GeneIndex = GeneIndex;
        this.coveringFragmentCount = coveringFragmentCount;
        this.name = name;
        this.locusTag = locusTag;
        this.geneType = geneType;
        this.contigId = contigId;
        this.posFrom = posFrom;
        this.posTo = posTo;
        this.strand = strand;
        this.product = product;
        this.note = note;
        this.description = description;
        this.barcodes = barcodes;
    }

    public int getGeneIndex() {
        return GeneIndex;
    }

    public void setGeneIndex(int geneIndex) {
        GeneIndex = geneIndex;
    }

    public int getCoveringFragmentCount() {
        return coveringFragmentCount;
    }

    public void setCoveringFragmentCount(int coveringFragmentCount) {
        this.coveringFragmentCount = coveringFragmentCount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocusTag() {
        return locusTag;
    }

    public void setLocusTag(String locusTag) {
        this.locusTag = locusTag;
    }

    public String getGeneType() {
        return geneType;
    }

    public void setGeneType(String geneType) {
        this.geneType = geneType;
    }

    public String getContigId() {
        return contigId;
    }

    public void setContigId(String contigId) {
        this.contigId = contigId;
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

    public String getBarcodes() {
        return barcodes;
    }

    public void setBarcodes(String barcodes) {
        this.barcodes = barcodes;
    }
}
