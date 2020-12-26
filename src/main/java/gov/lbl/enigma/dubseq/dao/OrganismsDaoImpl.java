package gov.lbl.enigma.dubseq.dao;

import com.fasterxml.jackson.databind.ObjectMapper;
import gov.lbl.enigma.dubseq.model.OrganismRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class OrganismsDaoImpl implements OrganismsDao {

    @Value("${apporganismsfile}")
    private String fileName;

    @Override
    public List<OrganismRecord> getOrganismList() throws IOException {

        final ObjectMapper objectMapper = new ObjectMapper();
        OrganismRecord[] organizmRecordArray = objectMapper.readValue(new File(fileName), OrganismRecord[].class);

        return Arrays.asList(organizmRecordArray);
    }
}


