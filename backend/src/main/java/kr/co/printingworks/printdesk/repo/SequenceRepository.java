package kr.co.printingworks.printdesk.repo;

import kr.co.printingworks.printdesk.entity.Sequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;

@Repository
public interface SequenceRepository extends JpaRepository<Sequence, Long> {
    @Lock(LockModeType.PESSIMISTIC_READ)
    public Sequence findByName(String sequenceName);
}
