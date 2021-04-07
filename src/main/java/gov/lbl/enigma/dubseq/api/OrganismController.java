package gov.lbl.enigma.dubseq.api;

import org.apache.commons.text.StringSubstitutor;
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
    @Qualifier("getOrganismExperimentsQuery")
    private String getOrganismExperimentsQuery;

    @Autowired
    @Qualifier("getOrganismHistogramQuery")
    private String getOrganismHistogramQuery;

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Endpoints.
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    @CrossOrigin
    @GetMapping("/organisms")
    public List<Map<String, Object>> getOrganisms(@RequestParam(required = false) String id) {

        String QUERY = getOrganismsQuery;

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/stats")
    public List<Map<String, Object>> getOrganismStats(@PathVariable long id) {

        String QUERY = String.format(getOrganismStatsQuery, id);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
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

        String QUERY = String.format(getOrganismExperimentsQuery, id);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/graphs")
    public List<Map<String, Object>> getOrganismHistogram(@PathVariable long id) {

        String QUERY = String.format(getOrganismHistogramQuery, id);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

}
