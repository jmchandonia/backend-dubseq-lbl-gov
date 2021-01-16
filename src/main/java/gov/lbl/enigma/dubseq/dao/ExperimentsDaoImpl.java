package gov.lbl.enigma.dubseq.dao;

import com.fasterxml.jackson.databind.ObjectMapper;
import gov.lbl.enigma.dubseq.model.ExperimentsRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

@Component
public class ExperimentsDaoImpl implements ExperimentsDao {

    @Value("${appexperimentsfile}")
    private String url;

    @Override
    public List<ExperimentsRecord> getExperimentsList() throws IOException {
        final ObjectMapper objectMapper = new ObjectMapper();
        ExperimentsRecord[] experimentsRecords = objectMapper.readValue(new URL(url), ExperimentsRecord[].class);

        return Arrays.asList(experimentsRecords);
    }
}
