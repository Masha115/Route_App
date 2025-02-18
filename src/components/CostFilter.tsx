import React from "react";
import { Slider } from "antd";
import styles from "./CostFilter.module.scss";

interface CostFilterProps {
  costFilter: number;
  setCostFilter: (value: number) => void;
}

const CostFilter: React.FC<CostFilterProps> = ({
  costFilter,
  setCostFilter,
}) => {
  return (
    <div className={styles.filterContainer}>
      <h4>
        Фильтр по затратам (мин): <span>{costFilter}</span>
      </h4>
      <Slider
        min={0}
        max={60}
        step={1}
        defaultValue={costFilter}
        onChange={(value) => setCostFilter(value)}
      />
    </div>
  );
};

export default CostFilter;
