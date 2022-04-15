import React, { useState } from 'react';
import Button from '@mui/material/Button';

export const AddEditForm = (props) => {
    const [ robotId, setRobotId ] = useState(props.formData.id || '')
    const formTypeEdit = props.formType === 'edit' ? true : false

    const handleNameChange = (e) => {
        setRobotId(e.target.value.replace(/\s/g, '_').toLowerCase())
    }

    return (
        <div className='form-container-outer'>
            <div
                className='form-container-inner'
            >
                <h1>{props.formType} Robot</h1>
                <hr />
                <form
                    onSubmit={(e) =>{
                        props.handleFormSubmit(e)
                    }}
                >
                    <input
                        type='text'
                        name='name'
                        id='name'
                        required
                        defaultValue={props.formData.name}
                        disabled={formTypeEdit}
                        onChange={(e) => handleNameChange(e)}
                        placeholder='Name'
                    />
                    <input
                        type='text'
                        name='id'
                        id='id'
                        value={robotId}
                        disabled={true}
                        placeholder='ID'
                    />
                    <label>
                        Attack:
                        <input
                            type='number'
                            name='attack'
                            required
                            id='attack'
                            disabled={formTypeEdit}
                            defaultValue={props.formData.attack}
                        />
                    </label>
                    <label>
                        Defense:
                        <input
                            type='number'
                            name='defense'
                            id='defense'
                            required
                            disabled={formTypeEdit}
                            defaultValue={props.formData.defense}
                        />
                    </label>
                    <label>
                        Color:
                        <input
                            type='color'
                            name='color'
                            id='color'
                            min={1}
                            required
                            disabled={formTypeEdit}
                            defaultValue={props.formData.color}
                        />
                    </label>
                    <div className="button-container">
                        {
                            !formTypeEdit ? (
                                <Button 
                                    variant="contained" 
                                    color="success"
                                    type='submit'
                                >
                                    Add
                                </Button>
                            )  : null
                        }
                        
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={props.closeForm}
                        >
                            {!formTypeEdit ? 'Cancel' : 'Close'}
                        </Button>
                        {
                            formTypeEdit ? (
                                <Button 
                                    variant="contained" 
                                    color="error"
                                    onClick={props.handleDelete}
                                    className='delete'
                                >
                                    Delete
                                </Button>
                            ) : null
                        }
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default AddEditForm