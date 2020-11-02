package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.GScoreBaseRecord;

import java.io.IOException;
import java.util.List;

public interface GScoreBaseDao {

    List<GScoreBaseRecord> getRecordList() throws IOException;
}


