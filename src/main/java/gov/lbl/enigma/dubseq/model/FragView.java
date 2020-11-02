package gov.lbl.enigma.dubseq.model;

public class FragView {


    private int posFrom;
    private int posTo;
    private double score;

    public FragView(int posFrom, int posTo, double score) {
        this.posFrom = posFrom;
        this.posTo = posTo;
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

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
