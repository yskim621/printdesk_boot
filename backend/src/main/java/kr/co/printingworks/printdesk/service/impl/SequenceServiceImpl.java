package kr.co.printingworks.printdesk.service.impl;

import kr.co.printingworks.printdesk.entity.Sequence;
import kr.co.printingworks.printdesk.enumerate.ResetCycle;
import kr.co.printingworks.printdesk.repo.SequenceRepository;
import kr.co.printingworks.printdesk.service.SequenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Lazy
public class SequenceServiceImpl implements SequenceService {

    public static long defaultMaxNum = 100000000;

    @Autowired
    SequenceRepository sequenceRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Throwable.class)
    public long getNoCacheSequence(String sequenceName) {
        return getNoCacheSequence(sequenceName, null);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Throwable.class)
    public long getNoCacheSequence(String sequenceName, ResetCycle cycle) {
        Sequence sequence = sequenceRepository.findByName(sequenceName);
        if (sequence == null) {
            sequence = Sequence.builder()
                    .indexNum(1L)
                    .name(sequenceName)
                    .modMaxNum(defaultMaxNum)
                    .cacheCount(1)
                    .build();

            if (cycle != null) {
                sequence = sequence.toBuilder()
                        .cycle(cycle)
                        .currentDateNode(cycle.getCurrentDateNode())
                        .build();
            }
            sequenceRepository.save(sequence);
        } else {
            if (cycle != null) {
                if (!sequence.getCurrentDateNode().equals(cycle.getCurrentDateNode())) {
                    sequence = sequence.toBuilder()
                            .indexNum(0L)
                            .cycle(cycle)
                            .currentDateNode(cycle.getCurrentDateNode())
                            .build();
                }
            }
            long afterSequenceNo = (sequence.getIndexNum() + 1) % sequence.getModMaxNum();
            sequence = sequence.toBuilder().indexNum(afterSequenceNo).build();
            sequenceRepository.save(sequence);
        }
        return sequence.getIndexNum();
    }
}
