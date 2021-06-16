package gov.lbl.enigma.dubseq.api;

import org.apache.commons.text.StringSubstitutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("api")
public class OrganismController {

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    private StringSubstitutor sub;

    @Autowired
    public void setParams() {
        Map<String, String> params = new HashMap<>();
        params.put("genome_table", "_temp_genome");
        this.sub = new StringSubstitutor(params);
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Query Strings under /resources/organism-context.xml
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    @Autowired
    @Qualifier("getOrganismsQuery")
    private String getOrganismsQuery;

    @Autowired
    @Qualifier("getOrganismStatsQuery")
    private String getOrganismStatsQuery;

    @Autowired
    @Qualifier("getOrganismLibrariesQuery")
    private String getOrganismLibrariesQuery;

    @Autowired
    @Qualifier("getOrganismTopExperimentsQuery")
    private String getOrganismTopExperimentsQuery;

    @Autowired
    @Qualifier("getOrganismExperimentsQuery")
    private String getOrganismExperimentsQuery;

    @Autowired
    @Qualifier("getOrganismHistogramQuery")
    private String getOrganismHistogramQuery;

    @Autowired
    @Qualifier("getGenesForOrganismQuery")
    private String getGenesForOrganismQuery;

    @Autowired
    @Qualifier("getGenomeHeatMapQuery")
    private String getGenomeHeatMapQuery;

    @Autowired
    @Qualifier("getGenesByPrefixQuery")
    private String getGenesByPrefixQuery;

    @Autowired
    @Qualifier("getGenomeWithConditionQuery")
    private String getGenomeWithConditionQuery;

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Endpoints.
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    @CrossOrigin
    @GetMapping("/organisms")
    public List<Map<String, Object>> getOrganisms() {

        String QUERY = getOrganismsQuery;

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/stats")
    public List<Map<String, Object>> getOrganismStats(@PathVariable long id) {

        Map<String, Long> params = new HashMap<>();
        params.put("genome_id", id);

        return jdbcTemplate.queryForList(getOrganismStatsQuery, params);
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/libraries")
    public List<Map<String, Object>> getOrganismLibraries(@PathVariable long id) {

        String QUERY = String.format(getOrganismLibrariesQuery, id);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/experiments")
    public List<Map<String, Object>> getOrganismExperiments(@PathVariable long id) {

        Map<String, Long> params = new HashMap<>();
        params.put("id", id);

        return jdbcTemplate.queryForList(getOrganismExperimentsQuery, params);
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/topexperiments")
    public List<Map<String, Object>> getOrganismTopExperiments(@PathVariable long id) {

//        String QUERY = String.format(getOrganismTopExperimentsQuery, id);
        Map<String, Long> params = new HashMap<>();
        params.put("id", id);

        return jdbcTemplate.queryForList(getOrganismTopExperimentsQuery, params);
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/graphs")
    public List<Map<String, Object>> getOrganismHistogram(@PathVariable long id) {

        String QUERY = String.format(getOrganismHistogramQuery, id);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{genome_id}/{experiment_id}/genes/{start}")
    public List<Map<String, Object>> getGenesByLibrary(@PathVariable long genome_id,
                                                       @PathVariable long experiment_id,
                                                       @PathVariable String start) {

        Map<String, Long> params = new HashMap<>();
        params.put("g_id", genome_id);
        params.put("exp_id", experiment_id);

        String QUERY = getGenesForOrganismQuery.concat("'" + start + "%';");

        return jdbcTemplate.queryForList(QUERY, params);
    }

    @GetMapping("/organisms/{genome_id}/genes/{start}")
    public List<Map<String, Object>> getGenesByPrefix(@PathVariable long genome_id,
                                                      @PathVariable String start) {

        Map<String, Long> params = new HashMap<>();
        params.put("genome_id", genome_id);

        String QUERY = getGenesByPrefixQuery.concat("'" + start + "%';");

        return jdbcTemplate.queryForList(QUERY, params);
    }

    @PostMapping("/heatmap/{genomeId}")
    public List<Map<String, Object>> getHeatMapForGenome(
            @PathVariable Long genomeId,
            @RequestBody Map<String, Object> body) {

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", genomeId);
        params.addValue("geneIds", body.get("geneIds"));
        params.addValue("experimentIds", body.get("experimentIds"));

        return jdbcTemplate.queryForList(getGenomeHeatMapQuery, params);
    }

    @GetMapping("/organisms/condition/")
    public List<Map<String, Object>> getOrganismsWithCondition(
            @RequestParam String condition) {

        Map<String, String> params = new HashMap<>();
        params.put("condition", condition);

        return jdbcTemplate.queryForList(getGenomeWithConditionQuery, params);
    }

}
