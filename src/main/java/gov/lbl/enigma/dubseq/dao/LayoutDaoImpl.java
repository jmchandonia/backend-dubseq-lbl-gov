package gov.lbl.enigma.dubseq.dao;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import gov.lbl.enigma.dubseq.model.GScoreBaseRecord;
import gov.lbl.enigma.dubseq.model.LayoutRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

@Component
public class LayoutDaoImpl implements LayoutDao{

    @Value("${appbarseqlayoutfile}")
    private String fileName;

    @Override
    public List<LayoutRecord> getLayoutList() throws IOException {
        CsvMapper mapper = new CsvMapper();
        CsvSchema schema = CsvSchema.emptySchema().withHeader().withColumnSeparator('\t');
        ArrayList<LayoutRecord> result = new ArrayList<>();
        ObjectReader objectReader = mapper.reader(LayoutRecord.class).with(schema);

        try(Reader reader = new FileReader(fileName)){
            MappingIterator<LayoutRecord> record = objectReader.readValues(reader);
            while(record.hasNext()){

                result.add(record.nextValue());
            }
        }

        return result;
    }
}
