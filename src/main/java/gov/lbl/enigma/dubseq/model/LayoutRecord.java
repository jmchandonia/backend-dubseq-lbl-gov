package gov.lbl.enigma.dubseq.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LayoutRecord {

    private String itnum;
    private String type;
    private String name;


    public LayoutRecord(@JsonProperty("itnum") String itnum,
                        @JsonProperty("type") String type,
                        @JsonProperty("name") String name) {
        this.itnum = itnum;
        this.type = type;
        this.name = name;
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
        return "LayoutRecord{" +
                "itnum='" + itnum + '\'' +
                ", type='" + type + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
