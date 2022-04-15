import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import RobotList from '../RobotList/RobotList';
import AddEditForm from '../AddEditForm/AddEditForm';
import FightClub  from '../FightClub/FightClub';
import FightLog from '../FightLog/FightLog';


export const Dashboard = () => {
    const [ loading, setLoading ] = useState(true)
    const [ robots, setRobots ] = useState([])
    const [ formActive, setFormActive ] = useState(false)
    const [ fightClubActive, setFightClubActive ] = useState(false)
    const [ fightLogActive, setFightLogActive ] = useState(false)
    const [ formType, setFormType ]= useState('')
    const [ formData, setFormData ]= useState ({})

    useEffect(() => {
        getRobots()
    },[])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const newRobots = robots 
        const formData = e.target
        console.log('formData = ', e.target.id.value)
        newRobots.push({
            id: formData.id.value,
            name: formData.name.value,
            color: formData.color.value,
            attack: formData.attack.value,
            defense: formData.defense.value
        });
        
        setRobots(newRobots);
        postRobot(newRobots);
        setFormActive(false);
    }

    const getRobots = () => {
        // api call stuff but we are just gonna use local storage
        const robotData = localStorage.getItem('robots')
        if (robotData) {
            setRobots(JSON.parse(robotData))
        }
        setLoading(false)
    }

    const postRobot = (newRobots) => {
        // this would also be an api call to write to the db... local storage for now :D
        localStorage.setItem('robots', JSON.stringify(newRobots))
    }

    const closeForm = () => {
        setFormActive(false)
    }

    const handleCardClick = (robot) => {
        setFormData(robot)
        setFormType('edit')
        setFormActive(true)
    }

    const handleDelete = () => {
        const robot = formData
        const newRobots = robots.filter(r => r.id !== robot.id)
        updateRobots(newRobots)
        
    }

    const updateRobots = (newRobots) => {
        setRobots(newRobots)
        postRobot(newRobots)
        setFormActive(false)
    }

    return (
        <Container 
            maxWidth="lg"
            className='dashboard'
        >
            <div className='dash-title'>
                <h1>All Robots</h1>
                <div>
                    <Button 
                        variant="contained" 
                        color="success"
                        onClick={() => {
                            setFormData({})
                            setFormActive(true)
                            setFormType('add')
                        }}
                    >
                        Add Robot
                    </Button>
                </div>
                
            </div>
            <hr />
            {
                robots.length > 0 ? (
                    <>
                        <RobotList 
                            robots={robots}
                            loading={loading}
                            handleCardClick={handleCardClick}
                        />
                        {
                            robots.length < 2 ? <Alert severity="info">Add another Robot to activate Fight Club!</Alert> : (
                                <>
                                    <Button 
                                        variant="contained" 
                                        color="error"
                                        onClick={() => setFightClubActive(true)}
                                    >
                                        Fight Club!
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        onClick={() => setFightLogActive(true)}
                                    >
                                        Fight Histroy
                                    </Button>
                                </>
                                
                            )
                        }
                    </>
                    
                ) : <Alert className="alert" severity="info"> Try Adding a Robot! </Alert>
            }
            
            {
                formActive ? (
                    <AddEditForm 
                        formType={formType}
                        formData={formData}
                        closeForm={closeForm}
                        handleDelete={handleDelete}
                        handleFormSubmit={handleFormSubmit}
                    />
                ) : null
            }
            {
                fightClubActive ? (
                    <FightClub 
                        robots={robots}
                        setFightClubActive={setFightClubActive}
                    />
                ) : null
            }
            {
                fightLogActive ? (
                    <FightLog 
                        setFightLogActive={setFightLogActive}
                    />
                ) : null
            }
            
            
        </Container>
        
    )
}

export default Dashboard