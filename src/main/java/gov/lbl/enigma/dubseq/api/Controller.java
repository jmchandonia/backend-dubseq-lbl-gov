package gov.lbl.enigma.dubseq.api;

import gov.lbl.enigma.dubseq.dao.GenesDao;
import gov.lbl.enigma.dubseq.dao.GenomeDao;
import gov.lbl.enigma.dubseq.model.*;
import gov.lbl.enigma.dubseq.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("api")
public class Controller {

    @Autowired
    private FScoreCollector fScoreCollector;

    @Autowired
    private GScoreCollector gScoreCollector;

    @Autowired
    private GenesDao genesDao;

    @Autowired
    private GenomeDao genomeDao;

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
    public List<Map<String, Object>> getOrganisms(
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String type) {

        String QUERY = "select genome_id, name from genome";

        if (id != null) {
            QUERY = QUERY + " where genome_id = " + id;
        }

        return jdbcTemplate.queryForList(QUERY, new HashMap<String, Object>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}")
    public List<Map<String, Object>> getOrganisms(@PathVariable long id) throws IOException {


        return jdbcTemplate.queryForList("select genome_id, name from genome", new HashMap<String, Object>());
    }



    @CrossOrigin
    @GetMapping("/experiments")
    public List<Map<String, Object>> getExperiments(
            @RequestParam(required = false) String type
    ){

        String QUERY = "select * from barseq_experiment";

        if(type != null){
            QUERY = QUERY + " where type='" + type + "'";
        }

        return jdbcTemplate.queryForList(QUERY, new HashMap<String, Object>());
    }

//    @CrossOrigin
//    @GetMapping("/experiments")
//    public Collection<BarseqExperiment> getExperiments() throws IOException {
//
//        return experimentsCollector.composeExperiments();
//    }

    @CrossOrigin
    @GetMapping("/genes")
    public Collection<Gene> getGenesList() throws IOException {

        return genesDao.getGeneList();
//        return genesCollector.composeGene();
    }

    @CrossOrigin
    @GetMapping("/layout")
    public Collection<LayoutRecord> getLayoutList() throws IOException {
        return layoutCollector.composeLayout();
    }

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

}
