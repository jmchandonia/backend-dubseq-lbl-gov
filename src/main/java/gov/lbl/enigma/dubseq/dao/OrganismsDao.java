package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.OrganismRecord;

import java.io.IOException;
import java.util.List;

public interface OrganismsDao {

    List<OrganismRecord> getOrganismList() throws IOException;
}
