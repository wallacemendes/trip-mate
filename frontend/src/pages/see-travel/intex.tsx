import React, { useEffect, useState } from 'react';
import './styles.css'
import Header from '../../components/header/intex';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Modal } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import { ptBR } from 'date-fns/locale';
import ModalActivity from '../../components/create-edit-activity/indext';
import { toast, Toaster } from 'react-hot-toast';
import type {
    ProcessedEvent,
    SchedulerHelpers
} from "@aldabil/react-scheduler/types";


const SeeTravel: React.FC = () => {

    const navigate = useNavigate()

    const [activities, setActivities] = useState<any[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isOpenModal, setOpenModal] = useState<boolean>(false)
    const [selectedActivity, setSelected] = useState<number>(0)
    const [allCost, setAllCost] = useState<any>()
    const [hasChangedScheduler, setHasChanged] = useState<number>(0)
    const [currentTrip, setTrip] = useState<any>({ budget: "00.00" })


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
            res.data.data.forEach((item: any) => cost += item.cost)
            setAllCost(cost)
            setActivities(res.data.data.map((item: any) => {
                const date = new Date(`${item.date} ${item.time}`)
                return {
                    event_id: item.id,
                    title: item.title,
                    start: date,
                    end: new Date(date.setHours(date.getHours() + 1)),
                    color: new Date() > date ? '#f59042' : '#355993'
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

    useEffect(() => {
        api.get(`/trips/${id}`).then(res => {
            setTrip(res.data.data)
        }).catch(err => {
            setTrip({ budget: "00.00" })
            setLoading(false)
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
                    <div className='button-box'>
                        <Button onClick={navigateNewTravel} variant="outlined">Editar viagem</Button>
                        <Button onClick={openModalNewActivity} variant="outlined">Criar atividade</Button>
                    </div>
                    <div className='flex-gap'>
                        <h3>Despesa total:</h3>
                        <h3>${allCost}</h3>
                    </div>
                    {currentTrip.budget !== "00.00" && (
                        <div className='flex-gap'>
                            <h3>Orçamento restante:</h3>
                            <h3 className={getClassBasedOnNumber()}>${Number(currentTrip.budget) - allCost}</h3>
                        </div>
                    )}

                </div>
                {!isLoading && activities.length > 0 ? (
                    <div className='travel-scheduler'>
                        <Scheduler
                            disableViewNavigator
                            locale={ptBR}
                            week={{
                                weekDays: [0, 1, 2, 3, 4, 5],
                                weekStartOn: 6,
                                startHour: 7,
                                endHour: 24,
                                step: 60
                            }}
                            selectedDate={new Date(activities[0].start)}
                            view="week"
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