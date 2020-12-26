package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.model.ExperimentsRecord;

import java.io.IOException;
import java.util.List;

public interface ExperimentsCollector {

    List<ExperimentsRecord> composeExperiments() throws IOException;
}
