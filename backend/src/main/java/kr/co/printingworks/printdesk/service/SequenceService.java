package kr.co.printingworks.printdesk.service;

import kr.co.printingworks.printdesk.enumerate.ResetCycle;

public interface SequenceService {
    public long getNoCacheSequence(String sequenceName);
    public long getNoCacheSequence(String sequenceName, ResetCycle cycle);
}
