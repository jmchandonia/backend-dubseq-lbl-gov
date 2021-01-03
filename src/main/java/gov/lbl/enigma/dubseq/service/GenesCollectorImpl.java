package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.dao.GenesDao;
import gov.lbl.enigma.dubseq.model.GeneRecord;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

@Service
public class GenesCollectorImpl implements GenesCollector{

    @Resource
    private GenesDao genesDao;

    @Override
    public List<GeneRecord> composeGene() throws IOException {
        return genesDao.getGeneList();
    }
}
