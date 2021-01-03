package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.model.LayoutRecord;

import java.io.IOException;
import java.util.List;

public interface LayoutCollector {
    List<LayoutRecord> composeLayout() throws IOException;
}
