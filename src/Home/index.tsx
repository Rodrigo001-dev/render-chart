import React, { useState, useEffect } from "react";
import { FlatList } from 'react-native';
import { VictoryPie } from 'victory-native';

import { EXPENSES } from '../utils/expenses';

import { Card, CardProps } from '../components/Card';
import { Header, MonthsProps } from '../components/Header';

import { Container, Chart } from './styles';

export function Home() {
  const [month, setMonth] = useState<MonthsProps>("Janeiro");
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    setData(EXPENSES[month])
  }, [month]);

  return (
    <Container>
      <Header
        onValueChange={setMonth}
        selectedValue={month}
      />

      <Chart>
        {/* x=label y=value */}
        <VictoryPie 
          data={data}
          x="label"
          y="value"
        />
      </Chart>

      <FlatList
        data={EXPENSES[month]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={false}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
