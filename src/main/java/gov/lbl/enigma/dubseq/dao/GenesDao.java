package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.Gene;
import gov.lbl.enigma.dubseq.model.GeneRecord;

import java.io.IOException;
import java.util.List;

public interface GenesDao {

    List<Gene> getGeneList() throws IOException;
}
