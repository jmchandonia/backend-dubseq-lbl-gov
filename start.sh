#!/bin/sh

export GSCORE_BASE_FILE=/home/cici6/data/gscore_base.tsv
export FSCORE_BASE_FILE=/home/cici6/data/fscore_base.tsv
export FSCORE_FILE=/home/cici6/data/IT001.fscore.tsv
export GSCORE_FILE=/home/cici6/data/IT001.gscore.tsv
export ORGANISMS_FILE=https://raw.githubusercontent.com/gzakhar/backend-dubseq-lbl-gov/master/.testData/organismsfile.json
export EXPERIMENTS_FILE=https://raw.githubusercontent.com/gzakhar/backend-dubseq-lbl-gov/master/.testData/experimentsfile.json
export GENES_FILE=https://raw.githubusercontent.com/gzakhar/backend-dubseq-lbl-gov/master/.testData/genesfile.json
export LAYOUT_FILE=/home/cici6/data/barseq_layout.tsv
export USERNAME=dubseq
export PASSWORD=dubseq
#export URL=jdbc:postgresql://database-dubseq.c7oi87ikmkmz.us-east-2.rds.amazonaws.com/dubseq
export URL=jdbc:postgresql://localhost:5432/dubseq
export DB_USERNAME=dubseq
export DB_PASSWORD=dubseq
export SECURITY_ENABLED=true

#java -jar dubseq-lbl-gov-1.0-20210114.030854-8.jar

#java -jar dubseq-lbl-gov-1.0-SNAPSHOT.jar
