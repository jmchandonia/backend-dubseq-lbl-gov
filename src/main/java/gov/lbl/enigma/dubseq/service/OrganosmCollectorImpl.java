package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.dao.OrganismsDao;
import gov.lbl.enigma.dubseq.model.OrganismRecord;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrganosmCollectorImpl implements OrganismCollector{

    @Resource
    private OrganismsDao organismsDao;

    @Override
    public List<OrganismRecord> composeOrganisms() throws IOException {

        return organismsDao.getOrganismList();
    }
}
