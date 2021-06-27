package gov.lbl.enigma.dubseq.api;

import gov.lbl.enigma.dubseq.dao.GenesDao;
import gov.lbl.enigma.dubseq.dao.GenomeDao;
import gov.lbl.enigma.dubseq.model.FragView;
import gov.lbl.enigma.dubseq.model.Gene;
import gov.lbl.enigma.dubseq.model.GeneView;
import gov.lbl.enigma.dubseq.model.LayoutRecord;
import gov.lbl.enigma.dubseq.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/v2/api")
public class ControllerV2 {

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    @Autowired
    private QueryService queryService;

    @PostMapping("/query/{queryId}")
    public List<Map<String, Object>> getQuery(@PathVariable Long queryId,
                           @RequestBody(required = false) Map<String, Object> params){

        String QUERY = queryService.getQueryString(queryId);

        return jdbcTemplate.queryForList(QUERY, params);
    }
}
