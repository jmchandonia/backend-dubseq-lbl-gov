package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.ExperimentsRecord;

import java.io.IOException;
import java.util.List;

public interface ExperimentsDao {

    List<ExperimentsRecord> getExperimentsList() throws IOException;
}
