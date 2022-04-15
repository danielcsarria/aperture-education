import React from 'react';
import Grid from '@mui/material/Grid';
import { RobotCard } from '../RobotCard/RobotCard';

export const RobotList = (props) => {
    const fightClub = props.fightClub

    return (
        !props.loading ? (
            <Grid 
                container 
                spacing={2} 
                className="card-list"
            >
                {
                    props.robots.map((robot) => {
                        return (
                            <Grid 
                                key={robot.id}  
                                item xs={fightClub ? 6 : 4} 
                            >
                                <RobotCard
                                    name={robot.name}
                                    attack={robot.attack}
                                    defense={robot.defense}
                                    color={robot.color}
                                    id={robot.id}
                                    handleCardClick={
                                        !fightClub 
                                            ? props.handleCardClick 
                                            : (() => console.log('do nothing'))
                                    }
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        ) : <div>Loading...</div>
        
    )
}

export default RobotList