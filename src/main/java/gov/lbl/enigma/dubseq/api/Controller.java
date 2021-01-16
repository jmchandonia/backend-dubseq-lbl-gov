package gov.lbl.enigma.dubseq.api;

import gov.lbl.enigma.dubseq.model.*;
import gov.lbl.enigma.dubseq.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.ldap.LdapAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;


@RestController
@RequestMapping("api")
public class Controller {

    @Autowired
    private FScoreCollector fScoreCollector;

    @Autowired
    private GScoreCollector gScoreCollector;

    @Autowired
    private OrganismCollector organismCollector;

    @Autowired
    private ExperimentsCollector experimentsCollector;

    @Autowired
    private GenesCollector genesCollector;

    @Autowired
    private LayoutCollector layoutCollector;

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
    public Collection<OrganismRecord> getOrganisms(@RequestParam(required = false) String type) throws IOException {

        return organismCollector.composeOrganisms();
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}")
    public Collection<OrganismRecord> getOrganisms(@PathVariable long id) throws IOException {

        return organismCollector.composeOrganisms();
    }


    @CrossOrigin
    @GetMapping("/experiments")
    public Collection<ExperimentsRecord> getExperiments() throws IOException {

        return experimentsCollector.composeExperiments();
    }

    @CrossOrigin
    @GetMapping("/genes")
    public Collection<GeneRecord> getGenesList() throws IOException {

        return genesCollector.composeGene();
    }

    @CrossOrigin
    @GetMapping("/layout")
    public Collection<LayoutRecord> getLayoutList() throws IOException {
        return layoutCollector.composeLayout();
    }
}
