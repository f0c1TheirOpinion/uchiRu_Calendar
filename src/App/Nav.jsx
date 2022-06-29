import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Table, Tbody, Tr, Td } from './shared/Table';

import arrow from './img/arrow.svg';

const NavDay = styled(Td)`
  cursor: pointer;
`;

const NavDayName = styled.div`
  text-align: center;
  padding: 7px 0;
  font-size: 16px;
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const NavDayValue = styled.div`
  text-align: center;
  width: 50px;
  height: 50px;
  margin: auto;
  line-height: 50px;
  font-weight: bold;
  font-size: 26px;
  ${({ active }) =>
    active &&
    `
    border-radius:25px;
    background-color:red;
    color: #fff;
  `}
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
`;

const NavTd = styled(Td)`
  @media (max-width: 600px) {
    height: 45px;
  }
`;

const NavCurrentMonth = styled.td`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const NextWeek = styled.div`
  background-image: url(${arrow});
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: 50%;
  width: 40px;
  height: 40px;
  margin: auto;
  cursor: pointer;
  @media (max-width: 600px) {
    background-size: 20px 20px;
    width: 30px;
    height: 30px;
  }
`;

const PrevWeek = styled(NextWeek)`
  transform: rotate(180deg);
`;

const Nav =  ({changeDay, prevWeek, nextWeek}) => {
    let date = moment();
        let startOfWeek = moment(date).startOf('isoWeek');
        let endOfWeek = moment(date).endOf('isoWeek');

        const days = [];
        let day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(
                <NavDay
                    onClick={e => changeDay(e)}
                    key={day}
                    data-date={day.toISOString()}
                >
                    <NavDayName>{day.format('dd')[0]}</NavDayName>
                    <NavDayValue active={moment().isSame(day, 'day')}>
                        {day.date()}
                    </NavDayValue>
                </NavDay>
            );

            day = day.clone().add(1, 'd');
        }

        return (
            <Table>
                <Tbody>
                    <Tr>
                        <Td />
                        {days}
                    </Tr>
                    <Tr>
                        <NavTd />
                        <NavTd>
                            <PrevWeek onClick={() => prevWeek()} />
                        </NavTd>
                        <NavCurrentMonth colSpan="5">
                            {date.format('MMMM YYYY')}
                        </NavCurrentMonth>
                        <NavTd>
                            <NextWeek onClick={() => nextWeek()} />
                        </NavTd>
                    </Tr>
                </Tbody>
            </Table>
        );
    }


export default Nav;