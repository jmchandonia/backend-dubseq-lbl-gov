package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.Genome;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface GenomeDao {
    List<Genome> getGenomeList();
    List<Map<String, Object>> getGenomeListMap();
}
