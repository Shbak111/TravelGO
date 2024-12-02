import React, { useMemo } from "react";
import styled from "styled-components";

const LEVEL_THRESHOLDS = [0, 1000, 5000, 15000, 35000, 70000, 100000];

const ExperienceBar = ({ currentExp = 0 }) => {
  const { level, progress, nextThreshold, currentThreshold } = useMemo(() => {
    let level = 0;
    for (let i = 0; i < LEVEL_THRESHOLDS.length - 1; i++) {
      if (
        currentExp >= LEVEL_THRESHOLDS[i] &&
        currentExp < LEVEL_THRESHOLDS[i + 1]
      ) {
        level = i;
        const currentThreshold = LEVEL_THRESHOLDS[i];
        const nextThreshold = LEVEL_THRESHOLDS[i + 1];
        const progress =
          ((currentExp - currentThreshold) /
            (nextThreshold - currentThreshold)) *
          100;
        return { level, progress, nextThreshold, currentThreshold };
      }
    }
    return {
      level: LEVEL_THRESHOLDS.length - 1,
      progress: 100,
      nextThreshold: LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1],
      currentThreshold: LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 2],
    };
  }, [currentExp]);

  return (
    <Container>
      <ExpInfo>
        {currentExp.toLocaleString()} / {nextThreshold.toLocaleString()} EXP (
        {progress.toFixed(1)}%)
      </ExpInfo>
      <BarContainer>
        <ThresholdMarkers>
          {LEVEL_THRESHOLDS.map((threshold, index) => (
            <ThresholdMark
              key={index}
              style={{
                left: `${(index / (LEVEL_THRESHOLDS.length - 1)) * 100}%`,
              }}
            >
              {threshold.toLocaleString()}
            </ThresholdMark>
          ))}
        </ThresholdMarkers>
        <BarFiller style={{ width: `${progress}%` }} />
      </BarContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
  position: relative;
`;

const LevelLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: #2c3e50;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 24px;
  background-color: #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const BarFiller = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4caf50 0%, #45a049 100%);
  transition: width 0.4s ease;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
`;

const ThresholdMarkers = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ThresholdMark = styled.div`
  position: absolute;
  transform: translateX(-50%);
  font-size: 10px;
  color: #666;
  top: 100%;
  margin-top: 4px;
`;

const ExpInfo = styled.div`
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 8px;
`;

export default ExperienceBar;
