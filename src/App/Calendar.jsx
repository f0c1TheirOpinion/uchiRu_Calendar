import React, { useState} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import moment from 'moment';

import { GlobalStyle } from './theme/globalStyle';

import Header from './Header';
import Nav from './Nav';
import Week from './Week';
import ControlsBottom from './ControlsBottom';

import { defaultTheme } from './theme/defaultTheme';

const CalendarWrapper = styled.div`
  text-align: center;
  max-width: 740px;
  background-color: ${props => props.theme.calendar_bg};
  margin: auto;
  position: relative;
`;

const CalendarNav = styled.div`
  background-color: ${props => props.theme.calendar_control_bg};
  border-top: 2px solid ${props => props.theme.calendar_border};
  border-bottom: 2px solid ${props => props.theme.calendar_border};
  position: fixed;
  z-index: 99;
  top: 80px;
  max-width: 740px;
  width: 100%;
`;

const CalendarMain = styled.div`
  margin-top: 140px;
  margin-bottom: 70px;
  @media (max-width: 600px) {
    margin-top: 100px;
  }
`;

const CalendarBottom = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 740px;
  height: 80px;
  z-index: 99;
  background-color: ${props => props.theme.calendar_control_bg};
`;

const Calendar = () => {




    let date = moment();
    const [dateST, setDateST] = useState(date);
    const [eventDates, setEventDates] = useState({});
    const [selectStartDate, setSelectStartDate] = useState(null);
    const [selectedActive, setSelectedActive] = useState(false);
    const [deleter, setDeleter] = useState(false);





    const changeDay = event => {
        setDateST(moment(event.currentTarget.getAttribute('data-date')));

    };

    const prevWeek = () => {
        setDateST(dateST.subtract(1, 'weeks'))

    };

    const nextWeek = () => {

        setDateST(dateST.add(1, 'weeks'));
    };

    const handleSelect = () => {
        setDeleter(true);
    };



    const createEvent = () => {
        window.prompt('Enter event time: YYYY-MM-DD HH:mm:ss');
    console.log('hh')

        };


        const handleTodayClick = () => {

        };

        const handleDelete = () => {
            if (selectStartDate && selectedActive) {
                const date_str = moment(selectStartDate).format(
                    'YYYY-MM-DD'
                );
                const events = [];
                for (let date of eventDates[date_str]) {
                    const difference_from_start = selectStartDate.diff(
                        date,
                        'minutes'
                    );

                    if (difference_from_start > 0 || difference_from_start <= -60) {
                        events.push(date);
                    }
                }

                let new_event_dates = {eventDates};
                new_event_dates[date_str] = events;
                setEventDates(new_event_dates);
                setSelectStartDate(null);
                setSelectedActive(false);

            }
        };


        return (
            <ThemeProvider theme={defaultTheme}>
                <CalendarWrapper>
                    <GlobalStyle/>
                    <Header createEvent={() => createEvent()}/>
                    <CalendarNav>
                        <Nav
                            changeDay={changeDay}
                            prevWeek={prevWeek}
                            nextWeek={nextWeek}
                            date={date}
                        />
                    </CalendarNav>

                    <CalendarMain>
                        <Week
                            event_dates={eventDates}
                            date={dateST}
                            handleSelect={handleSelect}
                            selected_start_date={selectStartDate}
                        />
                    </CalendarMain>
                    <CalendarBottom>
                        <ControlsBottom
                            handleTodayClick={handleTodayClick}
                            deletable={selectedActive}
                            handleDelete={handleDelete}
                            deleter = {deleter}
                        />
                    </CalendarBottom>
                </CalendarWrapper>
            </ThemeProvider>
        );
    }



export default Calendar;