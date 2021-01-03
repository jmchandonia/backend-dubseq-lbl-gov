package gov.lbl.enigma.dubseq.dao;

import com.fasterxml.jackson.databind.ObjectMapper;
import gov.lbl.enigma.dubseq.model.GeneRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;


@Component
public class GenesDaoImpl implements GenesDao {

    @Value("${appgenesfile}")
    private String fileName;

    @Override
    public List<GeneRecord> getGeneList() throws IOException {

        final ObjectMapper objectMapper = new ObjectMapper();
        GeneRecord[] geneRecords = objectMapper.readValue(new File(fileName), GeneRecord[].class);

        return Arrays.asList(geneRecords);
    }
}
