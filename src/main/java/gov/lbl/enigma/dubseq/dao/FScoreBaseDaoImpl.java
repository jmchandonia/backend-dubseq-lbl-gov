package gov.lbl.enigma.dubseq.dao;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import gov.lbl.enigma.dubseq.model.FScoreBaseRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

@Component
public class FScoreBaseDaoImpl implements FScoreBaseDao {

    @Value("${appfscorebasefile}")
    private String fileName;

    @Override
    public List<FScoreBaseRecord> getRecordList() throws IOException {

        CsvMapper mapper = new CsvMapper();
        CsvSchema schema = CsvSchema.emptySchema().withHeader().withColumnSeparator('\t');
        ArrayList<FScoreBaseRecord> result = new ArrayList<>();
        ObjectReader objectReader = mapper.reader(FScoreBaseRecord.class).with(schema);

        try(Reader reader = new FileReader("docs/fscore_base.tsv")){
            MappingIterator<FScoreBaseRecord> record = objectReader.readValues(reader);
            while(record.hasNext()){

                result.add(record.nextValue());
            }
        }

        return (List<FScoreBaseRecord>) result;
    }

}
