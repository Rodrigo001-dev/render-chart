import React, { useEffect, useState } from "react";
import { FlatList } from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';

import { EXPENSES } from '../utils/expenses';

import { Card, CardProps } from '../components/Card';
import { Header, MonthsProps } from '../components/Header';

import { Container, Chart } from './styles';

export function Home() {
  const [selected, setSelected] = useState("");
  const [month, setMonth] = useState<MonthsProps>("Janeiro");
  const [data, setData] = useState<CardProps[]>([]);

  function handleCardOnPress(id: string) {
    // prev(pegando o estado anterior)
    // se o meu estado anterior(prev) for igual ao id eu vou desmarcar todos os
    // itens
    // isso vai fazer com que quando o usuário clicar na mesma fatia que já
    // tinha clicado o estado vai voltar a ser uma string vazia para mostrar que
    // nada está selecionado caso contrario eu vou marcar um novo id(id da categoria que vai estar selecionado)
    setSelected(prev => prev === id ? "" : id);
  };

  useEffect(() => {
    setData(EXPENSES[month]);
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
          colorScale={data.map(expense => expense.color)}
          innerRadius={80}
          padAngle={3}
          animate={{
            duration: 2000,
            easing: "bounce"
          }}
          style={{
            labels: {
             fill: '#FFF'
            },
            data: {
              // datum é uma propriedade do próprio chart
              // datum(cada categoria do chart)
              // se ele for a categoria que esta selecionada ou se nenhum esta
              // selecionado então todos ficam com 1 de opacidade ou somente o
              // que esta ativo fica com 1 de opacidade caso contrario fica com
              // 50%
              fillOpacity: ({ datum }) => (datum.id === selected || selected === "") ? 1 : 0.5,
              // pegando a cor de cada fatia
              stroke: ({ datum }) => datum.id === selected ? datum.color: 'none',
              strokeOpacity: 0.5,
              strokeWidth: 10
            },
          }}
          labelComponent={
            <VictoryTooltip 
              renderInPortal={false}
              flyoutStyle={{
                stroke: 0,
                fill: ({ datum }) => datum.color
              }}
            />
          }
        />
      </Chart>

      <FlatList
        data={EXPENSES[month]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={false}
            onPress={() => handleCardOnPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}