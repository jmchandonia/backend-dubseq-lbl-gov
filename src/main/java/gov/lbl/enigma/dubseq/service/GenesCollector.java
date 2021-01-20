package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.model.Gene;
import gov.lbl.enigma.dubseq.model.GeneRecord;

import java.io.IOException;
import java.util.List;

public interface GenesCollector {

    List<Gene> composeGene() throws IOException;
}
