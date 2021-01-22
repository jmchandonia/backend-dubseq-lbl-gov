package gov.lbl.enigma.dubseq.api;

import gov.lbl.enigma.dubseq.dao.GenesDao;
import gov.lbl.enigma.dubseq.dao.GenomeDao;
import gov.lbl.enigma.dubseq.model.*;
import gov.lbl.enigma.dubseq.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("api")
public class Controller {

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    @Autowired
    private FScoreCollector fScoreCollector;

    @Autowired
    private GScoreCollector gScoreCollector;

    @Autowired
    private GenesDao genesDao;

    @Autowired
    private GenomeDao genomeDao;

    @Autowired
    private ExperimentsCollector experimentsCollector;

    @Autowired
    private GenesCollector genesCollector;

    @Autowired
    private LayoutCollector layoutCollector;

    @CrossOrigin
    @GetMapping("/fragview")
    public Collection<FragView> getFragmenrs(
            @RequestParam int posFrom,
            @RequestParam int posTo) throws IOException {
        return fScoreCollector.composeFragment(posFrom, posTo);
    }

    @CrossOrigin
    @GetMapping("/geneview")
    public Collection<GeneView> getGenes(
            @RequestParam int posFrom,
            @RequestParam int posTo) throws IOException {
        return gScoreCollector.composeGene(posFrom, posTo);
    }

    @CrossOrigin
    @GetMapping("/organisms")
    public List<Map<String, Object>> getOrganisms(
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String type) {

        String QUERY = "select\n" +
                "\tg.genome_id,\n" +
                "\tg.\"name\",\n" +
                "\tg.\"size\",\n" +
                "\tg.ncbi_taxonomy_id,\n" +
                "\tg.phylum,\n" +
                "\t(select count(*) from gene g2 where g2.genome_id = g.genome_id),\n" +
                "\t(select count(*) from bagseq_library b where b.genome_id = g.genome_id) as library_count,\n" +
                "\t(select \n" +
                "\t\tcount(*) \n" +
                "\tfrom barseq_experiment e join bagseq_library b using(bagseq_library_id) where b.genome_id = g.genome_id) as experiment_count\n" +
                "from genome g";

        if (id != null) {
            QUERY = QUERY + " where g.genome_id = " + id;
        }
        return jdbcTemplate.queryForList(QUERY, new HashMap<String, Object>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/stats")
    public List<Map<String, Object>> getOrganismStats(@PathVariable long id) {

        String QUERY = "select \n" +
                "\tg.genome_id,\n" +
                "\tg.\"name\",\n" +
                "\tg.\"size\",\n" +
                "\tg.ncbi_taxonomy_id,\n" +
                "\tg.phylum,\n" +
                "\tg.gene_count\n" +
                "from genome g \n" +
                "where g.genome_id = " + id;


        return jdbcTemplate.queryForList(QUERY, new HashMap<String, Object>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/libraries")
    public List<Map<String, Object>> getOrganismLibraries(@PathVariable long id) {

        String QUERY = "select \n" +
                "\tbl.bagseq_library_id,\t\n" +
                "\tbl.\"name\",\n" +
                "\t(select count(*) from bagseq_fragment bf where bl.bagseq_library_id = bf.bagseq_library_id) as fragment_count,\n" +
                "\t(select count(*) from barseq_experiment be where bl.bagseq_library_id = be.bagseq_library_id ) as experiment_count\n" +
                "from \n" +
                "\tbagseq_library bl inner join genome g on bl.genome_id = g.genome_id \n" +
                "\t where g.genome_id = " + id;

        return jdbcTemplate.queryForList(QUERY, new HashMap<String, Object>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/experiments")
    public List<Map<String, Object>> getOrganismExperiments(@PathVariable long id) {

        String QUERY = "select \n" +
                "\tbe.barseq_experiment_id,\n" +
                "\tbgs.score_ridge,\n" +
                "\tbe.\"type\",\n" +
                "\tbe.itnum,\n" +
                "\tbe.\"name\"\n" +
                "from genome g \n" +
                "\tinner join bagseq_library bl on g.genome_id = bl.genome_id \n" +
                "\tinner join barseq_experiment be on bl.bagseq_library_id = be.bagseq_library_id \n" +
                "\tinner join barseq_gene_score bgs on be.barseq_experiment_id = bgs.barseq_experiment_id \n" +
                "\twhere g.genome_id = " + id + "\n" +
                "\torder by bgs.score_ridge desc limit 10";


        return jdbcTemplate.queryForList(QUERY, new HashMap<String, Object>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}/graph")
    public List<Map<String, Object>> getOrganismGraph(@PathVariable long id) {

        String QUERY = "select\n" +
                "be.type,\n" +
                "count(*)\n" +
                "from genome g\n" +
                "inner join bagseq_library bl on g.genome_id = bl.genome_id\n" +
                "inner join barseq_experiment be on bl.bagseq_library_id = be.bagseq_library_id\n" +
                "where g.genome_id = " + id + "\n"+
                "group by be.type";

        return jdbcTemplate.queryForList(QUERY, new HashMap<String, Object>());
    }

    @CrossOrigin
    @GetMapping("/organisms/{id}")
    public List<Map<String, Object>> getOrganisms(@PathVariable long id) throws IOException {

        return jdbcTemplate.queryForList("select genome_id, name from genome", new HashMap<String, Object>());
    }

    @CrossOrigin
    @GetMapping("/bagseq/{id}/libraries")
    public List<Map<String, Object>> getBagSeq(@PathVariable long id) throws IOException {

        return jdbcTemplate.queryForList("select \n" +
                "\tbl.bagseq_library_id as lib_id,\n" +
                "\tbl.name,\n" +
                "\tbl.host_genome_id as host_genome_id,\n" +
                "\t(select count(*) from bagseq_fragment bf where bl.bagseq_library_id = bf.bagseq_library_id) as frag_count,\n" +
                "\t(select count(*) from barseq_experiment be where bl.bagseq_library_id = be.bagseq_library_id) experiment_count\n" +
                "from bagseq_library bl \n" +
                "where bl.bagseq_library_id = " + id, new HashMap<String, Object>());
    }


    @CrossOrigin
    @GetMapping("/experiments")
    public List<Map<String, Object>> getExperiments(
            @RequestParam(required = false) String type
    ) {

        String QUERY = "select * from barseq_experiment";

        if (type != null) {
            QUERY = QUERY + " where type='" + type + "'";
        }

        return jdbcTemplate.queryForList(QUERY, new HashMap<String, Object>());
    }

//    @CrossOrigin
//    @GetMapping("/experiments")
//    public Collection<BarseqExperiment> getExperiments() throws IOException {
//
//        return experimentsCollector.composeExperiments();
//    }

    @CrossOrigin
    @GetMapping("/genes")
    public Collection<Gene> getGenesList() throws IOException {

        return genesDao.getGeneList();
//        return genesCollector.composeGene();
    }

    @CrossOrigin
    @GetMapping("/layout")
    public Collection<LayoutRecord> getLayoutList() throws IOException {
        return layoutCollector.composeLayout();
    }





}
