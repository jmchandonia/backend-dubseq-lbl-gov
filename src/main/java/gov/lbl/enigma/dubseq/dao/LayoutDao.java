package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.LayoutRecord;

import java.io.IOException;
import java.util.List;

public interface LayoutDao {

    List<LayoutRecord> getLayoutList() throws IOException;
}
