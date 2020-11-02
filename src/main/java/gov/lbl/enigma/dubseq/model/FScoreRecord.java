package gov.lbl.enigma.dubseq.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FScoreRecord {

    private String barcode;
    private double score;
    private int stresREadCount;
    private int tzTotalReadCount;

    public FScoreRecord(@JsonProperty("barcode") String barcode,
                        @JsonProperty("score") double score,
                        @JsonProperty("stress_read_count") int stresREadCount,
                        @JsonProperty("t0_total_read_count") int tzTotalReadCount) {
        this.barcode = barcode;
        this.score = score;
        this.stresREadCount = stresREadCount;
        this.tzTotalReadCount = tzTotalReadCount;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public int getStresREadCount() {
        return stresREadCount;
    }

    public void setStresREadCount(int stresREadCount) {
        this.stresREadCount = stresREadCount;
    }

    public int getTzTotalReadCount() {
        return tzTotalReadCount;
    }

    public void setTzTotalReadCount(int tzTotalReadCount) {
        this.tzTotalReadCount = tzTotalReadCount;
    }

    @Override
    public String toString() {
        return "FScoreRecord{" +
                "barcode='" + barcode + '\'' +
                ", score=" + score +
                ", stresREadCount=" + stresREadCount +
                ", tzTotalReadCount=" + tzTotalReadCount +
                '}';
    }
}
