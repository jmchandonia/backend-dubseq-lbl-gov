package gov.lbl.enigma.dubseq.dao;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import gov.lbl.enigma.dubseq.model.FScoreRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

@Component
public class FScoreDaoImpl implements FScoreDao {

    @Value("${appfscorefile}")
    private String fileName;

    @Override
    public List<FScoreRecord> getRecordList() throws IOException {
        CsvMapper mapper = new CsvMapper();
        CsvSchema schema = CsvSchema.emptySchema().withHeader().withColumnSeparator('\t');
        ArrayList<FScoreRecord> result = new ArrayList<>();
        ObjectReader objectReader = mapper.reader(FScoreRecord.class).with(schema);

        try(Reader reader = new FileReader(fileName)){
            MappingIterator<FScoreRecord> record = objectReader.readValues(reader);
            while(record.hasNext()){

                result.add(record.nextValue());
            }
        }

        return result;
    }
}
