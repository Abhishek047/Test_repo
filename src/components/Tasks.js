import { Box, Paper, Typography } from "@material-ui/core";
export const Tasks = ({ task }) => {
    console.log(task);
    return (
        <Paper elevation={2}>
            <Box
                style={{
                    padding: 10,
                }}>
                <Typography variant='h5'>{task.name}</Typography>
                <Box
                    style={{
                        paddingLeft: 10,
                    }}>
                    <Typography variant='subtitle2'>{task.description}</Typography>
                </Box>
            </Box>
        </Paper>
    );
};
