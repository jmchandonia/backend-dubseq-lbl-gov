package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.BarseqExperiment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class ExperimentsDaoImpl implements ExperimentsDao {

    static private RowMapper<BarseqExperiment> DEFAULT_ROW_MAPPER = new ExperimentRecordRowMapper();
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("experimentDaoReadAllQuery")
    private String query;

    @Override
    public List<BarseqExperiment> getExperimentsList() {
        return jdbcTemplate.query(query, new ExperimentRecordRowMapper());
    }

    /* SPRING INJECTION */
    @Autowired
    public void setDataSource(DataSource dataSource) {

        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public static class ExperimentRecordRowMapper implements RowMapper<BarseqExperiment> {

        @Override
        public BarseqExperiment mapRow(ResultSet resultSet, int i) throws SQLException {
            BarseqExperiment barseqExperiment = new BarseqExperiment();
            barseqExperiment.setBarseqExperimentId(resultSet.getInt("barseq_experiment_id"));
            barseqExperiment.setBagseqLibraryId(resultSet.getInt("bagseq_library_id"));
            barseqExperiment.setItnum(resultSet.getString("itnum"));
            barseqExperiment.setType(resultSet.getString("type"));
            barseqExperiment.setName(resultSet.getString("name"));
            return barseqExperiment;
        }
    }
}
