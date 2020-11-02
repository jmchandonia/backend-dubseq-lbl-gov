package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.FScoreBaseRecord;

import java.io.IOException;
import java.util.List;

public interface FScoreBaseDao {

    List<FScoreBaseRecord> getRecordList() throws IOException;
}
