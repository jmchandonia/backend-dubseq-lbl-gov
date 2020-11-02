package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.dao.GScoreBaseDao;
import gov.lbl.enigma.dubseq.dao.GScoreDao;
import gov.lbl.enigma.dubseq.model.GScoreBaseRecord;
import gov.lbl.enigma.dubseq.model.GeneView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class GScoreCollectorImpl implements GScoreCollector{

    @Autowired
    private GScoreBaseDao gScoreBaseDao;

    @Autowired
    private GScoreDao gScoreDao;

    @Override
    public List<GeneView> composeGene(int posFrom, int posTo) throws IOException {

        List<GeneView> genes;

        genes = getGScoreBaseRecordList(posFrom, posTo)
                .flatMap(v1 -> {
                    try {
                        return gScoreDao.getRecordList().stream()
                                .filter(v2 -> (v2.getIndex() == v1.getGeneIndex()))
                                .map(v2 -> new GeneView(v1.getPosFrom(), v1.getPosTo(),v1.getStrand(),v1.getName(), v1.getLocusTag(),v1.getProduct(), v2.getScoreCnnls()));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return null;
                })
                .collect(Collectors.toList());

        return genes;
    }

    private Stream<GScoreBaseRecord> getGScoreBaseRecordList(int posFrom, int posTo) throws IOException {

        return gScoreBaseDao.getRecordList().stream().filter(v1 -> ((v1.getPosFrom() >= posFrom) && (v1.getPosTo() <= posTo)));
    }

}
