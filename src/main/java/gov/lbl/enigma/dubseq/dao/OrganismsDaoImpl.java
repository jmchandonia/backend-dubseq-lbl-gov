package gov.lbl.enigma.dubseq.dao;

import com.fasterxml.jackson.databind.ObjectMapper;
import gov.lbl.enigma.dubseq.model.OrganismRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

@Component
public class OrganismsDaoImpl implements OrganismsDao {

    @Value("${apporganismsfile}")
    private String url;

    @Override
    public List<OrganismRecord> getOrganismList() throws IOException {

        final ObjectMapper objectMapper = new ObjectMapper();
        OrganismRecord[] organizmRecordArray = objectMapper.readValue(new URL(url), OrganismRecord[].class);

        return Arrays.asList(organizmRecordArray);
    }
}