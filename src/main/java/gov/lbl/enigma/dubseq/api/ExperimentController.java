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
public class ExperimentController {

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSourse(DataSource dataSrouce) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSrouce);
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Query Strings under /resources/experiment-context.xml
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    @Autowired
    @Qualifier("getAllExperimentsQuery")
    private String getAllExperimentsQuery;

    @Autowired
    @Qualifier("getExperimentsQuery")
    private String getExperimentsQuery;

    @Autowired
    @Qualifier("getExperimentConditionQuery")
    private String getExperimentConditionQuery;

    @Autowired
    @Qualifier("getLibraryExperimentsQuery")
    private String getLibraryExperimentsQuery;

    @Autowired
    @Qualifier("getLibraryExperimentStatsQuery")
    private String getLibraryExperimentStatsQuery;

    @Autowired
    @Qualifier("getLibraryExperimentTopGenesQuery")
    private String getLibraryExperimentTopGenesQuery;

    @Autowired
    @Qualifier("getLibraryExperimentsTopFragmentsQuery")
    private String getLibraryExperimentTopFragmentsQuery;

    @Autowired
    @Qualifier("getExperimentHistogramQuery")
    private String getExperimentHistogramQuery;

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Endpoints.
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    @CrossOrigin
    @GetMapping("/experiments")
    public List<Map<String, Object>> getExperiments(@RequestParam(required = false) String type) {

        String QUERY = getAllExperimentsQuery;

        if (type != null) {
            QUERY = QUERY + " where type='" + type + "'";
        }

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }


    @CrossOrigin
    @GetMapping("/experiments/{id}")
    public List<Map<String, Object>> getExperimentsLanding(@PathVariable long id) {

        String QUERY = getExperimentsQuery;

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/experiments/conditions")
    public List<Map<String, Object>> getExperimentAndMaxGene() {

        String QUERY = getExperimentConditionQuery;

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/libraries/{id}/experiments")
    public List<Map<String, Object>> getLibraryExperiments(@PathVariable long id) {

        String QUERY = String.format(getLibraryExperimentsQuery, id);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/libraries/{id}/experiments/{id_experiment}/stats")
    public List<Map<String, Object>> getLibraryExperiment(@PathVariable long id,
                                                          @PathVariable long id_experiment) {

        String QUERY = String.format(getLibraryExperimentStatsQuery, id, id_experiment);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/libraries/{id}/experiments/{id_experiment}/genes")
    public List<Map<String, Object>> getLibraryExperimentTopGenes(@PathVariable long id,
                                                                  @PathVariable long id_experiment) {
        String QUERY = String.format(getLibraryExperimentTopGenesQuery, id, id_experiment);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/libraries/{id}/experiments/{id_experiment}/fragments")
    public List<Map<String, Object>> getLibraryExperimentTopFragments(@PathVariable long id,
                                                                      @PathVariable long id_experiment) {

        String QUERY = String.format(getLibraryExperimentTopFragmentsQuery, id, id_experiment);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }


    @CrossOrigin
    @GetMapping("/libraries/{id}/experiments/{id_experiment}/graphs")
    public List<Map<String, Object>> getExperimentHistogram(@PathVariable long id,
                                                            @PathVariable long id_experiment) {

        String QUERY = String.format(getExperimentHistogramQuery, id, id_experiment);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }


}
