import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Button, IconButton, List } from "@mui/material";
import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { addObservationToOrder, getObservationsByOrder, deleteObservationFromOrder } from "../../services/orderService";
import { or } from "@firebase/firestore";



const ObservacionesSection = ({order, displayEditButtons}) => {
    const [openAddObservation, setOpenAddObservation] = useState(false);
    const [observation, setObservation] = useState("");
    const [observations , setObservations] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    
    const handleAddObservation = async () => {
        await addObservationToOrder(order.id, observation);
        setOpenAddObservation(false);
        setForceUpdate(!forceUpdate);
    }

    const handleDeleteObservation = async (observation) => {
        await deleteObservationFromOrder(order.id, observation);
        setForceUpdate(!forceUpdate);
    }

    useEffect(() => {
        console.log("Fetching observations");
        try{
            const fetchObservations = async (idOrder) => {
                const data = await getObservationsByOrder(idOrder);
                setObservations(data);
                order.observations = data;

            }
            fetchObservations(order.id);

        }catch(error){
            console.log(error);
        }
    }, [forceUpdate]);

    return (
        <>
        <div className="observations">
            <h5> Observaciones </h5>
            {displayEditButtons?(<Button onClick={() => setOpenAddObservation(true)} variant="contained" color="primary"> Agregar</Button>): null}                 
        </div>
        <List>
        {order.observations.map((observation, i) => (
            <div key={i} className="observation-item">
                <h6>{observation}</h6>
                {displayEditButtons?(<div className="observation-buttons">
                    <IconButton className="icon-button" onClick={() => handleDeleteObservation(observation)} >
                        <MdDelete  />
                    </IconButton>
                </div>) : null}
            </div>
        ))} 
         </List>

    <Dialog fullWidth open={openAddObservation} >
        <DialogTitle>
            Agregar Observacion
        </DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Observacion"
                type="text"
                fullWidth
                value={observation}
                onChange={(event) => setObservation(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button variant="outlined"  onClick={() => setOpenAddObservation(false)} color="primary">
                Cancelar
            </Button>
            <Button variant="contained" onClick={handleAddObservation} color="primary">
                Aceptar
            </Button>
        </DialogActions>
    </Dialog>
    </>
    );
}

export default ObservacionesSection;