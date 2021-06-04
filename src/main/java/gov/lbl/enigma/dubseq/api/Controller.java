package gov.lbl.enigma.dubseq.api;

import gov.lbl.enigma.dubseq.dao.GenesDao;
import gov.lbl.enigma.dubseq.dao.GenomeDao;
import gov.lbl.enigma.dubseq.model.*;
import gov.lbl.enigma.dubseq.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

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

    @Autowired
    private QueryService queryService;

    @CrossOrigin
    @GetMapping("/genes")
    public Collection<Gene> getGenesList() throws IOException {

        return genesDao.getGeneList();

    }

    @CrossOrigin
    @GetMapping("/layout")
    public Collection<LayoutRecord> getLayoutList() throws IOException {
        return layoutCollector.composeLayout();
    }


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
    @GetMapping("/genes/{id}/position")
    public List<Map<String, Object>> getGene(@PathVariable long id) {

        return jdbcTemplate.queryForList("select \n" +
                "\tg.name, \n" +
                "\tmin(g.pos_from) as pos_from,\n" +
                "\tmin(g.pos_to) as pos_to\n" +
                "from gene g\n" +
                "where g.gene_id = " + id + "\n" +
                "group by g.name", new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/genes/id")
    public List<Map<String, Object>> getGenes() {

        return jdbcTemplate.queryForList("select \n" +
                "\tg.name,\n" +
                "\tg.gene_id\n" +
                "from gene g", new HashMap<>());
    }

//    TODO: Add "where" clause, to look for genes begining with some letters.
    @CrossOrigin
    @GetMapping("/genes/{start}")
    public List<Map<String, Object>> getGenesLike(@PathVariable String start) {

        String QUERY = "select\n" +
                "       g.name,\n" +
                "       g.gene_id\n" +
                "from _temp_gene g\n" +
                "where lower(g.name) like '" + start +"%'";

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }


    @PostMapping("/query/{queryId}")
    public String getQuery(@PathVariable Long queryId,
                           @RequestBody Map<String, Object> body){

        return queryService.getQuery(queryId);
    }


}
