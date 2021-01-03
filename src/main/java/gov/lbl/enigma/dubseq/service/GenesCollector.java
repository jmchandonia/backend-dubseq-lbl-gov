package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.model.GeneRecord;

import java.io.IOException;
import java.util.List;

public interface GenesCollector {

    List<GeneRecord> composeGene() throws IOException;
}
