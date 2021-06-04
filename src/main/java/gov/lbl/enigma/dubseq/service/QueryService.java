package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.dao.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Service
public class QueryService {


    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }


    public String getQuery(long queryId) {

        Map<String, Long> params = new HashMap<>();
        params.put("queryId", queryId);

        Query QUERY = jdbcTemplate.queryForObject(
                "SELECT * FROM query WHERE query_id = (:queryId)",
                params,
                (rs, rowNum) -> {
                    Query query = new Query();
                    query.setQueryId(rs.getLong("query_id"));
                    query.setQuery(rs.getString("query_string"));
                    return query;
                }
        );

        assert QUERY != null;
        return QUERY.getQuery();
    }
}

