package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.dao.ExperimentsDao;
import gov.lbl.enigma.dubseq.model.ExperimentsRecord;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

@Service
public class ExperimentsCollectorImpl implements ExperimentsCollector {

    @Resource
    private ExperimentsDao experimentsDao;

    @Override
    public List<ExperimentsRecord> composeExperiments() throws IOException {
        return experimentsDao.getExperimentsList();
    }
}
