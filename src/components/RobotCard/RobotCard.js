import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import robot from '../../assets/images/robot.png'

export const RobotCard = (props) => {
    return (
        <Card >
            <CardActionArea
               onClick={() => props.handleCardClick(props)}
            >
                <div className='card-img'>
                    <img 
                        src={robot} 
                        alt={props.name}
                        style={
                            {backgroundColor: props.color}
                        }
                    />
                </div>
                <CardContent>
                    <Typography 
                        gutterBottom
                        variant='h5'
                        component='div'
                        className='card-title'
                    >
                        <div>
                            {props.name}
                        </div>
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        className='card-info'
                        component='div'
                    >
                        <div>
                            <strong>Attack: </strong>{props.attack}     
                        </div>
                        <div>
                            <strong>Defense: </strong>{props.defense}
                        </div>     
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default RobotCard