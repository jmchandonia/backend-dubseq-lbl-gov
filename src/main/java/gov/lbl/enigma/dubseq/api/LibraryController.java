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
public class LibraryController {

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Query Strings under /resources/library-context.xml
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    @Autowired
    @Qualifier("getLibraryStatsQuery")
    private String getLibraryStatsQuery;

    @Autowired
    @Qualifier("getTopPerformingGenesInExperimentsQuery")
    private String getTopPerformingGenesInExperimentsQuery;

    @Autowired
    @Qualifier("getFragmnetCountQuery")
    private String getFragmnetCountQuery;

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Endpoints.
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    @CrossOrigin
    @GetMapping("/libraries/{id}/stats")
    public List<Map<String, Object>> getLibraryStats(@PathVariable long id) {

        String QUERY = String.format(getLibraryStatsQuery, id);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/libraries/{id}/highscoregenes")
    public List<Map<String, Object>> getTopPerformingGenesInExperiments(@PathVariable long id) {

        String QUERY = String.format(getTopPerformingGenesInExperimentsQuery, id);

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }

    @CrossOrigin
    @GetMapping("/libraries/{id}/fragmentcount")
    public List<Map<String, Object>> getFragmentCount(@PathVariable long id) {

        String QUERY = getFragmnetCountQuery;

        return jdbcTemplate.queryForList(QUERY, new HashMap<>());
    }
}
