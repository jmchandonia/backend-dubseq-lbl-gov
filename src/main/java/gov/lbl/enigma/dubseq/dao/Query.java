package gov.lbl.enigma.dubseq.dao;

public class Query {

    private Long queryId;
    private String query;

    public Long getQueryId() {
        return queryId;
    }

    public void setQueryId(Long queryId) {
        this.queryId = queryId;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    @Override
    public String toString() {
        return "Query{" +
                "queryId=" + queryId +
                ", query='" + query + '\'' +
                '}';
    }
}
