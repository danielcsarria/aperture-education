import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';

export const FightLog = (props) => {

    const [ fightLog, setFightLog ] = useState([])

    useEffect(() => {
        getFightLog()
        
    },[])

    const getFightLog = () => {
        // api call for fight log
        const fightLog = localStorage.getItem('fightLog')
        setFightLog(fightLog ? JSON.parse(fightLog) : [])
    }

    console.log(fightLog)

    return (
        <div className='form-container-outer'>
            <div
                className='form-container-inner'
            >
                <h1>Fight Log</h1>
                <hr />
                
                {
                    fightLog.length > 0 ? (
                        <List dense sx={{ 
                            width: '100%', 
                            bgcolor: 'background.paper', 
                            color: '#fff'
                        }}>
                            {
                                fightLog.map((fight, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            className="listItem log"
                                            disablePadding
                                        >
                                            <div>
                                                <strong>Winner: </strong> {fight.winner.name}    
                                            </div>
                                            <div>
                                                {`${fight.fighter_one.name} Vs. ${fight.fighter_two.name}`}
                                            </div>
                                        </ListItem>
                                        
                                    )
                                })
                            }
                        </List>
                    ) : <Alert severity="info">No fight history...</Alert>
                }
                

                <Button 
                    variant="contained" 
                    color="secondary"
                    className='pad-me'
                    onClick={() => props.setFightLogActive(false)}
                >
                    Close
                </Button>
            </div>
        </div>
    )
}

export default FightLog