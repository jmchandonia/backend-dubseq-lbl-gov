package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.dao.FScoreBaseDao;
import gov.lbl.enigma.dubseq.dao.FScoreDao;
import gov.lbl.enigma.dubseq.model.FScoreBaseRecord;
import gov.lbl.enigma.dubseq.model.FragView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FScoreCollectorImp implements FScoreCollector {

    // Scores for each fragment
    @Autowired
    private FScoreDao fScoreDao;

    @Autowired
    private FScoreBaseDao fScoreBaseDao;

    @Override
    public List<FragView> composeFragment(int posFrom, int posTo) throws IOException {

        List<FragView> fragments;

        fragments = getFScoreBaseRecordList(posFrom, posTo)
                .flatMap(v1 -> {
                    try {
                        return fScoreDao.getRecordList().stream()
                                .filter(v2 -> v1.getBarcode().equals(v2.getBarcode()))
                                .map(v2 -> new FragView(v1.getPosFrom(), v1.getPosTo(), v2.getScore()));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return null;
                })
                        .collect(Collectors.toList());

        return fragments;
    }

    private Stream<FScoreBaseRecord> getFScoreBaseRecordList(int posFrom, int posTo) throws IOException {

        return fScoreBaseDao.getRecordList().stream().filter(v1 -> ((v1.getPosFrom() >= posFrom) && (v1.getPosTo() <=posTo)));
    }
}
