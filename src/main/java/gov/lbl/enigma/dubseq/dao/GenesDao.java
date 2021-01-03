package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.GeneRecord;

import java.io.IOException;
import java.util.List;

public interface GenesDao {

    List<GeneRecord> getGeneList() throws IOException;
}
