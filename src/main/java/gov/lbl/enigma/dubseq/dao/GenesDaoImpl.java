package gov.lbl.enigma.dubseq.dao;

import gov.lbl.enigma.dubseq.model.Gene;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;


@Component
public class GenesDaoImpl implements GenesDao {

    static private RowMapper<Gene> DEFAULT_ROW_MAPPER = new GeneRecordRowMapper();

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("geneDaoReadAllQuery")
    private String query;

    /* SPRING INJECTION */
    @Autowired
    public void setDataSource(DataSource dataSource) {

        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    @Override
    public List<Gene> getGeneList() throws IOException {
        return jdbcTemplate.query(query, DEFAULT_ROW_MAPPER);
    }

    public static class GeneRecordRowMapper implements RowMapper<Gene> {
        @Override
        public Gene mapRow(ResultSet resultSet, int i) throws SQLException {
            Gene gene = new Gene();
            gene.setGene_id(resultSet.getInt("gene_id"));
            gene.setGenome_id(resultSet.getInt("genome_id"));
            gene.setGene_index(resultSet.getInt("gene_index"));
            gene.setName(resultSet.getString("name"));
            gene.setLocus_tag(resultSet.getString("locus_tag"));
            gene.setGene_type(resultSet.getString("gene_type"));
            gene.setContig_id(resultSet.getString("contig_id"));
            gene.setPos_from(resultSet.getInt("pos_from"));
            gene.setPos_to(resultSet.getInt("pos_to"));
            gene.setStrand(resultSet.getString("strand") == null ? 0 : resultSet.getString("strand").charAt(0));
            gene.setProduct(resultSet.getString("product"));
            gene.setNote(resultSet.getString("note"));
            gene.setDescription(resultSet.getString("description"));
            return gene;
        }
    }

}
