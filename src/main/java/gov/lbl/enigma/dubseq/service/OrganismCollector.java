package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.model.OrganismRecord;

import java.io.IOException;
import java.util.List;

public interface OrganismCollector {
    List<OrganismRecord> composeOrganisms() throws IOException;
}

