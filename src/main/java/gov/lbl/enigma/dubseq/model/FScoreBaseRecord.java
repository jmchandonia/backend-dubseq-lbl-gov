package gov.lbl.enigma.dubseq.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FScoreBaseRecord {

    private String barcode;
    private String contigId;
    private int posFrom;
    private int posTo;
    private int tzCount;
    private double tzReadAvg;
    private double tzReadTotal;
    private String tzReads;
    private String tzItNums;

    public FScoreBaseRecord(@JsonProperty("barcode") String barcode,
                            @JsonProperty("contig_id") String contigId,
                            @JsonProperty("pos_from") int posFrom,
                            @JsonProperty("pos_to") int posTo,
                            @JsonProperty("t0_count") int tzCount,
                            @JsonProperty("t0_reads_avg") double tzReadAvg,
                            @JsonProperty("t0_reads_total") double tzReadTotal,
                            @JsonProperty("t0_reads") String tzReads,
                            @JsonProperty("t0_itnums") String tzItNums) {
        this.barcode = barcode;
        this.contigId = contigId;
        this.posFrom = posFrom;
        this.posTo = posTo;
        this.tzCount = tzCount;
        this.tzReadAvg = tzReadAvg;
        this.tzReadTotal = tzReadTotal;
        this.tzReads = tzReads;
        this.tzItNums = tzItNums;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
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

    public int getTzCount() {
        return tzCount;
    }

    public void setTzCount(int tzCount) {
        this.tzCount = tzCount;
    }

    public double getTzReadAvg() {
        return tzReadAvg;
    }

    public void setTzReadAvg(double tzReadAvg) {
        this.tzReadAvg = tzReadAvg;
    }

    public double getTzReadTotal() {
        return tzReadTotal;
    }

    public void setTzReadTotal(double tzReadTotal) {
        this.tzReadTotal = tzReadTotal;
    }

    public String getTzReads() {
        return tzReads;
    }

    public void setTzReads(String tzReads) {
        this.tzReads = tzReads;
    }

    public String getTzItNums() {
        return tzItNums;
    }

    public void setTzItNums(String tzItNums) {
        this.tzItNums = tzItNums;
    }

    @Override
    public String toString() {
        return "FScoreBaseRecord{" +
                "barcode='" + barcode + '\'' +
                ", contigId='" + contigId + '\'' +
                ", posFrom=" + posFrom +
                ", posTo=" + posTo +
                ", tzCount=" + tzCount +
                ", tzReadAvg=" + tzReadAvg +
                ", tzReadTotal=" + tzReadTotal +
                ", tzReads='" + tzReads + '\'' +
                ", tzItNums='" + tzItNums + '\'' +
                '}';
    }
}
