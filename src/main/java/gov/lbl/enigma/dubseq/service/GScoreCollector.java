package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.model.GeneView;

import java.io.IOException;
import java.util.List;

public interface GScoreCollector {

    List<GeneView> composeGene(int posFrom, int posTo) throws IOException;
}
