package kr.co.printingworks.printdesk.utils;

import kr.co.printingworks.printdesk.security.Digests;
import kr.co.printingworks.printdesk.service.SequenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Date;

@Component
@PropertySource("classpath:constants.yml")
public class UserUtils {

    private static Integer SALT_SIZE;
    private static int HASH_INTERATIONS;

    @Autowired
    private SequenceService sequenceService;
    private static SequenceService staticSequenceService;

    @PostConstruct
    private void initialize() {
        this.staticSequenceService = sequenceService;
    }

    @Value("${salt-size}")
    private void setSaltSize(Integer saltSize) {
        SALT_SIZE = saltSize;
    }
    @Value("${hash-interations}")
    private void setHashInterations(int hashInterations) {
        HASH_INTERATIONS = hashInterations;
    }

    public static boolean validatePassword(String plainPassword, String password) {
        String plain = Encodes.unescapeHtml(plainPassword);
        byte[] salt = Encodes.decodeHex(password.substring(0, 16));
        byte[] hashPassword = Digests.sha1(plain.getBytes(), salt, HASH_INTERATIONS);
        return password.equals(Encodes.encodeHex(salt) + Encodes.encodeHex(hashPassword));
    }

    public static String encryptPassword(String plainPassword) {
        String plain = Encodes.unescapeHtml(plainPassword);
        byte[] salt = Digests.generateSalt(SALT_SIZE);
        byte[] hashPassword = Digests.sha1(plain.getBytes(), salt, HASH_INTERATIONS);
        return Encodes.encodeHex(salt) + Encodes.encodeHex(hashPassword);
    }

    public static String createCompanyId() {
        return DateUtils.formatDate(new Date(), "yy")
                + NumberUtil.formatToStr(staticSequenceService.getNoCacheSequence("company.id"), "00000");
    }

    public static String createUserNo(String companyId) {
        return "U" + companyId + DateUtils.formatDate(new Date(), "yyMMdd")
                + NumberUtil.formatToStr(staticSequenceService.getNoCacheSequence("user.no"), "00000");
    }
}
