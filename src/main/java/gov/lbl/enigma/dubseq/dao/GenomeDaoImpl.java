package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.Genome;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class GenomeDaoImpl implements GenomeDao {

    static private RowMapper<Genome> DEFAULT_ROW_MAPPER = new GenomeRowMapper();
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("genomeDaoRealAllQuery")
    private String query;


    @Override
    public List<Genome> getGenomeList() {
        return jdbcTemplate.query(query, DEFAULT_ROW_MAPPER);
    }

    @Override
    public List<Map<String, Object>> getGenomeListMap() {
        return jdbcTemplate.queryForList(query, new HashMap<String, Object>());
    }

    /* SPRING INJECTION */
    @Autowired
    public void setDataSource(DataSource dataSource) {

        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public static class GenomeRowMapper implements RowMapper<Genome> {
        @Override
        public Genome mapRow(ResultSet resultSet, int i) throws SQLException {
            Genome genome = new Genome();
            genome.setGenome_id(resultSet.getInt("genome_id"));
            genome.setName(resultSet.getString("name"));
            return genome;
        }
    }
}
