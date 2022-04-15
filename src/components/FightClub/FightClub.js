import React, { useState } from 'react'
import robotImg from '../../assets/images/robot.png'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import RobotList from '../RobotList/RobotList';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';


export const FightClub = (props) => {


    const [ robots, setRobots ] = useState([])
    const [ fightWinner, setFightWinner ] = useState()


    const handleCheckboxCheck = (e, robot) => {
        const checked = e.target.checked
        if(checked) {
            setRobots([...robots, robot])
        }

        if(!checked) {
            setRobots(robots.filter(r => r.id !== robot.id))
        }
    }

    const handleFightClub = () => {
        let fighterOne = robots[0];
        let fighterTwo = robots[1];

        let fighterAttackPowerOne = (fighterOne.attack * ((100 - fighterTwo.defense)/100))
        let fighterAttackPowerTwo = (fighterTwo.attack * ((100 - fighterOne.defense)/100))

        fighterOne['hp'] = 100 - fighterAttackPowerTwo;
        fighterTwo['hp'] = 100 - fighterAttackPowerOne;

        const winner = fighterOne.hp > fighterTwo.hp ? fighterOne : fighterTwo

        setFightWinner(winner)

        console.log(fightWinner)

        setFightLog(winner)
        
    }

    const setFightLog = (winner) => {
        let fightLog = localStorage.getItem('fightLog');
        fightLog = fightLog ? JSON.parse(fightLog) : []
        const fightResult = {
            winner: winner,
            fighter_one: robots[0],
            fighter_two: robots[1],
        }

        fightLog.push(fightResult)

        localStorage.setItem('fightLog', JSON.stringify(fightLog))
        
    }

    return (
        <div className='form-container-outer'>
            <div
                className='form-container-inner'
            >
                <h1>This is Fight Club!</h1>
                Choose two robots to fight
                <hr />
                
                <List dense sx={{ 
                    width: '100%', 
                    bgcolor: 'background.paper', 
                    color: '#fff'
                }}>
                    {
                        props.robots.map((robot) => {
                            return (
                                <ListItem
                                    key={robot.id}
                                    className="listItem"
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            disabled={robots.length === 2}
                                            onChange={(e) => handleCheckboxCheck(e, robot)}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <div 
                                                className="avatar"
                                                style={{
                                                    backgroundColor: robot.color
                                                }}
                                            >
                                                <img src={robotImg} alt={robot.name}/>
                                            </div>
                                        </ListItemAvatar>
                                        <ListItemText id={robot.id} primary={robot.name} />
                                    </ListItemButton>
                                </ListItem>
                                
                            )
                        })
                    }
                </List>

                <div className='robot-containers'>
                    <RobotList 
                        robots={robots} 
                        fightClub={true}
                    />
                    {
                        fightWinner ? (
                            <Alert 
                                severity="info"
                                className='pad-me'
                            >
                                {fightWinner.name} won the fight!
                            </Alert>
                        ) : null
                    }
                    {
                        robots.length === 2 && !fightWinner ? (
                            <Button 
                                variant="contained" 
                                color="secondary"
                                onClick={handleFightClub}
                            >
                                FIGHT!
                            </Button>
                        ) : null
                    }
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={() => props.setFightClubActive(false)}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FightClub