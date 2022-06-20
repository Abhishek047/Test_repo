import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const TOKEN = process.env.REACT_APP_CLICK_UP_TOKEN;
const TASKS_URI = "https://api.clickup.com/api/v2/list/";
const LIST_ID = "187442410";

const headers = {
    Authorization: TOKEN,
    "Content-Type": "application/json",
};

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = useCallback(async () => {
        try {
            const { data } = await axios.get(`${TASKS_URI}${LIST_ID}/task`, { headers: headers });
            setTasks(data.tasks);
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    const submitTasks = useCallback(async ({ name, description }) => {
        try {
            if (!name || !description) {
                console.log("Fill fields");
                return false;
            }
            const newTask = {
                name,
                description,
            };
            await axios.post(`${TASKS_URI}${LIST_ID}/task`, newTask, {
                headers: headers,
            });
            await fetchTasks();
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }, []);

    useEffect(() => {
        if (!tasks?.length) {
            fetchTasks();
        }
    }, [fetchTasks, tasks]);

    return { tasks, updateTasks: fetchTasks, submitTasks };
};
