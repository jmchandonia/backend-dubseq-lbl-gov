package gov.lbl.enigma.dubseq.service;

import gov.lbl.enigma.dubseq.dao.LayoutDao;
import gov.lbl.enigma.dubseq.model.LayoutRecord;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

@Service
public class LayoutCollectorImpl implements LayoutCollector{

    @Resource
    private LayoutDao layoutDao;

    @Override
    public List<LayoutRecord> composeLayout() throws IOException {
        return layoutDao.getLayoutList();
    }
}
