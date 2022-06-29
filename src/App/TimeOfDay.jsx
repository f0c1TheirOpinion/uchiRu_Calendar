import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Td } from './shared/Table';

const TdEvent = styled(Td)`
  border: 2px solid ${props => props.theme.calendar_border};
  ${({ selected }) =>
    selected &&
    `
    
    background-color:#b3b7ff ;
  `}
`;

const TdEventActive = styled(TdEvent)`
  background-color: #ebecff;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    `
    
    background-color:#b3b7ff ;
  `}
`;

const TimeOfDay = ({date, handleSelect,selected_start_date, week_day}) =>  {

        const start_date = moment(date).subtract(1, 'hours');
        const start_date_compare = moment(date)
            .subtract(1, 'hours')
            .subtract(1, 'seconds');
        const end_date = date;



                return (
                    <TdEventActive
                        onClick={() => handleSelect()}
                        data-start-date={moment(start_date).toISOString(true)}
                        selected={moment(selected_start_date).isSame(start_date)}
                        data-active={true}
                    />
                );



        return (
            <TdEvent
                onClick={e => handleSelect(e)}
                data-start-date={moment(start_date).toISOString(true)}
                selected={moment(selected_start_date).isSame(start_date)}
                data-active={false}
            >
                {week_day}
            </TdEvent>
        );
    }


export default TimeOfDay;