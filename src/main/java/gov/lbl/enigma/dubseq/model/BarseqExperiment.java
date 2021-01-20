package gov.lbl.enigma.dubseq.model;



public class BarseqExperiment {

    private Integer barseqExperimentId;
    private Integer bagseqLibraryId;
    private String itnum;
    private String type;
    private String name;

    public BarseqExperiment(){};

    public BarseqExperiment(Integer barseqExperimentId, Integer barseqLibraryId, String itnum, String type, String name) {
        this.barseqExperimentId = barseqExperimentId;
        this.bagseqLibraryId = barseqLibraryId;
        this.itnum = itnum;
        this.type = type;
        this.name = name;
    }

    public Integer getBarseqExperimentId() {
        return barseqExperimentId;
    }

    public void setBarseqExperimentId(Integer barseqExperimentId) {
        this.barseqExperimentId = barseqExperimentId;
    }

    public Integer getBarseqLibraryId() {
        return bagseqLibraryId;
    }

    public void setBagseqLibraryId(Integer bagseqLibraryId) {
        this.bagseqLibraryId = bagseqLibraryId;
    }

    public String getItnum() {
        return itnum;
    }

    public void setItnum(String itnum) {
        this.itnum = itnum;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "BarseqExperiment{" +
                "barseqExperimentId=" + barseqExperimentId +
                ", bagseqLibraryId=" + bagseqLibraryId +
                ", itnum='" + itnum + '\'' +
                ", type='" + type + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
