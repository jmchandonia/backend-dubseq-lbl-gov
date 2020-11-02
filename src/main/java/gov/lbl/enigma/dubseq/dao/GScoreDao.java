package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.GScoreRecord;

import java.io.IOException;
import java.util.List;

public interface GScoreDao {

    List<GScoreRecord> getRecordList() throws IOException;
}
