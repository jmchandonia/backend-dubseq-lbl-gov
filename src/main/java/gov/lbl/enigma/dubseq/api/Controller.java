package gov.lbl.enigma.dubseq.api;

import gov.lbl.enigma.dubseq.dao.FScoreBaseDao;
import gov.lbl.enigma.dubseq.dao.FScoreDao;
import gov.lbl.enigma.dubseq.dao.GScoreBaseDao;
import gov.lbl.enigma.dubseq.dao.GScoreDao;
import gov.lbl.enigma.dubseq.model.*;
import gov.lbl.enigma.dubseq.service.FScoreCollector;
import gov.lbl.enigma.dubseq.service.GScoreCollector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Collection;


@RestController
public class Controller {

    @Autowired
    private FScoreCollector fScoreCollector;

    @Autowired
    private GScoreCollector gScoreCollector;

    @GetMapping("/fragview")
    public Collection<FragView> getFragmenrs(
            @RequestParam int posFrom,
            @RequestParam int posTo) throws IOException {
        return fScoreCollector.composeFragment(posFrom, posTo);
    }

    @GetMapping("/geneview")
    public Collection<GeneView> getGenes(
            @RequestParam int posFrom,
            @RequestParam int posTo) throws IOException {
        return gScoreCollector.composeGene(posFrom, posTo);
    }
}
