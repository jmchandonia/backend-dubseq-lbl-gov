package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.model.FragView;

import java.io.IOException;
import java.util.List;

public interface FScoreCollector {

    List<FragView> composeFragment(int posFrom, int posTo) throws IOException;
}
