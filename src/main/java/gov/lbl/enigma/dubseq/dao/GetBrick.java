package gov.lbl.enigma.dubseq.dao;

import com.auth0.jwt.algorithms.Algorithm;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;

import java.io.UnsupportedEncodingException;
import java.security.PublicKey;
import java.util.Date;

public class GetBrick {

    @Value("${pubkey}")
    private String pubKey;


//    String createJwt(String id, String issuer, String subject, long ttlMillis) throws UnsupportedEncodingException {



}

