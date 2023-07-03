package gov.lbl.enigma.dubseq.service;


import com.fasterxml.jackson.databind.JsonNode;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Cipher;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.*;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.security.spec.RSAPublicKeySpec;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class PublicKeyReader {

    private static final int VALUE_LENGTH = 4;
    private static final byte[] INITIAL_PREFIX = new byte[]{0x00, 0x00, 0x00, 0x07, 0x73, 0x73, 0x68, 0x2d, 0x72, 0x73, 0x61};
    private static final Pattern SSH_RSA_PATTERN = Pattern.compile("ssh-rsa[\\s]+([A-Za-z0-9/+]+=*)[\\s]+.*");


    public static void main(String[] args){

        Map<String, List<String>> headersMap = new HashMap<>();


        System.out.println(getJwt());

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "JwToken " + getJwt());
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request =
                new HttpEntity<String>("{}", httpHeaders);

        ResponseEntity<String> responseEntityStr = restTemplate.
                postForEntity("https://psnov1.lbl.gov:8082/generix/brick/Brick0000001", request, String.class);


        System.out.println(responseEntityStr.getBody());

    }

    public static String getJwt(){
        try {

//            public key.
            PublicKey publicKey = get("/Users/gzahar/.ssh/test_key.pub");
//            indicate the type of cipher.
            Cipher instance = Cipher.getInstance("RSA/ECB/OAEPWithSHA1AndMGF1Padding");
//            initilize cipher to encryp with paramter public_key.
            instance.init(Cipher.ENCRYPT_MODE, publicKey);

//            String to byte array.
            byte[] inputSecred = ("" + System.currentTimeMillis()/1000).getBytes(StandardCharsets.UTF_8);
//            ENCRYPTION.
            byte[] output = instance.doFinal(inputSecred);
//            convert to human readable.
            byte[] b64 = Base64.encodeBase64(output);

//            Creating JWT.
//            Header
            Map<String, Object> headers = new HashMap<>();
            headers.put("typ","JWT");
            headers.put("alg","HS256");
            headers.put("secret", new String(b64, StandardCharsets.UTF_8));

            return Jwts.builder()
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(new Date().getTime() + 120*1000L))
                    .signWith(SignatureAlgorithm.HS256, "data clearinghouse".getBytes("UTF-8"))
                    .setHeader(headers)
                    .compact();


        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    public static PublicKey get(String filename)
            throws Exception {

        byte[] keyBytes = Files.readAllBytes(Paths.get(filename));
        return parseSSHPublicKey(new String(keyBytes));
    }



    public static RSAPublicKey parseSSHPublicKey(String key) throws InvalidKeyException {
        Matcher matcher = SSH_RSA_PATTERN.matcher(key.trim());
        if (!matcher.matches()) {
            throw new InvalidKeyException("Key format is invalid for SSH RSA.");
        }
        String keyStr = matcher.group(1);

        ByteArrayInputStream is = new ByteArrayInputStream(Base64.decodeBase64(keyStr));

        byte[] prefix = new byte[INITIAL_PREFIX.length];

        try {
            if (INITIAL_PREFIX.length != is.read(prefix)) {
                throw new InvalidKeyException("Initial [ssh-rsa] key prefix missed.");
            }

            BigInteger exponent = getValue(is);
            BigInteger modulus = getValue(is);

            return (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(new RSAPublicKeySpec(modulus, exponent));
        } catch (InvalidKeySpecException | NoSuchAlgorithmException | IOException e) {
            throw new InvalidKeyException("Failed to read SSH RSA certificate from string", e);
        }
    }

    private static BigInteger getValue(InputStream is) throws IOException {
        byte[] lenBuff = new byte[VALUE_LENGTH];
        if (VALUE_LENGTH != is.read(lenBuff)) {
            throw new InvalidParameterException("Unable to read value length.");
        }

        int len = ByteBuffer.wrap(lenBuff).getInt();
        byte[] valueArray = new byte[len];
        if (len != is.read(valueArray)) {
            throw new InvalidParameterException("Unable to read value.");
        }

        return new BigInteger(valueArray);
    }

}
