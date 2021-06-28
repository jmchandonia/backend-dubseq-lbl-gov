package gov.lbl.enigma.dubseq.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class GeneController {

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    @Autowired
    @Qualifier("getAllGenesQuery")
    private String getAllGenesQuery;

    @Autowired
    @Qualifier("getGeneQuery")
    private String getGeneQuery;

    @Autowired
    @Qualifier("getGeneTopExperiments")
    private String getTopExperimentsQuery;

    @Autowired
    @Qualifier("getGeneFragmentsTopExperiments")
    private String getTopFragmentsExperimentsQuery;

    @Autowired
    @Qualifier("getFragmentCoverage")
    private String getFragmentCoverage;

    @Autowired
    @Qualifier("getGenesByPositionQuery")
    private String getGenesByPositionQuery;

    @Autowired
    @Qualifier("getFragByPositionQuery")
    private String getFragByPositionQuery;

    @CrossOrigin
    @GetMapping("/getGenes")
    public List<Map<String, Object>> getGenes() {

        return jdbcTemplate.queryForList(getAllGenesQuery, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/getGenes/{id}")
    public List<Map<String, Object>> getGene(@PathVariable int id) {

        Map<String, Integer> params = new HashMap<>();
        params.put("id", id);

        return jdbcTemplate.queryForList(getGeneQuery, params);
    }

    @CrossOrigin
    @GetMapping("/getTopGeneExperiments/{id}")
    public List<Map<String, Object>> getTopExperiments(@PathVariable int id) {

        Map<String, Integer> params = new HashMap<>();
        params.put("id", id);

        return jdbcTemplate.queryForList(getTopExperimentsQuery, params);
    }

    @CrossOrigin
    @GetMapping("/getGeneFragmentsExperiments/{id}")
    public List<Map<String, Object>> getFragments(@PathVariable int id) {

        Map<String, Integer> params = new HashMap<>();
        params.put("id", id);

        return jdbcTemplate.queryForList(getTopFragmentsExperimentsQuery, params);
    }

    @CrossOrigin
    @GetMapping("/getGeneCoverage/{id}")
    public List<Map<String, Object>> getHighFragments(@PathVariable int id) {

        Map<String, Integer> params = new HashMap<>();
        params.put("id", id);

        return jdbcTemplate.queryForList(getFragmentCoverage, params);
    }

    @CrossOrigin
    @GetMapping("/gene-interval")
    public List<Map<String, Object>> getGenesByInterval(@RequestParam long genome_id,
                                                        @RequestParam long exp_id,
                                                        @RequestParam long pos_from,
                                                        @RequestParam long pos_to) {

        Map<String, Long> params = new HashMap<>();
        params.put("genome_id", genome_id);
        params.put("exp_id", exp_id);
        params.put("pos_from", pos_from);
        params.put("pos_to", pos_to);

        return jdbcTemplate.queryForList(getGenesByPositionQuery, params);
    }


    @CrossOrigin
    @GetMapping("/fragment-interval")
    public List<Map<String, Object>> getFragmentsByInterval(@RequestParam long genome_id,
                                                            @RequestParam long exp_id,
                                                            @RequestParam long pos_from,
                                                            @RequestParam long pos_to){

        Map<String, Long> params = new HashMap<>();
        params.put("genome_id", genome_id);
        params.put("exp_id", exp_id);
        params.put("pos_from", pos_from);
        params.put("pos_to", pos_to);

        return jdbcTemplate.queryForList(getFragByPositionQuery, params);
    }
}
