package gov.lbl.enigma.dubseq.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Service;

public class GScoreRecord {

    private int index;
    private String geneName;
    private String locusTag;
    private double scoreMean;
    private double scoreCnnls;
    private double socreRidge;
    private double scoreLasso;
    private double scoreEnet;

    public GScoreRecord(@JsonProperty("index") int index,
                        @JsonProperty("gene_name") String geneName,
                        @JsonProperty("locus_tag") String locusTag,
                        @JsonProperty("score_mean") double scoreMean,
                        @JsonProperty("score_cnnls") double scoreCnnls,
                        @JsonProperty("score_ridge") double socreRidge,
                        @JsonProperty("score_lasso") double scoreLasso,
                        @JsonProperty("score_enet") double scoreEnet) {
        this.index = index;
        this.geneName = geneName;
        this.locusTag = locusTag;
        this.scoreMean = scoreMean;
        this.scoreCnnls = scoreCnnls;
        this.socreRidge = socreRidge;
        this.scoreLasso = scoreLasso;
        this.scoreEnet = scoreEnet;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getGeneName() {
        return geneName;
    }

    public void setGeneName(String geneName) {
        this.geneName = geneName;
    }

    public String getLocusTag() {
        return locusTag;
    }

    public void setLocusTag(String locusTag) {
        this.locusTag = locusTag;
    }

    public double getScoreMean() {
        return scoreMean;
    }

    public void setScoreMean(double scoreMean) {
        this.scoreMean = scoreMean;
    }

    public double getScoreCnnls() {
        return scoreCnnls;
    }

    public void setScoreCnnls(double scoreCnnls) {
        this.scoreCnnls = scoreCnnls;
    }

    public double getSocreRidge() {
        return socreRidge;
    }

    public void setSocreRidge(double socreRidge) {
        this.socreRidge = socreRidge;
    }

    public double getScoreLasso() {
        return scoreLasso;
    }

    public void setScoreLasso(double scoreLasso) {
        this.scoreLasso = scoreLasso;
    }

    public double getScoreEnet() {
        return scoreEnet;
    }

    public void setScoreEnet(double scoreEnet) {
        this.scoreEnet = scoreEnet;
    }
}
