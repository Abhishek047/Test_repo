import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { Tasks } from "./Tasks";

const Body = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { tasks, submitTasks } = useTasks();
    const handleSubmit = async () => {
        // no checks right now
        try {
            setSubmitting(true);
            const res = await submitTasks({ name, description });
            console.log(res ? res : "Failed");
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }
        console.log("submit");
    };

    return (
        <Container maxWidth='xl'>
            <Typography align='center' variant='h2'>
                Form
            </Typography>
            <Box marginTop={"20px"}>
                <form onSubmit={handleSubmit}>
                    <Grid justifyContent='flex-start' container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Task Name'
                                valu={name}
                                onChange={(e) => setName(e.target.value)}
                                variant='outlined'
                                color='primary'
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Task Description'
                                valu={description}
                                onChange={(e) => setDescription(e.target.value)}
                                variant='outlined'
                                required
                                fullWidth
                                color='primary'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={handleSubmit}
                                disabled={submitting}
                                color='primary'
                                variant='contained'
                                fullWidth>
                                {submitting ? <CircularProgress size='2em' /> : "Submit"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Box>
                {tasks.map((task) => (
                    <Box
                        style={{
                            marginTop: "20px",
                        }}>
                        <Tasks task={task} />
                    </Box>
                ))}
            </Box>
        </Container>
    );
};
export default Body;
