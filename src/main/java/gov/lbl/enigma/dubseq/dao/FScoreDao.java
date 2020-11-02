package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.FScoreRecord;

import java.io.IOException;
import java.util.List;

public interface FScoreDao {

    List<FScoreRecord> getRecordList() throws IOException;
}
