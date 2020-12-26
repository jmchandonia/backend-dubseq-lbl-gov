package gov.lbl.enigma.dubseq.api;

import gov.lbl.enigma.dubseq.model.*;
import gov.lbl.enigma.dubseq.service.ExperimentsCollector;
import gov.lbl.enigma.dubseq.service.FScoreCollector;
import gov.lbl.enigma.dubseq.service.GScoreCollector;
import gov.lbl.enigma.dubseq.service.OrganismCollector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @Autowired
    private OrganismCollector organismCollector;

    @Autowired
    private ExperimentsCollector experimentsCollector;

    @CrossOrigin
    @GetMapping("/fragview")
    public Collection<FragView> getFragmenrs(
            @RequestParam int posFrom,
            @RequestParam int posTo) throws IOException {
        return fScoreCollector.composeFragment(posFrom, posTo);
    }

    @CrossOrigin
    @GetMapping("/geneview")
    public Collection<GeneView> getGenes(
            @RequestParam int posFrom,
            @RequestParam int posTo) throws IOException {
        return gScoreCollector.composeGene(posFrom, posTo);
    }

    @CrossOrigin
    @GetMapping("/organisms")
    public Collection<OrganismRecord> getOrganisms() throws IOException {

        return organismCollector.composeOrganisms();
    }

    @CrossOrigin
    @GetMapping("/experiments")
    public Collection<ExperimentsRecord> getExperiments() throws IOException {

        return experimentsCollector.composeExperiments();
    }
}
