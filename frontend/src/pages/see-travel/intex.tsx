import React, { useEffect, useState } from 'react';
import './styles.css'
import Header from '../../components/header/intex';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Modal, Paper, Typography } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import { ptBR } from 'date-fns/locale';
import ModalActivity from '../../components/create-edit-activity/indext';
import { toast, Toaster } from 'react-hot-toast';
import type {
    SchedulerHelpers
} from "@aldabil/react-scheduler/types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';


type currencyType = "BRL" | "USD" | "EUR"


const SeeTravel: React.FC = () => {

    const navigate = useNavigate()

    const [activities, setActivities] = useState<any[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isOpenModal, setOpenModal] = useState<boolean>(false)
    const [selectedActivity, setSelected] = useState<number>(0)
    const [allCost, setAllCost] = useState<any>(0)
    const [hasChangedScheduler, setHasChanged] = useState<number>(0)
    const [currentTrip, setTrip] = useState<any>({ budget: "00.00" })
    const [currency, setCurrency] = useState<any>("R$")
    const [expenses, setExpenses] = useState<any>([])


    const { id } = useParams()

    const styleModal = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        setLoading(true)
        api.get(`/trips/${id}/activities`).then(res => {
            console.log(res.data.data)
            let cost = 0;
            res.data.data.forEach((item: any) => cost += Number(item.cost))
            setAllCost(cost)
            setActivities(res.data.data.map((item: any) => {
                return {
                    event_id: item.id,
                    title: item.title,
                    start: new Date(`${item.start}`),
                    end: new Date(`${item.end}`),
                    color: new Date() > new Date(`${item.end}`) ? '#f59042' : '#355993'
                }
            }))
            console.log(activities)
            setLoading(false);
        }).catch(err => {
            setActivities([])
            setLoading(false)
        })

        //despesas
    }, [id, isOpenModal, hasChangedScheduler])

    const currencyDictionary = {
        "BRL": "R$",
        "USD": "$",
        "EUR": "€"
    }

    useEffect(() => {
        setLoading(true)
        api.get(`/trips/${id}`).then(res => {
            setTrip(res.data.data)
            setCurrency(currencyDictionary[res.data.data.currency as currencyType])
            setLoading(false)
        }).catch(err => {
            setTrip({ budget: "00.00" })
            setLoading(false)
        })
        api.get(`trips/${id}/cost`)
            .then(response => {
                console.log(response.data)
                const formatedExpenses = Object.keys(response.data).map(function (key, index) {
                    return {
                        expense: response.data[key],
                        date: key
                    }
                });
                console.log(formatedExpenses)
                setExpenses(formatedExpenses)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
            })
    }, [id])

    function navigateNewTravel() {
        return navigate(`/editar-viagem/${id}`)
    }

    function openModalNewActivity() {
        setSelected(0);
        setOpenModal(true)
    }

    function editActivity(id: any) {
        setSelected(Number(id))
        setOpenModal(true)
    }

    function handleClose(scheduler?: SchedulerHelpers) {
        setOpenModal(false)
        if (scheduler) {
            setHasChanged(hasChangedScheduler + 1)
            return scheduler.close();
        }
    }

    function getClassBasedOnNumber() {
        return Number(currentTrip.budget) - allCost > 0 ? 'cost-fine' : 'cost-bad';
    }

    function formatDate(date: string){
        if(date != null){
            return dayjs(date).format('DD/MM/YYYY');
        }
        return '';
    }

    return (
        <div className='see-travel'>
            <Header />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='dashboard-container'>
                <div className='flex-center'>
                    <h2>Atividades da viagem</h2>
                </div>
                <div>
                    <div className='button-box mg-bottom'>
                        <Button onClick={navigateNewTravel} variant="outlined">Editar viagem</Button>
                        <Button onClick={openModalNewActivity} variant="outlined">Criar atividade</Button>
                    </div>
                    {!isLoading && (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Exibir relação de gastos</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='flex-gap'>
                                    <h4>Despesa total:</h4>
                                    <h4>{currency}{allCost}</h4>
                                </div>
                                {currentTrip.budget !== "00.00" && (
                                    <div className='flex-gap mg-bottom'>
                                        <h4>Orçamento restante:</h4>
                                        <h4 className={getClassBasedOnNumber()}>{currency}{Number(currentTrip.budget) - allCost}</h4>
                                    </div>
                                )}
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Dia</TableCell>
                                                <TableCell align="right">Gasto</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {expenses.map((row: any) => (
                                                <TableRow
                                                    key={row.date}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {formatDate(row.date)}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {currency}{row.expense}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    )}

                </div>
                {!isLoading && activities.length > 0 ? (
                    <div className='travel-scheduler'>
                        <Scheduler
                            disableViewNavigator
                            locale={ptBR}
                            week={{
                                weekDays: [0, 1, 2, 3, 4, 5, 6],
                                weekStartOn: 0,
                                startHour: 7,
                                endHour: 24,
                                step: 60,
                            }}
                            selectedDate={new Date(activities[0].start)}
                            view="week"
                            hourFormat='24'
                            events={activities}
                            editable={false}
                            deletable={false}
                            draggable={false}
                            onEventClick={(event) => editActivity(event.event_id)}
                            customEditor={(scheduler) => <ModalActivity id={selectedActivity} tripId={Number(id)} handleClose={() => handleClose(scheduler)} />}
                        />
                    </div>
                ) : isLoading && <div className="full-width flex-center"><CircularProgress /></div>}
                {!isLoading && activities.length === 0 && <h2>Sem atividades para essa viagem</h2>}

            </div>
            <Modal
                open={isOpenModal}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <ModalActivity id={selectedActivity} tripId={Number(id)} handleClose={() => handleClose()} />
                </Box>
            </Modal>
        </div>
    );
};

export default SeeTravel;